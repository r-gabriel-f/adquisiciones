import React from "react";
import { useNavigate } from "react-router-dom";
export const PanelAlmacen = () => {
  const navigate = useNavigate(); // Obtiene la función de navegación

  const handleHistorialClick = () => {
    navigate("/historial_requerimientos");
  };
  const handleRequerimientoClick = () => {
    navigate("/requerimientos");
  };
  return (
    <div className="fixed bg-gray-50 dark:bg-gray-900 text-white w-56 h-screen">
      <div className="flex aling-center justify-center m-5">
        <h2 className="text-4xl text-white">Almacen</h2>
      </div>

      <div className="mx-5">
        <div
          className="flex my-4 justify-center bg-gray-900 hover:bg-gray-950 hover:rounded-lg hover:text-[#eafdf5] hover:cursor-pointer"
          onClick={handleRequerimientoClick}
        >
          <span>Pedidos</span>
        </div>

        <div className="mx-5">
          <div
            className="flex my-4 justify-center bg-gray-900 hover:bg-gray-950 hover:rounded-lg hover:text-[#eafdf5] hover:cursor-pointer"
            onClick={handleHistorialClick}
          >
            <span>Historial</span>
          </div>
        </div>
        <div className="flex my-4 justify-center bg-gray-900 hover:bg-gray-950 hover:rounded-lg hover:text-[#eafdf5] hover:cursor-pointer">
          <span>Estado de compras</span>
        </div>
      </div>
    </div>
  );
};
