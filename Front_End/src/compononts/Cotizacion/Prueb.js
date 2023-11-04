import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
export const Prueb = () => {
  const MySwal = withReactContent(Swal);
  const [nuevocotizacion, setNuevocotizacion] = useState({
    item: "",
    caracteristicas: "",
    cantidad: "",
    um: "",
    orden: "1",
    ordenalmacen: "",
    tiempocumplimiento: "",
    fechapedido: "",
    fechaceptacion: "",
    observacion: "",
    estado: "Espera",
    usuario_id: 1,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevocotizacion({
      ...nuevocotizacion,
      [name]: value,
    });
  };
  

  const agregarCotizacion = async (e) => {
    e.preventDefault();
    
    nuevocotizacion.fechapedido = new Date().toLocaleString();
    nuevocotizacion.fechaceptacion = new Date().toLocaleString();
    try {
      await axios.post("http://localhost:3001/cotizacion", nuevocotizacion);

      MySwal.fire({
        title: "¡Exitoso!",
        text: "El cliente ha sido agregado.",
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
      });
      setNuevocotizacion({
        item: "",
        caracteristicas: "",
        cantidad: "",
        um: "",
        orden: "1",
        ordenalmacen: "",
        tiempocumplimiento: "",
        fechapedido: "",
        fechaceptacion: "",
        observacion: "",
        estado: "Espera",
        usuario_id: 1,
      });
    
    } catch (error) {
      console.error("Error al agregar cliente:", error);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg w-1/2">
        <h2 className="text-2xl mb-4">Agregar Pedido</h2>
        <form onSubmit={agregarCotizacion}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Item</label>
              <input
                type="text"
                id="item"
                name="item"
                onChange={handleInputChange}
                value={nuevocotizacion.item}
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
                value={nuevocotizacion.cantidad}
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
              value={nuevocotizacion.caracteristicas}
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
              value={nuevocotizacion.um}
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
              onChange={handleInputChange}
              value={nuevocotizacion.ordenalmacen}
              className="border border-gray-400 p-2 rounded w-full"
            />
          </div>
          <div>
            <label>Tiempo de Cumplimiento</label>
            <select
              id="tiempo"
              name="tiempocumplimiento"
              onChange={handleInputChange}
              value={nuevocotizacion.tiempocumplimiento}
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
