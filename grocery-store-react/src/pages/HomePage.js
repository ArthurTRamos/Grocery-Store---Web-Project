import React from 'react';
import "./HomePage.css"

function HomePage() {
  return (
    <div>
        <main>
            <section id="home" class="hero">
                <div class="hero-content">
                    <h2>Tudo o que Você Precisa <br></br> em um Só Lugar</h2>
                    <p>Frutas, verduras, carnes, laticínios e muito mais, direto para a sua casa com qualidade e carinho.</p>
                    <a href="#produtos" class="cta-button">Ver Produtos</a>
                </div>
                <div class="hero-image">
                    <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800" alt="Produtos do mercado"></img>
                </div>
            </section>

            <section id="produtos" class="products">
                <h2>Nossos Produtos em Destaque</h2>
                <div class="product-grid">
                    <div class="product-card">
                        <img src="https://cdn.samaisvarejo.com.br/portal/principal/arquivos/imagens/20220513_hortifruti_materia.jpg" alt="Frutas e Legumes Frescos"></img>
                        <h3>Frutas e Legumes Frescos</h3>
                        <p class="description">Variedade de frutas e legumes frescos e selecionados diariamente</p>
                        <ul class="features">
                            <li>Orgânicas disponíveis</li>
                            <li>Seleção premium</li>
                            <li>Direto do produtor</li>
                        </ul>
                    </div>
                    <div class="product-card">
                        <img src="https://www.assai.com.br/sites/default/files/whatsapp_image_2021-10-21_at_12.27.38_0_0.jpg" alt="Açougue"></img>
                        <h3>Carnes de Qualidade</h3>
                        <p class="description">Cortes especiais e carnes frescas todos os dias</p>
                        <ul class="features">
                            <li>Cortes especiais</li>
                            <li>Carnes Premium</li>
                            <li>Variedade de Aves e suínos</li>
                        </ul>
                    </div>
                    <div class="product-card">
                        <img src="https://i.pinimg.com/originals/c7/34/53/c73453745ad3c70f737b0dc9bbc1dfa7.jpg" alt="Padaria"></img>
                        <h3>Padaria Artesanal</h3>
                        <p class="description">Pães e doces artesanais preparados diariamente</p>
                        <ul class="features">
                            <li>Fermentação natural</li>
                            <li>Receitas exclusivas da casa</li>
                            <li>Produção própria com ingredientes frescos</li>
                        </ul>
                    </div>
                    <div class="product-card">
                        <img src="https://media.istockphoto.com/id/1157106624/pt/foto/all-your-necessities-stored-in-one-place.jpg?s=612x612&w=0&k=20&c=QADz-fF7X_vN3fh4CabC8Xsw0zGVNQret6gZJozlw2o=" alt="Produtos em geral"></img>
                        <h3>Produtos em Geral</h3>
                        <p class="description">Tudo o que você precisa em um só lugar</p>
                        <ul class="features">
                            <li>Produtos de limpeza, higiene pessoal e utilidades</li>
                            <li>Mercearia completa com enlatados e itens de despensa</li>
                            <li>Grande variedade de produtos importados e nacionais</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section id="ofertas" class="offers">
                <h2>Ofertas da Semana</h2>
                <div class="offers-grid">
                    <div class="offer-card">
                        <div class="discount-tag">-15%</div>
                        <img src="https://static.paodeacucar.com/img/uploads/1/278/24591278.jpg" alt="Oferta Especial"></img>
                        <h3>Café 3 Corações 500g</h3>
                        <p class="original-price">R$ 36,99</p>
                        <p class="offer-price">R$ 31,44</p>
                        <p class="offer-description">Café Torrado e Moído a Vácuo 3 Corações Pacote 500g</p>
                    </div>
                    <div class="offer-card">
                        <div class="discount-tag">-17%</div>
                        <img src="https://static.paodeacucar.com/img/uploads/1/636/24623636.jpg" alt="Oferta Especial"></img>
                        <h3>Coca-Cola Zero 2l</h3>
                        <p class="original-price">R$ 12,79</p>
                        <p class="offer-price">R$ 10,49</p>
                        <p class="offer-description">Refrigerante sem Açúcar Coca-Cola Zero Garrafa 2l</p>
                    </div>
                </div>
            </section>
        </main>
    </div>
  );
}

export default HomePage;