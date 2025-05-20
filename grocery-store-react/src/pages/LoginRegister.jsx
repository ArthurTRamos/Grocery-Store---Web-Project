import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Tabs, TabList, Tab, TabPanel } from "react-tabs"

import "./LoginRegister.css"
import Button from "../utility_elements/botao"

import logo from "../images/logo.png"

function LoginRegister({users, handleRegisterUser, handleLoggedUser}) {
    const navigate = useNavigate();
    const [tabIndex, setTabIndex] = useState(0);

    const handleRegister = () => {
        const nome = document.getElementById("nome-completo").value;
        const email = document.getElementById("email-cadastro").value;
        const senha = document.getElementById("senha-cadastro").value;
        const confirmarSenha = document.getElementById("confirmar-senha").value;

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem");
            return;
        }

        const newUser = {
            name: nome,
            email: email,
            password: senha,
            address: {
                street: document.getElementById("rua").value,
                number: document.getElementById("numero").value,
                complement: document.getElementById("complemento").value,
                city: document.getElementById("cidade").value,
                state: document.getElementById("estado").value,
                country: document.getElementById("pais").value,
                zipCode: document.getElementById("cep").value
            },
            paymentMethods: [],
            coupons: []
        };

        handleRegisterUser(newUser);
    }

    const handleLogin = () => {
        let email = document.getElementById("email");
        let password = document.getElementById("password");

        users.filter()

        const newLoggedUser = users.filter((user) => user.email === email && user.password === password);
    }

    return (
        <div className="auth-container">
            <div className="auth-form">
                <div className="auth-header">
                    <img src={logo} alt="Logo" className="logo" />
                    <h1 className="logo-name">Mercado Verde</h1>
                    <p>Faça Login ou Cadastre-se para continuar</p>
                </div>

                <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} className="auth-tabs">
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
                        <input id="email" type="email" placeholder="seu@email.com" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <input id="password" type="password" required />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn-primary" onClick={() => 
                            {
                                let user = users.find(user => user.email === document.getElementById("email").value && user.password === document.getElementById("senha").value);
                                if (user) {
                                    navigate("/");
                                } else {
                                    alert("Usuário ou senha inválidos");
                                }
                            }
                        }  >
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
                        <input id="email-cadastro" type="email" placeholder="seu@email.com" />
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
                            <input id="complemento" type="text" placeholder="Apto 101, Bloco B" />
                        </div>
                        </div>

                        <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="cidade">Cidade</label>
                            <input id="cidade" type="text" placeholder="São Paulo" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="estado">Estado</label>
                            <select id="estado">
                            <option value="">Selecione</option>
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                            </select>
                        </div>
                        </div>

                        <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="pais">País</label>
                            <select id="pais" defaultValue="Brasil">
                            <option value="Brasil">Brasil</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Chile">Chile</option>
                            <option value="Colômbia">Colômbia</option>
                            <option value="Uruguai">Uruguai</option>
                            <option value="Paraguai">Paraguai</option>
                            <option value="Peru">Peru</option>
                            <option value="Equador">Equador</option>
                            <option value="Venezuela">Venezuela</option>
                            <option value="Bolívia">Bolívia</option>
                            </select>
                        </div>
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
                    </form>
                </TabPanel>
                </Tabs>
            </div>
        </div>
    )
}

export default LoginRegister;
