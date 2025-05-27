import React, {useEffect, useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import LabeledEditableContainer from "./utility_elements/LabeledEditableContainer";
import { Navigate, useLocation } from "react-router-dom";

import "./ProductPage.css";
import InputImage from "./utility_elements/input_image";

function ProductPage({loggedUser, productsData, setProductData, setCartData, cartData}) {
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.productData);
  const [allowBuyProduct, setAllowBuyProduct] = useState(true)

  const navigate = useNavigate();

  let typeAccount;
  if(loggedUser === undefined) {
    typeAccount = false;
  } else {
    typeAccount = loggedUser.admin;
  }

  useEffect(() => {
    const initialCondition = () => {
      const itemFound = cartData.findIndex((item) => item.id === product.id)
  
      if((itemFound !== -1 && product.stock === cartData[itemFound].amount) || (product.stock === 0))
        setAllowBuyProduct(true)
      else
        setAllowBuyProduct(false)
    }

    initialCondition()

  }, [], [product])

  const handleSave = (field, newValue) => {
    console.log(`Saving ${field}: ${newValue}`);

    if(field === "price" || field === "stock") {
      newValue = parseFloat(newValue);
      if (isNaN(newValue)) {
        alert("Por favor, insira um número válido.");
        return;
      }
    }

    // Criar o produto atualizado
    const updatedProduct = {
      ...product,
      [field]: newValue,
    };

    const updatedProductsData = productsData.map((prod) => {
      if (prod.id === product.id) {
        return updatedProduct;
      } else {
        return prod;
      }
    });

    console.log(updatedProductsData)

    setProduct(updatedProduct);
    setProductData(updatedProductsData);
  };

  const handleBuyProduct = () => {
    const itemFound = cartData.findIndex((item) => item.id === product.id)
    
    if(itemFound !== -1) {
      if(product.stock !== cartData[itemFound].amount) {
        if(product.stock === cartData[itemFound].amount + 1)
          setAllowBuyProduct(true)
        cartData[itemFound].amount++
        setCartData(cartData)
      }
      else
        setAllowBuyProduct(true)

      console.log(allowBuyProduct)
      console.log(product.stock)
    }
    
    else {
      setCartData((prevCartData) => [
        ...prevCartData,
        {
          id: product.id,
          amount: 1,
        },
      ]);
    }
  }

  const handleDeleteProduct = () => {
    console.log(productsData)

    const newCartData = cartData.filter((cartProduct) => cartProduct.id !== product.id)
    const newProducts = productsData.filter((productData) => productData.id !== product.id)

    console.log(newProducts)

    setProductData(newProducts)
    setCartData(newCartData)
  }
  
  return (
    <div>
      <main className="content-wrap">
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
                <h3>Quantidade Vendida: {product.sold}</h3>
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
              Adicionar ao Carrinho
            </button>
            
            {typeAccount ? (
              <div>
                <Link to="/section" state={{sectionData: "todos"}} className="product-section">
                <button
                  type="button"
                  className="delete-product"
                  onClick={handleDeleteProduct}
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
