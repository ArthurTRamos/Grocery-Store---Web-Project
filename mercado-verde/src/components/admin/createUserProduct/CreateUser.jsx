import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import "./CreateUser.css";
import StateSelection from "../../utility_elements/StateSelection";
import CountrySelection from "../../utility_elements/CountrySelection";
import CustomAlert from "../../utility_elements/CustomAlert";
import CustomError from "../../utility_elements/CustomError";

import SideBar from "../SideBar";

// Componente principal para criação de novos usuários
const CreateUser = ({users, setUsers}) => {
  // Estados de controle para mensagens de erro/sucesso
  const [userCreated, setUserCreated] = useState(false);
  const [fillAllFields, setFillAllFields] = useState(false);
  const [fixPhoneNumber, setFixPhoneNumber] = useState(false);
  const [fixHouseNumber, setFixHouseNumber] = useState(false);
  const [fixCEPNumber, setFixCEPNumber] = useState(false);
  const [equalEmail, setEqualEmail] = useState(false);

  // Estado que armazena os dados do novo usuário
  const [inputUser, setInputUser] = useState({
    admin: false,
    id: -1,
    password: "",
    name: "",
    cel: "",
    email: "",
    adress: {
      apartmentNumber: "",
      city: "",
      country: "",
      postalCode: "",
      state: "",
      streetName: "",
      streetNumber: "",
    },
    paymentMethods: [],
    coupons: []
  });

  // Função para atualizar o estado do usuário conforme os campos do formulário são preenchidos
  const handleInputData = (e) => {
    const { name, value } = e.target;

    // Campos de endereço são tratados separadamente
    if(name === "apartmentNumber" || name === "city" || name === "country" || name === "postalCode" || name === "state" || name === "streetName" || name === "streetNumber") {
      setInputUser((prev) => ({
        ...prev,
        adress: {
          ...prev.adress,
          [name]: value,
        },
      }));
    } else {
      setInputUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Atualiza o campo "estado" do endereço
  const handleStateChange = (newState) => {
    setInputUser((prev) => ({
      ...prev,
      adress: {
        ...prev.adress,
        state: newState,
      }
    }));
  };

  // Atualiza o campo "país" do endereço
  const handleCountryChange = (newCountry) => {
    setInputUser((prev) => ({
      ...prev,
      adress: {
        ...prev.adress,
        country: newCountry,
      }
    }));
  };

  // Altera o tipo do usuário (admin ou cliente)
  const handleTypeChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    let bool_variable = false;
    if(value === "admin") {
      bool_variable = true;
    }

    setInputUser((prev) => ({
      ...prev,
      admin: bool_variable
    }));
  };

  // Validações e criação final do usuário
  const handleUserCreation = (e) => {
    e.preventDefault();
    
    // Verifica se todos os campos obrigatórios foram preenchidos
    if(!inputUser.name || !inputUser.email || !inputUser.password || !inputUser.cel || !inputUser.adress.streetName || !inputUser.adress.streetNumber || !inputUser.adress.city || !inputUser.adress.postalCode || !inputUser.adress.country || !inputUser.adress.state) {
      setFillAllFields(true);
      return;
    }

    const onlyNumbersRegex = /^\d*$/;

    // Verifica se o telefone contém apenas números
    if(!onlyNumbersRegex.test(inputUser.cel)) {
      setFixPhoneNumber(true);
      return;
    }

    // Verifica se o número da casa contém apenas números
    if(!onlyNumbersRegex.test(inputUser.adress.streetNumber)) {
      setFixHouseNumber(true);
      return;
    }

    // Verifica se o CEP contém apenas números
    if(!onlyNumbersRegex.test(inputUser.adress.postalCode)) {
      setFixCEPNumber(true);
      return;
    }

    // Verifica se o e-mail já está em uso
    if(users.filter((user) => user.email === inputUser.email).length > 0) {
      setEqualEmail(true);
      return;
    }

    // Gera um UUID para o novo usuário
    inputUser.id = uuidv4();

    // Atualiza a lista de usuários com o novo usuário criado
    const updateUserData = [...users, inputUser];
    setUsers(updateUserData);

    // Exibe mensagem de sucesso
    setUserCreated(true);
    console.log({inputUser});
  };

  return (
    <>
      <div className="admin-container">

        {/* Barra lateral */}
        <SideBar/>

        <div className="interior-container">

          {/* Alertas de sucesso ou erro */}
          {userCreated && (
            <CustomAlert
              alertMessage="Usuário adicionado com sucesso!"
              onConfirm={() => setUserCreated(false)}
              onConfirmMessage={"OK"}
            />
          )}
          {fillAllFields && (
            <CustomError
              alertMessage="Por favor, preencha todos os campos obrigatórios."
              onError={() => setFillAllFields(false)}
              onErrorMessage={"Voltar"}
            />
          )}
          {fixPhoneNumber ? (
            <CustomAlert
              alertMessage="O telefone somente pode conter números"
              onConfirm={() => setFixPhoneNumber(false)}
              onConfirmMessage="OK"
            />
          ) : null}
          {equalEmail ? (
            <CustomAlert
              alertMessage="Email já em uso"
              onConfirm={() => setEqualEmail(false)}
              onConfirmMessage="OK"
            />
          ) : null}
          {fixHouseNumber ? (
            <CustomAlert
              alertMessage="O número da casa somente pode conter números"
              onConfirm={() => setFixHouseNumber(false)}
              onConfirmMessage="OK"
            />
          ) : null}
          {fixCEPNumber ? (
            <CustomAlert
              alertMessage="O CEP somente pode conter números"
              onConfirm={() => setFixCEPNumber(false)}
              onConfirmMessage="OK"
            />
          ) : null}

          {/* Formulário de criação de usuário */}
          <form id="userForm">
            <div className="form-header">
              <h2>Cadastro de Usuário</h2>
              <p>
                Seja bem-vindo administrador! Crie o cadastro de um usuário para
                uma experiência sustentável.
              </p>
            </div>

            {/* Dados pessoais */}
            <div className="form-section">
              <h3>Dados Pessoais</h3>

              <div className="form-row">
                <div className="form-group">
                  <label for="tipo">Tipo de Usuário</label>
                  <select
                    className="select_sek"
                    id="tipo"
                    name="admin"
                    onChange={handleTypeChange}
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="cliente">Cliente</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label for="nome">Nome Completo</label>
                  <input
                    type="text"
                    id="nome"
                    placeholder="Digite seu nome completo"
                    name="name"
                    value={inputUser.name}
                    onChange={handleInputData}
                    required
                  />
                </div>

                <div className="form-group">
                  <label for="email">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Digite seu e-mail"
                    name="email"
                    value={inputUser.email}
                    onChange={handleInputData}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label for="telefone">Telefone</label>
                  <input
                    type="tel"
                    id="telefone"
                    placeholder="(00) 00000-0000"
                    name="cel"
                    value={inputUser.cel}
                    onChange={handleInputData}
                    required
                  />
                </div>

                <div className="form-group">
                  <label for="senha">Senha</label>
                  <input
                    type="password"
                    id="senha"
                    placeholder="Crie uma senha segura"
                    name="password"
                    value={inputUser.password}
                    onChange={handleInputData}
                    required
                  />
                </div>
              </div>

              {/* Dados de endereço */}
              <h3>Dados de endereço</h3>

              <div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="rua">Rua</label>
                    <input
                      type="text"
                      id="rua"
                      placeholder="Digite o nome da sua rua"
                      name="streetName"
                      value={inputUser.adress.streetName}
                      onChange={handleInputData}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="numero_rua">Número</label>
                    <input
                      type="text"
                      id="numero_rua"
                      placeholder="Digite o número da rua"
                      name="streetNumber"
                      value={inputUser.adress.streetNumber}
                      onChange={handleInputData}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="complemento">Complemento</label>
                    <input
                      type="text"
                      id="complemento"
                      placeholder="Ex: Nome do edifício, Bloco, Apto"
                      name="apartmentNumber"
                      value={inputUser.adress.apartmentNumber}
                      onChange={handleInputData}
                    />
                  </div>

                  <div className="form-group"></div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cidade">Cidade</label>
                    <input
                      type="text"
                      id="cidade"
                      placeholder="Digite a sua cidade"
                      name="city"
                      value={inputUser.adress.city}
                      onChange={handleInputData}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <StateSelection 
                      value={inputUser.adress.state} 
                      onChange={handleStateChange}
                    />
                  </div>

                  <div className="form-group">
                    <CountrySelection 
                      value={inputUser.adress.country} 
                      onChange={handleCountryChange}
                    />
                  </div>

                  <div className="form-group"></div>
                </div>

                <div className="form-row-cep">
                  <div className="form-group">
                    <label htmlFor="cep">CEP</label>
                    <input
                      type="text"
                      id="cep"
                      placeholder="Digite o cep"
                      name="postalCode"
                      value={inputUser.adress.postalCode}
                      onChange={handleInputData}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Botão para criar usuário */}
            <div className="btn-container">
              <button type="submit" className="btn" onClick={handleUserCreation}>
                <span>Criar usuário</span>
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default CreateUser;
