import React from "react";
import "./ProductPage.css";
import honeyImg from "../images/mel.jpg";

function ProductPage() {
  return (
    <div>
      <main class="content-wrap">
        <div class="product">
          <div class="product_image">
            <h2> Mel da Abelha</h2>
            <br></br>
            <img src={honeyImg} alt="Imagem do Produto"></img>
          </div>

          <div class="product_description">
            <h3> Marca: Flor de Laranjeira</h3>

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

            <button type="button" class="carrinho">
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductPage;
