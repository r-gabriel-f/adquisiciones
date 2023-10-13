import React, { useEffect, useState } from "react";
import { PanelAlmacen } from "../Panel/PanelAlmacen";
import { ModalCrearpedido } from "./ModalCrearpedido";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
export const Requerimientos = ({ username, userid }) => {
  console.log(username, userid, "llegue");
  const [showLightbox, setShowLightbox] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [ordenid, setOrdenId] = useState(1);

  const incrementar = () => {
    setOrdenId(ordenid + 1);
    setPedidos([]);
  };

  const handleOpenLightbox = () => {
    setShowLightbox(true);
  };

  const handleCloseLightbox = () => {
    setShowLightbox(false);
  };

  const obtenerPedidos = async () => {
    try {
      const response = await axios.get("http://localhost:3001/pedidos");
      setPedidos(response.data);
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
    }
  };
  useEffect(() => {
    obtenerPedidos();
  }, []);
  const pedidosDelUsuario = pedidos.filter(
    (pedido) => pedido.usuario_id === userid
  );
  const exportToPDF = () => {
    const doc = new jsPDF();

    // Agrega el título
    doc.setFontSize(16);
    doc.text("Pedido" , 105, 10, { align: "center" });
    doc.autoTable({
      html: "#table-export",
      columns: [0, 1, 2, 3, 4, 5, 6],
    });
    doc.save("table.pdf");
  };

  return (
    <div className="flex flex-col">
      <PanelAlmacen />
      <div className="ml-56">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <h1 className="text-5xl p-2 uppercase">
              REQUERIMIENTO DE MATERIALES
            </h1>
          </div>
          <div>
            <div className="flex justify-end mr-10 font-serif">
              <h2 className="text-4xl uppercase">{username}</h2>
            </div>
            <div className="flex justify-end mr-10 font-serif">
              <h3 className="text-3xl">{ordenid}</h3>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-10">
          <div className="mx-10">
            <h4 className="text-2xl text-center">Buscar Pedido</h4>
            <div className="grid grid-cols-2 gap-4 my-10">
              <div>
                <p className="my-2">ITEM</p>
                <input
                  type="text"
                  placeholder="Item"
                  className="bg-gray-900 border border-gray-950 rounded-lg text-white py-2 px-3  w-full"
                />
              </div>
              <div>
                <p className="my-2">ORDEN DE TRABAJO</p>
                <input
                  type="text"
                  placeholder="Orden de trabajo"
                  className="bg-gray-900 border border-gray-950 rounded-lg text-white py-2 px-3  w-full"
                />
              </div>
            </div>
          </div>
          <div className="mx-10">
            <h4 className="text-2xl text-center">Accion</h4>
            <div className="grid grid-cols-2 gap-4 my-10">
              <button
                class="bg-gray-900 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded"
                onClick={handleOpenLightbox}
              >
                CREAR PEDIDO
              </button>
              <button
                class="bg-gray-900 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded"
                onClick={incrementar}
              >
                CERRAR PEDIDO
              </button>
              <button class="bg-gray-900 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded">
                OTROS REQUERIMIENTOS
              </button>
              <button
                class="bg-gray-900 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded"
                onClick={exportToPDF}
              >
                IMPRIMIR PEDIDO
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto overflow-y-auto h-74">
          <table
            className="border-collapse border border-gray-900"
            id="table-export"
          >
            <thead>
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
                <th className="border border-gray-900 py-2 px-4">ESTADO</th>
                <th className="border border-gray-900 py-2 px-4">ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.length === 0 ? (
                <tr>
                  <td colSpan="11">No hay pedidos disponibles.</td>
                </tr>
              ) : (
                pedidosDelUsuario.map((pedido) => (
                  <tr key={pedido.id_pedido}>
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
                      {pedido.orden}
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
                      <button className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-1 px-2 rounded">
                        Editar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {showLightbox && (
          <ModalCrearpedido
            onClose={handleCloseLightbox}
            id={userid}
            ordenid={ordenid}
          />
        )}
      </div>
    </div>
  );
};
