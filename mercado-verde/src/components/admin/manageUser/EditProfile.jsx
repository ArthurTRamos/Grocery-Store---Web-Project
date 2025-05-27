import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import LabeledEditableContainer from "../../utility_elements/LabeledEditableContainer";
import honeyImg from "../../../assets/mel.jpg";

import "./EditProfile.css";

function EditProfile({ setUsers }) {
  const navigate = useNavigate();

  const location = useLocation();
  const [userToBeEdited, setUserToBeEdited] = useState(
    location.state?.userToBeEdited
  );

  const handleSave = (field, newValue) => {
    console.log(`Saving ${field}: ${newValue}`);

    setUserToBeEdited((prevUserToBeEdited) => {
      let updatedUser;

      // Check if the field is one of the address fields and if 'adress' property exists
      if (
        prevUserToBeEdited.adress &&
        prevUserToBeEdited.adress.hasOwnProperty(field)
      ) {
        // If it's an address field, create a NEW address object
        const updatedAdress = {
          ...prevUserToBeEdited.adress,
          [field]: newValue,
        };

        // Create a new loggedUser object with the updated address object
        updatedUser = {
          ...prevUserToBeEdited,
          adress: updatedAdress,
        };
      } else {
        // If it's not an address field, update normally
        updatedUser = {
          ...prevUserToBeEdited,
          [field]: newValue,
        };
      }

      setUsers((prevUsers) => {
        return prevUsers.map((user) =>
          // Find the corresponding user by ID and replace it with the 'updatedUser'
          user.id === updatedUser.id ? updatedUser : user
        );
      });

      // Return the 'updatedUser' for the 'loggedUser' state to be updated
      return updatedUser;
    });
  };

  return (
    <div>
      <div className="manage-user-intro">
        <div className="div-intro-header-logout-container">
          <div className="manage-user-profile-intro-header">
            <img src={honeyImg} alt="Imagem" />
            <div className="user-profile-intro-header-text">
              <h3>Editando perfil de {userToBeEdited.name}</h3>
              <p>ID: {userToBeEdited.id}</p>
            </div>
          </div>
          <div className="logout-button-container">
            <button onClick={() => navigate("/manage/manageUsers")}>
              Voltar
            </button>
          </div>
        </div>
        <div className="manage-user-profile-intro-description">
          <LabeledEditableContainer
            displayName={"Nome Completo"}
            field={"name"}
            handleSave={handleSave}
            initialValue={userToBeEdited.name}
          />
          <LabeledEditableContainer
            displayName={"Telefone"}
            field={"cel"}
            handleSave={handleSave}
            initialValue={userToBeEdited.cel}
          />
          <LabeledEditableContainer
            displayName={"Email"}
            field={"email"}
            handleSave={handleSave}
            initialValue={userToBeEdited.email}
          />
          <LabeledEditableContainer
            displayName={"Senha"}
            field={"password"}
            handleSave={handleSave}
            initialValue={userToBeEdited.password}
            secret={true}
          />
        </div>
      </div>
      <div className="manage-user-intro">
        <h3>Endereço</h3>
        <div className="adress-street-container">
          <LabeledEditableContainer
            displayName={"Rua"}
            field={"streetName"}
            handleSave={handleSave}
            initialValue={userToBeEdited.adress.streetName}
          />
          <LabeledEditableContainer
            displayName={"Número"}
            field={"streetNumber"}
            handleSave={handleSave}
            initialValue={userToBeEdited.adress.streetNumber}
          />
        </div>
        <LabeledEditableContainer
          displayName={"Complemento"}
          field={"apartmentNumber"}
          handleSave={handleSave}
          initialValue={userToBeEdited.adress.apartmentNumber}
        />
        <div className="adress-city-state-country">
          <LabeledEditableContainer
            displayName={"Cidade"}
            field={"city"}
            handleSave={handleSave}
            initialValue={userToBeEdited.adress.city}
          />
          <LabeledEditableContainer
            displayName={"Estado"}
            field={"state"}
            handleSave={handleSave}
            initialValue={userToBeEdited.adress.state}
          />
          <LabeledEditableContainer
            displayName={"País"}
            field={"country"}
            handleSave={handleSave}
            initialValue={userToBeEdited.adress.country}
          />
        </div>
        <LabeledEditableContainer
          displayName={"CEP"}
          field={"postalCode"}
          handleSave={handleSave}
          initialValue={userToBeEdited.adress.postalCode}
        />
      </div>
    </div>
  );
}

export default EditProfile;
