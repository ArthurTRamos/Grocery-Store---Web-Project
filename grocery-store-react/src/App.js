import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import RegisterPage from './pages/RegisterPage';
import './App.css'; 

function App() {
  return (
    <div className="App">
      <header class="header">
        <Link to="/" className="logo">Logo | Nome</Link>
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

      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/carrinho" element={<ProductPage />} />
          <Route path="/registro" element={<RegisterPage />} />
      </Routes>
      
      <footer>
        <div class="footer-content">
            <div class="footer-section">
                <h3>Sobre</h3>
            </div>
            <div class="footer-section">
                <h3>Contato</h3>
            </div>
            <div class="footer-section">
                <h3>Redes Sociais</h3>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;