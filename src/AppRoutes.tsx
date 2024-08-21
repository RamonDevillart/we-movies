// src/AppRoutes.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Checkout from "./pages/Checkout/Checkout";
import PostPurchase from "./pages/PostPurchase/PostPurchase";
import Header from "./components/Header/Header";
import Movies from "./components/Movies/Movies";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/post-purchase" element={<PostPurchase />} />
        <Route path="*" element={<div>Página não encontrada!</div>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
