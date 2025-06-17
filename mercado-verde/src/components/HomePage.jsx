import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

import HomeImage from "../assets/homeImage.jpeg";
import FruitImage from "../assets/fruitImage.jpg";
import MeatImage from "../assets/meatImage.jpg";
import BakeryImage from "../assets/breadImage.jpg";
import GeneralImage from "../assets/generalImage.jpeg";

import {GetProducts} from "../services/Fetchs.js"

function HomePage() {
  const [productData, setProductData] = useState([]);
  // State to store all featured products with stock greater than 0
  const [featuredProducts, setFeaturedProducts] = useState([]);
  // State to store two random products for the "Offers" section
  const [twoRandomProducts, setTwoRandomProducts] = useState([]);

  useState(() => {
    const fetchProductsData = async () => {
      const data = await GetProducts();
      setProductData(data);
    }

    fetchProductsData();
  }, [])

  const nonZeroProducts = (products) => {
    return products.filter((product) => product.stock !== 0);
  };

  // Selects two random products from the given list
  const randomProducts = (products) => {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  };

  // useEffect to process product data whenever it changes
  useEffect(() => {
    if (productData && productData.length > 0) {
      const availableProducts = nonZeroProducts(productData);
      setFeaturedProducts(availableProducts); // Update featured products
      setTwoRandomProducts(randomProducts([...availableProducts])); // Select two random products
    }
  }, [productData]);

  console.log(twoRandomProducts); // Debugging: Logs the two random products

  return (
    <div>
      <main>
        {/* Hero section with introductory content */}
        <section id="home" className="hero">
          <div className="hero-content">
            <h2>
              Tudo o que Você Precisa <br></br> em um Só Lugar
            </h2>
            <p>
              Frutas, verduras, carnes, laticínios e muito mais, direto para a
              sua casa com qualidade e carinho.
            </p>
            <a href="#produtos" className="cta-button">
              Ver Produtos
            </a>
          </div>
          <div className="hero-image">
            <img src={HomeImage} alt="Produtos do mercado"></img>
          </div>
        </section>

        {/* Section showcasing product categories */}
        <section id="produtos" className="products">
          <h2>Nossos Produtos em Destaque</h2>

          <div className="product-grid">
            {/* Link to the "Fruits and Vegetables" section */}
            <Link
              to="/section"
              state={{ sectionData: "hortifrutis" }}
              className="product-section"
            >
              <div className="product-card">
                <img src={FruitImage} alt="Frutas e Legumes Frescos"></img>
                <h3>Frutas e Legumes Frescos</h3>
                <p className="description">
                  Variedade de frutas e legumes frescos e selecionados
                  diariamente
                </p>
                <ul className="features">
                  <li>Orgânicas disponíveis</li>
                  <li>Seleção premium</li>
                  <li>Direto do produtor</li>
                </ul>
              </div>
            </Link>

            {/* Link to the "Meat" section */}
            <Link
              to="/section"
              state={{ sectionData: "congelados" }}
              className="product-section"
            >
              <div className="product-card">
                <img src={MeatImage} alt="Açougue"></img>
                <h3>Carnes de Qualidade</h3>
                <p className="description">
                  Cortes especiais e carnes frescas todos os dias
                </p>
                <ul className="features">
                  <li>Cortes especiais</li>
                  <li>Carnes Premium</li>
                  <li>Variedade de Aves e suínos</li>
                </ul>
              </div>
            </Link>

            {/* Link to the "Bakery" section */}
            <Link
              to="/section"
              state={{ sectionData: "padaria" }}
              className="product-section"
            >
              <div className="product-card">
                <img src={BakeryImage} alt="Padaria"></img>
                <h3>Padaria Artesanal</h3>
                <p className="description">
                  Pães e doces artesanais preparados diariamente
                </p>
                <ul className="features">
                  <li>Fermentação natural</li>
                  <li>Receitas exclusivas da casa</li>
                  <li>Produção própria com ingredientes frescos</li>
                </ul>
              </div>
            </Link>

            {/* Link to the "General Products" section */}
            <Link
              to="/section"
              state={{ sectionData: "todos" }}
              className="product-section"
            >
              <div className="product-card">
                <img src={GeneralImage} alt="Produtos em geral"></img>
                <h3>Produtos em Geral</h3>
                <p className="description">
                  Tudo o que você precisa em um só lugar
                </p>
                <ul className="features">
                  <li>Produtos de limpeza, higiene pessoal e utilidades</li>
                  <li>Mercearia completa com enlatados e itens de despensa</li>
                  <li>Grande variedade de produtos importados e nacionais</li>
                </ul>
              </div>
            </Link>
          </div>
        </section>

        {/* Section showcasing two random featured products */}
        <section id="ofertas" className="offers">
          <h2>Produtos em Destaque</h2>
          <div className="offers-grid">
            {twoRandomProducts.length > 0 &&
              twoRandomProducts.map((product, index) => (
                <Link
                  to="/product"
                  state={{ productData: product }}
                  className="product-link"
                  key={index}
                >
                  <div className="offer-card">
                    <img
                      src={product.image}
                      alt="Produto em Destaque"
                    ></img>
                    <h3>{product.name}</h3>
                    <p className="offer-price">
                      R$ {product.price.toFixed(2)}
                    </p>
                    <p className="offer-description">{product.description}</p>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;