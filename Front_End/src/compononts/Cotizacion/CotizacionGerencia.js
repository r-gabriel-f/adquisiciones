import React, { useEffect, useState } from "react";
import { PanelCotizacion } from "../Panel/PanelCotizacion";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export const CotizacionGerencia = ({ username }) => {
  const MySwal = withReactContent(Swal);
  const [name, setUsername] = useState("");
  const [aceptacion, setAceptacion] = useState([]);
  const [showLightboxe, setShowLightboxe] = useState(false);
  const [selectedAceptacion, setSelectedAceptacion] = useState(null);
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
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
  const pedidosCotizacionAprobados = aceptacion.filter(
    (pedido) => pedido.estado === "AprobadoGerencia"
  );
  const handleOpenLightboxe = (pedido) => {
    setSelectedAceptacion(pedido);
    setShowLightboxe(true);
  };

  const handleCloseLightboxe = () => {
    setShowLightboxe(false);
  };
  const handleInputChanges = (e) => {
    const { name, value } = e.target;

    setSelectedAceptacion((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  const aprobacion = async (e) => {
    e.preventDefault();
    try {
      const result = await MySwal.fire({
        title: "¿Estás seguro?",
        text: "¡Esta acción comprara la opcion seleccionada por gerencia!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, comprar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        await axios.put(
          `http://localhost:3001/aceptacion/${selectedAceptacion.id_aceptacion}`,
          selectedAceptacion
        );

        obtenerAceptacion();
        handleCloseLightboxe();

        MySwal.fire({
          title: "¡Cromprado!",
          text: "La compra fue realizada.",
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        handleCloseLightboxe();
      }
    } catch (error) {
      console.error("Error al actualizar al cliente:", error);
    }
  };
  return (
    <div className="flex flex-col">
      <PanelCotizacion />
      <div className="ml-56">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <h1 className="text-5xl p-2 uppercase">
              ESTADO DE COTIZACION GERENCIA
            </h1>
          </div>
          <div>
            <div className="flex justify-end mr-10 font-serif">
              <h2 className="text-4xl uppercase">{name || username}</h2>
            </div>
          </div>
        </div>

        <div className="m-10 font-serif">
          <h3 className="text-2xl">EN ESPERA</h3>
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
              </tr>
            </thead>
            <tbody>
              {pedidosCotizacion.map((pedido, index) => (
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="m-10 font-serif">
          <h3 className="text-2xl">APROBADOS</h3>
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
                <th className="border border-gray-900 py-2 px-4">ACCION</th>
              </tr>
            </thead>
            <tbody>
              {pedidosCotizacionAprobados.map((pedido, index) => (
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
                  <td className="border border-gray-900 py-2 px-4">
                    <button
                      class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-1 rounded-lg"
                      onClick={() => handleOpenLightboxe(pedido)}
                    >
                      Comprar
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
              <h2 className="text-2xl mb-4">Comprar aprobado por gerencia</h2>
              <form onSubmit={aprobacion}>
                <div>
                  <label>Estado</label>
                  <select
                    id="estado"
                    name="estado"
                    value={selectedAceptacion.estado}
                    onChange={handleInputChanges}
                    className="border border-gray-400 p-2 rounded w-full"
                  >
                    <option value="AprobadoGerencia">Aprobado Gerencia</option>
                    <option value="Aprobado">Aprobado</option>
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
                    Comprar
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
