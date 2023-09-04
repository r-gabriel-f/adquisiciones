import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const Pedidos = () => {
  const MySwal = withReactContent(Swal);

  const [pedidos, setPedidos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [nuevoPedido, setNuevoPedido] = useState({
    item: "",
    caracteristicas_tecnicas: "",
    cantidad: 0,
    unidad_de_medida: "", // Cambiado de unidad_medida a unidad_de_medida
    orden_de_trabajo: "",
    tiempo_cumplimiento: "",
    recepcion: "", // Cambiado de recepcion a observacion
  });

  useEffect(() => {
    obtenerPedidos();
  }, []);

  const obtenerPedidos = async () => {
    try {
      const response = await axios.get("http://localhost:3001/pedidos");
      console.log(response.data);
      setPedidos(response.data);
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNuevoPedido({ ...nuevoPedido, [name]: value });
  };

  const agregarPedido = async (e) => {
    e.preventDefault();
    if (
      nuevoPedido.item === "" ||
      nuevoPedido.caracteristicas_tecnicas === "" ||
      nuevoPedido.cantidad === 0 ||
      nuevoPedido.unidad_de_medida === "" ||
      nuevoPedido.orden_de_trabajo === "" ||
      nuevoPedido.tiempo_cumplimiento === "" ||
      nuevoPedido.observacion === "" // Cambiado de recepcion a observacion
    ) {
      MySwal.fire({
        title: "Error",
        text: "Por favor, completa todos los campos",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/pedidos",
        nuevoPedido
      );

      setPedidos([...pedidos, response.data]);

      setNuevoPedido({
        item: "",
        caracteristicas_tecnicas: "",
        cantidad: 0,
        unidad_de_medida: "",
        orden_de_trabajo: "",
        tiempo_cumplimiento: "",
        observacion: "", // Cambiado de recepcion a observacion
      });
      MySwal.fire({
        title: "¡Exitoso!",
        text: "El pedido ha sido agregado.",
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
      });
    } catch (error) {
      console.error("Error al agregar pedido:", error);
    }
  };

  return (
    <div className="mx-10 my-5">
      <div className="mt-10">
        <h3 className="text-3xl font-playfair">Pedidos</h3>
      </div>

      <div className="mx-auto overflow-y-auto h-96">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#0F172A] text-[#08abff]">
            <tr className="text-center">
              <th className="py-3 px-1">Item</th>
              <th className="py-3 px-1">Características Técnicas</th>
              <th className="py-3 px-1">Cantidad</th>
              <th className="py-3 px-1">Unidad de Medida</th>
              <th className="py-3 px-1">Orden de Trabajo</th>
              <th className="py-3 px-1">Tiempo de Cumplimiento</th>
              <th className="py-3 px-1">Recepción</th>
              <th className="py-3 px-1">Observación</th>
            </tr>
          </thead>
          <tbody className="bg-gray-100">
            {pedidos
              .filter((pedido) =>
                pedido.item.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((pedido) => (
                <tr key={pedido.pedido_id} className="text-center">
                  <td className="py-2 px-1">{pedido.item}</td>
                  <td className="py-2 px-1">
                    {pedido.caracteristicas_tecnicas}
                  </td>
                  <td className="py-2 px-1">{pedido.cantidad}</td>
                  <td className="py-2 px-1">{pedido.unidad_de_medida}</td>
                  <td className="py-2 px-1">{pedido.orden_de_trabajo}</td>
                  <td className="py-2 px-1">{pedido.tiempo_cumplimiento}</td>
                  <td className="py-2 px-1">{pedido.recepcion}</td>
                  <td className="py-2 px-1">{pedido.observacion}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div>
        <div className="mt-10">
          <h4 className="text-2xl font-playfair">Agregar Nuevo Pedido</h4>
        </div>
        <div className="max-w-md mx-auto p-4 bg-[#0F172A] rounded-lg shadow-lg my-10">
          <form onSubmit={agregarPedido}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#08abff]">
                Item
              </label>
              <input
                type="text"
                name="item"
                value={nuevoPedido.item}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Ingrese el Item"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#08abff]">
                Características Técnicas
              </label>
              <textarea
                name="caracteristicas_tecnicas"
                value={nuevoPedido.caracteristicas_tecnicas}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Ingrese las Características Técnicas"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#08abff]">
                Cantidad
              </label>
              <input
                type="number"
                name="cantidad"
                value={nuevoPedido.cantidad}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Ingrese la Cantidad"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#08abff]">
                Unidad de Medida
              </label>
              <input
                type="text"
                name="unidad_de_medida"
                value={nuevoPedido.unidad_de_medida}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Ingrese la Unidad de Medida"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#08abff]">
                Orden de Trabajo
              </label>
              <input
                type="text"
                name="orden_de_trabajo"
                value={nuevoPedido.orden_de_trabajo}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Ingrese la Orden de Trabajo"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#08abff]">
                Tiempo de Cumplimiento
              </label>
              <input
                type="date"
                name="tiempo_cumplimiento"
                value={nuevoPedido.tiempo_cumplimiento}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#08abff]">
                Observación
              </label>
              <input
                type="date"
                name="observacion"
                value={nuevoPedido.observacion}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#08abff] text-white px-4 py-2 rounded-md"
              >
                Crear Pedido
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Pedidos;
