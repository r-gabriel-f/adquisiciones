import React, { useEffect, useState } from "react";
import { PanelCotizacion } from "../Panel/PanelCotizacion";
import axios from "axios";
export const EstadoCompras = ({ username }) => {
  const [searchItem, setSearchItem] = useState("");
  const [cotizacion, setCotizacion] = useState([]);
  const [aceptacion, setAceptacion] = useState([]);
  const [name, setUsername] = useState("");
  const obtenerPedidos = async () => {
    try {
      const response = await axios.get("http://localhost:3001/cotizacion");
      setCotizacion(response.data);
    } catch (error) {
      console.error("Error al obtener cotizacion:", error);
    }
  };

  useEffect(() => {
    obtenerPedidos();
  }, []);

  const obtenerAprobados = async () => {
    try {
      const response = await axios.get("http://localhost:3001/aceptacion");
      setAceptacion(response.data);
    } catch (error) {
      console.error("Error al obtener cotizacion:", error);
    }
  };

  useEffect(() => {
    obtenerAprobados();
  }, []);
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");

    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  const pedidosDelUsuarioCotizacion = cotizacion.filter(
    (pedido) => pedido.estado === "CompraDirecta"
  );

  const filteredCotizacion = pedidosDelUsuarioCotizacion.filter((pedido) => {
    return pedido.item.toLowerCase().includes(searchItem.toLowerCase());
  });

  const filteredgerencia = aceptacion.filter(
    (pedido) => pedido.estado === "Aprobado"
  );
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
              <h2 className="text-4xl uppercase">{name || username}</h2>
            </div>
          </div>
        </div>
        <div className=" gap-4 mt-10">
          <div className="mx-10">
            <h4 className="text-2xl text-center">Buscar Compra Directas</h4>
            <div className="my-10">
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
              </tr>
            </thead>
            <tbody>
              {filteredCotizacion.map((pedido, index) => (
                <tr key={index}>
                  <td className="border border-gray-900 py-2 px-4">
                    {pedido.item}
                  </td>
                  <td className="border border-gray-900 py-2 px-4">
                    {pedido.ordenalmacen}
                  </td>
                  <td className="border border-gray-900 py-2 px-4">
                    {pedido.caracteristicas}
                  </td>
                  <td className="border border-gray-900 py-2 px-4">
                    {pedido.cantidad}
                  </td>
                  <td className="border border-gray-900 py-2 px-4">
                    {pedido.um}
                  </td>
                  <td className="border border-gray-900 py-2 px-4">
                    {pedido.tiempocumplimiento}
                  </td>
                  <td className="border border-gray-900 py-2 px-4">
                    {new Date(pedido.fechaceptacion).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-900 py-2 px-4">
                    {new Date(pedido.fechapedido).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="m-10 font-serif">
          <h3 className="text-2xl">COMPRAS APROBADAS POR GERENCIA</h3>
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
                <th className="border border-gray-900 py-2 px-4">OPCIONES</th>
                <th className="border border-gray-900 py-2 px-4">
                  OPCION SELECCIONADA
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredgerencia.map((pedido, index) => (
                <tr key={index}>
                  <td className="border border-gray-900 py-2 px-4">
                    {pedido.item}
                  </td>
                  <td className="border border-gray-900 py-2 px-4">
                    {pedido.ordenalmacen}
                  </td>
                  <td className="border border-gray-900 py-2 px-4">
                    {pedido.caracteristicas}
                  </td>
                  <td className="border border-gray-900 py-2 px-4">
                    {pedido.cantidad}
                  </td>
                  <td className="border border-gray-900 py-2 px-4">
                    {pedido.um}
                  </td>
                  <td className="border border-gray-900 py-2 px-4">
                    {pedido.tiempocumplimiento}
                  </td>
                  <td className="border border-gray-900 py-2 px-4">
                    {new Date(pedido.fechaceptacion).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-900 py-2 px-4">
                    {new Date(pedido.fechapedido).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-900 py-2 px-4">
                    {pedido.opciones}
                  </td>
                  <td className="border border-gray-900 py-2 px-4">
                    {pedido.observacion}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
