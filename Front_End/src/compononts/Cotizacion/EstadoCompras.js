import React from 'react'
import { PanelCotizacion } from '../Panel/PanelCotizacion'

export const EstadoCompras = ({ username }) => {
  return (
    <div className="flex flex-col">
      <PanelCotizacion />
      <div className="ml-56">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <h1 className="text-5xl p-2 uppercase">ESTADO DE PEDIDO</h1>
          </div>
          <div>
            <div className="flex justify-end mr-10 font-serif">
              <h2 className="text-4xl uppercase">{ username}</h2>
            </div>
          </div>
        </div>
        <div className=" gap-4 mt-10">
          <div className="mx-10">
            <h4 className="text-2xl text-center">Buscar Compras Directas</h4>
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
        </div>
        <div className="m-10 font-serif">
          <h3 className="text-2xl">COMPRAS DIRECTAS</h3>
        </div>
        <div className="overflow-x-auto overflow-y-auto h-64">
          <table className="border-collapse border border-gray-900">
            <thead className="sticky top-0">
              <tr className="bg-gray-900 text-white">
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

                <th className="border border-gray-900 py-2 px-4">
                  FECHA DE PEDIDO
                </th>

                <th className="border border-gray-900 py-2 px-4">Accion</th>
              </tr>
            </thead>
            <tbody>
              
            </tbody>
          </table>
        </div>

        
      </div>
    </div>
  )
}
