import React, { useEffect, useState } from "react";
import { PanelAlmacen } from "../Panel/PanelAlmacen";
import axios from "axios";
export const HistorialRequerimiento = ({ username, userid }) => {
  const [pedidos, setPedidos] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [searchOrden, setSearchOrden] = useState("");
  const obtenerPedidos = async () => {
    try {
      const response = await axios.get("http://localhost:3001/pedidos");
      setPedidos(response.data);
      console.log(pedidos);
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
    }
  };
  const pedidosDelUsuario = pedidos.filter(
    (pedido) => pedido.usuario_id === userid && pedido.estado === "Aprobado"
  );
  const filteredPedidosDelUsuario = pedidosDelUsuario.filter((pedido) => {
    return (
      pedido.item.toLowerCase().includes(searchItem.toLowerCase()) &&
      pedido.orden.toLowerCase().includes(searchOrden.toLowerCase())
    );
  });
  useEffect(() => {
    obtenerPedidos();
  }, []);
  return (
    <div className="flex flex-col">
      <PanelAlmacen />
      <div className="ml-56">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <h1 className="text-5xl p-2 uppercase">
              HISTORIAL DE REQUERIMIENTOS
            </h1>
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
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                  className="bg-gray-900 border border-gray-950 rounded-lg text-white py-2 px-3  w-full"
                />
              </div>
              <div>
                <p className="my-2">N°</p>
                <input
                  type="text"
                  placeholder="N"
                  value={searchOrden}
                  onChange={(e) => setSearchOrden(e.target.value)}
                  className="bg-gray-900 border border-gray-950 rounded-lg text-white py-2 px-3  w-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto overflow-y-auto h-72">
          <table className="border-collapse border border-gray-900">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="border border-gray-900 py-2 px-4">ITEM</th>
                <th className="border border-gray-900 py-2 px-4">N</th>
                <th className="border border-gray-900 py-2 px-4">CANTIDAD</th>
                <th className="border border-gray-900 py-2 px-4">U-M</th>
                <th className="border border-gray-900 py-2 px-4">
                  CARACTERÍSTICAS
                </th>

                <th className="border border-gray-900 py-2 px-4">
                  TIEMPO DE CUMPLIMIENTO
                </th>
                <th className="border border-gray-900 py-2 px-4">
                  FECHA DE PEDIDO
                </th>
                <th className="border border-gray-900 py-2 px-4">ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.length === 0 ? (
                <tr>
                  <td colSpan="11">No hay pedidos disponibles.</td>
                </tr>
              ) : (
                filteredPedidosDelUsuario.map((pedido) => (
                  <tr key={pedido.id_pedido}>
                    <td className="border border-gray-900 py-2 px-4">
                      {pedido.item}
                    </td>
                    <td className="border border-gray-900 py-2 px-4">
                      {pedido.orden}
                    </td>
                    <td className="border border-gray-900 py-2 px-4">
                      {pedido.cantidad}
                    </td>
                    <td className="border border-gray-900 py-2 px-4">
                      {pedido.um}
                    </td>
                    <td className="border border-gray-900 py-2 px-4">
                      {pedido.caracteristicas}
                    </td>

                    <td className="border border-gray-900 py-2 px-4">
                      {pedido.tiempocumplimiento}
                    </td>
                    <td className="border border-gray-900 py-2 px-4">
                      {new Date(pedido.fechapedido).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-900 py-2 px-4">
                      {pedido.estado}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
