import React, { useEffect, useState } from "react";
import { PanelCotizacion } from "../Panel/PanelCotizacion";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export const ListaComprasPendientes = ({ username }) => {
  const MySwal = withReactContent(Swal);
  const [cotizacion, setCotizacion] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [name, setUsername] = useState("");
  const [showLightboxx, setShowLightboxx] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [showLightbox, setShowLightbox] = useState(false);
  const handleOpenLightboxCotizar = (pedido) => {
    setSelectedPedido(pedido);
    setShowLightboxx(true);
  };

  const handleCloseLightboxx = () => {
    setShowLightboxx(false);
  };
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");

    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

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

  const pedidosDelUsuarioCotizacion = cotizacion.filter(
    (pedido) => pedido.estado === "Aprobado"
  );
  const filteredCotizacion = pedidosDelUsuarioCotizacion.filter((pedido) => {
    return pedido.item.toLowerCase().includes(searchItem.toLowerCase());
  });

  const handleOpenLightboxDirecta = (pedido) => {
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
    if (e) {
      e.preventDefault();
    }
    try {
      const result = await MySwal.fire({
        title: "¿Estás seguro?",
        text: "¡Esta acción realizara la compra directa del pedido!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, compra directa",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        await axios.put(
          `http://localhost:3001/cotizacion/${selectedPedido.id_cotizacion}`,
          selectedPedido
        );

        obtenerPedidos(selectedPedido);

        handleCloseLightbox();

        MySwal.fire({
          title: "¡Compra Directa!",
          text: "La compra directa fue realizada correctamente.",
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

  const [nuevogerencia, setNuevogerencia] = useState({
    item: "",
    caracteristicas: "",
    cantidad: "",
    um: "",
    orden: "",
    ordenalmacen: "",
    tiempocumplimiento: "",
    fechapedido: "",
    fechaceptacion: "",
    fechagerencia: "",
    observacion: "",
    estado: "Espera",
    opciones: "",
    cotizacion_id: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevogerencia({
      ...nuevogerencia,
      [name]: value,
    });
  };

  useEffect(() => {
    if (selectedPedido) {
      setNuevogerencia({
        ...selectedPedido,
        opciones: "",
      });
    }
  }, [selectedPedido]);
  const agregarCotizaciongerencia = async (e) => {
    if (e) {
      e.preventDefault();
    }
    nuevogerencia.fechagerencia = new Date().toLocaleString();
    try {
      const result = await MySwal.fire({
        title: "¿Estás seguro?",
        text: "¡Esta acción realizara la cotizacion con gerencia!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, Cotizar",
        cancelButtonText: "Cancelar",
      });
      if (result.isConfirmed) {
        await axios.post("http://localhost:3001/aceptacion", nuevogerencia);

        setNuevogerencia({
          item: "",
          caracteristicas: "",
          cantidad: "",
          um: "",
          orden: "",
          ordenalmacen: "",
          tiempocumplimiento: "",
          fechapedido: "",
          fechaceptacion: "",
          fechagerencia: "",
          observacion: "",
          estado: "Espera",
          opciones: "",
          cotizacion_id: "",
        });
        actualizarPedido();
        handleCloseLightboxx();
        MySwal.fire({
          title: "¡Cotizado!",
          text: "El pedido fue cotizado con gerencia correctamente.",
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        handleCloseLightboxx();
      }
    } catch (error) {
      console.error("Error al agregar cliente:", error);
    }
  };

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
        <div className=" gap-4 mt-10">
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
                        onClick={() => handleOpenLightboxCotizar(pedido)}
                      >
                        Cotizar
                      </button>
                      <button
                        class="bg-red-500 hover:bg-red-600 text-white py-2 px-1 rounded-lg"
                        onClick={() => handleOpenLightboxDirecta(pedido)}
                      >
                        Compra Directa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showLightbox && selectedPedido && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg w-1/2">
              <h2 className="text-2xl mb-4">Compra Directa</h2>
              <form onSubmit={actualizarPedido}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="hidden"
                      id="item"
                      name="item"
                      value={selectedPedido.item}
                      onChange={handleInputChanges}
                      className="border border-gray-400 p-2 rounded w-full"
                      disabled
                    />
                  </div>
                  <div>
                    <input
                      type="hidden"
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
                  <input
                    type="hidden"
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
                  <input
                    type="hidden"
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
                  <input
                    type="hidden"
                    id="ordenalmacen"
                    name="ordenalmacen"
                    value={selectedPedido.ordenalmacen}
                    onChange={handleInputChanges}
                    className="border border-gray-400 p-2 rounded w-full"
                    disabled
                  />
                </div>
                <div>
                  <input
                    type="hidden"
                    id="tiempo"
                    name="tiempocumplimiento"
                    value={selectedPedido.tiempocumplimiento}
                    onChange={handleInputChanges}
                    className="border border-gray-400 p-2 rounded w-full"
                    disabled
                  />
                </div>
                <div>
                  <label>Estado</label>
                  <select
                    id="estado"
                    name="estado"
                    value={selectedPedido.estado}
                    onChange={handleInputChanges}
                    className="border border-gray-400 p-2 rounded w-full"
                  >
                    <option value="Espera">Espera</option>
                    <option value="CompraDirecta">Compra Directa</option>
                  </select>
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
                    Compra Directa
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showLightboxx && selectedPedido && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg w-1/2">
              <h2 className="text-2xl mb-4">Cotizacion Gerencia</h2>
              <form onSubmit={agregarCotizaciongerencia}>
                <div>
                  <label>Estado</label>
                  <select
                    id="estado"
                    name="estado"
                    value={selectedPedido.estado}
                    onChange={handleInputChanges}
                    className="border border-gray-400 p-2 rounded w-full"
                  >
                    <option value="Espera">Espera</option>
                    <option value="EsperaGerencia">Espera Gerencia</option>
                  </select>
                </div>
                <div>
                  <input
                    type="hidden"
                    id="item"
                    name="item"
                    value={nuevogerencia.item}
                    onInput={handleInputChange}
                    className="border border-gray-400 p-2 rounded w-full"
                    placeholder=""
                  />
                </div>
                <div>
                  <input
                    type="hidden"
                    id="cantidad"
                    name="cantidad"
                    value={nuevogerencia.cantidad}
                    onInput={handleInputChange}
                    className="border border-gray-400 p-2 rounded w-full"
                    placeholder="Ingrese la cantidad"
                  />
                </div>

                <div>
                  <input
                    type="hidden"
                    id="caracteristicas"
                    name="caracteristicas"
                    value={nuevogerencia.caracteristicas}
                    onInput={handleInputChange}
                    className="border border-gray-400 p-2 rounded w-full"
                    placeholder="Ingrese detalladamente las características técnicas del item"
                  />
                </div>
                <div>
                  <input
                    type="hidden"
                    id="um"
                    name="um"
                    value={nuevogerencia.um}
                    onInput={handleInputChange}
                    className="border border-gray-400 p-2 rounded w-full"
                    placeholder="Ingresa la unidad de medida"
                  />
                </div>
                <div>
                  <input
                    type="hidden"
                    id="ordenalmacen"
                    name="ordenalmacen"
                    value={selectedPedido.id_cotizacion}
                    onInput={handleInputChange}
                    className="border border-gray-400 p-2 rounded w-full"
                  />
                </div>
                <div>
                  <input
                    type="hidden"
                    id="ordenalmacen"
                    name="ordenalmacen"
                    value={nuevogerencia.ordenalmacen}
                    onInput={handleInputChange}
                    className="border border-gray-400 p-2 rounded w-full"
                  />
                </div>

                <div>
                  <input
                    type="hidden"
                    id="ordenalmacen"
                    name="ordenalmacen"
                    value={nuevogerencia.tiempocumplimiento}
                    onInput={handleInputChange}
                    className="border border-gray-400 p-2 rounded w-full"
                  />
                </div>
                <div>
                  <input
                    type="hidden"
                    id="fechaceptacion"
                    name="fechaceptacion"
                    value={nuevogerencia.fechaceptacion}
                    onInput={handleInputChange}
                    className="border border-gray-400 p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label>Cotizaciones</label>
                  <textarea
                    type="text"
                    id="opciones"
                    name="opciones"
                    value={nuevogerencia.opciones}
                    onInput={handleInputChange}
                    className="border border-gray-400 p-2 rounded w-full"
                    placeholder="Ingrese todas las cotizaciones del item"
                  />
                </div>

                <div className="flex justify-center mt-4">
                  <button
                    className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover-bg-red-600 mr-2"
                    onClick={handleCloseLightboxx}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover-bg-blue-600"
                  >
                    Cotizar
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
