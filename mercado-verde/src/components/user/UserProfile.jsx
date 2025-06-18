import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Import reusable components and services
import LabeledEditableContainer from "../utility_elements/LabeledEditableContainer";
import { imaskOptions } from "../../services/Formatters";
import verifiers from "../../services/Verifiers";
import { UpdateUser, GetUserById } from "../../services/Fetchs";
import CustomAlert from "../utility_elements/CustomAlert";

import "./UserProfile.css";

/**
 * A component that displays and allows editing of the logged-in user's profile and address information.
 * It uses a reusable LabeledEditableContainer for each field.
 */
function UserProfile({ loggedUser }) {
  const navigate = useNavigate();
  // State to hold the complete user object.
  const [loggedUserData, setLoggedUserData] = useState([]);
  // States to manage the async data fetching process.
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiError, setApiError] = useState(null);

  // This effect fetches the user's data when the component mounts.
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
  }, []); // Empty dependency array ensures this runs only once.

  /**
   * A generic save handler passed to all LabeledEditableContainer components.
   * It determines whether the field is a top-level property or a nested address property
   * and updates the user data accordingly.
   */
  const handleSave = async (field, newValue) => {
    const prevLoggedUser = loggedUserData;
    let updatedUser;

    // Check if the field belongs to the nested 'adress' object.
    if (
      prevLoggedUser.adress &&
      Object.keys(prevLoggedUser.adress).includes(field)
    ) {
      // If it's an address field, update it immutably within the nested object.
      const updatedAdress = {
        ...prevLoggedUser.adress,
        [field]: newValue,
      };
      updatedUser = {
        ...prevLoggedUser,
        adress: updatedAdress,
      };
    } else {
      // If it's a top-level field (like 'name'), update it directly.
      updatedUser = {
        ...prevLoggedUser,
        [field]: newValue,
      };
    }

    try {
      // Call the API to update the user data on the server.
      await UpdateUser(loggedUser, updatedUser);
      // If successful, update the local state to reflect the change.
      setLoggedUserData(updatedUser);
    } catch (err) {
      // If the API call fails, set an error state to show an alert.
      setApiError(true);
      console.error(err);
    }
  };

  return (
    <div>
      {/* Conditionally render alerts for API communication errors. */}
      {apiError && (
        <CustomAlert
          messageHeader="Erro de Comunicação"
          alertMessage="Ocorreu um erro na comunicação com o servidor. Tente novamente mais tarde."
          onConfirm={() => setApiError(false)}
          onConfirmMessage={"Ok"}
          error={true}
        />
      )}
      {/* Conditionally render loading/error messages for the initial data fetch. */}
      {isLoading && <p className="loading-message">Carregando Perfil...</p>}
      {error && <p className="error-message">{error}</p>}
      {/* Render main content only after data is successfully loaded. */}
      {!isLoading && !error && (
        <>
          <div className="user-intro">
            <div className="div-intro-header-logout-container">
              <div className="user-profile-intro-header">
                <div className="user-profile-intro-header-text">
                  <h3>Seja Bem Vindo, {loggedUserData.name}</h3>
                  <p>ID: {loggedUser}</p>
                </div>
              </div>
              <div className="logout-button-container">
                {/* The logout button navigates to the /logout route to clear the session. */}
                <button onClick={() => navigate("/logout")}>Sair</button>
              </div>
            </div>
            <div className="user-profile-intro-description">
              {/* Each piece of data is rendered in a reusable container that handles its own edit/save state. */}
              <LabeledEditableContainer
                displayName={"Nome Completo"}
                field={"name"}
                handleSave={handleSave}
                initialValue={loggedUserData.name}
                formatter={imaskOptions.capitalize} // Pass a formatting function.
                verifier={verifiers.name} // Pass a validation function.
              />
              <LabeledEditableContainer
                displayName={"Telefone"}
                field={"cel"}
                handleSave={handleSave}
                initialValue={loggedUserData.cel}
                formatter={imaskOptions.phone} // Pass an imask configuration object for masking.
                verifier={verifiers.phone}
              />
              <LabeledEditableContainer
                displayName={"Email"}
                field={"email"}
                handleSave={handleSave}
                initialValue={loggedUserData.email}
                verifier={verifiers.email}
              />
              <LabeledEditableContainer
                displayName={"Senha"}
                field={"password"}
                handleSave={handleSave}
                initialValue={loggedUserData.password}
                secret={true} // The 'secret' prop hides the value.
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
                initialValue={loggedUserData.adress.streetName}
                formatter={imaskOptions.capitalize}
              />
              <LabeledEditableContainer
                displayName={"Número"}
                field={"streetNumber"}
                handleSave={handleSave}
                initialValue={loggedUserData.adress.streetNumber}
                verifier={verifiers.isNumeric}
              />
            </div>
            <LabeledEditableContainer
              displayName={"Complemento"}
              field={"apartmentNumber"}
              handleSave={handleSave}
              initialValue={loggedUserData.adress.apartmentNumber}
            />
            <div className="adress-city-state-country">
              <LabeledEditableContainer
                displayName={"Cidade"}
                field={"city"}
                handleSave={handleSave}
                initialValue={loggedUserData.adress.city}
                formatter={imaskOptions.capitalize}
                verifier={verifiers.name}
              />
              <LabeledEditableContainer
                displayName={"Estado"}
                field={"state"}
                handleSave={handleSave}
                initialValue={loggedUserData.adress.state}
                formatter={imaskOptions.capitalize}
                verifier={verifiers.name}
              />
              {/* <LabeledEditableContainer
                displayName={"País"}
                field={"country"}
                handleSave={handleSave}
                initialValue={loggedUserData.adress.country}
                formatter={imaskOptions.capitalize}
                verifier={verifiers.name}
              /> */}
            </div>
            <LabeledEditableContainer
              displayName={"CEP"}
              field={"postalCode"}
              handleSave={handleSave}
              initialValue={loggedUserData.adress.postalCode}
              formatter={imaskOptions.postalCode}
              verifier={verifiers.postalCode}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default UserProfile;