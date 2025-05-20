import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";

import "./LoginRegister.css";
import Button from "./utility_elements/botao";

import logo from "../assets/logo.png";
import StateSelection from "./utility_elements/StateSelection";
import CountrySelection from "./utility_elements/CountrySelection";

function LoginRegister({ users }) {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);

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
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">password</label>
                <input id="password" type="password" required />
              </div>
              <div className="form-actions">
                <button
                  type="submit"
                  className="btn-primary"
                  onClick={() => {
                    let user = users.find(
                      (user) =>
                        user.email === document.getElementById("email").value &&
                        user.password === document.getElementById("senha").value
                    );
                    if (user) {
                      navigate("/");
                    } else {
                      alert("Usuário ou senha inválidos");
                    }
                  }}
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
                  <input id="nome-completo" type="text" />
                </div>
                <div className="form-group">
                  <label htmlFor="email-cadastro">E-mail</label>
                  <input
                    id="email-cadastro"
                    type="email"
                    placeholder="seu@email.com"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="senha-cadastro">Senha</label>
                    <input id="senha-cadastro" type="password" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmar-senha">Confirmar Senha</label>
                    <input id="confirmar-senha" type="password" />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Endereço</h3>
                <div className="form-group">
                  <label htmlFor="rua">Rua</label>
                  <input id="rua" type="text" placeholder="Av. Brasil" />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="numero">Número</label>
                    <input id="numero" type="text" placeholder="123" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="complemento">Complemento</label>
                    <input
                      id="complemento"
                      type="text"
                      placeholder="Apto 101, Bloco B"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cidade">Cidade</label>
                    <input id="cidade" type="text" placeholder="São Paulo" />
                  </div>
                  <div className="form-group">
                    <StateSelection />
                  </div>
                </div>

                <div className="form-row">
                  <CountrySelection/>
                  <div className="form-group">
                    <label htmlFor="cep">CEP</label>
                    <input id="cep" type="text" placeholder="00000-000" />
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  Cadastrar
                </button>
              </div>
              <div className="form-terms">
                Ao se cadastrar, você concorda com nossos{" "}
                <a href="/termos" className="link">
                  Termos de Uso
                </a>{" "}
                e{" "}
                <a href="/privacidade" className="link">
                  Política de Privacidade
                </a>
                .
              </div>
            </form>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default LoginRegister;
