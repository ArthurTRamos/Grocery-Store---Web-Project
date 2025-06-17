import React from "react";
import { NavLink } from "react-router-dom";
import "./SideBar.css";

const SideBar = () => {
  return (
    <div>
      {/* Sidebar container */}
      <div className={`sidebar-container`}>
        <div className="sidebar-menu">
          <nav>
            {/* Link to create a new user */}
            <NavLink
              to="/manage/createUser"
              className={({ isActive }) =>
                isActive ? "active-sidebar-link" : ""
              }
            >
              Criar Usuário
            </NavLink>

            {/* Link to create a new product */}
            <NavLink
              to="/manage/createProduct"
              className={({ isActive }) =>
                isActive ? "active-sidebar-link" : ""
              }
            >
              Criar Produto
            </NavLink>

            {/* Link to create a new coupon */}
            <NavLink
              to="/manage/createCoupon"
              className={({ isActive }) =>
                isActive ? "active-sidebar-link" : ""
              }
            >
              Criar Cupom
            </NavLink>

            {/* Link to manage existing users */}
            <NavLink
              to="/manage/manageUsers"
              className={({ isActive }) =>
                isActive ? "active-sidebar-link" : ""
              }
            >
              Gerenciar Usuários
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
