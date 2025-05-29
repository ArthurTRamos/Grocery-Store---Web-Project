import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./EditPaymentMethods.css";
import EditPaymentCardInfo from "./EditPaymentCardInfo";
import EditNewCardForm from "./EditNewCardForm";

function EditPaymentMethods({ loggedUser, setLoggedUser, setUsers, userToBeEdited, setUserToBeEdited }) {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const location = useLocation();

 
  useEffect(() => {
    const randomUser = location.state?.userToBeEdited;
    if (randomUser && (!userToBeEdited || userToBeEdited.id !== randomUser.id)) {
      setUserToBeEdited(randomUser);
    }
  }, [location.state?.userToBeEdited, setUserToBeEdited, userToBeEdited]);

  const handleAddCardButtonClick = () => {
    setIsAddingCard(true);
  };


  const handleNewCardSave = (newCardData) => {
    if (!userToBeEdited) return;

    const updatedUser = {
      ...userToBeEdited,
      paymentMethods: [...(userToBeEdited.paymentMethods || []), newCardData],
    };

    setUserToBeEdited(updatedUser);
    setIsAddingCard(false);
    
    console.log("usuario atualizado em new cardsave");
    console.log(updatedUser);


    setUsers((prevUsers) => {
      return prevUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
    });
  };

  
  const handleNewCardCancel = () => {
    setIsAddingCard(false);
  };


  const handleCardRemoval = (cardNumber) => {
    if (!userToBeEdited) return;

    console.log(cardNumber);
    
    const updatedUser = {
      ...userToBeEdited,
      paymentMethods: (userToBeEdited.paymentMethods || []).filter(
        (card) => card.cardNumber !== cardNumber
      ),
    };

    setUserToBeEdited(updatedUser);
    
    console.log("Usuário atualizado na remoção de card");
    console.log(updatedUser);
    console.log("UserToBeEdited");
    console.log(userToBeEdited);

    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        return user.id === updatedUser.id ? updatedUser : user;
      });
    });
  };


  if (!userToBeEdited) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="payment-methods-container">
      <div className="payment-methods-header">
        <h1>Cartões de {userToBeEdited.name}</h1>
      </div>
      <div className="payment-methods-exhibition-container">
        {userToBeEdited.paymentMethods?.map((cardData) => (
          <EditPaymentCardInfo
            key={cardData.cardNumber}
            cardData={cardData}
            removeCard={handleCardRemoval}
          />
        ))}
        {isAddingCard ? (
          <EditNewCardForm
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