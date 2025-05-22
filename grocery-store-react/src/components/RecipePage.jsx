import React, { useState } from "react";
import "./RecipePage.css";
import { useLocation } from "react-router-dom";
import Button from "./utility_elements/botao";

function RecipePage() {
  const [recipes, samaisvarejo] = useState();
  const location = useLocation();

  return (
    <div>
      <div>
        <h1>Receitas Inteligentes</h1>
        <p>
          Escolha o tipo de refeição que deseja preparar e nossa IA irá sugerir
          uma receita deliciosa com os ingredientes disponíveis em nossa loja
        </p>
      </div>
    </div>
  );
}

export default RecipePage;
