import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

import logo from "../images/logo.png";

function Header({ userData, cartItemNumber }) {
  let userHeader = userData.logged ? (
    <li>
      <Link to="/user">Bem Vindo, {userData.name}</Link>
    </li>
  ) : (
    <li>
      <Link to="/login">Entrar / Cadastro</Link>
    </li>
  );

  let admin =
    userData.logged && userData.admin ? (
      <li>
        <Link to="/manage">Gerenciar</Link>
      </li>
    ) : null;

  return (
    <div>
      <header className="header">
        <Link to="/" className="logo-name-header">
          <img className="logo-header" src={logo} alt="Logo" />
          <h1>Mercado Verde</h1>
        </Link>
        <nav>
          <ul className="header-menu">
            {admin}
            <li>
              <Link to="/section">Seções</Link>
            </li>
            <li>
              <Link to="/search">Busca</Link>
            </li>
            <li>
              <Link to="/cart">Meu Carrinho ({cartItemNumber})</Link>
            </li>
            {userHeader}
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
