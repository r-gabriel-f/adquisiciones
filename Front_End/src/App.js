import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Requerimientos } from "./compononts/Almacen/Requerimientos";
import { Pedidos } from "./compononts/Cotizacion/Pedidos";
import { Login } from "./compononts/login/Login";
import { Aprobaciones } from "./compononts/Gerencia/Aprobaciones";

function App() {
  const [username, setUsername] = useState("");
  const putnombre = (nombre) => {
    setUsername(nombre);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login putnombre={putnombre} />} />
        <Route
          path="/requerimientos"
          element={<Requerimientos username={username} />}
        />
        <Route path="/pedidos" element={<Pedidos username={username} />} />
        <Route path="/aprobaciones" element={<Aprobaciones username={username} />} />
      </Routes>
    </Router>
  );
}

export default App;
