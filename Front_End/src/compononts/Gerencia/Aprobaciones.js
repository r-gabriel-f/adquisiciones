import React, { useEffect, useState } from "react";
import { PanelGerencia } from "../Panel/PanelGerencia";
import axios from "axios";
export const Aprobaciones = ({ username }) => {
  const [name, setUsername] = useState("");
  const [aceptacion, setAceptacion] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [showLightboxe, setShowLightboxe] = useState(false);
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
  const obtenerAceptacion = async () => {
    try {
      const response = await axios.get("http://localhost:3001/aceptacion");
      setAceptacion(response.data);
      console.log(aceptacion);
    } catch (error) {
      console.error("Error al obtener aceptacion:", error);
    }
  };
  useEffect(() => {
    obtenerAceptacion();
  }, []);
  const pedidosCotizacion = aceptacion.filter(
    (pedido) => pedido.estado === "EsperaGerencia"
  );
  const filteredAceptacion = pedidosCotizacion.filter((acepta) => {
    return (
      acepta.item.toLowerCase().includes(searchItem.toLowerCase()) 
    );
  });
 

  return (
    <div className="flex flex-col">
      <PanelGerencia />
      <div className="ml-56">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <h1 className="text-5xl p-2 uppercase">APROBACIONES</h1>
          </div>
          <div>
            <div className="flex justify-end mr-10 font-serif">
              <h2 className="text-4xl uppercase">{name || username}</h2>
            </div>
          </div>
        </div>
        <div className="gap-4 mt-10">
          <div className="mx-10">
            <h4 className="text-2xl text-center">Buscar Pedido</h4>
            <div className="grid grid-cols-1 gap-4 my-10">
              <div>
                <p className="my-2">ITEM</p>
                <input
                  type="text"
                  placeholder="Item"
                  onChange={(e) => setSearchItem(e.target.value)}
                  className="bg-gray-900 border border-gray-950 rounded-lg text-white py-2 px-3 w-full"
                />
              </div>
              
            </div>
          </div>
        </div>
        <div className="overflow-x-auto overflow-y-auto h-72">
          <table
            className="border-collapse border border-gray-900"
            id="table-export"
          >
            <thead className="bg-gray-900 text-white sticky top-0">
              <tr className="bg-gray-900 text-white">
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
                  TIEMPO DE CUMPLIMIENTO
                </th>
                <th className="border border-gray-900 py-2 px-4">
                  FECHA DE PEDIDO
                </th>
                <th className="border border-gray-900 py-2 px-4">OPCIONES</th>

                <th className="border border-gray-900 py-2 px-4">ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {filteredAceptacion.map((pedido, index) => (
                <tr key={index}>
                  <td className="border border-gray-900 py-2 px-4">
                    {pedido.item}
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
                    {pedido.ordenalmacen}
                  </td>
                  <td className="border border-gray-900 py-2 px-4">
                    {pedido.tiempocumplimiento}
                  </td>
                  <td className="border border-gray-900 py-2 px-4">
                    {new Date(pedido.fechapedido).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-900 py-2 px-4">
                    {pedido.opciones}
                  </td>

                  <td className="border border-gray-900 py-2 px-4">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-1 rounded-lg" onClick={() => handleOpenLightboxe()}>
                      Seleccionar Opcion
                    </button>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showLightboxe && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg w-1/2">
              <h2 className="text-2xl mb-4">Editar Requerimiento</h2>
              <form >
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
                    onClick={handleCloseLightboxe}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover-bg-blue-600"
                  >
                    Editar Requerimiento
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
