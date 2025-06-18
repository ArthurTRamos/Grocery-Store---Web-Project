import React from "react";

import "./CartItem.css";

// Import the trash can icon from the react-icons library.
import { FaRegTrashAlt } from "react-icons/fa";

/**
 * A component that represents a single item within the shopping cart.
 * It displays the item's details and provides controls to adjust its quantity or remove it.
 */
function CartItem({ cartItemData, changeAmount, removeItem }) {
  // Handles clicks on the '+' (add) and '-' (subtract) buttons.
  const handleSubAddClick = (e, type) => {
    e.preventDefault(); // Prevent any default form submission behavior.
    if (type === "add") {
      // Call the parent's changeAmount function to increase the quantity.
      changeAmount(cartItemData.id, cartItemData.amount + 1);
    } else if (type === "sub") {
      // Call the parent's changeAmount function to decrease the quantity.
      changeAmount(cartItemData.id, cartItemData.amount - 1);
    }
  };

  // Handles clicks on the remove item button.
  const handleRemoveClick = (e) => {
    e.preventDefault();
    // Call the parent's removeItem function to remove the item from the cart.
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
          {/*-- CONDITIONAL RENDERING FOR SUBTRACT/REMOVE BUTTON --*/}
          {cartItemData.amount > 0 ? (
            // If quantity is greater than 0, show the subtract button.
            <button onClick={(e) => handleSubAddClick(e, "sub")}>-</button>
          ) : (
            // If quantity is 0, show the remove (trash can) button instead.
            <button onClick={handleRemoveClick}>
              <FaRegTrashAlt />
            </button>
          )}
          <p>Quantidade: {cartItemData.amount}</p>
          {/*-- CONDITIONAL RENDERING FOR ADD BUTTON --*/}
          {cartItemData.amount < cartItemData.stock ? (
            // If the amount in cart is less than the available stock, show an active add button.
            <button
              onClick={(e) => handleSubAddClick(e, "add")}
              className="add-button"
            >
              +
            </button>
          ) : (
            // If the amount equals the stock, show a disabled-style gray button.
            <button className="add-button-gray">+</button>
          )}
        </div>
      </div>
      <div className="cart-item-details-right">
        {/* Calculate and display the total price for this line item (price * quantity). */}
        <p>R$ {(cartItemData.price * cartItemData.amount).toFixed(2)}</p>
        <p>Em estoque: {cartItemData.stock}</p>
      </div>
    </div>
  );
}

export default CartItem;