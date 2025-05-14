import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import RegisterPage from "./pages/RegisterPage";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/carrinho" element={<ProductPage />} />
        <Route path="/registro" element={<RegisterPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
