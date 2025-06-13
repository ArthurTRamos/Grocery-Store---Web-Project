import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { v4 as uuidv4 } from 'uuid';

import "./LoginRegister.css";

import logo from "../assets/logo.png";
import StateSelection from "./utility_elements/StateSelection";
import CountrySelection from "./utility_elements/CountrySelection";
import CustomAlert from "./utility_elements/CustomAlert";
import {GetUsers, CreateUser} from "../services/Fetchs.js";

function LoginRegister({setLoggedUserId}) {
  const navigate = useNavigate();
  
  const [users, setUsers] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const [fillAllFields, setFillAllFields] = useState(false);
  const [invalidInfo, setInvalidInfo] = useState(false);
  const [sucessfulRegister, setSuccessfulRegister] = useState(false);
  const [fixPhoneNumber, setFixPhoneNumber] = useState(false);
  const [fixHouseNumber, setFixHouseNumber] = useState(false);
  const [fixCEPNumber, setFixCEPNumber] = useState(false);
  const [equalEmail, setEqualEmail] = useState(false);

  const [inputInfoLogin, setInputInfoLogin] = useState({
    email: "",
    password: ""
  });

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
      country: "",
    },
    paymentMethods: [],
    coupons: []
  });

  const fetchUsersData = async() => {
    const data = await GetUsers();
    setUsers(data);
  }

  const handleInputDataLogin = (e) => {
    const { name, value } = e.target;

    setInputInfoLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputDataRegister = (e) => {
    const { name, value } = e.target;
  
    if (
      name === "apartmentNumber" ||
      name === "city" ||
      name === "country" ||
      name === "postalCode" ||
      name === "state" ||
      name === "streetName" ||
      name === "streetNumber"
    ) {
      setInputInfoRegister((prev) => ({
        ...prev,
        adress: {
          ...prev.adress,
          [name]: value,
        },
      }));
    } else {
      setInputInfoRegister((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  

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

  const handleSaveLogin = (e) => {
    e.preventDefault();

    if(!inputInfoLogin.email || !inputInfoLogin.password) {
      setFillAllFields(true);
      return;
    }

    const user = users.find((user) =>
      user["email"] === inputInfoLogin.email &&
      user["password"] === inputInfoLogin.password
    );

    if(user) {
      console.log(user);
      setLoggedUserId(user._id);
      navigate("/");
    }
    else {
      setInvalidInfo(true);
    }
  };

  const handleSaveRegister = async (e) => {
    e.preventDefault();

    if(!inputInfoRegister.name || !inputInfoRegister.email || !inputInfoRegister.password || !inputInfoRegister.cel || !inputInfoRegister.adress.streetName || !inputInfoRegister.adress.streetNumber || !inputInfoRegister.adress.city || !inputInfoRegister.adress.postalCode) {
      // alert("Preencha todos os campos");
      setFillAllFields(true);
      return;
    }

    const onlyNumbersRegex = /^\d*$/;
    if(!onlyNumbersRegex.test(inputInfoRegister.cel)) {
      setFixPhoneNumber(true);
      return;
    }

    if(!onlyNumbersRegex.test(inputInfoRegister.adress.streetNumber)) {
      setFixHouseNumber(true);
      return;
    }

    if(!onlyNumbersRegex.test(inputInfoRegister.adress.postalCode)) {
      setFixCEPNumber(true);
      return;
    }

    if(users.filter((user) => user.email === inputInfoRegister.email).length > 0) {
      setEqualEmail(true);
      return;
    }

    console.log(inputInfoRegister);

    const newUser = await CreateUser([inputInfoRegister]);

    console.log(newUser);

    setSuccessfulRegister(true);
    
    setLoggedUserId(newUser._id);
    onSaveLogin(inputInfoRegister);
  };
  
  const handleCloseSuccessfulRegister = () => {
    setSuccessfulRegister(false);
    navigate("/");
  }

  useEffect(() => {
    fetchUsersData();
  }, [])

  return (
    <div className="auth-container">
      {fillAllFields ? (
        <CustomAlert
          alertMessage="Preencha todos os campos"
          onConfirm={() => setFillAllFields(false)}
          onConfirmMessage="OK"
        />
      ) : null}
      {invalidInfo && (
        <CustomAlert
          alertMessage="Usuário ou senha inválidos"
          onConfirm={() => setInvalidInfo(false)}
          onConfirmMessage="OK"
        />
      )}
      {sucessfulRegister && (
        <CustomAlert
          alertMessage="Usuário cadastrado com sucesso!"
          onConfirm={handleCloseSuccessfulRegister}
          onConfirmMessage="OK"
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

      <div className="auth-form">
        <div className="auth-header">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="logo-name">Mercado Verde</h1>
          <p>Faça Login ou Cadastre-se para continuar</p>
        </div>

        <Tabs
          selectedIndex={tabIndex}
          onSelect={(index) => setTabIndex(index)}
          className="auth-tabs"
        >
          <TabList className="tab-list">
            <Tab className="tab" selectedClassName="tab-selected">
              Login
            </Tab>
            <Tab className="tab" selectedClassName="tab-selected">
              Cadastro
            </Tab>
          </TabList>

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
                required />
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

          <TabPanel className="tab-panel">
            <form>
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
                    <StateSelection 
                    value={selectedState} 
                    onChange={handleStateChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <CountrySelection 
                  value={selectedCountry} 
                  onChange={handleCountryChange}
                  />
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
