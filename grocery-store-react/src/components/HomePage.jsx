import React, {useState, useEffect} from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

import localOffers from "../data/offers.json";

function HomePage({offers, handleOfferChange}) {  
  return (
    <div>
      <main>
        <section id="home" class="hero">
          <div class="hero-content">
            <h2>
              Tudo o que Você Precisa <br></br> em um Só Lugar
            </h2>
            <p>
              Frutas, verduras, carnes, laticínios e muito mais, direto para a
              sua casa com qualidade e carinho.
            </p>
            <a href="#produtos" class="cta-button">
              Ver Produtos
            </a>
          </div>
          <div class="hero-image">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800"
              alt="Produtos do mercado"
            ></img>
          </div>
        </section>

        <section id="produtos" class="products">
          <h2>Nossos Produtos em Destaque</h2>

          <div class="product-grid">
          <Link to="/section" state={{sectionData: "hortifrutis"}} className="product-section">
            <div className="product-card">
              <img
                src="https://cdn.samaisvarejo.com.br/portal/principal/arquivos/imagens/20220513_hortifruti_materia.jpg"
                alt="Frutas e Legumes Frescos"
              ></img>
              <h3>Frutas e Legumes Frescos</h3>
              <p class="description">
                Variedade de frutas e legumes frescos e selecionados diariamente
              </p>
              <ul class="features">
                <li>Orgânicas disponíveis</li>
                <li>Seleção premium</li>
                <li>Direto do produtor</li>
              </ul>
            </div>
            </Link>

            <Link to="/section" state={{sectionData: "congelados"}} className="product-section">
            <div class="product-card">
              <img
                src="https://www.assai.com.br/sites/default/files/whatsapp_image_2021-10-21_at_12.27.38_0_0.jpg"
                alt="Açougue"
              ></img>
              <h3>Carnes de Qualidade</h3>
              <p class="description">
                Cortes especiais e carnes frescas todos os dias
              </p>
              <ul class="features">
                <li>Cortes especiais</li>
                <li>Carnes Premium</li>
                <li>Variedade de Aves e suínos</li>
              </ul>
            </div>
            </Link>

            <Link to="/section" state={{sectionData: "padaria"}} className="product-section">
            <div class="product-card">
              <img
                src="https://i.pinimg.com/originals/c7/34/53/c73453745ad3c70f737b0dc9bbc1dfa7.jpg"
                alt="Padaria"
              ></img>
              <h3>Padaria Artesanal</h3>
              <p class="description">
                Pães e doces artesanais preparados diariamente
              </p>
              <ul class="features">
                <li>Fermentação natural</li>
                <li>Receitas exclusivas da casa</li>
                <li>Produção própria com ingredientes frescos</li>
              </ul>
            </div>
            </Link>

            <Link to="/section" state={{sectionData: "todos"}} className="product-section">
            <div class="product-card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO6MqnvZxF2iFZdKn8olG2mWD7d5R0zhgLZA&s"
                alt="Produtos em geral"
              ></img>
              <h3>Produtos em Geral</h3>
              <p class="description">Tudo o que você precisa em um só lugar</p>
              <ul class="features">
                <li>Produtos de limpeza, higiene pessoal e utilidades</li>
                <li>Mercearia completa com enlatados e itens de despensa</li>
                <li>Grande variedade de produtos importados e nacionais</li>
              </ul>
            </div>
            </Link>
          </div>
        </section>

        <section id="ofertas" class="offers">
          <h2>Produtos em Destaque</h2>
          <div class="offers-grid">

            {offers.map(offer => (
              <Link to="/product" state={{productData: offer}} className="product-link">
                <div class="offer-card">
                  <div class="discount-tag">{offer.discount}%</div>
                  <img
                    src={offer.image}
                    alt="Produto em Destaque"
                  ></img>
                  <h3>{offer.name}</h3>
                  <p class="original-price">R$ {offer.originalPrice}</p>
                  <p class="offer-price">R$ {offer.offerPrice}</p>
                  <p class="offer-description">
                    {offer.description}
                  </p>
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
