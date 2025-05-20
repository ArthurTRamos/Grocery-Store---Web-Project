import React from "react";

import "./CardSelection.css";

function CardSelection({ paymentMethods, onCardSelect, cardError }) {
  return (
    <div className="card-selection-container">
      <h3>Selecione o método de pagamento</h3>
      <select
        className="card-dropdown"
        onChange={(e) => onCardSelect(e.target.value)}
        required
      >
        <option value="">Selecione um cartão</option>
        {paymentMethods.map((cardData) => (
          <option key={cardData.id} value={cardData.cardNumber}>
            **** **** **** {cardData.cardNumber.slice(-4)}
          </option>
        ))}
      </select>
      {cardError && <p className="card-error">{cardError}</p>}
    </div>
  );
}

export default CardSelection;
