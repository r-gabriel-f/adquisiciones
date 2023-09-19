import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Requerimientos } from "./compononts/Almacen/Requerimientos";
import { Pedidos } from "./compononts/Cotizacion/Pedidos";
import { Login } from "./compononts/login/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/requerimientos" element={<Requerimientos />} />
        <Route path="/pedidos" element={<Pedidos />} />
      </Routes>
    </Router>
  );
}

export default App;
