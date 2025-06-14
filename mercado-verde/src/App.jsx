import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { GetProducts, CreateProduct, UpdateCoupon, GetUserById} from "./services/Fetchs";

import HomePage from "./components/HomePage";

import AdmHomeAdmin from "./components/admin/HomeAdmin";
import AdmCreateUser from "./components/admin/createUserProduct/CreateUser";
import AdmCreateProduct from "./components/admin/createUserProduct/CreateProduct";
import AdmCreateCoupon from "./components/admin/createUserProduct/CreateCoupon";
import AdmManageUsers from "./components/admin/manageUser/ManageUsers";
import AdmLayout from "./components/admin/adm_layout";

import AdmEditUserPage from "./components/admin/manageUser/editProfileUser/EditUserPage";
import AdmEditProfile from "./components/admin/manageUser/editProfileUser/EditProfile";
import AdmEditPaymentMethods from "./components/admin/manageUser/editProfileUser/EditPaymentMethods";
import AdmEditUserCoupons from "./components/admin/manageUser/editProfileUser/EditUserCoupons";

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
import Logout from "./components/user/Logout";
import Sections from "./components/sections/Sections";

import "./App.css";

import localCouponsData from "./data/coupons.json";
import localProductsData from "./data/backendProducts.json";
import localUsersData from "./data/users.json";


function App() {
  // Carrinho de compras
  const [cartData, setCartData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [users, setUsers] = useState([]);
  const [loggedUser, setLoggedUser] = useState("");
  const [loggedUserId, setLoggedUserId] = useState("");
  const [randomUser, setRandomUser] = useState("");

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

  useEffect(() => {
    const orderProductsByName = () => {
      productData.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    };

    orderProductsByName();
  }, [productData]);

  const handleRegisterUser = (newUser) => {
    const updatedUserData = [...users, newUser];

    console.log("Novo user no app.jsx");
    console.log({ updatedUserData });

    setUsers(updatedUserData);

    console.log("Adicionando user no app.jsx");
    console.log({ users });
  };

  return (
    <div className="App">
      <Header loggedUserId={loggedUserId} cartItemNumber={cartData.length} />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              productData={productData}
              setProductData={setProductData}
            />
          }
        />
        <Route path="/manage" element={<AdmLayout loggedUserId={loggedUserId} />}>
          <Route index element={<AdmHomeAdmin />} />
          <Route
            path="createUser"
            element={<AdmCreateUser users={users} setUsers={setUsers} />}
          />
          <Route
            path="createProduct"
            element={
              <AdmCreateProduct
                products={productData}
                setProducts={setProductData}
              />
            }
          />
          <Route
            path="createCoupon"
            element={
              <AdmCreateCoupon coupons={coupons} setCoupons={setCoupons} />
            }
          />
          <Route
            path="manageUsers"
            element={
              <AdmManageUsers
                users={users}
                setUsers={setUsers}
                loggedUser={loggedUser}
              />
            }
          />
          <Route
            path="manageUsers/edit"
            element={
              <AdmEditUserPage
                loggedUser={loggedUser}
                users={users}
                setUsers={setUsers}
              />
            }
          >
            <Route
              index
              element={
                <AdmEditProfile
                  setUsers={setUsers}
                  userToBeEdited={randomUser}
                  setUserToBeEdited={setRandomUser}
                  loggedUser={loggedUser}
                  setLoggedUser={setLoggedUser}
                />
              }
            />
            <Route
              index
              path="profile"
              element={
                <AdmEditProfile
                  setUsers={setUsers}
                  userToBeEdited={randomUser}
                  setUserToBeEdited={setRandomUser}
                  loggedUser={loggedUser}
                  setLoggedUser={setLoggedUser}
                />
              }
            />
            <Route
              path="payment-methods"
              element={
                <AdmEditPaymentMethods
                  setUsers={setUsers}
                  userToBeEdited={randomUser}
                  setUserToBeEdited={setRandomUser}
                />
              }
            />
            <Route
              path="coupons"
              element={
                <AdmEditUserCoupons
                  coupons={coupons}
                  userToBeEdited={randomUser}
                  setUserToBeEdited={setRandomUser}
                  setUsers={setUsers}
                />
              }
            />
          </Route>
        </Route>
        <Route path="/section" element={<Sections products={productData} />} />
        <Route
          path="/product"
          element={
            <ProductPage
              loggedUserId={loggedUserId}
              setCartData={setCartData}
              cartData={cartData}
            />
          }
        />
        <Route
          path="/user"
          element={
            <UserPage
              loggedUser={loggedUserId}
            />
          }
        >
          <Route
            index
            element={
              <UserProfile
                loggedUser={loggedUserId}
              />
            }
          />
          {/* <Route
            index
            path="profile"
            element={
              <UserProfile
                loggedUser={loggedUser}
                setLoggedUser={setLoggedUser}
                setUsers={setUsers}
              />
            }
          /> */}
          <Route
            path="payment-methods"
            element={
              <PaymentMethods
                loggedUser={loggedUserId}
              />
            }
          />
          <Route
            path="coupons"
            element={
              <UserCoupons
                loggedUser={loggedUserId}
              />
            }
          />
        </Route>
        <Route
          path="/cart"
          element={
            <CartPage
              cartData={cartData}
              setCartData={setCartData}
              loggedUser={loggedUserId}
            />
          }
        />
        <Route
          path="/auth"
          element={
            <LoginRegister
              setLoggedUserId={setLoggedUserId}
            />
          }
        />
        <Route
          path="/logout"
          element={<Logout setLoggedUserId={setLoggedUserId} />}
        />
        <Route path="/recipe" element={<RecipePage products={productData} />} />

        <Route path="*" element={<HomePage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
