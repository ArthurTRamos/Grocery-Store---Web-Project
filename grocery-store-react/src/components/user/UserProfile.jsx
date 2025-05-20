import React from "react";

import LabeledEditableContainer from "../utility_elements/LabeledEditableContainer";
import honeyImg from "../../assets/mel.jpg";

import "./UserProfile.css";

function UserProfile({ loggedUser, setLoggedUser }) {
  const handleSave = (field, newValue) => {
    console.log(`Saving ${field}: ${newValue}`);

    setLoggedUser((prevData) => {
      // Check if the field is one of the address fields
      if (prevData.adress.hasOwnProperty(field)) {
        // If it's an address field, create a NEW adress object
        const updatedAdress = {
          ...prevData.adress,
          [field]: newValue,
        };

        // Create new loggedUser object with the updated adress object
        return {
          ...prevData,
          adress: updatedAdress,
        };
      } else {
        // If it's not an address field, update normally
        return {
          ...prevData,
          [field]: newValue,
        };
      }
    });
  };

  return (
    <div>
      <div className="user-intro">
        <div className="user-profile-intro-header">
          <img src={honeyImg} alt="Imagem" />
          <div className="user-profile-intro-header-text">
            <h3>Seja Bem Vindo, {loggedUser.name}</h3>
            <p>ID: {loggedUser.id}</p>
          </div>
        </div>
        <div className="user-profile-intro-description">
          <LabeledEditableContainer
            displayName={"Nome Completo"}
            field={"name"}
            handleSave={handleSave}
            initialValue={loggedUser.name}
          />
          <LabeledEditableContainer
            displayName={"Telefone"}
            field={"cel"}
            handleSave={handleSave}
            initialValue={loggedUser.cel}
          />
          <LabeledEditableContainer
            displayName={"Email"}
            field={"email"}
            handleSave={handleSave}
            initialValue={loggedUser.email}
          />
          <LabeledEditableContainer
            displayName={"Senha"}
            field={"password"}
            handleSave={handleSave}
            initialValue={loggedUser.password}
            secret={true}
          />
        </div>
      </div>
      <div className="adress-container">
        <h3>Endereço</h3>
        <div className="adress-street-container">
          <LabeledEditableContainer
            displayName={"Rua"}
            field={"streetName"}
            handleSave={handleSave}
            initialValue={loggedUser.adress.streetName}
          />
          <LabeledEditableContainer
            displayName={"Número"}
            field={"streetNumber"}
            handleSave={handleSave}
            initialValue={loggedUser.adress.streetNumber}
          />
        </div>
        <LabeledEditableContainer
          displayName={"Complemento"}
          field={"apartmentNumber"}
          handleSave={handleSave}
          initialValue={loggedUser.adress.apartmentNumber}
        />
        <div className="adress-city-state-country">
          <LabeledEditableContainer
            displayName={"Cidade"}
            field={"city"}
            handleSave={handleSave}
            initialValue={loggedUser.adress.city}
          />
          <LabeledEditableContainer
            displayName={"Estado"}
            field={"state"}
            handleSave={handleSave}
            initialValue={loggedUser.adress.state}
          />
          <LabeledEditableContainer
            displayName={"País"}
            field={"country"}
            handleSave={handleSave}
            initialValue={loggedUser.adress.country}
          />
        </div>
        <LabeledEditableContainer
          displayName={"CEP"}
          field={"postalCode"}
          handleSave={handleSave}
          initialValue={loggedUser.adress.postalCode}
        />
      </div>
    </div>
  );
}

export default UserProfile;
