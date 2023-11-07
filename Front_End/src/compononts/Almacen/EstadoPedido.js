import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { PanelAlmacen } from "../Panel/PanelAlmacen";
export const EstadoPedido = ({ username, userid }) => {
  const MySwal = withReactContent(Swal);
  const [pedidos, setPedidos] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [searchOrden, setSearchOrden] = useState("");
  const [showLightbox, setShowLightbox] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null);
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
    (pedido) => pedido.usuario_id === userid && pedido.estado === "Espera"
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
  const handleOpenLightboxEditar = (pedido) => {
    setSelectedPedido(pedido);
    setShowLightbox(true);
  };

  const handleCloseLightbox = () => {
    setShowLightbox(false);
  };
  const handleInputChanges = (e) => {
    const { name, value } = e.target;

    setSelectedPedido((prevPedido) => ({
      ...prevPedido,
      [name]: value,
    }));
  };
  const actualizarPedido = async (e) => {
    e.preventDefault();
    try {
      const result = await MySwal.fire({
        title: "¿Estás seguro?",
        text: "¡Esta acción realizara la corrección del pedido!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, actualizar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        await axios.put(
          `http://localhost:3001/pedidos/${selectedPedido.id_pedido}`,
          selectedPedido
        );

        obtenerPedidos(selectedPedido);

        handleCloseLightbox();

        MySwal.fire({
          title: "¡Corregido!",
          text: "El pedido fue Corregido correctamente.",
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        handleCloseLightbox();
      }
    } catch (error) {
      console.error("Error al actualizar al cliente:", error);
    }
  };
  return (
    <div className="flex flex-col">
      <PanelAlmacen />
      <div className="ml-56">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <h1 className="text-5xl p-2 uppercase">Estado de Pedidos</h1>
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
                  OBSERVACIÓN
                </th>
                <th className="border border-gray-900 py-2 px-4">
                  TIEMPO DE CUMPLIMIENTO
                </th>
                <th className="border border-gray-900 py-2 px-4">
                  FECHA DE PEDIDO
                </th>
                <th className="border border-gray-900 py-2 px-4">ESTADO</th>
                <th className="border border-gray-900 py-2 px-4">ACCION</th>
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
                      {pedido.observacion}
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
                    <td className="border border-gray-900 py-2 px-4">
                      <div class="flex justify-center space-x-2">
                        <button class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-1 rounded-lg" onClick={() => handleOpenLightboxEditar(pedido)}>
                          Corregir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {showLightbox && selectedPedido && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg w-1/2">
              <h2 className="text-2xl mb-4">Hacer Observación</h2>
              <form onSubmit={actualizarPedido}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label>Item</label>
                    <input
                      type="text"
                      id="item"
                      name="item"
                      value={selectedPedido.item}
                      onChange={handleInputChanges}
                      className="border border-gray-400 p-2 rounded w-full"
                      disabled
                    />
                  </div>
                  <div>
                    <label>Cantidad</label>
                    <input
                      type="number"
                      id="cantidad"
                      name="cantidad"
                      value={selectedPedido.cantidad}
                      onChange={handleInputChanges}
                      className="border border-gray-400 p-2 rounded w-full"
                      placeholder="Ingrese la cantidad"
                      disabled
                    />
                  </div>
                </div>
                <div>
                  <label>Características Técnicas</label>
                  <input
                    type="text"
                    id="caracteristicas"
                    name="caracteristicas"
                    value={selectedPedido.caracteristicas}
                    onChange={handleInputChanges}
                    className="border border-gray-400 p-2 rounded w-full"
                    placeholder="Ingrese detalladamente las características técnicas del item"
                    disabled
                  />
                </div>
                <div>
                  <label>U - M</label>
                  <input
                    type="text"
                    id="um"
                    name="um"
                    value={selectedPedido.um}
                    onChange={handleInputChanges}
                    className="border border-gray-400 p-2 rounded w-full"
                    placeholder="Ingresa la unidad de medida"
                    disabled
                  />
                </div>
                <div>
                  <label>Orden de Trabajo</label>
                  <input
                    type="text"
                    id="ordenalmacen"
                    name="ordenalmacen"
                    value={selectedPedido.ordenalmacen}
                    onChange={handleInputChanges}
                    className="border border-gray-400 p-2 rounded w-full"
                    disabled
                  />
                </div>
                <div>
                  <label>Tiempo de Cumplimiento</label>
                  <select
                    id="tiempo"
                    name="tiempocumplimiento"
                    value={selectedPedido.tiempocumplimiento}
                    onChange={handleInputChanges}
                    className="border border-gray-400 p-2 rounded w-full"
                    disabled
                  >
                    <option value="urgente">Urgente</option>
                    <option value="medio">Medio</option>
                    <option value="normal">Normal</option>
                  </select>
                </div>
                <div>
                  <label>Observación</label>
                  <input
                    type="text"
                    id="observacion"
                    name="observacion"
                    value={selectedPedido.observacion}
                    onChange={handleInputChanges}
                    className="border border-gray-400 p-2 rounded w-full"
                    placeholder="Escriba la observacion del pedido"
                  />
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover-bg-red-600 mr-2"
                    onClick={handleCloseLightbox}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover-bg-blue-600"
                  >
                    Corregir
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
