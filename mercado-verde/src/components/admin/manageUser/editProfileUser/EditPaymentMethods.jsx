import React, { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import "./EditPaymentMethods.css";
import EditPaymentCardInfo from "./EditPaymentCardInfo";
import EditNewCardForm from "./EditNewCardForm";

import { GetUserById, UpdateUser } from "../../../../services/Fetchs";

function EditPaymentMethods() {
  const [isAddingCard, setIsAddingCard] = useState(false);

  const[userEdit, setUserEdit] = useState("");

  const { id } = useParams();

  // useEffect(() => {
  //   const randomUser = location.state?.userToBeEdited;
  //   if (randomUser && (!userToBeEdited || userToBeEdited.id !== randomUser.id)) {
  //     setUserToBeEdited(randomUser);
  //   }
  // }, [location.state?.userToBeEdited, setUserToBeEdited, userToBeEdited]);



  useEffect(() => {

    // if (!id) {
    //   console.warn("ID não encontrado. Redirecionando...");
    //   // navigate("/usuarios"); // ou exibir mensagem
    //   return;
    // }

    const fetchUserInfos = async() => {
      try {
        console.log(id);

        const userInfos = await GetUserById(id);
        setUserEdit(userInfos);

      }catch(error){
        console.log(error);
      }
    }

    fetchUserInfos();

    // const userFromState = location.state?.userToBeEdited;
    
  }, [id]);





  const handleAddCardButtonClick = () => {
    setIsAddingCard(true);
  };


  const handleNewCardSave = async (newCardData) => {
    if (!userEdit) return;

    const updatedUser = {
      ...userEdit,
      paymentMethods: [...(userEdit.paymentMethods || []), newCardData],
    };

    setUserEdit(updatedUser);
    setIsAddingCard(false);
    
    console.log("usuario atualizado em new cardsave");
    console.log(updatedUser);


    try{
      await UpdateUser(id, updatedUser);
      console.log("atualizou");
    }catch(error) {
      console.log(error);
    }
  };

  
  const handleNewCardCancel = () => {
    setIsAddingCard(false);
  };


  const handleCardRemoval = async (cardNumber) => {
    if (!userEdit) return;

    console.log(cardNumber);
    
    const updatedUser = {
      ...userEdit,
      paymentMethods: (userEdit.paymentMethods || []).filter(
        (card) => card.cardNumber !== cardNumber
      ),
    };

    setUserEdit(updatedUser);
    
    console.log("Usuário atualizado na remoção de card");
    console.log(updatedUser);

    try{
      await UpdateUser(id, updatedUser);
      console.log("atualizou");
    }catch(error) {
      console.log(error);
    }



  };


  if (!userEdit) {
    return <div>Carregando...</div>;
  }

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