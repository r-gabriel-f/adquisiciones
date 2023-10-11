import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";

export const ModalCrearpedido = ({ onClose, id, ordenid }) => {
  console.log(ordenid, "llegue");
  const MySwal = withReactContent(Swal);
  const [pedidos, setPedidos] = useState([]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevopedidos({
      ...nuevopedidos,
      [name]: value,
    });
  };
  const [nuevopedidos, setNuevopedidos] = useState({
    item: "",
    caracteristicas: "",
    cantidad: "",
    um: "",
    orden: ordenid,
    tiempocumplimiento: "",
    fechapedido: "", // Initialize fechapedido as an empty string
    observacion: "",
    estado: "Espera",
    usuario_id: id,
  });

  const agregarPedido = async (e) => {
    e.preventDefault();
    if (
      nuevopedidos.item === "" ||
      nuevopedidos.caracteristicas === "" ||
      nuevopedidos.cantidad === "" ||
      nuevopedidos.um === ""
    ) {
      MySwal.fire({
        title: "Error",
        text: "Por favor, completa todos los campos",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      return; // Stop the function if the fields are empty
    }

    // Set the current date and time before making the POST request
    nuevopedidos.fechapedido = new Date().toLocaleString();

    try {
      const response = await axios.post(
        "http://localhost:3001/pedidos",
        nuevopedidos
      );

      // Update the list of pedidos with the new pedido
      setPedidos([...pedidos, response.data]);

      // Reset the state for the new pedido
      setNuevopedidos({
        item: "",
        caracteristicas: "",
        cantidad: "",
        um: "",
        tiempocumplimiento: "",
        fechapedido: "",
      });

      MySwal.fire({
        title: "¡Exitoso!",
        text: "El cliente ha sido agregado.",
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
      });
    } catch (error) {
      console.error("Error al agregar cliente:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg w-1/2">
        <h2 className="text-2xl mb-4">Agregar Pedido</h2>
        <form onSubmit={agregarPedido}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Item</label>
              <input
                type="text"
                id="item"
                name="item"
                onChange={handleInputChange}
                value={nuevopedidos.item}
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
                onChange={handleInputChange}
                value={nuevopedidos.cantidad}
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
              onChange={handleInputChange}
              value={nuevopedidos.caracteristicas}
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
              onChange={handleInputChange}
              value={nuevopedidos.um}
              className="border border-gray-400 p-2 rounded w-full"
              placeholder="Ingresa la unidad de medida"
            />
          </div>
          <div>
            <label>Orden de Trabajo</label>
            <input
              type="text"
              id="orden"
              name="orden"
              onChange={handleInputChange}
              value={nuevopedidos.orden}
              className="border border-gray-400 p-2 rounded w-full"
            />
          </div>
          <div>
            <label>Tiempo de Cumplimiento</label>
            <select
              id="tiempo"
              name="tiempo"
              onChange={handleInputChange}
              value={nuevopedidos.tiempocumplimiento}
              className="border border-gray-400 p-2 rounded w-full"
            >
              <option value="urgente">Urgente</option>
              <option value="medio">Medio</option>
              <option value="normal">Normal</option>
            </select>
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={onClose}
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover-bg-red-600 mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover-bg-blue-600"
            >
              Crear Pedido
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
