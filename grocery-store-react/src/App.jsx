import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import UserPage from "./pages/UserPage";
import UserProfile from "./pages/UserProfile";
import PaymentMethods from "./pages/PaymentMethods";

import "./App.css";

function App() {
  const [cart, setCart] = useState({
    itemNumber: 0,
  });

  const [user, setUser] = useState({
    logged: true,
    admin: true,
    name: "João Silva",
  });

  return (
    <div className="App">
      <Header user={user} cartItemNumber={cart.itemNumber} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/user" element={<UserPage />}>
          <Route index element={<UserProfile />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="payment-methods" element={<PaymentMethods />} />
        </Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
