import React from "react";
import { useNavigate } from "react-router-dom";

import "./CardSelection.css";
function CardSelection({ paymentMethods, onCardSelect, cardError }) {
  const navigate = useNavigate();

  const handleAddCardClick = () => {
    navigate("/user/payment-methods");
  };

  return (
    <div className="card-selection-container">
      <h3>Selecione o método de pagamento</h3>
      <div className="card-selection-controls">
        <select
          className="card-dropdown"
          onChange={(e) => onCardSelect(e.target.value)}
          required
        >
          <option value="">Selecione um cartão</option>
          {paymentMethods
            ? paymentMethods.map((cardData) => (
                <option key={cardData.cardNumber} value={cardData.cardNumber}>
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

      {cardError && <p className="card-error">{cardError}</p>}
    </div>
  );
}

export default CardSelection;