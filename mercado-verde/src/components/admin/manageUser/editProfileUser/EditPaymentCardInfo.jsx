import React from "react";

import "./EditPaymentCardInfo.css";

import { FaRegTrashAlt } from "react-icons/fa";

function EditPaymentCardInfo({ cardData, removeCard }) {
  return (
    /* Main container for the payment card info */
    <div className="payment-card-info-container">
      <div className="payment-card-info-content">
        {/* Large info section: cardholder name and card number */}
        <div className="payment-card-info-big">
          <div className="payment-card-info-group">
            <h3>Nome do Titular</h3>
            <p>{cardData.cardHolderName}</p>
          </div>
          <div className="payment-card-info-group">
            <h3>Número do Cartão</h3>
            <p>{cardData.cardNumber}</p>
          </div>
        </div>
        {/* Smaller info section: expiration date and CVV */}
        <div className="payment-card-info-small">
          <div className="payment-card-info-group">
            <h3>Validade</h3>
            <p>{cardData.expirationDate}</p>
          </div>
          <div className="payment-card-info-group">
            <h3>CVV</h3>
            <p>{cardData.cvv}</p>
          </div>
        </div>
        {/* Delete button section */}
        <div className="payment-card-info-delete">
          <button onClick={() => removeCard(cardData.cardNumber)}>
            <FaRegTrashAlt />
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditPaymentCardInfo;
