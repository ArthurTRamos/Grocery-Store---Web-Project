import React from "react";
import { useNavigate } from "react-router-dom";

import LabeledEditableContainer from "../utility_elements/LabeledEditableContainer";
// Import the centralized imask configurations
import { imaskOptions } from "../utility_elements/Formatters";
import verifiers from "../utility_elements/Verifiers"; // Assuming path

import "./UserProfile.css";

function UserProfile({ loggedUser, setLoggedUser, setUsers }) {
  const navigate = useNavigate();
  const handleSave = (field, newValue) => {
    console.log(`Saving ${field}: ${newValue}`);

    setLoggedUser((prevLoggedUser) => {
      let updatedUser;

      if (
        prevLoggedUser.adress &&
        Object.keys(prevLoggedUser.adress).includes(field)
      ) {
        const updatedAdress = {
          ...prevLoggedUser.adress,
          [field]: newValue,
        };

        updatedUser = {
          ...prevLoggedUser,
          adress: updatedAdress,
        };
      } else {
        updatedUser = {
          ...prevLoggedUser,
          [field]: newValue,
        };
      }

      setUsers((prevUsers) => {
        return prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
      });

      return updatedUser;
    });
  };

  return (
    <div>
      <div className="user-intro">
        <div className="div-intro-header-logout-container">
          <div className="user-profile-intro-header">
            <div className="user-profile-intro-header-text">
              <h3>Seja Bem Vindo, {loggedUser.name}</h3>
              <p>ID: {loggedUser.id}</p>
            </div>
          </div>
          <div className="logout-button-container">
            <button onClick={() => navigate("/logout")}>Sair</button>
          </div>
        </div>
        <div className="user-profile-intro-description">
          <LabeledEditableContainer
            displayName={"Nome Completo"}
            field={"name"}
            handleSave={handleSave}
            initialValue={loggedUser.name}
            formatter={imaskOptions.capitalize} // Pass capitalize function
            verifier={verifiers.name}
          />
          <LabeledEditableContainer
            displayName={"Telefone"}
            field={"cel"}
            handleSave={handleSave}
            initialValue={loggedUser.cel}
            formatter={imaskOptions.phone} // Pass imask config object
            verifier={verifiers.phone}
          />
          <LabeledEditableContainer
            displayName={"Email"}
            field={"email"}
            handleSave={handleSave}
            initialValue={loggedUser.email}
            verifier={verifiers.email}
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
            formatter={imaskOptions.capitalize} // Pass capitalize function
          />
          <LabeledEditableContainer
            displayName={"Número"}
            field={"streetNumber"}
            handleSave={handleSave}
            initialValue={loggedUser.adress.streetNumber}
            verifier={verifiers.isNumeric}
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
            formatter={imaskOptions.capitalize} // Pass capitalize function
            verifier={verifiers.name}
          />
          <LabeledEditableContainer
            displayName={"Estado"}
            field={"state"}
            handleSave={handleSave}
            initialValue={loggedUser.adress.state}
            formatter={imaskOptions.capitalize} // Pass capitalize function
            verifier={verifiers.name}
          />
          <LabeledEditableContainer
            displayName={"País"}
            field={"country"}
            handleSave={handleSave}
            initialValue={loggedUser.adress.country}
            formatter={imaskOptions.capitalize} // Pass capitalize function
            verifier={verifiers.name}
          />
        </div>
        <LabeledEditableContainer
          displayName={"CEP"}
          field={"postalCode"}
          handleSave={handleSave}
          initialValue={loggedUser.adress.postalCode}
          formatter={imaskOptions.postalCode} // Pass imask config object
          verifier={verifiers.postalCode}
        />
      </div>
    </div>
  );
}

export default UserProfile;