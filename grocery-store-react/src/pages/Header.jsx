import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

import logo from "../images/logo.png"

function Header({ user, cartItemNumber }) {
  let userHeader = user.logged ? (
    <li>
      <Link to="/user">Bem Vindo, {user.name}</Link>
    </li>
  ) : (
    <li>
      <Link to="/login">Entrar / Cadastro</Link>
    </li>
  );

  let admin =
    user.logged && user.admin ? (
      <li>
        <Link to="/manage">Gerenciar</Link>
      </li>
    ) : null;

  return (
    <div>
      <header class="header">
        <Link to="/" className="logo-name-header">
          <img className="logo-header" src={logo} alt="Logo" />
          <h1>Mercado Verde</h1>
        </Link>
        <nav>
          <ul class="menu">
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
