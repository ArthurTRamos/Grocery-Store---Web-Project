import React, { useState, useEffect } from "react";

import "./PaymentMethods.css";

import PaymentCardInfo from "./PaymentCardInfo";
import NewCardForm from "./NewCardForm";
import { GetUserById, UpdateUser } from "../../services/Fetchs";

function PaymentMethods({ loggedUser }) {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [sameNumberError, setSameNumberError] = useState(false);

  //States to manage the logged user data
  const [loggedUserData, setLoggedUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const data = await GetUserById(loggedUser);
        setLoggedUserData(data || null);
        setError(null);
      } catch (err) {
        setError("Falha ao carregar dados do usuário.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleAddCardButtonClick = () => {
    setIsAddingCard(true); // When the button is clicked, show the form
  };

  // Handler for when the NewCardForm is saved
  const handleNewCardSave = async (newCardData) => {
    // Perform initial synchronous checks
    const cardExists = loggedUserData.paymentMethods.some(
      (method) => method.cardNumber === newCardData.cardNumber
    );

    if (cardExists) {
      setSameNumberError(true);
      return; // If the card already exists, do not proceed
    }

    // Prepare the new user object
    const updatedUser = {
      ...loggedUserData,
      paymentMethods: [...loggedUserData.paymentMethods, newCardData],
    };

    try {
      // Await the API call to update the user on the server
      await UpdateUser(loggedUser, updatedUser);

      // If successful, update the local state with the new user data
      setLoggedUserData(updatedUser);
      setIsAddingCard(false);
    } catch (err) {
      // If the API call fails, set an error state
      setApiError(true);
      console.error(err);
    }
  };

  // Handler for when the NewCardForm is cancelled
  const handleNewCardCancel = () => {
    setIsAddingCard(false); // Hide the form and show the button again
  };

  // Handler for removing a card
  const handleCardRemoval = async (cardNumber) => {
    // Prepare the new state object by filtering out the card to be removed.
    const updatedUser = {
      ...loggedUserData,
      paymentMethods: loggedUserData.paymentMethods.filter(
        (card) => card.cardNumber !== cardNumber
      ),
    };

    // Use a try...catch block to handle the asynchronous API call.
    try {
      // Await the API call to update the user on the server.
      await UpdateUser(loggedUser, updatedUser);

      // If the API call is successful, then update the local state.
      setLoggedUserData(updatedUser);
    } catch (err) {
      // If the API call fails, handle the error and do not update the local state.
      setApiError(true);
      console.error(err);
    }
  };

  return (
    <div className="payment-methods-container">
      {apiError && (
        <CustomAlert
          messageHeader="Erro de Comunicação"
          alertMessage="Ocorreu um erro na comunicação com o servidor. Tente novamente mais tarde."
          onConfirm={() => setApiError(false)}
          onConfirmMessage={"Ok"}
          error={true}
        />
      )}
      {sameNumberError && (
        <CustomAlert
          messageHeader="Erro ao Cadastrar Cartão"
          alertMessage="Já existe um cartão com esse número cadastrado."
          onConfirm={() => setSameNumberError(false)}
          onConfirmMessage={"Ok"}
          error={true}
        />
      )}
      <div className="payment-methods-header">
        <h1>Meus Cartões</h1>
      </div>
      {isLoading && <p className="loading-message">Carregando Perfil...</p>}
      {error && <p className="error-message">{error}</p>}
      {!isLoading && !error && (
        <>
          <div className="payment-methods-exhibition-container">
            {loggedUserData.paymentMethods.map((cardData) => (
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
        </>
      )}
    </div>
  );
}

export default PaymentMethods;
