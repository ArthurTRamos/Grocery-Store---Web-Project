import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Outlet, NavLink } from "react-router-dom";

import "./EditUserPage.css";

import CustomAlert from "../../../utility_elements/CustomAlert";

import { GetUserById, DeleteUser } from "../../../../services/Fetchs";

function EditUserPage({ loggedUserId }) {
  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Get user ID from URL parameters
  const { id } = useParams();

  // State to control showing the delete confirmation alert
  const [showAlert, setShowAlert] = useState(false);

  // State to show alert if user tries to delete their own account
  const [cantDelete, setCantDelete] = useState(false);

  // State to hold user data to be edited
  const [userEdit, setUserEdit] = useState();

  // Fetch user info when component mounts or id changes
  useEffect(() => {
    if (!id) {
      console.warn("ID não encontrado. Redirecionando...");
      return;
    }

    // Async function to fetch user info by ID
    const fetchUserInfos = async () => {
      try {
        const userInfos = await GetUserById(id);
        setUserEdit(userInfos);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserInfos();
  }, [id]);

  // Handle deleting the user account
  const handleDeleteAccount = async () => {
    setShowAlert(false); // Close confirmation alert

    try {
      await DeleteUser(id); // Call API to delete user
    } catch (error) {
      console.log(error);
    }

    // Redirect to users management page after deletion
    navigate("/manage/manageUsers", { replace: true });
  };

  return (
    <div className="user-page-container">
      {/* Sidebar navigation */}
      <div className="user-page-sidebar">
        <nav>
          <ul>
            <li>
              {/* Link to user's profile section */}
              <NavLink
                to={`profile/${id}`}
                end
                className={({ isActive }) =>
                  isActive ? "active-sidebar-link" : ""
                }
              >
                Perfil
              </NavLink>
            </li>
            <li>
              {/* Link to payment methods section */}
              <NavLink
                to={`payment-methods/${id}`}
                className={({ isActive }) =>
                  isActive ? "active-sidebar-link" : ""
                }
              >
                Métodos de Pagamento
              </NavLink>
            </li>
            <li>
              {/* Link to coupons section */}
              <NavLink
                to={`coupons/${id}`}
                className={({ isActive }) =>
                  isActive ? "active-sidebar-link" : ""
                }
              >
                Cupons
              </NavLink>
            </li>
            <li>
              {/* Delete account button */}
              <button
                className="delete-account-button"
                onClick={() => {
                  // Prevent deleting own logged-in account
                  if (id === loggedUserId) {
                    setCantDelete(true);
                    return;
                  } else {
                    // Show confirmation alert for deletion
                    setShowAlert(true);
                  }
                }}
              >
                Excluir Conta
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content area where nested routes will render */}
      <div className="user-page-main-content">
        <Outlet />
      </div>

      {/* Confirmation alert for deleting user */}
      {showAlert ? (
        <CustomAlert
          messageHeader="Atenção"
          alertMessage={
            "Essa conta será excluída permanentemente.\n" +
            "Todos os dados serão perdidos e não poderão ser recuperados.\n\n" +
            "Tem certeza que deseja continuar?"
          }
          onCancel={handleDeleteAccount}      // Confirm deletion
          onCancelMessage="Excluir conta"
          onConfirm={() => setShowAlert(false)} // Cancel deletion
          onConfirmMessage="Cancelar"
        />
      ) : null}

      {/* Alert shown if user tries to delete their own account */}
      {cantDelete ? (
        <CustomAlert
          alertMessage="Você não pode deletar a própria conta!"
          onConfirm={() => setCantDelete(false)}
          onConfirmMessage="OK"
        />
      ) : null}
    </div>
  );
}

export default EditUserPage;
