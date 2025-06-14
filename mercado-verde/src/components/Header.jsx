import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

import logo from "../assets/logo.png";

import { GetUserById } from "../services/Fetchs.js";

function Header({ loggedUserId, cartItemNumber }) {
  const [loggedUser, setLoggedUser] = useState("");

  console.log(loggedUserId);

  useEffect(() => {
    const fetchUser = async () => {
      console.log("aaaaaaaaaaaaaaaaa");
      console.log(loggedUserId);
      if (loggedUserId == "") {
        setLoggedUser("");
        return;
      }
      const data = await GetUserById(loggedUserId);
      console.log(data);
      setLoggedUser(data);
    };

    fetchUser();
  }, [loggedUserId]);

  return (
    <div>
      <header className="header">
        <Link to="/" className="logo-name-header">
          <img className="logo-header" src={logo} alt="Logo" />
          <h1>Mercado Verde</h1>
        </Link>
        <nav>
          <ul className="header-menu">
            {loggedUser && loggedUser.admin ? (
              <li>
                <Link to="/manage">Gerenciar</Link>
              </li>
            ) : null}
            <li>
              <Link to="/recipe">Receitas</Link>
            </li>
            <li>
              <Link to="/section" state={{ sectionData: "todos" }}>
                Seções
              </Link>
            </li>
            <li>
              <Link to="/cart">
                Meu Carrinho{" "}
                {cartItemNumber > 0 ? "(" + cartItemNumber + ")" : ""}
              </Link>
            </li>
            {loggedUser ? (
              <li>
                <Link to="/user">Bem Vindo, {loggedUser.name}</Link>
              </li>
            ) : (
              <li>
                <Link to="/auth">Entrar / Cadastro</Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
