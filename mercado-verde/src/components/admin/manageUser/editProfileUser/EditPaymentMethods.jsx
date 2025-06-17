import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./EditPaymentMethods.css";
import EditPaymentCardInfo from "./EditPaymentCardInfo";
import EditNewCardForm from "./EditNewCardForm";

import { GetUserById, UpdateUser } from "../../../../services/Fetchs";

function EditPaymentMethods() {
  // State to toggle the new card form visibility
  const [isAddingCard, setIsAddingCard] = useState(false);

  // State to store user data being edited
  const [userEdit, setUserEdit] = useState("");

  // Get user ID from URL parameters
  const { id } = useParams();

  // Fetch user data on component mount or when id changes
  useEffect(() => {
    const fetchUserInfos = async () => {
      try {
        console.log(id);
        const userInfos = await GetUserById(id);
        setUserEdit(userInfos);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserInfos();
  }, [id]);

  // Handler to show the new card form
  const handleAddCardButtonClick = () => {
    setIsAddingCard(true);
  };

  // Handler to save a new card to user's payment methods
  const handleNewCardSave = async (newCardData) => {
    if (!userEdit) return;

    // Update user paymentMethods array with the new card
    const updatedUser = {
      ...userEdit,
      paymentMethods: [...(userEdit.paymentMethods || []), newCardData],
    };

    setUserEdit(updatedUser);
    setIsAddingCard(false);

    console.log("usuario atualizado em new cardsave");
    console.log(updatedUser);

    // Update in the Database
    try {
      await UpdateUser(id, updatedUser);
      console.log("atualizou");
    } catch (error) {
      console.log(error);
    }
  };

  // Handler to cancel adding a new card
  const handleNewCardCancel = () => {
    setIsAddingCard(false);
  };

  // Handler to remove a card from user's payment methods
  const handleCardRemoval = async (cardNumber) => {
    if (!userEdit) return;

    console.log(cardNumber);

    // Filter out the removed card by cardNumber
    const updatedUser = {
      ...userEdit,
      paymentMethods: (userEdit.paymentMethods || []).filter(
        (card) => card.cardNumber !== cardNumber
      ),
    };

    setUserEdit(updatedUser);

    console.log("Usuário atualizado na remoção de card");
    console.log(updatedUser);

    // Update in the Database
    try {
      await UpdateUser(id, updatedUser);
      console.log("atualizou");
    } catch (error) {
      console.log(error);
    }
  };

  // Show loading message while fetching user data
  if (!userEdit) {
    return <div>Carregando...</div>;
  }

  // Main render: show user cards and either new card form or add button
  return (
    <div className="payment-methods-container">
      <div className="payment-methods-header">
        <h1>Cartões de {userEdit.name}</h1>
      </div>
      <div className="payment-methods-exhibition-container">
        {userEdit.paymentMethods?.map((cardData) => (
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
