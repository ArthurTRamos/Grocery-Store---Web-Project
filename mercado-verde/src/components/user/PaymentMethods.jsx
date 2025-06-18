import React, { useState, useEffect } from "react";

import "./PaymentMethods.css";

// Import child components used for displaying card info and adding a new card.
import PaymentCardInfo from "./PaymentCardInfo";
import NewCardForm from "./NewCardForm";
// Import API functions for fetching and updating user data.
import { GetUserById, UpdateUser } from "../../services/Fetchs";

/**
 * A component that manages and displays a user's saved payment methods.
 * It allows users to view, add, and remove credit cards.
 */
function PaymentMethods({ loggedUser }) {
  // State to toggle the visibility of the new card form.
  const [isAddingCard, setIsAddingCard] = useState(false);
  // State to control the alert for duplicate card numbers.
  const [sameNumberError, setSameNumberError] = useState(false);

  // States to manage the logged-in user's data and the fetch status.
  const [loggedUserData, setLoggedUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // For initial data fetch errors.
  const [apiError, setApiError] = useState(false); // For subsequent API update errors.

  // This effect fetches the user's data when the component mounts.
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const data = await GetUserById(loggedUser);
        setLoggedUserData(data || null);
        setError(null); // Clear any previous errors on success.
      } catch (err) {
        setError("Falha ao carregar dados do usuário.");
        console.error(err);
      } finally {
        // This runs regardless of success or failure.
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []); // The empty dependency array ensures this runs only once on mount.

  // Shows the NewCardForm when the user clicks the "add card" button.
  const handleAddCardButtonClick = () => {
    setIsAddingCard(true); // When the button is clicked, show the form
  };

  // Handler for saving a new card submitted from the NewCardForm.
  const handleNewCardSave = async (newCardData) => {
    // Perform initial synchronous checks
    const cardExists = loggedUserData.paymentMethods.some(
      (method) => method.cardNumber === newCardData.cardNumber
    );

    // If the card exists, show an error and do not proceed.
    if (cardExists) {
      setSameNumberError(true);
      return; // If the card already exists, do not proceed
    }

    // Prepare the updated user object with the new card added to the array.
    const updatedUser = {
      ...loggedUserData,
      paymentMethods: [...loggedUserData.paymentMethods, newCardData],
    };

    try {
      // Asynchronously call the API to update the user data on the server.
      await UpdateUser(loggedUser, updatedUser);

      // If the API call is successful, update the local state and hide the form.
      setLoggedUserData(updatedUser);
      setIsAddingCard(false);
    } catch (err) {
      // If the API call fails, set an error state to inform the user.
      setApiError(true);
      console.error(err);
    }
  };

  // Handler for when the user cancels adding a new card.
  const handleNewCardCancel = () => {
    setIsAddingCard(false); // Hide the form and show the button again
  };

  // Handler for removing an existing card.
  const handleCardRemoval = async (cardNumber) => {
    // Prepare the updated user object by filtering out the card to be removed.
    const updatedUser = {
      ...loggedUserData,
      paymentMethods: loggedUserData.paymentMethods.filter(
        (card) => card.cardNumber !== cardNumber
      ),
    };

    // Use a try...catch block to handle the asynchronous API call.
    try {
      // Call the API to persist the change to the server.
      await UpdateUser(loggedUser, updatedUser);

      // If successful, update the local state to reflect the removal.
      setLoggedUserData(updatedUser);
    } catch (err) {
      // If the API call fails, set an error state.
      setApiError(true);
      console.error(err);
    }
  };

  return (
    <div className="payment-methods-container">
      {/* Conditionally render custom alerts for API errors or duplicate cards. */}
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
      {/* Conditionally render loading or error messages during the initial fetch. */}
      {isLoading && <p className="loading-message">Carregando Perfil...</p>}
      {error && <p className="error-message">{error}</p>}
      {/* Only render the main content if the initial fetch was successful. */}
      {!isLoading && !error && (
        <>
          <div className="payment-methods-exhibition-container">
            {/* Map over the user's payment methods and display each one. */}
            {loggedUserData.paymentMethods.map((cardData) => (
              <PaymentCardInfo
                key={cardData.cardNumber} // Use a unique key for each item in the list.
                cardData={cardData}
                removeCard={handleCardRemoval} // Pass the removal handler to the child component.
              />
            ))}
            {isAddingCard ? (
              // If isAddingCard is true, show the NewCardForm
              <NewCardForm
                onSave={handleNewCardSave}
                onCancel={handleNewCardCancel}
              />
            ) : (
              // Otherwise, show the button to add a new card.
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