import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./SideBar.css";

const SideBar = () => {
  return (
    <div>
      {/* Menu lateral */}
      <div className={`sidebar-container`}>
        <div className="sidebar-menu">
          <nav>
            <NavLink
              to="/manage/createUser"
              className={({ isActive }) =>
                isActive ? "active-sidebar-link" : ""
              }
            >
              Criar Usuário
            </NavLink>

            <NavLink
              to="/manage/createProduct"
              className={({ isActive }) =>
                isActive ? "active-sidebar-link" : ""
              }
            >
              Criar Produto
            </NavLink>

            <NavLink
              to="/manage/createCoupon"
              className={({ isActive }) =>
                isActive ? "active-sidebar-link" : ""
              }
            >
              Criar Cupom
            </NavLink>

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
