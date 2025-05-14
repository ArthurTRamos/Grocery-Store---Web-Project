import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"

function App() {
  return (
    <div>
      <header class="header">
        <Link to="/" className="logo">
          Logo | Nome
        </Link>
        <nav>
          <ul class="menu">
            <li>
              <Link to="/">Pesquisar Produtos</Link>
            </li>
            <li>
              <Link to="/carrinho">Meu Carrinho</Link>
            </li>
            <li>
              <Link to="/registro">Entrar / Cadastro</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default App;
