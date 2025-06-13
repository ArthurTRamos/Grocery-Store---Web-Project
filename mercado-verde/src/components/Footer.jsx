import React from "react";
import "./Footer.css"

function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Nossas Lojas</h3>
            <p>Loja 1 - Rua das Palmeiras, 127 - Jardim Paulista, São Paulo - SP, 01423-000</p>
            <p>Loja 2 - Avenida Getúlio Vargas, 880 - Centro, Belo Horizonte - MG, 30112-020</p>
            <p>Loja 3 - Rua Tenente Silveira, 250 - Centro, Florianópolis - SC, 88010-300</p>
          </div>
          <div className="footer-section">
            <h3>Contato</h3>
            <p>Telefone 1 - (11) 98765-4321</p>
            <p>Telefone 2 - (21) 99876-5432</p>
            <p>Email - joao.silva1988@email.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
