import React, { useState } from "react";
import { Outlet, NavLink, useNavigate, Navigate } from "react-router-dom";
import { DeleteUser } from "../../services/Fetchs";

import CustomAlert from "../utility_elements/CustomAlert";

import "./UserPage.css";

function UserPage({ loggedUser }) {
  const [showAlert, setShowAlert] = useState(false);
  const [showFail, setShowFail] = useState(false);
  const navigate = useNavigate();

  console.log(loggedUser);

  if (!loggedUser) {
    return <Navigate to="/" />;
  }

  const handleDeleteAccount = async () => {
    setShowAlert(false);
    try {
      await DeleteUser(loggedUser);
      navigate("/logout");
    } catch (error) {
      console.error("Erro ao excluir a conta:", error);
      setShowFail(true);
    }
  };

  return (
    <div className="user-page-container">
      <div className="user-page-sidebar">
        <nav>
          <ul>
            <li>
              <NavLink
                to="/user"
                end
                className={({ isActive }) =>
                  isActive ? "active-sidebar-link" : ""
                }
              >
                Perfil
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/payment-methods"
                className={({ isActive }) =>
                  isActive ? "active-sidebar-link" : ""
                }
              >
                Métodos de Pagamento
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/coupons"
                className={({ isActive }) =>
                  isActive ? "active-sidebar-link" : ""
                }
              >
                Cupons
              </NavLink>
            </li>
            <li>
              <button
                className="delete-account-button"
                onClick={() => setShowAlert(true)}
              >
                Excluir Conta
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="user-page-main-content">
        <Outlet />
      </div>
      {showAlert ? (
        <CustomAlert
          messageHeader="Atenção"
          alertMessage={
            "Sua conta será excluída permanentemente.\n" +
            "Todos os seus dados serão perdidos e não poderão ser recuperados.\n\n" +
            "Tem certeza que deseja continuar?"
          }
          onCancel={handleDeleteAccount}
          onCancelMessage="Excluir conta"
          onConfirm={() => setShowAlert(false)}
          onConfirmMessage="Cancelar"
        />
      ) : null}
      {showFail ? (
        <CustomAlert
          messageHeader="Atenção"
          alertMessage={
            "Erro ao excluir a conta.\n" +
            "Por favor, tente novamente mais tarde."
          }
          onConfirm={() => setShowFail(false)}
          onConfirmMessage="Ok"
          error={true}
        />
      ) : null}
    </div>
  );
}

export default UserPage;
