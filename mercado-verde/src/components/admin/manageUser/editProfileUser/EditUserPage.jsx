import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Outlet, NavLink} from "react-router-dom";

import CustomAlert from "../../../utility_elements/CustomAlert";

import "./EditUserPage.css";


function EditUserPage({ loggedUser}) {

  
  const [showAlert, setShowAlert] = useState(false);
  const [cantDelete, setCantDelete] = useState(false);

  const location = useLocation();
  const [userToBeEdited, setUserToBeEdited] = useState(
    location.state?.userToBeEdited
  );

  return (
    <div className="user-page-container">
      <div className="user-page-sidebar">
        <nav>
          <ul>
            <li>
              <NavLink
                to="profile"
                end
                className={({ isActive }) =>
                  isActive ? "active-sidebar-link" : ""
                }
                state={{userToBeEdited: userToBeEdited}}
              >
                Perfil
              </NavLink>
            </li>
            <li>
              <NavLink
                to="payment-methods"
                className={({ isActive }) =>
                  isActive ? "active-sidebar-link" : ""
                }
                state={{userToBeEdited: userToBeEdited}}
              >
                Métodos de Pagamento
              </NavLink>
            </li>
            <li>
              <NavLink
                to="coupons"
                className={({ isActive }) =>
                  isActive ? "active-sidebar-link" : ""
                }
                state={{userToBeEdited: userToBeEdited}}
              >
                Cupons
              </NavLink>
            </li>
            <li>
              <button
                className="delete-account-button"
                onClick={() => {
                  if(userToBeEdited.id === loggedUser.id) {
                    setCantDelete(true);
                    return;
                  }else{
                    setShowAlert(true)
                  }
                }
                }
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
            "Essa conta será excluída permanentemente.\n" +
            "Todos os dados serão perdidos e não poderão ser recuperados.\n\n" +
            "Tem certeza que deseja continuar?"
          }
          onCancel={handleDeleteAccount}
          onCancelMessage="Excluir conta"
          onConfirm={() => setShowAlert(false)}
          onConfirmMessage="Cancelar"
        />
      ) : null}
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
