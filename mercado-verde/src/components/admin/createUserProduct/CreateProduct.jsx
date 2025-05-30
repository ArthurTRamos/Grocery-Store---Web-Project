import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./CreateProduct.css";
import SekInputImage from "../../utility_elements/SekInputImage";
import CategorySelection from "../../utility_elements/CategorySelection";

import CustomAlert from "../../utility_elements/CustomAlert";

const CreateProduct = ({products, setProducts}) => {

  const [productAdded, setProductAdded] = useState(false);

  const[inputProductData, setInputProductData] = useState(
    {
      id: -1,
      category: "",
      name: "",
      price: 0,
      stock: 0, 
      sold: 0,
      image: "",
      description: ""
    }
  );
  
  const handleInputDataChange = (e) => {
  
    const {name, value} = e.target;

    setInputProductData((prev) => ({
      ...prev,
      [name]: value,

    }));
  }

  const handleInputImage = (field, url) => {

    setInputProductData((prev) => ({
      ...prev,
      [field]: url,

    }));
  }

  const handleProductCreation = (e) => {

    e.preventDefault();
    inputProductData.id = uuidv4();

    const newProduct = {
      ...inputProductData,
      price: Number(inputProductData.price) || 0,
      stock: Number(inputProductData.stock) || 0,
      sold: Number(inputProductData.sold) || 0,
    };

    const updateProductData = [...products, newProduct];
    setProducts(updateProductData);

    // alert("Adicionou Produto");
    setProductAdded(true);
    console.log({inputProductData});

  }


  return (
    <>
      <div class="container">
        {productAdded && (
          <CustomAlert
            alertMessage="Produto adicionado com sucesso!"
            onConfirm={() => setProductAdded(false)}
            onConfirmMessage={"OK"}
          />
        )}
        <form id="userForm">
          <div class="form-header">
            <h2>Cadastro de Produto</h2>
            <p>Qual será o produto de qualidade adicionado dessa vez?.</p>
          </div>

          <div class="form-section">
            <h3>Dados do Produto</h3>

            <div class="form-row">
              <CategorySelection value={inputProductData.category} onChangeCategory={handleInputDataChange}/>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label htmlFor="nome_produto">Nome do Produto</label>
                <input
                  type="text"
                  className="input_sek"
                  id="nome_produto"
                  name="name"
                  placeholder="Digite o nome do produto"
                  value={inputProductData.name}
                  onChange={handleInputDataChange}
                  required
                />
              </div>

              <div class="form-group">
                <label htmlFor="preco">Preço (R$)</label>
                <input
                  type="number"
                  className="input_sek"
                  id="preco"
                  name="price"
                  min="0"
                  step="0.01"
                  placeholder="Digite o preço do produto"
                  value={inputProductData.price}
                  onChange={handleInputDataChange}
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
                  name="stock"
                  min="0"
                  step="1"
                  placeholder="Digite a quantidade em estoque"
                  value={inputProductData.stock}
                  onChange={handleInputDataChange}
                  required
                />
              </div>

              <div class="form-group">
                <label htmlFor="qtd_vendida">Quantidade vendida</label>
                <input
                  type="number"
                  className="input_sek"
                  id="qtd_vendida"
                  name="sold"
                  min="0"
                  step="1"
                  placeholder="Digite a quantidade vendida"
                  value={inputProductData.sold}
                  onChange={handleInputDataChange}
                  required
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label htmlFor="descricao">Descrição do produto</label>
                <textarea
                  name="description"
                  className="textarea_sek"
                  id="descricao"
                  rows="4"
                  placeholder="Descreva o produto, suas características e benefícios..."
                  value={inputProductData.description}
                  onChange={handleInputDataChange}
                ></textarea>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <SekInputImage onChangeInputImage ={handleInputImage}/>
              </div>
            </div>
          </div>

          <div className="btn-container">
              <button type="submit" className="btn" onClick={handleProductCreation}>
                  <span>Criar Produto</span>
              </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateProduct;
