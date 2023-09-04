const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productosRoutes = require('./pedidos');  


const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

// Rutas de productos
app.use('/pedidos', productosRoutes);


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
