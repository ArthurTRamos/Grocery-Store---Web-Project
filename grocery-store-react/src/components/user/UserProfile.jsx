import React from "react";

import LabeledEditableContainer from "../utility_elements/LabeledEditableContainer";
import honeyImg from "../../assets/mel.jpg";

import "./UserProfile.css";

function UserProfile({ userData, setUserData }) {
  const handleSave = (field, newValue) => {
    console.log(`Saving ${field}: ${newValue}`);

    setUserData((prevData) => {
      // Check if the field is one of the address fields
      if (prevData.adress.hasOwnProperty(field)) {
        // If it's an address field, create a NEW adress object
        const updatedAdress = {
          ...prevData.adress,
          [field]: newValue,
        };

        // Create new userData object with the updated adress object
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
            <h3>Seja Bem Vindo, {userData.name}</h3>
            <p>ID: {userData.id}</p>
          </div>
        </div>
        <div className="user-profile-intro-description">
          <LabeledEditableContainer
            displayName={"Nome Completo"}
            field={"name"}
            handleSave={handleSave}
            initialValue={userData.name}
          />
          <LabeledEditableContainer
            displayName={"Telefone"}
            field={"cel"}
            handleSave={handleSave}
            initialValue={userData.cel}
          />
          <LabeledEditableContainer
            displayName={"Email"}
            field={"email"}
            handleSave={handleSave}
            initialValue={userData.email}
          />
          <LabeledEditableContainer
            displayName={"Senha"}
            field={"password"}
            handleSave={handleSave}
            initialValue={userData.password}
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
            initialValue={userData.adress.streetName}
          />
          <LabeledEditableContainer
            displayName={"Número"}
            field={"streetNumber"}
            handleSave={handleSave}
            initialValue={userData.adress.streetNumber}
          />
        </div>
        <LabeledEditableContainer
          displayName={"Complemento"}
          field={"apartmentNumber"}
          handleSave={handleSave}
          initialValue={userData.adress.apartmentNumber}
        />
        <div className="adress-city-state-country">
          <LabeledEditableContainer
            displayName={"Cidade"}
            field={"city"}
            handleSave={handleSave}
            initialValue={userData.adress.city}
          />
          <LabeledEditableContainer
            displayName={"Estado"}
            field={"state"}
            handleSave={handleSave}
            initialValue={userData.adress.state}
          />
          <LabeledEditableContainer
            displayName={"País"}
            field={"country"}
            handleSave={handleSave}
            initialValue={userData.adress.country}
          />
        </div>
        <LabeledEditableContainer
          displayName={"CEP"}
          field={"postalCode"}
          handleSave={handleSave}
          initialValue={userData.adress.postalCode}
        />
      </div>
    </div>
  );
}

export default UserProfile;
