const express = require('express');
const pool = require('./db'); 

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM pedidos';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    res.status(500).json({ error: 'Error al obtener pedidos' });
  }
});

// Agregar un nuevo producto
router.post('/', async (req, res) => {
  const { item, caracteristicas, cantidad, um, orden, tiempocumplimiento, fechapedido, observacion, estado, usuario_id } = req.body;
  try {
    const query = 'INSERT INTO pedidos (item, caracteristicas, cantidad, um, orden, tiempocumplimiento, fechapedido, observacion, estado, usuario_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *'; 
    const values = [item, caracteristicas, cantidad, um, orden, tiempocumplimiento, fechapedido, observacion, estado, usuario_id];
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al agregar pedido:', error);
    res.status(500).json({ error: 'Error al agregar pedido' });
}

});

module.exports = router;
