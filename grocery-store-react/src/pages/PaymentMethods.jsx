import React, { useState } from "react";

import "./PaymentMethods.css";

import PaymentCardInfo from "./PaymentCardInfo";
import NewCardForm from "./NewCardForm"; // Import your new form component

function PaymentMethods({ userData, setUserData }) {
  const [isAddingCard, setIsAddingCard] = useState(false);

  const handleAddCardButtonClick = () => {
    setIsAddingCard(true); // When the button is clicked, show the form
  };

  // Handler for when the NewCardForm is saved
  const handleNewCardSave = (newCardData) => {
    setUserData((prevData) => ({
      ...prevData,
      paymentMethods: [...prevData.paymentMethods, newCardData],
    }));
    setIsAddingCard(false); // Hide the form and show the button again
  };

  // Handler for when the NewCardForm is cancelled
  const handleNewCardCancel = () => {
    setIsAddingCard(false); // Hide the form and show the button again
  };

  return (
    <div className="payment-methods-container">
      <div className="payment-methods-header">
        <h1>Meus Cartões</h1>
      </div>
      <div className="payment-methods-exhibition-container">
        {userData.paymentMethods.map((cardData, index) => (
          <PaymentCardInfo key={cardData.id} cardData={cardData} />
        ))}
        {isAddingCard ? (
          // If isAddingCard is true, show the NewCardForm
          <NewCardForm
            onSave={handleNewCardSave}
            onCancel={handleNewCardCancel}
          />
        ) : (
          <button
            onClick={handleAddCardButtonClick}
            className="add-card-button"
            title="Adicionar novo cartão"
          >
            +
          </button>
        )}
      </div>
    </div>
  );
}

export default PaymentMethods;
