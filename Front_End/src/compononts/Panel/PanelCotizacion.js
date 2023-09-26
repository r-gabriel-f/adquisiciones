import React from 'react'

export const PanelCotizacion = () => {
  return (
    <div className="fixed bg-gray-50 dark:bg-gray-900 text-white w-56 h-screen">
      <div className="flex aling-center justify-center m-5">
        <h2 className="text-4xl text-white">Cotizacion</h2>
      </div>

      <div className="mx-5">
        <div
          className="flex my-4 justify-center bg-gray-900 hover:bg-gray-950 hover:rounded-lg hover:text-[#eafdf5] hover:cursor-pointer"
      
        >
          <span>Ver Pedidos</span>
        </div>

        <div className="mx-5">
          <div
            className="flex my-4 justify-center bg-gray-900 hover:bg-gray-950 hover:rounded-lg hover:text-[#eafdf5] hover:cursor-pointer"
         
          >
            <span>Lista de Compras Pendientes</span>
          </div>
        </div>
        <div className="flex my-4 justify-center bg-gray-900 hover:bg-gray-950 hover:rounded-lg hover:text-[#eafdf5] hover:cursor-pointer">
          <span>Estado de Pedido</span>
        </div>
      </div>
    </div>
  )
}
