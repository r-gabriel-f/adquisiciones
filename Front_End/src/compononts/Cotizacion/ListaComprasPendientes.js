import React, { useEffect, useState } from "react";
import { PanelCotizacion } from "../Panel/PanelCotizacion";
import axios from "axios";
export const ListaComprasPendientes = ({ username }) => {
  const [showLightboxe, setShowLightboxe] = useState(false);
  const [cotizacion, setCotizacion] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [name, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");

    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  const handleOpenLightboxe = () => {
    setShowLightboxe(true);
  };

  const handleCloseLightboxe = () => {
    setShowLightboxe(false);
  };

  const obtenerPedidos = async () => {
    try {
      const response = await axios.get("http://localhost:3001/cotizacion");
      setCotizacion(response.data);
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
    }
  };

  useEffect(() => {
    obtenerPedidos();
  }, []);

  const filteredCotizacion = cotizacion.filter((pedido) => {
    return pedido.item.toLowerCase().includes(searchItem.toLowerCase());
  });
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
              <h2 className="text-4xl uppercase">{name || username}</h2>
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
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
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

                  <td className="border border-gray-900 py-2 px-4">
                    <div class="flex justify-center space-x-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-1 rounded-lg"
                        onClick={() => handleOpenLightboxe()}
                      >
                        Cotizar
                      </button>
                      <button class="bg-red-500 hover:bg-red-600 text-white py-2 px-1 rounded-lg">
                        Compra Directa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showLightboxe && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg w-1/2">
              <h2 className="text-2xl mb-4">Enviar Cotizacion</h2>
              <form>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label>Item</label>
                    <input
                      type="text"
                      id="item"
                      name="item"
                      className="border border-gray-400 p-2 rounded w-full"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <label>Cantidad</label>
                    <input
                      type="number"
                      id="cantidad"
                      name="cantidad"
                      className="border border-gray-400 p-2 rounded w-full"
                      placeholder="Ingrese la cantidad"
                    />
                  </div>
                </div>
                <div>
                  <label>Características Técnicas</label>
                  <input
                    type="text"
                    id="caracteristicas"
                    name="caracteristicas"
                    className="border border-gray-400 p-2 rounded w-full"
                    placeholder="Ingrese detalladamente las características técnicas del item"
                  />
                </div>
                <div>
                  <label>U - M</label>
                  <input
                    type="text"
                    id="um"
                    name="um"
                    className="border border-gray-400 p-2 rounded w-full"
                    placeholder="Ingresa la unidad de medida"
                  />
                </div>
                <div>
                  <label>Orden de Trabajo</label>
                  <input
                    type="text"
                    id="ordenalmacen"
                    name="ordenalmacen"
                    className="border border-gray-400 p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label>Tiempo de Cumplimiento</label>
                  <select
                    id="tiempo"
                    name="tiempocumplimiento"
                    className="border border-gray-400 p-2 rounded w-full"
                  >
                    <option value="urgente">Urgente</option>
                    <option value="medio">Medio</option>
                    <option value="normal">Normal</option>
                  </select>
                </div>

                <div className="flex justify-center mt-4">
                  <button
                    className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover-bg-red-600 mr-2"
                    onClick={() => handleCloseLightboxe()}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover-bg-blue-600"
                  >
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="m-10 font-serif">
          <h3 className="text-2xl">LISTA DE COTIZACIONES</h3>
        </div>
        <div className="overflow-x-auto overflow-y-auto h-74">
          <table className="border-collapse border border-gray-900">
            <thead className="sticky top-0">
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
