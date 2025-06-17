import React, { useState } from "react";

// Importing styles
import "./CreateProduct.css";
import "./CreateUser.css";

// Importing components
import CategorySelection from "../../utility_elements/CategorySelection";
import SideBar from "../SideBar";
import CustomAlert from "../../utility_elements/CustomAlert";
import CustomError from "../../utility_elements/CustomError";

// Service to send the product to the backend
import { FetchCreateProduct } from "../../../services/Fetchs";


const CreateProduct = () => {

  // State to handle success and error alerts
  const [productAdded, setProductAdded] = useState(false);
  const [productMissField, setProductMissField] = useState(false);
  const [productInvalidField, setProductInvalidField] = useState(false);

  // State to manage input fields of the product
  const[inputProductData, setInputProductData] = useState({
    category: "",
    name: "",
    price: 0,
    stock: 0, 
    sold: 0,
    image: "",
    description: ""
  });
  
  // Handles generic input changes
  const handleInputDataChange = (e) => {
    const { name, value } = e.target;

    setInputProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Handles image URL input separately (can be simplified)
  const handleInputImage = (e) => {
    setInputProductData((prev) => ({
      ...prev,
      image: e.target.value,
    }));
  }

  // Handles the product creation on form submission
  const handleProductCreation = async (e) => {
    e.preventDefault();

    // Normalize numeric values
    const newProduct = {
      ...inputProductData,
      price: Number(inputProductData.price) || 0,
      stock: Number(inputProductData.stock) || 0,
      sold: Number(inputProductData.sold) || 0,
    };

    // Validate required fields
    if(newProduct.name === "" || newProduct.category === "") {
      setProductMissField(true);
      return;
    }

    // Validate numeric constraints
    if(newProduct.price <= 0 || newProduct.stock < 0 || newProduct.sold < 0) {
      setProductInvalidField(true);
      return;
    }

    // Try to send product to the backend
    try {
      await FetchCreateProduct(newProduct);
      setProductAdded(true); // Show success alert
      console.log(newProduct); // Debug log

      // Reset form
      setInputProductData({
        category: "",
        name: "",
        price: 0,
        stock: 0, 
        sold: 0,
        image: "",
        description: ""
      });

    } catch (error) {
      console.log(error); // Handle possible error
    }
  }


  return (
    <>
      <div className="admin-container">

        <SideBar/> {/* Sidebar menu */}

        <div className="interior-container">
          {/* Alert: Product added successfully */}
          {productAdded && (
            <CustomAlert
              alertMessage="Produto adicionado com sucesso!"
              onConfirm={() => setProductAdded(false)}
              onConfirmMessage={"OK"}
            />
          )}
          {/* Alert: Missing required fields */}
          {productMissField && (
            <CustomError
              messageHeader="Produto com campos faltantes!"
              alertMessage="Todos os campos, exceto imagem e descrição, precisam estar preenchidos!"
              onError={() => setProductMissField(false)}
              onErrorMessage={"Voltar!"}
            />
          )}
          {/* Alert: Invalid numeric fields */}
          {productInvalidField && (
            <CustomError
              messageHeader="Produto com campos inválidos!"
              alertMessage="Campos numéricos negativos, ou preço zerado não são permitidos!"
              onError={() => setProductInvalidField(false)}
              onErrorMessage={"Voltar!"}
            />
          )}

          {/* Form for product creation */}
          <form id="userForm">
            <div className="form-header">
              <h2>Cadastro de Produto</h2>
              <p>Qual será o produto de qualidade adicionado dessa vez?.</p>
            </div>

            <div className="form-section">
              <h3>Dados do Produto</h3>

              {/* Category selection dropdown */}
              <div className="form-row">
                <CategorySelection value={inputProductData.category} onChangeCategory={handleInputDataChange}/>
              </div>

              {/* Name and Price */}
              <div className="form-row">
                <div className="form-group">
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

                <div className="form-group">
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

              {/* Stock and Sold */}
              <div className="form-row">
                <div className="form-group">
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

                <div className="form-group">
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

              {/* Product Description */}
              <div className="form-row">
                <div className="form-group">
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

              {/* Image URL input */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="imagem">URL do produto</label>
                  <input
                    type="text"
                    className="input_sek"
                    id="imagem"
                    name="image"
                    placeholder="Cole a URL da imagem do produto"
                    value={inputProductData.image}
                    onChange={handleInputImage}
                  />
                </div>
              </div>
            </div>

            {/* Submit button */}
            <div className="btn-container">
              <button type="submit" className="btn" onClick={handleProductCreation}>
                <span>Criar Produto</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;