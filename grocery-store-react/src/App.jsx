import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";

import AdmHomeAdmin from "./components/admin/HomeAdmin";
import AdmCreateUser from "./components/admin/createUserProduct/CreateUser";
import AdmCreateProduct from "./components/admin/createUserProduct/CreateProduct";
import AdmManageUsers from "./components/admin/manageUser/ManageUsers";

import ProductPage from "./components/ProductPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserPage from "./components/user/UserPage";
import UserProfile from "./components/user/UserProfile";
import PaymentMethods from "./components/user/PaymentMethods";
import CartPage from "./components/cart/CartPage";
import UserCoupons from "./components/user/UserCoupons";
import LoginRegister from "./components/LoginRegister";
import RecipePage from "./components/RecipePage";

import honeyImg from "./images/mel.jpg";

import "./App.css";

function App() {
  // Carrinho de compras
  // Eu imagino que a versão final vai ser algo desse estilo mesmo
  const [cartData, setCartData] = useState([
    {
      id: 14,
      amount: 2,
    },
    {
      id: 22,
      amount: 1,
    },
    {
      id: 38,
      amount: 3,
    },
    {
      id: 57,
      amount: 1,
    },
  ]);

  // Produtos
  // Versão de teste, não tenho certeza como vamos lidar com os produtos
  // O ideal seria fazer uma requisição para pegar os dados dos produtos
  // e depois fazer uma requisição para atualizar os dados dos produtos
  // mas como não temos backend ainda, vai assim mesmo pra teste
  const [productData, setProductData] = useState([
    {
      id: 14,
      name: "Produto 1",
      price: 5.0,
      stock: 2,
      image: honeyImg,
    },
    {
      id: 22,
      name: "Produto 2",
      price: 20.0,
      stock: 5,
      image: honeyImg,
    },
    {
      id: 38,
      name: "Produto 3",
      price: 15.0,
      stock: 3,
      image: honeyImg,
    },
    {
      id: 57,
      name: "Produto 4",
      price: 19.99,
      stock: 3,
      image: honeyImg,
    },
  ]);

  // Cupoms
  // Versão de teste, não tenho certeza como vamos lidar com os cupons
  // O ideal seria fazer uma requisição para pegar os dados dos cupons
  // e depois fazer uma requisição para atualizar os dados dos cupons
  // mas como não temos backend ainda, vai assim mesmo pra teste
  const [coupons, setCoupons] = useState([
    {
      couponNumber: "NEWUSER",
      discount: 10,
      type: "percent",
    },
    {
      couponNumber: "TENOFF",
      discount: 10,
      type: "money",
    },
    {
      couponNumber: "GIGA12",
      discount: 12,
      type: "percent",
    },
    {
      couponNumber: "FREEFIVE",
      discount: 5,
      type: "money",
    },
  ]);

  // Usuário
  // Versão de teste, não tenho certeza como vamos lidar com os dados do usuário
  // O ideal seria fazer uma requisição para pegar os dados do usuário
  // e depois fazer uma requisição para atualizar os dados do usuário
  // mas como não temos backend ainda, vai assim mesmo pra teste
  const [userData, setUserData] = useState({
    admin: true,
    name: "Joãozinho da Silva Sauro",
    cel: 999429927,
    email: "sla@hotmail.com",
    adress: {
      streetName: "Rua Exemplo",
      streetNumber: "123",
      apartmentNumber: "Apt 101",
      city: "São Carlos",
      state: "SP",
      postalCode: "13560-001",
      country: "Brazil",
    },
    paymentMethods: [
      {
        cardNumber: "1234 5678 9012 3456",
        cardHolderName: "Joãozinho da Silva Sauro",
        expirationDate: "12/25",
        cvv: "123",
      },
      {
        cardNumber: "9876 5432 1098 7654",
        cardHolderName: "Joãozinho da Silva Sauro",
        expirationDate: "11/24",
        cvv: "456",
      },
    ],
    coupons: [
      {
        couponNumber: "NEWUSER",
        used: false,
      },
      {
        couponNumber: "TENOFF",
        used: true,
      },
    ],
  });

  const [usersVectorData, setUsersVectorData] = useState([{
    admin: true,
    name: "Joãozinho da Silva Sauro",
    cel: 999429927,
    email: "sla@hotmail.com",
    adress: {
      streetName: "Rua Exemplo",
      streetNumber: "123",
      apartmentNumber: "Apt 101",
      city: "São Carlos",
      state: "SP",
      postalCode: "13560-001",
      country: "Brazil",
    },
    paymentMethods: [
      {
        cardNumber: "1234 5678 9012 3456",
        cardHolderName: "Joãozinho da Silva Sauro",
        expirationDate: "12/25",
        cvv: "123",
      },
      {
        cardNumber: "9876 5432 1098 7654",
        cardHolderName: "Joãozinho da Silva Sauro",
        expirationDate: "11/24",
        cvv: "456",
      },
    ],
    coupons: [
      {
        couponNumber: "NEWUSER",
        used: false,
      },
      {
        couponNumber: "TENOFF",
        used: true,
      },
    ],
  },

  {
    admin: false,
    name: "German Ezequiel Cano",
    cel: 999421111,
    email: "fluminense@hotmail.com",
    adress: {
      streetName: "Rua Tricolor",
      streetNumber: "1902",
      apartmentNumber: "Apt 2023",
      city: "Rio de Janeiro",
      state: "RJ",
      postalCode: "20543-029",
      country: "Brazil",
    },
    paymentMethods: [
      {
        cardNumber: "1234 5678 1111 1111",
        cardHolderName: "German Ezequiel Cano",
        expirationDate: "12/25",
        cvv: "123",
      },
      {
        cardNumber: "9876 5432 1111 1111",
        cardHolderName: "German Ezequiel Cano",
        expirationDate: "11/24",
        cvv: "456",
      },
    ],
    coupons: [
      {
        couponNumber: "NEWUSER",
        used: false,
      },
      {
        couponNumber: "TENOFF",
        used: true,
      },
    ],
  }

]);

  return (
    <div className="App">
      <Header userData={userData} cartItemNumber={cartData.length} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/manage" element={<AdmHomeAdmin />} />
          <Route path="createUser" element={<AdmCreateUser />} />
          <Route path="createProduct" element={<AdmCreateProduct />} />
          <Route path="manageUsers" element={<AdmManageUsers users={usersVectorData}/>}/>

        <Route path="/product" element={<ProductPage />} />
        <Route path="/user" element={<UserPage />}>
          <Route
            index
            element={
              <UserProfile userData={userData} setUserData={setUserData} />
            }
          />
          <Route
            path="profile"
            element={
              <UserProfile userData={userData} setUserData={setUserData} />
            }
          />
          <Route
            path="payment-methods"
            element={
              <PaymentMethods userData={userData} setUserData={setUserData} />
            }
          />
          <Route
            path="coupons"
            element={
              <UserCoupons
                userData={userData}
                setUserData={setUserData}
                coupons={coupons}
              />
            }
          />
        </Route>
        <Route
          path="/cart"
          element={
            <CartPage
              cartData={cartData}
              paymentMethods={userData.paymentMethods}
              userCoupons={userData.coupons}
              coupons={coupons}
              productData={productData}
              setCartData={setCartData}
              setProductData={setProductData}
            />
          }
        />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/recipe" element={<RecipePage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
