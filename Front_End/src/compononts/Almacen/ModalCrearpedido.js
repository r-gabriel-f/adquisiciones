import React from "react";

export const ModalCrearpedido = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white p-4 rounded shadow-lg w-1/2">
      <h2 className="text-2xl mb-4">Agregar Pedido</h2>
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
            id="orden"
            name="orden"
            className="border border-gray-400 p-2 rounded w-full"
          />
        </div>
        <div>
          <label>Tiempo de Cumplimiento</label>
          <select
            id="tiempo"
            name="tiempo"
            className="border border-gray-400 p-2 rounded w-full"
          >
            <option value="urgente">Urgente</option>
            <option value="medio">Medio</option>
            <option value="normal">Normal</option>
          </select>
        </div>
       
        <div className="flex justify-center mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 mr-2"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
          >
            Crear Pedido
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};
