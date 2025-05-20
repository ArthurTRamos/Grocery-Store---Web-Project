import React from "react";
import SideBar from "./SideBar";
import Botao from "../utility_elements/botao";
import "./CreateProduct.css";
import Input_image from "../utility_elements/input_image";

const CreateProduct = () => {
  return (
    <>
      <SideBar />
      <div class="container">
        <form id="userForm">
          <div class="form-header">
            <h2>Cadastro de Produto</h2>
            <p>Qual será o produto de qualidade adicionado dessa vez?.</p>
          </div>

          <div class="form-section">
            <h3>Dados do Produto</h3>

            <div class="form-row">
              <div class="form-group">
                <label htmlFor="categoria_produto">Categoria do Produto</label>
                <select
                  className="select_sek"
                  id="categoria_produto"
                  name="categoria_produto"
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="fruta">Frutas</option>
                  <option value="verdura">Verduras</option>
                  <option value="cereal">Cereais</option>
                  <option value="padaria">Padaria</option>
                  <option value="n_perecivel">Não perecíveis</option>
                  <option value="outro">Outros</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label htmlFor="nome_produto">Nome do Produto</label>
                <input
                  type="text"
                  className="input_sek"
                  id="nome_produto"
                  name="nome_produto"
                  placeholder="Digite o nome do produto"
                  required
                />
              </div>

              <div class="form-group">
                <label htmlFor="preco">Preço (R$)</label>
                <input
                  type="number"
                  className="input_sek"
                  id="preco"
                  name="preco"
                  min="0"
                  step="0.01"
                  placeholder="Digite o preço do produto"
                  required
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label htmlFor="qtd_estoque">Quantidade em estoque</label>
                <input
                  type="number"
                  className="input_sek"
                  id="qtd_estoque"
                  name="qtd_estoque"
                  min="0"
                  step="1"
                  placeholder="Digite a quantidade em estoque"
                  required
                />
              </div>

              <div class="form-group">
                <label htmlFor="qtd_vendida">Quantidade vendida</label>
                <input
                  type="number"
                  className="input_sek"
                  id="qtd_vendida"
                  name="qtd_vendida"
                  min="0"
                  step="1"
                  placeholder="Digite a quantidade vendida"
                  required
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label htmlFor="descricao">Descrição do produto</label>
                <textarea
                  name="descricao"
                  className="textarea_sek"
                  id="descricao"
                  rows="4"
                  placeholder="Descreva o produto, suas características e benefícios..."
                ></textarea>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <Input_image />
              </div>
            </div>
          </div>

          <Botao texto="Criar Usuário" />
        </form>
      </div>
    </>
  );
};

export default CreateProduct;
