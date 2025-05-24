import React, {useState} from "react";
import "./ProductPage.css";
import LabeledEditableContainer from "./utility_elements/LabeledEditableContainer";
import { useLocation } from "react-router-dom";
import InputImage from "./utility_elements/input_image";

function ProductPage({loggedUser, productsData, setProductData, setCartData}) {
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.productData);

  let typeAccount;
  if(loggedUser === undefined) {
    typeAccount = false;
  } else {
    typeAccount = loggedUser.admin;
  }

  const handleSave = (field, newValue) => {
    console.log(`Saving ${field}: ${newValue}`);

    // Criar o produto atualizado
    const updatedProduct = {
      ...product,
      [field]: newValue,
    };

    const updatedProductsData = productsData.map((prod) => {
      if (prod.id === product.id) {
        return updatedProduct;
      }
    });

    setProduct(updatedProduct);
    setProductData(updatedProductsData);
  };
  
  return (
    <div>
      <main className="content-wrap">
        <div className="product">
          <div className="product_image">
            <div>
              {typeAccount ? (
                <LabeledEditableContainer
                  displayName={"Nome do Produto"}
                  field={"name"}
                  handleSave={handleSave}
                  initialValue={product.name}
                />
              ) : (
                <h2>{product.name}</h2>
              )}
            </div>
            <div>
              <img src={product.image} alt="Imagem do Produto"></img>
            </div>

            <div>
              {typeAccount ? (
                <InputImage
                  handleSave={handleSave}
                  field={"image"}
                  initialValue={product.image}
                />
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <br></br>
          <div className="product_description">
            {typeAccount ? (
                <LabeledEditableContainer
                  displayName={"Nome do Produto"}
                  field={"name"}
                  handleSave={handleSave}
                  initialValue={product.name}
                />
              ) : (
                <h2>{product.name}</h2>
              )}

            <h3>Descrição do produto</h3>

            <div>
              {typeAccount ? (
                <LabeledEditableContainer
                displayName={"Descrição do Produto"}
                field={"description"}
                handleSave={handleSave}
                initialValue={product.description}
                />
              ) : (
                <p>{product.description}</p>
              )}
            </div>
            
            <div>
              {typeAccount ? (
                <LabeledEditableContainer
                  displayName={"Preço do Produto"}
                  field={"price"}
                  handleSave={handleSave}
                  initialValue={product.price}
                />
              ) : (
                <h3>Preço: R${product.price}</h3>
              )}
            </div>

            <div className="quantity-sold">
              <div>
                {typeAccount ? (
                  <LabeledEditableContainer
                    displayName={"Quantidade Vendida"}
                    field={"sold"}
                    handleSave={handleSave}
                    initialValue={product.sold}
                  />
                ) : (
                  <h3>Quantidade Vendida: {product.sold}</h3>
                )}
              </div>
              <div>
                {typeAccount ? (
                  <LabeledEditableContainer
                    displayName={"Quantidade em Estoque"}
                    field={"stock"}
                    handleSave={handleSave}
                    initialValue={product.stock}
                  />
                ) : (
                  <h3>Quantidade em Estoque: {product.stock}</h3>
                )}
              </div>
            </div>

            <button 
              type="button" 
              class="add-to-cart"
              onClick={() => {
                setCartData((prevCartData) => [
                  ...prevCartData,
                  {
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                  },
                ]);
              }}
              >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductPage;
