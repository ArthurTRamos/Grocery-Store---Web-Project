import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { v4 as uuidv4 } from 'uuid';

import "./LoginRegister.css";

import logo from "../assets/logo.png";
import StateSelection from "./utility_elements/StateSelection";
import CountrySelection from "./utility_elements/CountrySelection";

function LoginRegister({ users, onSaveRegister, onSaveLogin }) {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const [inputInfoLogin, setInputInfoLogin] = useState({
    email: "",
    password: ""
  });

  const [inputInfoRegister, setInputInfoRegister] = useState({
    admin:false,
    adress:{
      apartmentNumber: "",
      city: "",
      country: "",
      postalCode: "",
      state: "",
      streetName: "",
      streetNumber: "",
    },
    cel: "",
    coupons: [],
    email: "",
    id: -1,
    name: "",
    password: "",
    paymentMethods: []
  });

  const handleInputDataLogin = (e) => {
    const { name, value } = e.target;

    setInputInfoLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputDataRegister = (e) => {
    const { name, value } = e.target;

    if(name === "apartmentNumber" || name === "city" || name === "country" || name === "postalCode" || name === "state" || name === "streetName" || name === "streetNumber") {
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
      alert("Preencha todos os campos");
      return;
    }

    const user = users.find((user) =>
      user["email"] === inputInfoLogin.email &&
      user["password"] === inputInfoLogin.password
    );

    console.log({ user });

    if(user) {
      console.log("logando legal")
      console.log(user)
      onSaveLogin(user);
      navigate("/");
    }
    else {
      alert("Usuário ou senha inválidos");
    }
  };

  const handleSaveRegister = (e) => {
    e.preventDefault();

    if(!inputInfoRegister.name || !inputInfoRegister.email || !inputInfoRegister.password || !inputInfoRegister.cel || !inputInfoRegister.adress.streetName || !inputInfoRegister.adress.streetNumber || !inputInfoRegister.adress.city || !inputInfoRegister.adress.postalCode) {
      alert("Preencha todos os campos");
      return;
    }

    inputInfoRegister.id = uuidv4();

    onSaveRegister(inputInfoRegister);

    alert("Usuário Cadastrado com sucesso!");
    console.log("cadastrando e logando")
    console.log(inputInfoRegister);
    onSaveLogin(inputInfoRegister);
    navigate("/");
  };

  return (
    <div className="auth-container">
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
                <label htmlFor="password">password</label>
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
                    placeholder="00000-000" 
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
