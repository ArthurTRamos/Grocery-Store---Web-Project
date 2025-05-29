import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import "./EditPaymentMethods.css";

import PaymentCardInfo from "./EditPaymentCardInfo";
import NewCardForm from "./EditNewCardForm"; // Import your new form component

function EditPaymentMethods({ loggedUser, setLoggedUser }) {
  const [isAddingCard, setIsAddingCard] = useState(false);

  const location = useLocation();
  const [userToBeEdited, setUserToBeEdited] = useState(
    location.state?.userToBeEdited
  );

  const handleAddCardButtonClick = () => {
    setIsAddingCard(true); // When the button is clicked, show the form
  };

  // Handler for when the NewCardForm is saved
  const handleNewCardSave = (newCardData) => {
    setLoggedUser((prevData) => ({
      ...prevData,
      paymentMethods: [...prevData.paymentMethods, newCardData],
    }));
    setIsAddingCard(false); // Hide the form and show the button again
  };

  // Handler for when the NewCardForm is cancelled
  const handleNewCardCancel = () => {
    setIsAddingCard(false); // Hide the form and show the button again
  };

  // Handler for removing a card
  const handleCardRemoval = (cardNumber) => {
    setLoggedUser((prevData) => ({
      ...prevData,
      paymentMethods: prevData.paymentMethods.filter(
        (card) => card.cardNumber !== cardNumber
      ),
    }));
  };

  return (
    <div className="payment-methods-container">
      <div className="payment-methods-header">
        <h1>Cartões de {userToBeEdited.name}</h1>
      </div>
      <div className="payment-methods-exhibition-container">
        {userToBeEdited.paymentMethods.map((cardData) => (
          <PaymentCardInfo
            key={cardData.cardNumber}
            cardData={cardData}
            removeCard={handleCardRemoval}
          />
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

export default EditPaymentMethods;
