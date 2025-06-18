import React from "react";

import "./PaymentCardInfo.css"; // Imports the stylesheet for this component.

import { FaRegTrashAlt } from "react-icons/fa"; // Imports the trash can icon for the delete button.

/**
 * A presentational component that displays the details of a single saved payment card
 * and provides a button to remove it.
 */
function PaymentCardInfo({ cardData, removeCard }) {
  return (
    <div className="payment-card-info-container">
      <div className="payment-card-info-content">
        {/* This section displays the more prominent card details. */}
        <div className="payment-card-info-big">
          <div className="payment-card-info-group">
            <h3>Nome do Titular</h3>
            {/* Renders the cardholder's name from the cardData prop. */}
            <p>{cardData.cardHolderName}</p>
          </div>
          <div className="payment-card-info-group">
            <h3>Número do Cartão</h3>
            {/* Renders the card number from the cardData prop. */}
            <p>{cardData.cardNumber}</p>
          </div>
        </div>
        {/* This section displays the less prominent card details. */}
        <div className="payment-card-info-small">
          <div className="payment-card-info-group">
            <h3>Validade</h3>
            {/* Renders the expiration date from the cardData prop. */}
            <p>{cardData.expirationDate}</p>
          </div>
          <div className="payment-card-info-group">
            <h3>CVV</h3>
            {/* Renders the CVV from the cardData prop. */}
            <p>{cardData.cvv}</p>
          </div>
        </div>
        <div className="payment-card-info-delete">
          {/* The delete button. */}
          <button onClick={() => removeCard(cardData.cardNumber)}>
            {/* The onClick handler calls the removeCard function passed from the parent,
                passing the card number as an argument to identify which card to delete. */}
            <FaRegTrashAlt />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentCardInfo;