import { React, useState } from "react";

import "./CreateUser.css";

import StateSelection from "../../utility_elements/StateSelection";
import CustomAlert from "../../utility_elements/CustomAlert";
import CustomError from "../../utility_elements/CustomError";
import SideBar from "../SideBar";

import { FetchCreateUser, GetUsers } from "../../../services/Fetchs";

// Main component for creating new users
const CreateUser = () => {
  // State for success and error messages
  const [userCreated, setUserCreated] = useState(false);
  const [fillAllFields, setFillAllFields] = useState(false);
  const [fixPhoneNumber, setFixPhoneNumber] = useState(false);
  const [fixHouseNumber, setFixHouseNumber] = useState(false);
  const [fixCEPNumber, setFixCEPNumber] = useState(false);
  const [equalEmail, setEqualEmail] = useState(false);

  const [usersVector, setUsersVector] = useState([]);

  // State holding the new user's input data
  const [inputUser, setInputUser] = useState({
    admin: false,
    password: "",
    name: "",
    cel: "",
    email: "",
    adress: {
      apartmentNumber: "",
      city: "",
      country: "Brasil",
      postalCode: "",
      state: "",
      streetName: "",
      streetNumber: "",
    },
    paymentMethods: [],
    coupons: []
  });

  // Function to update inputUser as form fields are changed
  const handleInputData = (e) => {
    const { name, value } = e.target;

    // Separate treatment for address fields
    if (name === "apartmentNumber" || name === "city" || name === "postalCode" || name === "state" || name === "streetName" || name === "streetNumber") {
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

  // Handles updating only the "state" field in the address
  const handleStateChange = (newState) => {
    setInputUser((prev) => ({
      ...prev,
      adress: {
        ...prev.adress,
        state: newState,
      }
    }));
  };

  // Changes user type (admin or customer)
  const handleTypeChange = (e) => {
    const { value } = e.target;

    let bool_variable = false;
    if (value === "admin") {
      bool_variable = true;
    }

    setInputUser((prev) => ({
      ...prev,
      admin: bool_variable
    }));
  };

  // Handles validation and final user creation
  const handleUserCreation = async (e) => {
    e.preventDefault();
    
    // Checks if all required fields are filled
    if (!inputUser.name || !inputUser.email || !inputUser.password || !inputUser.cel || !inputUser.adress.streetName || !inputUser.adress.streetNumber || !inputUser.adress.city || !inputUser.adress.postalCode || !inputUser.adress.country || !inputUser.adress.state) {
      setFillAllFields(true);
      return;
    }

    const onlyNumbersRegex = /^\d*$/;

    // Checks if phone number is valid (only digits)
    if (!onlyNumbersRegex.test(inputUser.cel)) {
      setFixPhoneNumber(true);
      return;
    }

    // Checks if house number contains only digits
    if (!onlyNumbersRegex.test(inputUser.adress.streetNumber)) {
      setFixHouseNumber(true);
      return;
    }

    // Checks if postal code (CEP) contains only digits
    if (!onlyNumbersRegex.test(inputUser.adress.postalCode)) {
      setFixCEPNumber(true);
      return;
    }

    // Tries to get existing users to check email uniqueness
    try {
      const users = await GetUsers();
      setUsersVector(users);
    } catch (error) {
      console.log(error);
    }

    // Checks if the email is already in use
    if (usersVector.filter((user) => user.email === inputUser.email).length > 0) {
      setEqualEmail(true);
      return;
    }

    // Attempts to create user with provided data
    try {
      await FetchCreateUser([inputUser]);
      setUserCreated(true);  // show success alert
      console.log({ inputUser });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="admin-container">

        {/* Sidebar */}
        <SideBar />

        <div className="interior-container">

          {/* Success and error messages */}
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
          {fixPhoneNumber && (
            <CustomAlert
              alertMessage="O telefone somente pode conter números"
              onConfirm={() => setFixPhoneNumber(false)}
              onConfirmMessage="OK"
            />
          )}
          {equalEmail && (
            <CustomAlert
              alertMessage="Email já em uso"
              onConfirm={() => setEqualEmail(false)}
              onConfirmMessage="OK"
            />
          )}
          {fixHouseNumber && (
            <CustomAlert
              alertMessage="O número da casa somente pode conter números"
              onConfirm={() => setFixHouseNumber(false)}
              onConfirmMessage="OK"
            />
          )}
          {fixCEPNumber && (
            <CustomAlert
              alertMessage="O CEP somente pode conter números"
              onConfirm={() => setFixCEPNumber(false)}
              onConfirmMessage="OK"
            />
          )}

          {/* User creation form */}
          <form id="userForm">
            <div className="form-header">
              <h2>Cadastro de Usuário</h2>
              <p>
                Seja bem-vindo administrador! Crie o cadastro de um usuário para
                uma experiência sustentável.
              </p>
            </div>

            {/* Personal Information Section */}
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
                  <label htmlFor="email">Email</label>
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

            {/* Submit Button */}
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
