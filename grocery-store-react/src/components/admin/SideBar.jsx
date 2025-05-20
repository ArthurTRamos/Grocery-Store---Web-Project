import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./SideBar.css"; // Importa o CSS

const SideBar = () => {
  return (
    <div className="sidebar-container">
      {/* Ícone do menu */}
      <div className="menu-icon">☰</div>

      {/* Menu lateral */}
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
          <Link to="/manage/createProduct">Criar Produto</Link>
          <Link to="/manage/manageUsers">Gerenciar Usuários</Link>
          <Link to="/manage/profile">Profile</Link>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
