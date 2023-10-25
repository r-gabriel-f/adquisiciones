import React from "react";
import { PanelCotizacion } from "../Panel/PanelCotizacion";

export const Pedidos = ({ username }) => {
  return (
    <div className="flex flex-col">
      <PanelCotizacion />
      <div className="ml-56">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <h1 className="text-5xl p-2 uppercase">DETALLES</h1>
          </div>
          <div>
            <div className="flex justify-end mr-10 font-serif">
              <h2 className="text-4xl uppercase">{username}</h2>
            </div>
          </div>
        </div>
        <div className=" mt-10">
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
                <p className="my-2">N°</p>
                <input
                  type="text"
                  placeholder="N"
                  className="bg-gray-900 border border-gray-950 rounded-lg text-white py-2 px-3  w-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto overflow-y-auto h-74">
          <table className="border-collapse border border-gray-900">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="border border-gray-900 py-2 px-4">ITEM</th>
                <th className="border border-gray-900 py-2 px-4">N</th>
                <th className="border border-gray-900 py-2 px-4">
                  CARACTERISTICAS
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

                <th className="border border-gray-900 py-2 px-4">PEDIDO</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-900 py-2 px-4">Producto 1</td>
                <td className="border border-gray-900 py-2 px-4">12345</td>
                <td className="border border-gray-900 py-2 px-4">
                  Descripción del producto 1
                </td>
                <td className="border border-gray-900 py-2 px-4">10</td>
                <td className="border border-gray-900 py-2 px-4">Unidad 1</td>
                <td className="border border-gray-900 py-2 px-4">Orden 123</td>
                <td className="border border-gray-900 py-2 px-4">
                  Observación 1
                </td>
                <td className="border border-gray-900 py-2 px-4">2 días</td>
                <td className="border border-gray-900 py-2 px-4">2023-09-26</td>
                <td className="border border-gray-900 py-2 px-4">Pendiente</td>

                <td className="border border-gray-900 py-2 px-4">Pedido 1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
