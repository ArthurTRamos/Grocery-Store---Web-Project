import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css'; // Importa o CSS

const SideBar = () => {
  return (
    <div className="sidebar-container">
      {/* Ícone do menu */}
      <div className="menu-icon">☰</div>

      {/* Menu lateral */}
      <div className="sidebar-menu">
        <nav>
          <Link to="/createUser">Criar Usuário</Link>
          <Link to="/createProduct">Criar Produto</Link>
          <Link to="/manageUsers">Gerenciar Usuários</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
