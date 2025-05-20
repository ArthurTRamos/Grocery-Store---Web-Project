import React from "react";
import "./ProductPage.css";
import honeyImg from "../images/mel.jpg";
import LabeledEditableContainer from "./utility_elements/LabeledEditableContainer";
import { useLocation } from "react-router-dom";

function ProductPage({ typeAccount }) {
  let isAdmin = typeAccount === "admin";
  isAdmin = true;

  const location = useLocation();
  const offer = location.state?.productData;

  const handleSave = (field, newValue) => {
    console.log(`Saving ${field}: ${newValue}`);
  };

  return (
    <div>
      <main className="content-wrap">
        <div className="product">
          <div className="product_image">
            <div>
              {isAdmin ? (
                <LabeledEditableContainer
                  displayName={"Nome do Produto"}
                  field={"productName"}
                  handleSave={handleSave}
                  initialValue={offer.name}
                />
              ) : (
                <h2>{offer.name}</h2>
              )}
            </div>
            <div>
              <img src={honeyImg} alt="Imagem do Produto"></img>
            </div>
          </div>
          <br></br>
          <div className="product_description">
            {isAdmin ? (
              <LabeledEditableContainer
                displayName={"Nome do Produto"}
                field={"productName"}
                handleSave={handleSave}
                initialValue={offer.name}
              />
            ) : (
              <h2>{offer.name}</h2>
            )}
            <h3>Marca: Flor de Laranjeira</h3>

            <h3>Descrição do produto</h3>

            <p>
              {" "}
              O mel da abelha é um alimento natural produzido pelas abelhas a
              partir do néctar das flores. É um produto doce e nutritivo,
              utilizado na culinária e conhecido por seus benefícios à saúde. O
              processo de produção do mel envolve a coleta do néctar, a
              transformação por enzimas digestivas das abelhas e o armazenamento
              em favos de mel.
            </p>

            <h3>Preço: R$19,90</h3>

            <div className="quantity-sold">
              <h3>Quantidade em Estoque: 11111</h3>
              <h3>Quantidade Vendida: 111111</h3>
            </div>

            <button type="button" class="add-to-cart">
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductPage;
