import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientsPage from "./pages/Clients";
import ProductsPage from "./pages/Products";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<ProductsPage/>} />
        <Route exact path="/Clientes" element={<ClientsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
