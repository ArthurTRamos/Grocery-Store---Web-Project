import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Outlet, NavLink} from "react-router-dom";

import "./EditUserPage.css";

import CustomAlert from "../../../utility_elements/CustomAlert";

import { GetUserById, DeleteUser } from "../../../../services/Fetchs";



function EditUserPage({loggedUserId}) {
  const navigate = useNavigate();

  const { id } = useParams();
  
  const [showAlert, setShowAlert] = useState(false);
  const [cantDelete, setCantDelete] = useState(false);

  const [userEdit, setUserEdit] = useState();

  useEffect(() => {


    if (!id) {
      console.warn("ID não encontrado. Redirecionando...");
      return;
    }

    const fetchUserInfos = async() => {
      try {

        const userInfos = await GetUserById(id);
        setUserEdit(userInfos);

      }catch(error){
        console.log(error);
      }
    }

    fetchUserInfos();
    
  }, [id]);

  const handleDeleteAccount = async () => {
    setShowAlert(false);

    try{
      await DeleteUser(id);
    }catch(error) {
      console.log(error);
    }

    navigate("/manage/manageUsers", { replace: true });
  };


  return (
    <div className="user-page-container">
      <div className="user-page-sidebar">
        <nav>
          <ul>
            <li>
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
              <button
                className="delete-account-button"
                onClick={() => {
                  if(id === loggedUserId) {
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