import React from "react";
import { useNavigate } from "react-router-dom";

import "./CardSelection.css";
function CardSelection({ paymentMethods, onCardSelect, cardError }) {
  console.log(paymentMethods.length);
  const navigate = useNavigate();

  return (
    <div className="card-selection-container">
      {paymentMethods.length > 0 ? <> <h3>Selecione o método de pagamento</h3>
      <select
        className="card-dropdown"
        onChange={(e) => onCardSelect(e.target.value)}
        required
      >
        <option value="">Selecione um cartão</option>
        {paymentMethods
          ? paymentMethods.map((cardData) => (
              <option key={cardData.id} value={cardData.cardNumber}>
                **** **** **** {cardData.cardNumber.slice(-4)}
              </option>
            ))
          : null}
      </select> </> : <button onClick={() => {navigate("/user/payment-methods")}}>Adicionar Método de Pagamento</button>}
      {cardError && <p className="card-error">{cardError}</p>}
    </div>
  );
}

export default CardSelection;
