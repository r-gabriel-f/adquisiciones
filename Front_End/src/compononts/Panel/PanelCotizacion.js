import React from "react";
import { useNavigate } from "react-router-dom";
export const PanelCotizacion = () => {
  const navigate = useNavigate();

  const handlePedidosClick = () => {
    navigate("/pedidos");
  };
  const handleListaClick = () => {
    navigate("/lista_compras_pendientes");
  };
  const handleEstadoClick = () => {
    navigate("/estado_compras");
  };
  return (
    <div className="fixed bg-gray-50 dark:bg-gray-900 text-white w-56 h-screen">
      <div className="flex aling-center justify-center m-5">
        <h2 className="text-4xl text-white">Cotizacion</h2>
      </div>

      <div className="mx-5">
        <div
          className="flex my-4 justify-center bg-gray-900 hover:bg-gray-950 hover:rounded-lg hover:text-[#eafdf5] hover:cursor-pointer"
          onClick={handlePedidosClick}
        >
          <span>Ver Pedidos</span>
        </div>

        <div className="mx-5">
          <div
            className="flex my-4 justify-center bg-gray-900 hover:bg-gray-950 hover:rounded-lg hover:text-[#eafdf5] hover:cursor-pointer"
            onClick={handleListaClick}
          >
            <span>Lista de Compras Pendientes</span>
          </div>
        </div>
        <div
          className="flex my-4 justify-center bg-gray-900 hover:bg-gray-950 hover:rounded-lg hover:text-[#eafdf5] hover:cursor-pointer"
          onClick={handleEstadoClick}
        >
          <span>Estado de Pedido</span>
        </div>
      </div>
    </div>
  );
};
