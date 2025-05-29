import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./SideBar.css";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {/* Ícone do menu */}
      <div className="menu-icon" onClick={toggleSidebar}>☰</div>
      
      {/* Menu lateral */}
      <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-menu">
          <nav>
            <NavLink
              to="/manage/createUser"
              className={({ isActive }) =>
                isActive ? "active-sidebar-link" : ""
              }
              onClick={closeSidebar}
            >
              Criar Usuário
            </NavLink>


            <Link to="/manage/createProduct"
            onClick={closeSidebar}
            >
              Criar Produto
            </Link>


            <Link to="/manage/manageUsers"
            onClick={closeSidebar}
            >
            Gerenciar Usuários
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SideBar;