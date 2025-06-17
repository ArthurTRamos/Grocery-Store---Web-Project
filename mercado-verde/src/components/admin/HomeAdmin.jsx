import React from 'react';

import './HomeAdmin.css'; // Import CSS styles for the admin home page

import AdmImg from "../../assets/adminImage.webp"; // Import admin area illustrative image
import SideBar from './SideBar'; // Import sidebar component

const HomeAdmin = () => {
  return (
    <div className="admin-container">
      {/* Sidebar navigation */}
      <SideBar/>

      {/* Main content area of the admin page */}
      <div className="page-container">
        {/* Text content for the admin page */}
        <div className="admin-text">
            <h1>Página do Administrador</h1>
            <p>
                Olá, administrador do melhor mercado da região! Aqui, na página de administração,
                assim como os produtos oferecidos pelo nosso mercado, tudo é muito simples!
            </p>
        </div>

        {/* Container for the illustrative admin image */}
        <div className="admin-image">
            <img src={AdmImg} alt="Foto ilustrativa da área de administrador" />
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
