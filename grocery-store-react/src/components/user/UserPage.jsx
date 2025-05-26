import React from "react";
import { Outlet, NavLink, Navigate } from "react-router-dom";

import "./UserPage.css";

function UserPage({ loggedUser }) {
  console.log(loggedUser)
  if(!loggedUser) {
    return <Navigate to="/" />;
  }
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
          </ul>
        </nav>
      </div>
      <div className="user-page-main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default UserPage;
