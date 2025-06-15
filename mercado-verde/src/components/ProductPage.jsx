import React, {useEffect, useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import LabeledEditableContainer from "./utility_elements/LabeledEditableContainer";
import { Navigate, useLocation } from "react-router-dom";

import "./ProductPage.css";
import InputImage from "./utility_elements/input_image";
import CustomAlert from "./utility_elements/CustomAlert";

import {GetProductById, UpdateProduct, GetUserById, DeleteProduct} from "../services/Fetchs.js";

function ProductPage({loggedUserId, setCartData, cartData}) {
  const location = useLocation();

  const [product, setProduct] = useState([]);
  const [productID, setProductID] = useState(location.state?.ID);
  const [allowBuyProduct, setAllowBuyProduct] = useState(true)
  const [addCartMessage, setAddCartMessage] = useState("Adicionar ao Carrinho")
  const [invalidNumber, setInvalidNumber] = useState(false);
  const [typeAccount, setTypeAccount] = useState(false);

  const fetchProdutcData = async () => {
    const data = await GetProductById(productID);
    setProduct(data);
  }

  const updateProductData = async () => {
    const data = UpdateProduct(productID, product);
    setProduct(data);
  }

  const deleteProductData = async () => {
    const data = await DeleteProduct(productID);

    const newCartData = cartData.filter((cartProduct) => cartProduct.id !== productID);
    setCartData(newCartData);
  }

  const getUserById = async () => {
    const data = GetUserById(loggedUserId);

    if(data["admin"] === false)
      setTypeAccount(false);
    else
      setTypeAccount(true);
  }

  useEffect(() => {
    fetchProdutcData();
    getUserById();
  }, []);

  useEffect(() => {
    const initialCondition = () => {
      const itemFound = cartData.findIndex((item) => item.id === product.id)
  
      if((itemFound !== -1 && product.stock === cartData[itemFound].amount) || (product.stock === 0))
        setAllowBuyProduct(true)
      else
        setAllowBuyProduct(false)
    }

    initialCondition()

  }, [product, cartData])

  useEffect(() => {
    const showCartAmount = () => {
      const itemFound = cartData.findIndex((item) => item.id === product.id);
      const amountText = itemFound === -1 ? "" : ` (${cartData[itemFound].amount})`;

      setAddCartMessage(`Adicionar ao Carrinho${amountText}`)
    }

    showCartAmount()
  }, [cartData, productID])

  const handleSave = (field, newValue) => {
    console.log(`Saving ${field}: ${newValue}`);

    if(field === "price" || field === "stock" || field === "sold") {
      newValue = parseFloat(newValue);
      if(isNaN(newValue)) {
        setInvalidNumber(true);
        return;
      }

      if(newValue < 0) {
        setInvalidNumber(true);
        return;
      }
    }

    // Criar o produto atualizado
    const updatedProduct = {
      ...product,
      [field]: newValue,
    };

    setProduct(updateProductData);
    updateProductData();
  };

  const handleBuyProduct = () => {
    console.log(cartData);
    const itemFound = cartData.findIndex((item) => item.id === productID)
    
    if(itemFound !== -1) {
      if(product.stock !== cartData[itemFound].amount) {
        if(product.stock === cartData[itemFound].amount + 1)
          setAllowBuyProduct(true)
        const newCartData = [...cartData];
        newCartData[itemFound] = {
          ...newCartData[itemFound],
          amount: newCartData[itemFound].amount + 1,
        };
        setCartData(newCartData);
      }
      else
        setAllowBuyProduct(true)
    }
    
    else {
      setCartData((prevCartData) => [
        ...prevCartData,
        {
          id: productID,
          amount: 1,
        },
      ]);
    }
  }

  return (
    <div>
      <main className="content-wrap">
        {invalidNumber  && (
          <CustomAlert
            alertMessage="Por favor, insira um número válido."
            onConfirm={() => setInvalidNumber(false)}
            onConfirmMessage={"OK"}
          />
        )}
        <div className="product">
          <div className="product_image">
            <div>
              {typeAccount ? (
                <LabeledEditableContainer
                  displayName={"Nome do Produto"}
                  field={"name"}
                  handleSave={handleSave}
                  initialValue={product.name}
                />
              ) : (
                <h2>{product.name}</h2>
              )}
            </div>
            <div>
              <img src={product.image} alt="Imagem do Produto"></img>
            </div>

            <div>
              {typeAccount ? (
                <InputImage
                  handleSave={handleSave}
                  field={"image"}
                  initialValue={product.image}
                />
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <br></br>
          <div className="product_description">
            {typeAccount ? (
                <LabeledEditableContainer
                  displayName={"Nome do Produto"}
                  field={"name"}
                  handleSave={handleSave}
                  initialValue={product.name}
                />
              ) : (
                <h2>{product.name}</h2>
              )}

            <h3>Descrição do produto</h3>

            <div>
              {typeAccount ? (
                <LabeledEditableContainer
                displayName={"Descrição do Produto"}
                field={"description"}
                handleSave={handleSave}
                initialValue={product.description}
                />
              ) : (
                <p>{product.description}</p>
              )}
            </div>
            
            <div>
              {typeAccount ? (
                <LabeledEditableContainer
                  displayName={"Preço do Produto"}
                  field={"price"}
                  handleSave={handleSave}
                  initialValue={product.price.toFixed(2)}
                />
              ) : (
                <h3>Preço: R${product.price.toFixed(2)}</h3>
              )}
            </div>

            <div className="quantity-sold">


              <div>

                {typeAccount ? (
                  <LabeledEditableContainer
                    displayName={"Quantidade Vendida"}
                    field={"sold"}
                    handleSave={handleSave}
                    initialValue={product.sold}
                  />
                ) : (
                  <h3>Quantidade Vendida: {product.sold}</h3>
                )}

              </div>


              <div>
                {typeAccount ? (
                  <LabeledEditableContainer
                    displayName={"Quantidade em Estoque"}
                    field={"stock"}
                    handleSave={handleSave}
                    initialValue={product.stock}
                  />
                ) : (
                  <h3>Quantidade em Estoque: {product.stock}</h3>
                )}
              </div>


            </div>
            
            <button 
              type="button" 
              className={(product.stock > 0 && !allowBuyProduct) ? "add-to-cart-allow" : "add-to-cart-deny"}
              onClick={handleBuyProduct}
              disabled={allowBuyProduct}
              >
              {addCartMessage}
            </button>
            
            {typeAccount ? (
              <div>
                <Link to="/section" state={{sectionData: "todos"}} className="product-section">
                <button
                  type="button"
                  className="delete-product"
                  onClick={deleteProductData}
                  >
                    Remover Item
                </button>
                </Link>
              </div>
            ) : (
              <span></span>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductPage;
