import React from 'react';
import honeyImg from "../../assets/adminImage.webp";
import './HomeAdmin.css'; // Importa o CSS

const HomeAdmin = () => {
  return (
    <div className="admin-container">
        <div className="admin-text">
            <h1>Página do Administrador</h1>
            <p>
                Olá, administrador do melhor mercado da região! Aqui, na página de administração,
                assim como os produtos oferecidos pelo nosso mercado, tudo é muito simples!
            </p>
        </div>

        <div className="admin-image">
            <img src={honeyImg} alt="Foto ilustrativa da área de administrador" />
        </div>
    </div>
  );
};

export default HomeAdmin;
