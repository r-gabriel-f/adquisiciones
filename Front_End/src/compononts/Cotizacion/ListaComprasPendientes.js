import React from "react";
import { PanelCotizacion } from "../Panel/PanelCotizacion";

export const ListaComprasPendientes = ({ username }) => {
  return (
    <div className="flex flex-col">
      <PanelCotizacion />
      <div className="ml-56">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <h1 className="text-5xl p-2 uppercase">LISTA DE COTIZACIONES</h1>
          </div>
          <div>
            <div className="flex justify-end mr-10 font-serif">
              <h2 className="text-4xl uppercase">{username}</h2>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-10">
          <div className="mx-10">
            <h4 className="text-2xl text-center">Buscar Pedido</h4>
            <div className="my-10">
              <div>
                <p className="my-2">ITEM</p>
                <input
                  type="text"
                  placeholder="Item"
                  className="bg-gray-900 border border-gray-950 rounded-lg text-white py-2 px-3  w-full"
                />
              </div>
            </div>
          </div>
          <div className="mx-10">
            <h4 className="text-2xl text-center">Accion</h4>
            <div className="grid grid-cols-2 gap-4 my-10">
              <button class="bg-gray-900 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded">
                SUBIR DOCUMENTO
              </button>
              <button class="bg-gray-900 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded">
                --
              </button>
            </div>
          </div>
        </div>
        <div className="m-10 font-serif">
          <h3 className="text-2xl">LISTA DE PEDIDOS</h3>
        </div>
        <div className="overflow-x-auto overflow-y-auto h-74">
          <table className="border-collapse border border-gray-900">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="border border-gray-900 py-2 px-4">N°</th>
                <th className="border border-gray-900 py-2 px-4">ITEM</th>
                <th className="border border-gray-900 py-2 px-4">N</th>
                <th className="border border-gray-900 py-2 px-4">
                  CARACTERISTICAS
                </th>
                <th className="border border-gray-900 py-2 px-4">CANTIDAD</th>
                <th className="border border-gray-900 py-2 px-4">U-M</th>

                <th className="border border-gray-900 py-2 px-4">
                  TIEMPO DE CUMPLIMIENTO
                </th>
                <th className="border border-gray-900 py-2 px-4">
                  FECHA DE ACEPTACION
                </th>

                <th className="border border-gray-900 py-2 px-4">PARA QUE</th>
                <th className="border border-gray-900 py-2 px-4">ESTADO</th>
                <th className="border border-gray-900 py-2 px-4">
                  FECHA DE PEDIDO
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-900 py-2 px-4">1</td>
                <td className="border border-gray-900 py-2 px-4">Producto 1</td>
                <td className="border border-gray-900 py-2 px-4">12345</td>
                <td className="border border-gray-900 py-2 px-4">
                  Descripción del producto 1
                </td>
                <td className="border border-gray-900 py-2 px-4">10</td>
                <td className="border border-gray-900 py-2 px-4">Unidad 1</td>
                <td className="border border-gray-900 py-2 px-4">2 días</td>
                <td className="border border-gray-900 py-2 px-4">2023-09-26</td>
                <td className="border border-gray-900 py-2 px-4">
                  Departamento A
                </td>
                <td className="border border-gray-900 py-2 px-4">Pendiente</td>
                <td className="border border-gray-900 py-2 px-4">2023-09-25</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="m-10 font-serif">
          <h3 className="text-2xl">LISTA DE COTIZACIONES</h3>
        </div>
        <div className="overflow-x-auto overflow-y-auto h-74">
          <table className="border-collapse border border-gray-900">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="border border-gray-900 py-2 px-4">N°</th>
                <th className="border border-gray-900 py-2 px-4">ITEM</th>
                <th className="border border-gray-900 py-2 px-4">N</th>
                <th className="border border-gray-900 py-2 px-4">
                  CARACTERISTICAS
                </th>
                <th className="border border-gray-900 py-2 px-4">CANTIDAD</th>
                <th className="border border-gray-900 py-2 px-4">U-M</th>
                <th className="border border-gray-900 py-2 px-4">
                  TIEMPO DE CUMPLIMIENTO
                </th>
                <th className="border border-gray-900 py-2 px-4">
                  FECHA DE PEDIDO
                </th>
                <th className="border border-gray-900 py-2 px-4">
                  FECHA DE ACEPTACION
                </th>
                <th className="border border-gray-900 py-2 px-4">
                  FECHA DE COTIZACION
                </th>
                <th className="border border-gray-900 py-2 px-4">PARA QUE</th>
                <th className="border border-gray-900 py-2 px-4">DETALLES</th>
                <th className="border border-gray-900 py-2 px-4">ESTADO</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-900 py-2 px-4">1</td>
                <td className="border border-gray-900 py-2 px-4">Producto 1</td>
                <td className="border border-gray-900 py-2 px-4">12345</td>
                <td className="border border-gray-900 py-2 px-4">
                  Descripción del producto 1
                </td>
                <td className="border border-gray-900 py-2 px-4">10</td>
                <td className="border border-gray-900 py-2 px-4">Unidad 1</td>
                <td className="border border-gray-900 py-2 px-4">2 días</td>
                <td className="border border-gray-900 py-2 px-4">2023-09-25</td>
                <td className="border border-gray-900 py-2 px-4">2023-09-26</td>
                <td className="border border-gray-900 py-2 px-4">2023-09-24</td>
                <td className="border border-gray-900 py-2 px-4">
                  Departamento A
                </td>
                <td className="border border-gray-900 py-2 px-4">
                  Ver detalleS
                </td>
                <td className="border border-gray-900 py-2 px-4">Pendiente</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
