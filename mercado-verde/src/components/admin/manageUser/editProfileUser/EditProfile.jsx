import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Component CSS styles
import "./EditProfile.css";

// Import input masks for fields (e.g., phone, postal code)
import { imaskOptions } from "../../../../services/Formatters";
// Import data validation functions
import verifiers from "../../../../services/Verifiers";

// Reusable editable field components
import LabeledEditableContainer from "../../../utility_elements/LabeledEditableContainer";
import SelectLabeledEditableContainer from "../../../utility_elements/SelectLabeledEditableContainer";

import { GetUserById, UpdateUser } from "../../../../services/Fetchs";

// Options for the User Type dropdown
const userTypeOptions = [
  { value: "true", label: "Administrador" },
  { value: "false", label: "Cliente" },
];

// Options for the State dropdown
const stateOptions = [
  { value: "", label: "Selecione..." },
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

// Main profile editing component
function EditProfile({ loggedUserId }) {
  const navigate = useNavigate();

  // State to hold the user data being edited
  const [userEdit, setUserEdit] = useState("");

  // Get user ID from route parameters
  const { id } = useParams();

  // Fetch user data when component mounts or when ID changes
  useEffect(() => {
    if (!id) {
      console.warn("ID não encontrado. Redirecionando...");
      return;
    }

    const fetchUserInfos = async () => {
      try {
        console.log("fetch de usuário em EditProfile");
        const userInfos = await GetUserById(id);
        setUserEdit(userInfos);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserInfos();
  }, [id]);

  // Show loading message while user data is not yet loaded
  if (!userEdit) {
    return (
      <div className="manage-user-intro">
        <p>Carregando usuário...</p>
        <button onClick={() => navigate("/manage/manageUsers")}>Voltar</button>
      </div>
    );
  }

  // Handler to change user type (admin/client)
  const handleTypeChange = async (typeValue) => {
    if (!userEdit) return;

    const updatedUser = {
      ...userEdit,
      admin: typeValue,
    };

    setUserEdit(updatedUser);

    try {
      await UpdateUser(id, updatedUser);
      console.log("Usuário atualizado com sucesso");
    } catch (error) {
      console.log(error);
    }

    // If the logged-in user changed their own profile type to client, redirect to homepage
    if (userEdit.id === loggedUserId && typeValue === false) {
      alert(
        "Você alterou seu perfil para cliente. Você será redirecionado para a página inicial."
      );
      navigate("/");
    }
  };

  // Generic handler to save changes to any field, including address fields
  const handleSave = async (field, newValue) => {
    console.log(`Saving ${field}: ${newValue}`);

    let updatedUser;

    // Update state and prepare updated user object for API
    setUserEdit((prevUserEdit) => {
      if (
        prevUserEdit.adress &&
        Object.keys(prevUserEdit.adress).includes(field)
      ) {
        const updatedAdress = {
          ...prevUserEdit.adress,
          [field]: newValue,
        };

        updatedUser = {
          ...prevUserEdit,
          adress: updatedAdress,
        };
      } else {
        updatedUser = {
          ...prevUserEdit,
          [field]: newValue,
        };
      }

      return updatedUser;
    });

    try {
      await UpdateUser(id, updatedUser);
      console.log("Usuário atualizado com sucesso");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Top section with user info and back button */}
      <div className="manage-user-intro">
        <div className="div-intro-header-logout-container">
          <div className="manage-user-profile-intro-header">
            <div className="user-profile-intro-header-text">
              <h3>Editando perfil de {userEdit.name}</h3>
              <p>ID: {userEdit.id}</p>
            </div>
          </div>
          <div className="logout-button-container">
            <button onClick={() => navigate("/manage/manageUsers")}>
              Voltar
            </button>
          </div>
        </div>

        {/* Editable user information fields */}
        <div className="manage-user-profile-intro-description">
          <SelectLabeledEditableContainer
            displayName={"Tipo de Usuário"}
            field={"admin"}
            // Inline function to adapt the new component to the old save handler
            handleSave={(field, newValue) => {
              const booleanValue = newValue === "true";
              handleTypeChange(booleanValue); // Call the original function
            }}
            initialValue={String(userEdit.admin)} // Convert initial boolean to string
            options={userTypeOptions}
          />

          <LabeledEditableContainer
            displayName={"Nome Completo"}
            field={"name"}
            handleSave={handleSave}
            initialValue={userEdit.name}
            formatter={imaskOptions.capitalize}
            verifier={verifiers.name}
          />
          <LabeledEditableContainer
            displayName={"Telefone"}
            field={"cel"}
            handleSave={handleSave}
            initialValue={userEdit.cel}
            formatter={imaskOptions.phone}
            verifier={verifiers.phone}
          />
          <LabeledEditableContainer
            displayName={"Email"}
            field={"email"}
            handleSave={handleSave}
            initialValue={userEdit.email}
            verifier={verifiers.email}
          />
          <LabeledEditableContainer
            displayName={"Senha"}
            field={"password"}
            handleSave={handleSave}
            initialValue={userEdit.password}
            secret={true}
          />
        </div>
      </div>

      {/* Section to edit user address */}
      <div className="manage-user-intro">
        <h3>Endereço</h3>

        {/* Street name and number */}
        <div className="adress-street-container">
          <LabeledEditableContainer
            displayName={"Rua"}
            field={"streetName"}
            handleSave={handleSave}
            initialValue={userEdit.adress.streetName}
            formatter={imaskOptions.capitalize}
          />
          <LabeledEditableContainer
            displayName={"Número"}
            field={"streetNumber"}
            handleSave={handleSave}
            initialValue={userEdit.adress.streetNumber}
            verifier={verifiers.isNumeric}
          />
        </div>

        {/* Apartment or complement */}
        <LabeledEditableContainer
          displayName={"Complemento"}
          field={"apartmentNumber"}
          handleSave={handleSave}
          initialValue={userEdit.adress.apartmentNumber}
        />

        {/* City and state */}
        <div className="adress-city-state-country">
          <LabeledEditableContainer
            displayName={"Cidade"}
            field={"city"}
            handleSave={handleSave}
            initialValue={userEdit.adress.city}
            formatter={imaskOptions.capitalize}
            verifier={verifiers.name}
          />
          <SelectLabeledEditableContainer
            displayName={"Estado"}
            field={"state"}
            handleSave={handleSave}
            initialValue={userEdit.adress.state}
            options={stateOptions}
          />
        </div>

        {/* Postal code */}
        <LabeledEditableContainer
          displayName={"CEP"}
          field={"postalCode"}
          handleSave={handleSave}
          initialValue={userEdit.adress.postalCode}
          formatter={imaskOptions.postalCode}
          verifier={verifiers.postalCode}
        />
      </div>
    </div>
  );
}

export default EditProfile;
