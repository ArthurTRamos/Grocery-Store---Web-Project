import React from 'react';
import "./RegisterPage.css"

function RegisterPage() {
  return (
    <div>
        <main class="content-wrap">
            <div class="forms-container">

                <form id="admin-form">
                    <fieldset>
                        <legend> Dados do Administrador </legend>

                        Nome Completo: <br></br><input type="text" id="admin-name" required></input><br></br>
                        Telefone: <br></br><input type="tel" id="admin-tel" required></input><br></br>
                        Email: <br></br><input type="email" id="admin-email" required></input><br></br>
                        Senha: <br></br><input type="password" id="admin-password" required></input><br></br>
                    </fieldset>

                    <button id="submit-admin">Adicionar Administrador</button>

                </form>

                <form id="product-form">
                    <fieldset>
                        <legend> Dados do Produto </legend>

                        Nome: <br></br><input type="text" id="product-name" required></input><br></br>
                        Imagem: <br></br><input type="file" id="product-image" accept="image/*" multiple required></input><br></br>
                        Descrição: <br></br><input type="text" id="product-desc" required></input><br></br>
                        Preço: <br></br><input type="number" id="product-price" required></input><br></br>
                        Quantidade em Estoque: <br></br><input type="number" id="product-stock-amount" required></input><br></br>
                        Quantidade Vendida: <br></br><input type="number" id="product-stock-amount" required></input><br></br> 

                    </fieldset>

                    <button id="submit-product">Adicionar Produto</button>

                </form>

            </div>
        </main>
    </div>
  );
}

export default RegisterPage;