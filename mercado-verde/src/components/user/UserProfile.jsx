import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LabeledEditableContainer from "../utility_elements/LabeledEditableContainer";
import { imaskOptions } from "../../services/Formatters";
import verifiers from "../../services/Verifiers";
import { UpdateUser, GetUserById } from "../../services/Fetchs";
import CustomAlert from "../utility_elements/CustomAlert";

import "./UserProfile.css";

function UserProfile({ loggedUser }) {
  const navigate = useNavigate();
  const [loggedUserData, setLoggedUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiError, setApiError] = useState(null);

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

  const handleSave = async (field, newValue) => {
    console.log(`Saving ${field}: ${newValue}`);

    const prevLoggedUser = loggedUserData;
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

    try {
      await UpdateUser(loggedUser, updatedUser);
      setLoggedUserData(updatedUser);
    } catch (err) {
      setApiError(true);
      console.error(err);
    }
  };

  return (
    <div>
      {apiError && (
        <CustomAlert
          messageHeader="Erro de Comunicação"
          alertMessage="Ocorreu um erro na comunicação com o servidor. Tente novamente mais tarde."
          onConfirm={() => setApiError(false)}
          onConfirmMessage={"Ok"}
          error={true}
        />
      )}
      {isLoading && <p className="loading-message">Carregando Perfil...</p>}
      {error && <p className="error-message">{error}</p>}
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
                <button onClick={() => navigate("/logout")}>Sair</button>
              </div>
            </div>
            <div className="user-profile-intro-description">
              <LabeledEditableContainer
                displayName={"Nome Completo"}
                field={"name"}
                handleSave={handleSave}
                initialValue={loggedUserData.name}
                formatter={imaskOptions.capitalize} // Pass capitalize function
                verifier={verifiers.name}
              />
              <LabeledEditableContainer
                displayName={"Telefone"}
                field={"cel"}
                handleSave={handleSave}
                initialValue={loggedUserData.cel}
                formatter={imaskOptions.phone} // Pass imask config object
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
                initialValue={loggedUserData.adress.streetName}
                formatter={imaskOptions.capitalize} // Pass capitalize function
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
                formatter={imaskOptions.capitalize} // Pass capitalize function
                verifier={verifiers.name}
              />
              <LabeledEditableContainer
                displayName={"Estado"}
                field={"state"}
                handleSave={handleSave}
                initialValue={loggedUserData.adress.state}
                formatter={imaskOptions.capitalize} // Pass capitalize function
                verifier={verifiers.name}
              />
              {/* <LabeledEditableContainer
                displayName={"País"}
                field={"country"}
                handleSave={handleSave}
                initialValue={loggedUserData.adress.country}
                formatter={imaskOptions.capitalize} // Pass capitalize function
                verifier={verifiers.name}
              /> */}
            </div>
            <LabeledEditableContainer
              displayName={"CEP"}
              field={"postalCode"}
              handleSave={handleSave}
              initialValue={loggedUserData.adress.postalCode}
              formatter={imaskOptions.postalCode} // Pass imask config object
              verifier={verifiers.postalCode}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default UserProfile;
