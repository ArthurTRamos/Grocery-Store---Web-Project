import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";

import AdmHomeAdmin from "./components/admin/HomeAdmin";
import AdmCreateUser from "./components/admin/createUserProduct/CreateUser";
import AdmCreateProduct from "./components/admin/createUserProduct/CreateProduct";
import AdmManageUsers from "./components/admin/manageUser/ManageUsers";
import AdmLayout from "./components/admin/adm_layout"

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

import "./App.css";

import localCouponsData from "./data/coupons.json";
import localProductsData from "./data/products.json";
import localUsersData from "./data/users.json";

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

  const [productData, setProductData] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch coupons data when the component mounts
  useEffect(() => {
    const fetchLocalCoupons = async () => {
      try {
        const data = await Promise.resolve(localCouponsData);
        setCoupons(data);
      } catch (error) {
        console.error("Failed to load local coupons data:", error);
        // Set a default empty array or handle error state if loading fails
        setCoupons([]);
      }
    };

    const fetchLocalProducts = async () => {
      try {
        const data = await Promise.resolve(localProductsData);
        setProductData(data);
      } catch (error) {
        console.error("Failed to load local products data:", error);
        // Set a default empty array or handle error state if loading fails
        setProductData([]);
      }
    };

    const fetchLocalUsers = async () => {
      try {
        const data = await Promise.resolve(localUsersData);
        setUsers(data);
      } catch (error) {
        console.error("Failed to load local users data:", error);
        // Set a default empty array or handle error state if loading fails
        setUsers([]);
      }
    };

    fetchLocalProducts();
    fetchLocalCoupons();
    fetchLocalUsers();
  }, []); // Empty dependency array means this runs once on component mount

  // Usuário
  // Versão de teste, não tenho certeza como vamos lidar com os dados do usuário
  // O ideal seria fazer uma requisição para pegar os dados do usuário
  // e depois fazer uma requisição para atualizar os dados do usuário
  // mas como não temos backend ainda, vai assim mesmo pra teste
  const [userData, setUserData] = useState([{
    admin: true,
    id: 1,
    name: "Joãozinho da Silva Sauro",
    cel: 999429927,
    email: "sla@hotmail.com",
    password: "123456#",
    // birthDate: "2000-01-01",
    // cpf: "123.456.789-00",
    // rg: "12.345.678-9",
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
  }]);

  const [loggedUser, setLoggedUser] = useState("")

  const handleRegisterUser = (newUser) => {
    const updatedUserData = [...userData, newUser];

    setUserData(updatedUserData);
  }

  const handleLoggedUser = (loggedUser) => {
    setUserData(loggedUser.email);
  }

  return (
    <div className="App">
      <Header userData={userData} cartItemNumber={cartData.length} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/manage" element={< AdmLayout/>}>
          <Route index element={<AdmHomeAdmin />} />
          <Route path="createUser" element={<AdmCreateUser />} />
          <Route path="createProduct" element={<AdmCreateProduct />} />
          <Route
            path="manageUsers"
            element={<AdmManageUsers users={users} />}
          />
        </Route>
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
        <Route path="/login" element={<LoginRegister users={userData} handleRegisterUser={handleRegisterUser} handleLoggedUser={handleLoggedUser}/>} />
        <Route path="/recipe" element={<RecipePage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
