// src/AppRoutes.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Checkout from "./pages/Checkout/Checkout";
import Header from "./components/Header/Header";


const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />    
        <Route path="*" element={<div>Página não encontrada!</div>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
