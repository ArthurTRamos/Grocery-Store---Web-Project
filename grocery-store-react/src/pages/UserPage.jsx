import React from "react";
import { Outlet, NavLink } from "react-router-dom";

import "./UserPage.css";

function UserPage() {
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
