import React, { useState } from "react";
// Import components and hooks from react-router-dom for navigation and nested routing.
import { Outlet, NavLink, useNavigate, Navigate } from "react-router-dom";
// Import the API function for deleting a user.
import { DeleteUser } from "../../services/Fetchs";

// Import custom components.
import CustomAlert from "../utility_elements/CustomAlert";

import "./UserPage.css";

/**
 * A layout component for the user's personal area.
 * It provides a sidebar for navigation and a main content area where nested routes are rendered.
 * It also handles the account deletion logic.
 */
function UserPage({ loggedUser }) {
  // State to control the visibility of the "delete account" confirmation alert.
  const [showAlert, setShowAlert] = useState(false);
  // State to control the visibility of the "failed to delete" alert.
  const [showFail, setShowFail] = useState(false);
  // Hook to get the navigation function for programmatic redirects.
  const navigate = useNavigate();

  // This is a route guard. If no user is logged in, redirect to the homepage.
  // The <Navigate> component declaratively redirects the user.
  if (!loggedUser) {
    return <Navigate to="/" />;
  }

  // Handles the final confirmation of the account deletion.
  const handleDeleteAccount = async () => {
    setShowAlert(false); // Hide the confirmation alert.
    try {
      // Call the API to delete the user from the server.
      await DeleteUser(loggedUser);
      // On success, navigate to the logout route to clear the session.
      navigate("/logout");
    } catch (error) {
      // If the API call fails, log the error and show a failure alert.
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
              {/* NavLink is used for navigation; it can be styled differently when its route is active. */}
              <NavLink
                to="/user"
                end // The 'end' prop ensures this link is only active on the exact path '/user'.
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
                onClick={() => setShowAlert(true)} // Show the confirmation alert on click.
              >
                Excluir Conta
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="user-page-main-content">
        {/* The <Outlet> component is a placeholder where React Router will render
            the content of the matched nested route (e.g., UserProfile, PaymentMethods, etc.). */}
        <Outlet />
      </div>

      {/* Conditionally render the confirmation alert when showAlert is true. */}
      {showAlert ? (
        <CustomAlert
          messageHeader="Atenção"
          alertMessage={
            "Sua conta será excluída permanentemente.\n" +
            "Todos os seus dados serão perdidos e não poderão ser recuperados.\n\n" +
            "Tem certeza que deseja continuar?"
          }
          onConfirm={handleDeleteAccount} // The "confirm" button here confirms the deletion.
          onConfirmMessage="Excluir conta"
          onCancel={() => setShowAlert(false)} // The "cancel" button here cancels the action.
          onCancelMessage="Cancelar"
          error={true} // This indicates that the alert is a warning/error type. Used here to reverse the colors of the buttons.
        />
      ) : null}

      {/* Conditionally render the failure alert when showFail is true. */}
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