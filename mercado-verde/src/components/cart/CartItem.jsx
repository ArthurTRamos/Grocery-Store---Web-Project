import React from "react";

import "./CartItem.css";

import { FaRegTrashAlt } from "react-icons/fa";

function CartItem({ cartItemData, changeAmount, removeItem }) {
  const handleSubAddClick = (e, type) => {
    e.preventDefault();
    if (type === "add") {
      changeAmount(cartItemData.id, cartItemData.amount + 1);
    } else if (type === "sub") {
      changeAmount(cartItemData.id, cartItemData.amount - 1);
    }
  };

  const handleRemoveClick = (e) => {
    e.preventDefault();
    removeItem(cartItemData.id);
  };

  return (
    <div className="cart-item-container">
      <div className="cart-item-image">
        <img src={cartItemData.image} alt="Product" />
      </div>
      <div className="cart-item-details-left">
        <h2>{cartItemData.name}</h2>
        <div className="cart-item-lower-details">
          {cartItemData.amount > 0 ? (
            <button onClick={(e) => handleSubAddClick(e, "sub")}>-</button>
          ) : (
            <button onClick={handleRemoveClick}>
              <FaRegTrashAlt />
            </button>
          )}
          <p>Quantidade: {cartItemData.amount}</p>
          {cartItemData.amount < cartItemData.stock ? (
            <button
              onClick={(e) => handleSubAddClick(e, "add")}
              className="add-button"
            >
              +
            </button>
          ) : (
            <button className="add-button-gray">+</button>
          )}
        </div>
      </div>
      <div className="cart-item-details-right">
        <p>R$ {(cartItemData.price * cartItemData.amount).toFixed(2)}</p>
        <p>Em estoque: {cartItemData.stock}</p>
      </div>
    </div>
  );
}

export default CartItem;
