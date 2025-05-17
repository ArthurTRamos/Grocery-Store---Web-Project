import React from "react";

import "./PaymentCardInfo.css";

function PaymentCardInfo({ cardData }) {
  return (
    <div className="payment-card-info-container">
      <div className="payment-card-info-content">
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
        <div className="payment-card-info-small">
          <div className="payment-card-info-group">
            <h3>Data de Validade</h3>
            <p>{cardData.expirationDate}</p>
          </div>
          <div className="payment-card-info-group">
            <h3>CVV</h3>
            <p>{cardData.cvv}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentCardInfo;
