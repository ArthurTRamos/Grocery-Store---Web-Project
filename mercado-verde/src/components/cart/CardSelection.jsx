import React from "react";
import { useNavigate } from "react-router-dom";

import "./CardSelection.css";

/**
 * A component that provides a dropdown menu for selecting a saved payment card.
 * It also includes a button to navigate to the page for adding a new card.
 */
function CardSelection({ paymentMethods, onCardSelect, cardError }) {
  // Hook from react-router-dom to get the navigation function.
  const navigate = useNavigate();

  // This handler is called when the "Add New" button is clicked.
  const handleAddCardClick = () => {
    // Programmatically navigates the user to the page where they can manage their payment methods.
    navigate("/user/payment-methods");
  };

  return (
    <div className="card-selection-container">
      <h3>Selecione o método de pagamento</h3>
      <div className="card-selection-controls">
        {/* The dropdown menu for card selection. */}
        <select
          className="card-dropdown"
          // When the user selects an option, the onCardSelect function (from props) is called with the selected card's number.
          onChange={(e) => onCardSelect(e.target.value)}
          required
        >
          {/* Default, non-selectable option. */}
          <option value="">Selecione um cartão</option>
          {/* Check if paymentMethods exist before attempting to map over them. */}
          {paymentMethods
            ? // Map over the user's saved cards to create an <option> for each one.
              paymentMethods.map((cardData) => (
                <option key={cardData.cardNumber} value={cardData.cardNumber}>
                  {/* For display, show a masked version of the card number for security. */}
                  **** **** **** {cardData.cardNumber.slice(-4)}
                </option>
              ))
            : null}
        </select>
        <button
          type="button"
          className="add-card-btn"
          onClick={handleAddCardClick}
        >
          Adicionar Novo
        </button>
      </div>

      {/* Conditionally render an error message if the cardError prop is provided. */}
      {cardError && <p className="card-error">{cardError}</p>}
    </div>
  );
}

export default CardSelection;