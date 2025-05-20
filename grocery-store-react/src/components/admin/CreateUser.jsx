import React from "react";
import "./CreateUser.css";
import SideBar from "./SideBar";
import Botao from "../utility_elements/botao";

const CreateUser = () => {
  return (
    <>
      <SideBar />
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
                  name="tipo_User"
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
                  name="nome"
                  placeholder="Digite seu nome completo"
                  required
                />
              </div>

              <div class="form-group">
                <label for="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Digite seu e-mail"
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
                  name="telefone"
                  placeholder="(00) 00000-0000"
                  required
                />
              </div>

              <div class="form-group">
                <label for="senha">Senha</label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  placeholder="Crie uma senha segura"
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
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="numero_rua">Número</label>
                  <input
                    type="text"
                    id="numero_rua"
                    placeholder="Digite o número da rua"
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
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="estado"> Estado</label>
                  <input
                    type="text"
                    id="estado"
                    placeholder="Digite o seu estado"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="pais">País</label>
                  <input
                    type="text"
                    id="pais"
                    placeholder="Digite o seu país"
                    required
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
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <Botao texto="Criar Usuário" />
        </form>
      </div>
    </>
  );
};

export default CreateUser;
