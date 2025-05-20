import React from "react";
import "./ProductPage.css";
import LabeledEditableContainer from "./LabeledEditableContainer";
import { useLocation } from "react-router-dom";

function ProductPage({typeAccount}) {
  let isAdmin = typeAccount === "admin";
  isAdmin = true;

  const location = useLocation();
  const offer = location.state?.productData;

  const handleSave = (field, newValue) => {
    console.log(`Saving ${field}: ${newValue}`);

    offer[field] = newValue;
  }

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
              <img src={offer.image} alt="Imagem do Produto"></img>
            </div>
          </div>
          <br></br>
          <div className="product_description">
            <h2>{offer.name}</h2>
            <h3>Marca: Flor de Laranjeira</h3>
            
            {isAdmin ? (
                <LabeledEditableContainer
                  displayName={"Descrição do Produto"}
                  field={"descriptionName"}
                  handleSave={handleSave}
                  initialValue={offer.description}
                />
              ) : (
                <div>
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
                </div>
              )}

            {isAdmin ? (
              <LabeledEditableContainer
                displayName={"Preço do Produto"}
                field={"productPrice"}
                handleSave={handleSave}
                initialValue={offer.price}
              />
            ) : (
              <h3>Preço: R$ {offer.price}</h3>
            )}

            <div className="quantity-sold">
              {isAdmin ? (
                <LabeledEditableContainer
                  displayName={"Quantidade em Estoque"}
                  field={"quantityInStock"}
                  handleSave={handleSave}
                  initialValue={11111}
                />
              ) : (
                <h3>Quantidade em Estoque: 11111</h3>
              )}

              {isAdmin ? (
                <LabeledEditableContainer
                  displayName={"Quantidade Vendida"}
                  field={"quantitySold"}
                  handleSave={handleSave}
                  initialValue={11111}
                />
              ) : (
                <h3>Quantidade Vendida: 111111</h3>
              )}
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
