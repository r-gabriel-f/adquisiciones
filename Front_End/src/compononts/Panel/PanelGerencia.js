import React from "react";
import { useNavigate } from "react-router-dom";
export const PanelGerencia = () => {
  const navigate = useNavigate();
  const handlepedidoClick = () => {
    navigate("/aprobaciones");
  };
  const handleaceptadosClick = () => {
    navigate("/aprobaciones_gerencia");
  };
  return (
    <div className="fixed bg-gray-50 dark:bg-gray-900 text-white w-56 h-screen">
      <div className="flex aling-center justify-center m-5">
        <h2 className="text-4xl text-white">Gerencia</h2>
      </div>

      <div className="mx-5">
        <div
          className="flex my-4 justify-center bg-gray-900 hover:bg-gray-950 hover:rounded-lg hover:text-[#eafdf5] hover:cursor-pointer"
          onClick={handlepedidoClick}
        >
          <span>Pedidos</span>
        </div>

        <div
          className="flex my-4 justify-center bg-gray-900 hover:bg-gray-950 hover:rounded-lg hover:text-[#eafdf5] hover:cursor-pointer"
          onClick={handleaceptadosClick}
        >
          <span>Aprobados</span>
        </div>
      </div>
    </div>
  );
};
