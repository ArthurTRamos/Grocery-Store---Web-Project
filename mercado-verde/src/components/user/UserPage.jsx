import React, { useState } from "react";
import { Outlet, NavLink, useNavigate, Navigate } from "react-router-dom";

import CustomAlert from "../utility_elements/CustomAlert";

import "./UserPage.css";

function UserPage({ loggedUser, users, setUsers }) {
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  if (!loggedUser) {
    return <Navigate to="/" />;
  }

  const handleDeleteAccount = () => {
    setShowAlert(false);
    const updatedUsers = users.filter(
      (user) => user.id !== loggedUser.id
    );
    setUsers(updatedUsers);
    navigate("/logout");
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
    </div>
  );
}

export default UserPage;
