import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";

import AdmHomeAdmin from "./components/admin/HomeAdmin";
import AdmCreateUser from "./components/admin/createUserProduct/CreateUser";
import AdmCreateProduct from "./components/admin/createUserProduct/CreateProduct";
import AdmManageUsers from "./components/admin/manageUser/ManageUsers";
import AdmLayout from "./components/admin/adm_layout";

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
import UserSearch from "./components/search/Search";

import "./App.css";

import localCouponsData from "./data/coupons.json";
import localProductsData from "./data/products.json";
import localUsersData from "./data/users.json";

function App() {
  // Carrinho de compras
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
  
  // Fetch data when the component mounts
  useEffect(() => {
    const fetchLocalCoupons = async () => {
      try {
        const data = await Promise.resolve(localCouponsData);
        setCoupons(data);
      } catch (error) {
        console.error("Failed to load local coupons data:", error);
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

  }, []);

  const [loggedUser, setLoggedUser] = useState("");

  const handleRegisterUser = (newUser) => {
    const updatedUserData = [...users, newUser];

    console.log("Novo user no app.jsx");
    console.log({updatedUserData});

    setUsers(updatedUserData);

    console.log("Adicionando user no app.jsx")
    console.log({users});
  };

  const handleLoggedUser = (loggedUser) => {
    setLoggedUser(loggedUser.email);
  };

  return (
    <div className="App">
      <Header loggedUser={loggedUser} cartItemNumber={cartData.length} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/manage" element={<AdmLayout />}>
          <Route index element={<AdmHomeAdmin />} />
          <Route path="createUser" element={<AdmCreateUser />} />
          <Route path="createProduct" element={<AdmCreateProduct />} />
          <Route
            path="manageUsers"
            element={<AdmManageUsers users={users} />}
          />
        </Route>
        <Route path="/search" element={<UserSearch productsData={productData}/>}/>
        <Route path="/product" element={<ProductPage loggedUser={loggedUser}/>} />
        <Route path="/user" element={<UserPage />}>
          <Route
            index
            element={
              <UserProfile
                loggedUser={loggedUser}
                setLoggedUser={setLoggedUser}
              />
            }
          />
          <Route
            path="profile"
            element={
              <UserProfile
                loggedUser={loggedUser}
                setLoggedUser={setLoggedUser}
              />
            }
          />
          <Route
            path="payment-methods"
            element={
              <PaymentMethods
                loggedUser={loggedUser}
                setLoggedUser={setLoggedUser}
              />
            }
          />
          <Route
            path="coupons"
            element={
              <UserCoupons
                loggedUser={loggedUser}
                setLoggedUser={setLoggedUser}
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
              paymentMethods={loggedUser.paymentMethods}
              userCoupons={loggedUser.coupons}
              coupons={coupons}
              productData={productData}
              setCartData={setCartData}
              setProductData={setProductData}
            />
          }
        />
        <Route
          path="/auth"
          element={
            <LoginRegister
              users={users}
              onSaveRegister={handleRegisterUser}
              onSaveLogin={setLoggedUser}
            />
          }
        />
        <Route path="/recipe" element={<RecipePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
