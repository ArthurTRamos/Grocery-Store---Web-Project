import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { v4 as uuidv4 } from 'uuid';

import "./LoginRegister.css";

import logo from "../assets/logo.png";
import StateSelection from "./utility_elements/StateSelection";
import CountrySelection from "./utility_elements/CountrySelection";
import CustomAlert from "./utility_elements/CustomAlert";
import {GetUsers, FetchCreateUser} from "../services/Fetchs.js";

// Main login and register component that handles user authentication and registration
function LoginRegister({setLoggedUserId}) {
  const navigate = useNavigate();
  
  // State to store all users fetched from the API
  const [users, setUsers] = useState([]);
  // Controls which tab is currently active (0 = login, 1 = register)
  const [tabIndex, setTabIndex] = useState(0);
  // Selected state and country for address form
  const [selectedState, setSelectedState] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  // Alert states for different validation scenarios
  const [fillAllFields, setFillAllFields] = useState(false);
  const [invalidInfo, setInvalidInfo] = useState(false);
  const [sucessfulRegister, setSuccessfulRegister] = useState(false);
  const [fixPhoneNumber, setFixPhoneNumber] = useState(false);
  const [fixHouseNumber, setFixHouseNumber] = useState(false);
  const [fixCEPNumber, setFixCEPNumber] = useState(false);
  const [equalEmail, setEqualEmail] = useState(false);

  // State object for login form inputs
  const [inputInfoLogin, setInputInfoLogin] = useState({
    email: "",
    password: ""
  });

  // State object for registration form inputs with nested address object
  const [inputInfoRegister, setInputInfoRegister] = useState({
    admin:false,
    name: "",
    email: "",
    password: "",
    cel: "",
    adress:{
      streetName: "",
      streetNumber: "",
      apartmentNumber: "",
      city: "",
      state: "",
      postalCode: "",
      country: "Brasil",
    },
    paymentMethods: [],
    coupons: []
  });

  // Fetch all users from the API and update state
  const fetchUsersData = async() => {
    const data = await GetUsers();
    setUsers(data);
  }

  // Handle input changes for login form
  const handleInputDataLogin = (e) => {
    const { name, value } = e.target;

    setInputInfoLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle input changes for registration form
  // Special handling for address fields to update nested object
  const handleInputDataRegister = (e) => {
    const { name, value } = e.target;
  
    // Check if the field belongs to address object
    if (
      name === "apartmentNumber" ||
      name === "city" ||
      name === "country" ||
      name === "postalCode" ||
      name === "state" ||
      name === "streetName" ||
      name === "streetNumber"
    ) {
      // Update nested address object
      setInputInfoRegister((prev) => ({
        ...prev,
        adress: {
          ...prev.adress,
          [name]: value,
        },
      }));
    } else {
      // Update top-level properties
      setInputInfoRegister((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  // Handle state selection from dropdown component
  const handleStateChange = (newState) => {
    setSelectedState(newState);

    setInputInfoRegister((prev) => ({
      ...prev,
      adress: {
        ...prev.adress,
        state: newState,
      }
    }));
  };

  // Handle country selection from dropdown component
  const handleCountryChange = (newCountry) => {
    setSelectedCountry(newCountry);

    setInputInfoRegister((prev) => ({
      ...prev,
      adress: {
        ...prev.adress,
        country: newCountry,
      }
    }));
  }

  // Handle login form submission
  const handleSaveLogin = (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if(!inputInfoLogin.email || !inputInfoLogin.password) {
      setFillAllFields(true);
      return;
    }

    // Find user with matching email and password
    const user = users.find((user) =>
      user["email"] === inputInfoLogin.email &&
      user["password"] === inputInfoLogin.password
    );

    // If user found, login successful
    if(user) {
      console.log(user);
      setLoggedUserId(user._id);
      navigate("/");
    }
    else {
      // Show invalid credentials alert
      setInvalidInfo(true);
    }
  };

  // Handle registration form submission
  const handleSaveRegister = async (e) => {
    e.preventDefault();

    // Validate all required fields are filled
    if(!inputInfoRegister.name || !inputInfoRegister.email || !inputInfoRegister.password || !inputInfoRegister.cel || !inputInfoRegister.adress.streetName || !inputInfoRegister.adress.streetNumber || !inputInfoRegister.adress.city || !inputInfoRegister.adress.postalCode) {
      setFillAllFields(true);
      return;
    }

    // Regex to validate only numbers
    const onlyNumbersRegex = /^\d*$/;
    
    // Validate phone number contains only digits
    if(!onlyNumbersRegex.test(inputInfoRegister.cel)) {
      setFixPhoneNumber(true);
      return;
    }

    // Validate street number contains only digits
    if(!onlyNumbersRegex.test(inputInfoRegister.adress.streetNumber)) {
      setFixHouseNumber(true);
      return;
    }

    // Validate postal code contains only digits
    if(!onlyNumbersRegex.test(inputInfoRegister.adress.postalCode)) {
      setFixCEPNumber(true);
      return;
    }

    // Check if email is already registered
    if(users.filter((user) => user.email === inputInfoRegister.email).length > 0) {
      setEqualEmail(true);
      return;
    }

    // Create new user via API
    const newUser = await FetchCreateUser([inputInfoRegister]);

    // Show success message
    setSuccessfulRegister(true);
    
    // Auto-login the newly registered user
    setLoggedUserId(newUser[0]["_id"]);
  };
  
  // Handle closing successful registration alert and navigate to home
  const handleCloseSuccessfulRegister = () => {
    setSuccessfulRegister(false);
    navigate("/");
  }

  // Fetch users data when component mounts
  useEffect(() => {
    fetchUsersData();
  }, [])

  return (
    <div className="auth-container">
      {/* Alert for missing required fields */}
      {fillAllFields ? (
        <CustomAlert
          alertMessage="Preencha todos os campos"
          onConfirm={() => setFillAllFields(false)}
          onConfirmMessage="OK"
        />
      ) : null}
      
      {/* Alert for invalid login credentials */}
      {invalidInfo && (
        <CustomAlert
          alertMessage="Usuário ou senha inválidos"
          onConfirm={() => setInvalidInfo(false)}
          onConfirmMessage="OK"
        />
      )}
      
      {/* Alert for successful registration */}
      {sucessfulRegister && (
        <CustomAlert
          alertMessage="Usuário cadastrado com sucesso!"
          onConfirm={handleCloseSuccessfulRegister}
          onConfirmMessage="OK"
        />
      )}
      
      {/* Alert for invalid phone number format */}
      {fixPhoneNumber ? (
        <CustomAlert
          alertMessage="O telefone somente pode conter números"
          onConfirm={() => setFixPhoneNumber(false)}
          onConfirmMessage="OK"
        />
      ) : null}
      
      {/* Alert for email already in use */}
      {equalEmail ? (
        <CustomAlert
          alertMessage="Email já em uso"
          onConfirm={() => setEqualEmail(false)}
          onConfirmMessage="OK"
        />
      ) : null}
      
      {/* Alert for invalid house number format */}
      {fixHouseNumber ? (
        <CustomAlert
          alertMessage="O número da casa somente pode conter números"
          onConfirm={() => setFixHouseNumber(false)}
          onConfirmMessage="OK"
        />
      ) : null}
      
      {/* Alert for invalid postal code format */}
      {fixCEPNumber ? (
        <CustomAlert
          alertMessage="O CEP somente pode conter números"
          onConfirm={() => setFixCEPNumber(false)}
          onConfirmMessage="OK"
        />
      ) : null}

      <div className="auth-form">
        {/* Header section with logo and title */}
        <div className="auth-header">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="logo-name">Mercado Verde</h1>
          <p>Faça Login ou Cadastre-se para continuar</p>
        </div>

        {/* Tab container for login and register forms */}
        <Tabs
          selectedIndex={tabIndex}
          onSelect={(index) => setTabIndex(index)}
          className="auth-tabs"
        >
          {/* Tab navigation */}
          <TabList className="tab-list">
            <Tab className="tab" selectedClassName="tab-selected">
              Login
            </Tab>
            <Tab className="tab" selectedClassName="tab-selected">
              Cadastro
            </Tab>
          </TabList>

          {/* Login form panel */}
          <TabPanel className="tab-panel">
            <form>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="seu@email.com"
                  value={inputInfoLogin.email}
                  onChange={handleInputDataLogin}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Senha</label>
                <input 
                  id="password" 
                  type="password"
                  name="password"
                  value={inputInfoLogin.password}
                  onChange={handleInputDataLogin}
                  required 
                />
              </div>
              <div className="form-actions">
                <button
                  type="submit"
                  className="btn-primary"
                  onClick={handleSaveLogin}
                >
                  Entrar
                </button>
              </div>
            </form>
          </TabPanel>

          {/* Registration form panel */}
          <TabPanel className="tab-panel">
            <form>
              {/* Personal information section */}
              <div className="form-section">
                <h3>Informações Pessoais</h3>
                <div className="form-group">
                  <label htmlFor="name">Nome Completo</label>
                  <input 
                    id="nome-completo" 
                    type="text"
                    name="name"
                    value={inputInfoRegister.name}
                    onChange={handleInputDataRegister}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email-cadastro">E-mail</label>
                  <input
                    id="email-cadastro"
                    type="email"
                    placeholder="seu@email.com"
                    name="email"
                    value={inputInfoRegister.email}
                    onChange={handleInputDataRegister}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="senha-cadastro">Senha</label>
                    <input 
                      id="senha-cadastro" 
                      type="password" 
                      name="password"
                      value={inputInfoRegister.password}
                      onChange={handleInputDataRegister}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmar-senha">Número do Celular</label>
                    <input
                      id="confirmar-senha" 
                      type="tel"
                      name="cel"
                      value={inputInfoRegister.cel}
                      onChange={handleInputDataRegister}
                      pattern="[0-9]+"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Address information section */}
              <div className="form-section">
                <h3>Endereço</h3>
                <div className="form-group">
                  <label htmlFor="rua">Rua</label>
                  <input 
                    id="rua"
                    type="text" 
                    placeholder="Av. Brasil" 
                    name="streetName"
                    value={inputInfoRegister.adress.streetName}
                    onChange={handleInputDataRegister}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="numero">Número</label>
                    <input 
                      id="numero" 
                      type="text" 
                      placeholder="123"
                      name="streetNumber"
                      value={inputInfoRegister.adress.streetNumber}
                      onChange={handleInputDataRegister}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="complemento">Complemento</label>
                    <input
                      id="complemento"
                      type="text"
                      placeholder="Apto 101, Bloco B"
                      name="apartmentNumber"
                      value={inputInfoRegister.adress.apartmentNumber}
                      onChange={handleInputDataRegister}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cidade">Cidade</label>
                    <input 
                      id="cidade" 
                      type="text" 
                      placeholder="São Paulo"
                      name="city"
                      value={inputInfoRegister.adress.city}
                      onChange={handleInputDataRegister}
                      required
                    />
                  </div>
                  <div className="form-group">
                    {/* Custom state selection component */}
                    <StateSelection 
                      value={selectedState} 
                      onChange={handleStateChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cep">CEP</label>
                    <input 
                      id="cep"
                      type="text" 
                      placeholder="00000000" 
                      name="postalCode"
                      value={inputInfoRegister.adress.postalCode}
                      onChange={handleInputDataRegister}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn-primary"
                  onClick={handleSaveRegister}
                >
                  Cadastrar
                </button>
              </div>
            </form>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default LoginRegister;