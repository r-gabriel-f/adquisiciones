const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const usuariosRoutes = require('./usuarios');  
const productosRoutes = require('./pedidos');  
const productosRoutes = require('./cotizacion');  


const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

// Rutas 
app.use('/usuarios', usuariosRoutes);
app.use('/pedidos', productosRoutes);
app.use('/cotizacion', productosRoutes);


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
