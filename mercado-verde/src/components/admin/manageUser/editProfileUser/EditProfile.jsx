import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";

// Importa formatações para campos com máscaras (ex: telefone, CEP)
import { imaskOptions } from "../../../../services/Formatters";
// Importa funções para verificar/validar dados
import verifiers from "../../../../services/Verifiers";

// Componentes reutilizáveis de campos editáveis
import LabeledEditableContainer from "../../../utility_elements/LabeledEditableContainer";
import SelectLabeledEditableContainer from "../../../utility_elements/SelectLabeledEditableContainer";

// Estilos CSS do componente
import "./EditProfile.css";

import { GetUserById, UpdateUser } from "../../../../services/Fetchs";

// Componente principal de edição de perfil
function EditProfile({loggedUserId}) {

  const navigate = useNavigate();

  const[userEdit, setUserEdit] = useState("");

  // Ao carregar ou alterar a rota, atualiza o usuário a ser editado se necessário
  const { id } = useParams();

  useEffect(() => {


    if (!id) {
      console.warn("ID não encontrado. Redirecionando...");
      // navigate("/usuarios"); // ou exibir mensagem
      return;
    }

    const fetchUserInfos = async() => {
      try {
        console.log("fecth de user de EDITPROFILE");
        const userInfos = await GetUserById(id);
        setUserEdit(userInfos);

      }catch(error){
        console.log(error);
      }
    }

    fetchUserInfos();
    
  }, [id]);



  // Se nenhum usuário foi carregado ainda, mostra uma mensagem e botão de voltar
  if (!userEdit) {
    return (
      <div className="manage-user-intro">
        <p>Carregando usuário...</p>
        <button onClick={() => navigate("/manage/manageUsers")}>
          Voltar
        </button>
      </div>
    );
  }

  // Função para alterar o tipo de usuário (admin/cliente)
  const handleTypeChange = async(typeValue) => {
    if (!userEdit) return;

    const updatedUser = {
      ...userEdit,
      admin: typeValue,
    };

    setUserEdit(updatedUser);

    try{
      await UpdateUser(id, updatedUser);
      console.log("atualizou");
    }catch(error) {
      console.log(error);
    }

    // Se o usuário editado é o próprio usuário logado e virou cliente, atualiza o estado e redireciona
    if (userEdit.id === loggedUserId && typeValue === false) {
      alert("Você alterou seu perfil para cliente. Você será redirecionado para a página inicial.");
      
      navigate("/");
    }
  }

  // Função genérica para salvar mudanças em campos (inclusive campos do endereço)
  const handleSave = async (field, newValue) => {
    console.log(`Saving ${field}: ${newValue}`);

    // Primeiro, criamos updatedUser fora do setUserEdit
    let updatedUser;

    setUserEdit((prevUserEdit) => {
      if (prevUserEdit.adress && Object.keys(prevUserEdit.adress).includes(field)) {
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
      console.log("atualizou");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Seção superior com imagem, nome do usuário e botão de voltar */}
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

        {/* Campos para editar informações do usuário */}
        <div className="manage-user-profile-intro-description">
          <SelectLabeledEditableContainer
            displayName={"Tipo de Usuário"}
            field={"admin"}
            handleTypeChange={handleTypeChange}
            initialValue={userEdit.admin}
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

      {/* Seção para editar o endereço do usuário */}
      <div className="manage-user-intro">
        <h3>Endereço</h3>

        {/* Rua e número */}
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

        {/* Complemento */}
        <LabeledEditableContainer
          displayName={"Complemento"}
          field={"apartmentNumber"}
          handleSave={handleSave}
          initialValue={userEdit.adress.apartmentNumber}
        />

        {/* Cidade, estado, país */}
        <div className="adress-city-state-country">
          <LabeledEditableContainer
            displayName={"Cidade"}
            field={"city"}
            handleSave={handleSave}
            initialValue={userEdit.adress.city}
            formatter={imaskOptions.capitalize}
            verifier={verifiers.name}
          />
          <LabeledEditableContainer
            displayName={"Estado"}
            field={"state"}
            handleSave={handleSave}
            initialValue={userEdit.adress.state}
            formatter={imaskOptions.capitalize}
            verifier={verifiers.name}
          />
          <LabeledEditableContainer
            displayName={"País"}
            field={"country"}
            handleSave={handleSave}
            initialValue={userEdit.adress.country}
            formatter={imaskOptions.capitalize}
            verifier={verifiers.name}
          />
        </div>

        {/* CEP */}
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
