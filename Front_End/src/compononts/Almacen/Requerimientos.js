import React, { useState } from "react";
import { PanelAlmacen } from "../Panel/PanelAlmacen";
import { ModalCrearpedido } from "./ModalCrearpedido";

export const Requerimientos = ({ username }) => {
  const [showLightbox, setShowLightbox] = useState(false);

  const handleOpenLightbox = () => {
    setShowLightbox(true);
  };

  const handleCloseLightbox = () => {
    setShowLightbox(false);
  };
  return (
    <div className="flex flex-col">
      <PanelAlmacen />
      <div className="ml-56">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <h1 className="text-5xl p-2 uppercase">
              REQUERIMIENTO DE MATERIALES
            </h1>
          </div>
          <div>
            <div className="flex justify-end mr-10 font-serif">
              <h2 className="text-4xl uppercase">{username}</h2>
            </div>
            <div className="flex justify-end mr-10 font-serif">
              <h3 className="text-3xl">Orden: 0</h3>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-10">
          <div className="mx-10">
            <h4 className="text-2xl text-center">Buscar Pedido</h4>
            <div className="grid grid-cols-2 gap-4 my-10">
              <div>
                <p className="my-2">ITEM</p>
                <input
                  type="text"
                  placeholder="Item"
                  className="bg-gray-900 border border-gray-950 rounded-lg text-white py-2 px-3  w-full"
                />
              </div>
              <div>
                <p className="my-2">ORDEN DE TRABAJO</p>
                <input
                  type="text"
                  placeholder="Orden de trabajo"
                  className="bg-gray-900 border border-gray-950 rounded-lg text-white py-2 px-3  w-full"
                />
              </div>
            </div>
          </div>
          <div className="mx-10">
            <h4 className="text-2xl text-center">Accion</h4>
            <div className="grid grid-cols-2 gap-4 my-10">
              <button class="bg-gray-900 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded" onClick={handleOpenLightbox}>
                CREAR PEDIDO
              </button>
              <button class="bg-gray-900 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded">
                CERRAR PEDIDO
              </button>
              <button class="bg-gray-900 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded">
                OTROS REQUERIMIENTOS
              </button>
              <button class="bg-gray-900 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded">
                IMPRIMIR PEDIDO
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto overflow-y-auto h-74">
          <table className="border-collapse border border-gray-900">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="border border-gray-900 py-2 px-4">N°</th>
                <th className="border border-gray-900 py-2 px-4">ITEM</th>
                <th className="border border-gray-900 py-2 px-4">
                  CARACTERÍSTICAS TÉCNICAS
                </th>
                <th className="border border-gray-900 py-2 px-4">CANTIDAD</th>
                <th className="border border-gray-900 py-2 px-4">U-M</th>
                <th className="border border-gray-900 py-2 px-4">
                  ORDEN DE TRABAJO
                </th>
                <th className="border border-gray-900 py-2 px-4">
                  OBSERVACIÓN
                </th>
                <th className="border border-gray-900 py-2 px-4">
                  TIEMPO DE CUMPLIMIENTO
                </th>
                <th className="border border-gray-900 py-2 px-4">
                  FECHA DE PEDIDO
                </th>
                <th className="border border-gray-900 py-2 px-4">ESTADO</th>
                <th className="border border-gray-900 py-2 px-4">ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-200">
                <td className="border border-gray-900 py-2 px-4">1</td>
                <td className="border border-gray-900 py-2 px-4">Producto A</td>
                <td className="border border-gray-900 py-2 px-4">
                  Especificaciones técnicas A
                </td>
                <td className="border border-gray-900 py-2 px-4">10</td>
                <td className="border border-gray-900 py-2 px-4">Unidades</td>
                <td className="border border-gray-900 py-2 px-4">OT-12345</td>
                <td className="border border-gray-900 py-2 px-4">
                  Observación 1
                </td>
                <td className="border border-gray-900 py-2 px-4">3 días</td>
                <td className="border border-gray-900 py-2 px-4">2023-09-20</td>
                <td className="border border-gray-900 py-2 px-4">Pendiente</td>
                <td className="border border-gray-900 py-2 px-4">
                  <button className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-1 px-2 rounded">
                    Editar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {showLightbox && <ModalCrearpedido onClose={handleCloseLightbox}/>}
      </div>
      
    </div>
  );
};
