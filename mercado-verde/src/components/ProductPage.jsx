import React, {useEffect, useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import LabeledEditableContainer from "./utility_elements/LabeledEditableContainer";
import { Navigate, useLocation } from "react-router-dom";

import "./ProductPage.css";
import InputImage from "./utility_elements/input_image";
import CustomAlert from "./utility_elements/CustomAlert";

import {GetProductById, UpdateProduct, GetUserById, DeleteProduct} from "../services/Fetchs.js";

// Product page component that shows product details and allows admin editing
function ProductPage({loggedUserId, setCartData, cartData}) {
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize product state with data passed from navigation
  const [product, setProduct] = useState(location.state?.productData);
  // Controls whether the add to cart button should be disabled
  const [allowBuyProduct, setAllowBuyProduct] = useState(true)
  // Dynamic text for the add to cart button showing current cart quantity
  const [addCartMessage, setAddCartMessage] = useState("Adicionar ao Carrinho")
  // Alert state for invalid number inputs
  const [invalidNumber, setInvalidNumber] = useState(false);
  // Determines if current user is admin (can edit product)
  const [typeAccount, setTypeAccount] = useState(false);

  // Update product data in the database
  const updateProductData = async (updatedProduct) => {
    const data = await UpdateProduct(product["_id"], updatedProduct);
  }

  // Delete product from database and remove from cart
  const deleteProductData = async () => {
    const data = await DeleteProduct(product["_id"]);

    // Remove deleted product from cart if it exists
    const newCartData = cartData.filter((cartProduct) => cartProduct.id !== product["_id"]);
    setCartData(newCartData);
    navigate("/section");
  }

  // Check if current user is admin to determine editing permissions
  const getUserById = async () => {
    if(loggedUserId === "") {
      // No user logged in, set as regular user
      setTypeAccount(false);
    } else {
      const data = await GetUserById(loggedUserId);

      console.log(data);

      // Set account type based on admin status
      if(data["admin"] === false)
        setTypeAccount(false);
      else
        setTypeAccount(true);
    }
  }
  
  // Fetch user data when component mounts
  useEffect(() => {
    getUserById();
  }, []);

  // Monitor product stock and cart to determine if add to cart should be disabled
  useEffect(() => {
    const initialCondition = () => {
      const itemFound = cartData.findIndex((item) => item.id === product.id)
  
      // Disable if product is out of stock or cart amount equals stock
      if((itemFound !== -1 && product.stock === cartData[itemFound].amount) || (product.stock === 0))
        setAllowBuyProduct(true)
      else
        setAllowBuyProduct(false)
    }

    initialCondition()

  }, [product, cartData])

  // Update cart button text to show current quantity in cart
  useEffect(() => {
    const showCartAmount = () => {
      console.log(product["_id"]);
      const itemFound = cartData.findIndex((item) => item.id === product["_id"]);
      // Show quantity in parentheses if item is in cart
      const amountText = itemFound === -1 ? "" : ` (${cartData[itemFound].amount})`;

      setAddCartMessage(`Adicionar ao Carrinho${amountText}`)
    }

    showCartAmount()
  }, [cartData])

  // Handle saving edited product fields (admin only)
  const handleSave = async (field, newValue) => {
    console.log(`Saving ${field}: ${newValue}`);

    // Validate numeric fields (price, stock, sold quantity)
    if(field === "price" || field === "stock" || field === "sold") {
      newValue = parseFloat(newValue);
      
      // Check if value is a valid number
      if(isNaN(newValue)) {
        setInvalidNumber(true);
        return;
      }

      // Check if value is not negative
      if(newValue < 0) {
        setInvalidNumber(true);
        return;
      }
    }

    // Create updated product object with new field value
    const updatedProduct = {
      ...product,
      [field]: newValue,
    };

    console.log(updatedProduct);

    // Update local state and database
    setProduct(updatedProduct);
    await updateProductData(updatedProduct);
  };

  // Handle adding product to cart
  const handleBuyProduct = () => {
    console.log(cartData);
    const itemFound = cartData.findIndex((item) => item.id === product["_id"])
    
    // If product already exists in cart
    if(itemFound !== -1) {
      // Check if we can add more (stock available)
      if(product.stock !== cartData[itemFound].amount) {
        // If adding one more would reach stock limit, disable button
        if(product.stock === cartData[itemFound].amount + 1)
          setAllowBuyProduct(true)
        
        // Increment quantity in cart
        const newCartData = [...cartData];
        newCartData[itemFound] = {
          ...newCartData[itemFound],
          amount: newCartData[itemFound].amount + 1,
        };
        setCartData(newCartData);
      }
      else
        // Already at stock limit, disable button
        setAllowBuyProduct(true)
    }
    // If product not in cart, add it with quantity 1
    else {
      setCartData((prevCartData) => [
        ...prevCartData,
        {
          id: product["_id"],
          amount: 1,
        },
      ]);
    }
  }

  return (
    <div>
      <main className="content-wrap">
        {/* Alert for invalid number input */}
        {invalidNumber  && (
          <CustomAlert
            alertMessage="Por favor, insira um número válido."
            onConfirm={() => setInvalidNumber(false)}
            onConfirmMessage={"OK"}
          />
        )}
        
        <div className="product">
          {/* Product image section */}
          <div className="product_image">
            <div>
              {/* Show editable product name for admin, read-only for regular users */}
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
            
            {/* Product image display */}
            <div>
              <img src={product.image} alt="Imagem do Produto"></img>
            </div>

            {/* Image upload component for admin users */}
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
          
          {/* Product description and details section */}
          <div className="product_description">
            {/* Duplicate product name section (might be redundant) */}
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

            {/* Product description - editable for admin */}
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
            
            {/* Product price - editable for admin */}
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

            {/* Quantity sold and stock information */}
            <div className="quantity-sold">
              <div>
                {/* Quantity sold - editable for admin */}
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
                {/* Stock quantity - editable for admin */}
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
            
            {/* Add to cart button with dynamic styling and text */}
            <button 
              type="button" 
              className={(product.stock > 0 && !allowBuyProduct) ? "add-to-cart-allow" : "add-to-cart-deny"}
              onClick={handleBuyProduct}
              disabled={allowBuyProduct}
              >
              {addCartMessage}
            </button>
            
            {/* Delete product button - only visible to admin users */}
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