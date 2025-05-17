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

  // Obs: Eu n sei se a gente vai fazer assim, isso é só teste
  const [userData, setUserData] = useState({
    logged: true,
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
        id: 1,
        cardNumber: "1234 5678 9012 3456",
        cardHolderName: "Joãozinho da Silva Sauro",
        expirationDate: "12/25",
        cvv: "123",
      },
      {
        id: 2,
        cardNumber: "9876 5432 1098 7654",
        cardHolderName: "Joãozinho da Silva Sauro",
        expirationDate: "11/24",
        cvv: "456",
      },
    ],
  });

  return (
    <div className="App">
      <Header userData={userData} cartItemNumber={cart.itemNumber} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/user" element={<UserPage />}>
          <Route index element={<UserProfile userData={userData} setUserData={setUserData} />} />
          <Route path="profile" element={<UserProfile userData={userData} setUserData={setUserData} />} />
          <Route 
            path="payment-methods"
            element={<PaymentMethods userData={userData} setUserData={setUserData} />}
          />
        </Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
