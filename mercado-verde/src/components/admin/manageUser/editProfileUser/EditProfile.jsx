import React, { useEffect } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

import LabeledEditableContainer from "../../../utility_elements/LabeledEditableContainer";
import SelectLabeledEditableContainer from "../../../utility_elements/SelectLabeledEditableContainer";
import honeyImg from "../../../../assets/mel.jpg";

import "./EditProfile.css";

function EditProfile({ setUsers, userToBeEdited, setUserToBeEdited, loggedUser, setLoggedUser }) {

  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const userFromState = location.state?.userToBeEdited;
    if (userFromState && (!userToBeEdited || userToBeEdited.id !== userFromState.id)) {
      console.log(userFromState);
      setUserToBeEdited(userFromState);
    }
  }, [location.state?.userToBeEdited, setUserToBeEdited, userToBeEdited]);

  if (!userToBeEdited) {
    return (
      <div className="manage-user-intro">
        <p>Carregando usuário...</p>
        <button onClick={() => navigate("/manage/manageUsers")}>
          Voltar
        </button>
      </div>
    );
  }


  const handleTypeChange = (typeValue) => {

    if (!userToBeEdited) return;

    const updatedUser = {
      ...userToBeEdited,
      admin: typeValue,
    };

    setUserToBeEdited(updatedUser);

    setUsers((prevUsers) => {
      return prevUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
    });

    if (loggedUser && 
        userToBeEdited.id === loggedUser.id && 
        typeValue === false) {
      
      setLoggedUser(updatedUser);
      
      alert("Você alterou seu perfil para cliente. Você será redirecionado para a página inicial.");
      
      navigate("/");
      
    }
  }




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

          <SelectLabeledEditableContainer
            displayName={"Tipo de Usuário"}
            field={"admin"}
            handleTypeChange={handleTypeChange}
            initialValue={userToBeEdited.admin}
          />

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
