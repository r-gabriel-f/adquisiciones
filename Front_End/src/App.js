import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Requerimientos } from "./compononts/Almacen/Requerimientos";
import { Pedidos } from "./compononts/Cotizacion/Pedidos";
import { Login } from "./compononts/login/Login";
import { Aprobaciones } from "./compononts/Gerencia/Aprobaciones";
import { HistorialRequerimiento } from "./compononts/Almacen/HistorialRequerimiento";
import { ListaComprasPendientes } from "./compononts/Cotizacion/ListaComprasPendientes";
import { EstadoPedido } from "./compononts/Almacen/EstadoPedido";
import { EstadoCompras } from "./compononts/Cotizacion/EstadoCompras";
import { CotizacionGerencia } from "./compononts/Cotizacion/CotizacionGerencia";

function App() {
  const [username, setUsername] = useState("");
  const [userid, setUserid] = useState("");
  const putnombre = (nombre) => {
    setUsername(nombre);
  };
  const putid = (id) => {
    setUserid(id);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login putnombre={putnombre} putid={putid}/>} />
        <Route
          path="/requerimientos"
          element={<Requerimientos username={username} userid={userid}/>}
        />
        <Route
          path="/historial_requerimientos"
          element={<HistorialRequerimiento username={username} userid={userid}/>}
        />
        <Route
          path="/estado_pedidos"
          element={<EstadoPedido username={username} userid={userid}/>}
        />
        <Route path="/pedidos" element={<Pedidos username={username} />} />
        <Route path="/lista_compras_pendientes" element={<ListaComprasPendientes username={username} />} />
        <Route path="/estado_compras" element={<EstadoCompras username={username} />} />
        <Route path="/cotizacion_gerencia" element={<CotizacionGerencia username={username} />} />
        <Route path="/aprobaciones" element={<Aprobaciones username={username} />} />
      </Routes>
    </Router>
  );
}

export default App;
