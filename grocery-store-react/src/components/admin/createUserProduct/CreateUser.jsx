import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import "./CreateUser.css";
import StateSelection from "../../utility_elements/StateSelection";
import CountrySelection from "../../utility_elements/CountrySelection";

const CreateUser = ({users, setUsers}) => {

  const [inputUser, setInputUser] = useState(

    {
      admin:false,
      id: -1,
      password: "",
      name: "",
      cel: "",
      email: "",
      adress:{
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
    }
  )

  const handleInputData = (e) => {
    const { name, value } = e.target;

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

  const handleStateChange = (newState) => {

    setInputUser((prev) => ({
      ...prev,
      adress: {
        ...prev.adress,
        state: newState,
      }
    }));
  };

  const handleCountryChange = (newCountry) => {

    setInputUser((prev) => ({
      ...prev,
      adress: {
        ...prev.adress,
        country: newCountry,
      }
    }));
  }

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
    }))
  }

  const handleUserCreation = (e) => {

    e.preventDefault();
    
    if(!inputUser.name || !inputUser.email || !inputUser.password || !inputUser.cel || !inputUser.adress.streetName || !inputUser.adress.streetNumber || !inputUser.adress.city || !inputUser.adress.postalCode) {
      alert("Preencha todos os campos");
      return;
    }

    inputUser.id = uuidv4();

    const updateUserData = [...users, inputUser];
    setUsers(updateUserData);

    alert("Adicionou Usuário");
    console.log({inputUser});

  }


  return (
    <>
      <div class="container">
        <form id="userForm">
          <div class="form-header">
            <h2>Cadastro de Usuário</h2>
            <p>
              Seja bem-vindo administrador! Crie o cadastro de um usuário para
              uma experiência sustentável.
            </p>
          </div>

          <div class="form-section">
            <h3>Dados Pessoais</h3>

            <div class="form-row">
              <div class="form-group">
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

            <div class="form-row">
              <div class="form-group">
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

              <div class="form-group">
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

            <div class="form-row">
              <div class="form-group">
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

              <div class="form-group">
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
                  // value={selectedCountry} 
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

          <div className="btn-container">
                <button type="submit" className="btn" onClick={handleUserCreation}>
                    <span>Criar usuário</span>
                </button>
          </div>

        </form>
      </div>
    </>
  );
};

export default CreateUser;
