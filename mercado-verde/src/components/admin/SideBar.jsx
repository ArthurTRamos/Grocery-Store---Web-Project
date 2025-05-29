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


            <Link to="/manage/createProduct">
              Criar Produto
            </Link>


            <Link to="/manage/manageUsers">
            Gerenciar Usuários
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SideBar;