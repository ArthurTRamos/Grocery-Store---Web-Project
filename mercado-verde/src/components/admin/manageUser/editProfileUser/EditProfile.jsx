import React, { useEffect } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

// Importa formatações para campos com máscaras (ex: telefone, CEP)
import { imaskOptions } from "../../../../services/Formatters";
// Importa funções para verificar/validar dados
import verifiers from "../../../../services/Verifiers";

// Componentes reutilizáveis de campos editáveis
import LabeledEditableContainer from "../../../utility_elements/LabeledEditableContainer";
import SelectLabeledEditableContainer from "../../../utility_elements/SelectLabeledEditableContainer";

// Estilos CSS do componente
import "./EditProfile.css";

// Componente principal de edição de perfil
function EditProfile({ setUsers, userToBeEdited, setUserToBeEdited, loggedUser, setLoggedUser }) {

  const navigate = useNavigate();
  const location = useLocation();

  // Ao carregar ou alterar a rota, atualiza o usuário a ser editado se necessário
  useEffect(() => {
    const userFromState = location.state?.userToBeEdited;
    if (userFromState && (!userToBeEdited || userToBeEdited.id !== userFromState.id)) {
      console.log(userFromState);
      setUserToBeEdited(userFromState);
    }
  }, [location.state?.userToBeEdited, setUserToBeEdited, userToBeEdited]);

  // Se nenhum usuário foi carregado ainda, mostra uma mensagem e botão de voltar
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

  // Função para alterar o tipo de usuário (admin/cliente)
  const handleTypeChange = (typeValue) => {
    if (!userToBeEdited) return;

    const updatedUser = {
      ...userToBeEdited,
      admin: typeValue,
    };

    setUserToBeEdited(updatedUser);

    // Atualiza a lista geral de usuários
    setUsers((prevUsers) => {
      return prevUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
    });

    // Se o usuário editado é o próprio usuário logado e virou cliente, atualiza o estado e redireciona
    if (loggedUser && 
        userToBeEdited.id === loggedUser.id && 
        typeValue === false) {
      
      setLoggedUser(updatedUser);
      
      alert("Você alterou seu perfil para cliente. Você será redirecionado para a página inicial.");
      
      navigate("/");
    }
  }

  // Função genérica para salvar mudanças em campos (inclusive campos do endereço)
  const handleSave = (field, newValue) => {
    console.log(`Saving ${field}: ${newValue}`);

    setUserToBeEdited((prevUserToBeEdited) => {
      let updatedUser;

      // Verifica se o campo pertence ao endereço
      if (
        prevUserToBeEdited.adress &&
        Object.keys(prevUserToBeEdited.adress).includes(field)
      ) {
        // Cria novo objeto de endereço com o campo atualizado
        const updatedAdress = {
          ...prevUserToBeEdited.adress,
          [field]: newValue,
        };

        // Atualiza o objeto do usuário com novo endereço
        updatedUser = {
          ...prevUserToBeEdited,
          adress: updatedAdress,
        };
      } else {
        // Campo fora do endereço — atualiza diretamente
        updatedUser = {
          ...prevUserToBeEdited,
          [field]: newValue,
        };
      }

      // Atualiza o usuário na lista geral de usuários
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
      {/* Seção superior com imagem, nome do usuário e botão de voltar */}
      <div className="manage-user-intro">
        <div className="div-intro-header-logout-container">
          <div className="manage-user-profile-intro-header">
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

        {/* Campos para editar informações do usuário */}
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
            formatter={imaskOptions.capitalize}
            verifier={verifiers.name}
          />
          <LabeledEditableContainer
            displayName={"Telefone"}
            field={"cel"}
            handleSave={handleSave}
            initialValue={userToBeEdited.cel}
            formatter={imaskOptions.phone}
            verifier={verifiers.phone}
          />
          <LabeledEditableContainer
            displayName={"Email"}
            field={"email"}
            handleSave={handleSave}
            initialValue={userToBeEdited.email}
            verifier={verifiers.email}
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

      {/* Seção para editar o endereço do usuário */}
      <div className="manage-user-intro">
        <h3>Endereço</h3>

        {/* Rua e número */}
        <div className="adress-street-container">
          <LabeledEditableContainer
            displayName={"Rua"}
            field={"streetName"}
            handleSave={handleSave}
            initialValue={userToBeEdited.adress.streetName}
            formatter={imaskOptions.capitalize}
          />
          <LabeledEditableContainer
            displayName={"Número"}
            field={"streetNumber"}
            handleSave={handleSave}
            initialValue={userToBeEdited.adress.streetNumber}
            verifier={verifiers.isNumeric}
          />
        </div>

        {/* Complemento */}
        <LabeledEditableContainer
          displayName={"Complemento"}
          field={"apartmentNumber"}
          handleSave={handleSave}
          initialValue={userToBeEdited.adress.apartmentNumber}
        />

        {/* Cidade, estado, país */}
        <div className="adress-city-state-country">
          <LabeledEditableContainer
            displayName={"Cidade"}
            field={"city"}
            handleSave={handleSave}
            initialValue={userToBeEdited.adress.city}
            formatter={imaskOptions.capitalize}
            verifier={verifiers.name}
          />
          <LabeledEditableContainer
            displayName={"Estado"}
            field={"state"}
            handleSave={handleSave}
            initialValue={userToBeEdited.adress.state}
            formatter={imaskOptions.capitalize}
            verifier={verifiers.name}
          />
          <LabeledEditableContainer
            displayName={"País"}
            field={"country"}
            handleSave={handleSave}
            initialValue={userToBeEdited.adress.country}
            formatter={imaskOptions.capitalize}
            verifier={verifiers.name}
          />
        </div>

        {/* CEP */}
        <LabeledEditableContainer
          displayName={"CEP"}
          field={"postalCode"}
          handleSave={handleSave}
          initialValue={userToBeEdited.adress.postalCode}
          formatter={imaskOptions.postalCode}
          verifier={verifiers.postalCode}
        />
      </div>
    </div>
  );
}

export default EditProfile;
