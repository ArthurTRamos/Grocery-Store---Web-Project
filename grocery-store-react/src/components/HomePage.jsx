import React, {useState, useEffect} from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

function HomePage({productData}) {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [twoRandomProducts, setTwoRandomProducts] = useState([]);

  const nonZeroProducts = (products) => {
    return products.filter((product) => product.stock !== 0);
  };

  const randomProducts = (products) => {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  }

  // useEffect para processar os produtos quando productData mudar
  useEffect(() => {
    if (productData && productData.length > 0) {
      const availableProducts = nonZeroProducts(productData);
      setFeaturedProducts(availableProducts);
      setTwoRandomProducts(randomProducts([...availableProducts])); // spread para não modificar o original
    }
  }, [productData]);

  console.log(twoRandomProducts);

  return (
    <div>
      <main>
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
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800"
              alt="Produtos do mercado"
            ></img>
          </div>
        </section>

        <section id="produtos" className="products">
          <h2>Nossos Produtos em Destaque</h2>

          <div className="product-grid">
          <Link to="/section" state={{sectionData: "hortifrutis"}} className="product-section">
            <div className="product-card">
              <img
                src="https://cdn.samaisvarejo.com.br/portal/principal/arquivos/imagens/20220513_hortifruti_materia.jpg"
                alt="Frutas e Legumes Frescos"
              ></img>
              <h3>Frutas e Legumes Frescos</h3>
              <p className="description">
                Variedade de frutas e legumes frescos e selecionados diariamente
              </p>
              <ul className="features">
                <li>Orgânicas disponíveis</li>
                <li>Seleção premium</li>
                <li>Direto do produtor</li>
              </ul>
            </div>
            </Link>

            <Link to="/section" state={{sectionData: "congelados"}} className="product-section">
            <div className="product-card">
              <img
                src="https://www.assai.com.br/sites/default/files/whatsapp_image_2021-10-21_at_12.27.38_0_0.jpg"
                alt="Açougue"
              ></img>
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

            <Link to="/section" state={{sectionData: "padaria"}} className="product-section">
            <div className="product-card">
              <img
                src="https://i.pinimg.com/originals/c7/34/53/c73453745ad3c70f737b0dc9bbc1dfa7.jpg"
                alt="Padaria"
              ></img>
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

            <Link to="/section" state={{sectionData: "todos"}} className="product-section">
            <div className="product-card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO6MqnvZxF2iFZdKn8olG2mWD7d5R0zhgLZA&s"
                alt="Produtos em geral"
              ></img>
              <h3>Produtos em Geral</h3>
              <p className="description">Tudo o que você precisa em um só lugar</p>
              <ul className="features">
                <li>Produtos de limpeza, higiene pessoal e utilidades</li>
                <li>Mercearia completa com enlatados e itens de despensa</li>
                <li>Grande variedade de produtos importados e nacionais</li>
              </ul>
            </div>
            </Link>
          </div>
        </section>

        <section id="ofertas" className="offers">
          <h2>Produtos em Destaque</h2>
          <div className="offers-grid">
            {twoRandomProducts.length > 0 && twoRandomProducts.map((product, index) => (
              <Link to="/product" state={{productData: product}} className="product-link">
                <div className="offer-card">
                  <img
                    src={product.image}
                    alt="Produto em Destaque"
                  ></img>
                  <h3>{product.name}</h3>
                  <p className="offer-price">R$ {product.price}</p>
                  <p className="offer-description">
                    {product.description}
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