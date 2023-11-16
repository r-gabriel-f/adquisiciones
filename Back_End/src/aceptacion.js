const express = require('express');
const pool = require('./db'); 

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM aceptacion';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener aceptacion:', error);
    res.status(500).json({ error: 'Error al obtener aceptacion' });
  }
});

// Agregar un nuevo aceptacion
router.post('/', async (req, res) => {
  const { item, caracteristicas, cantidad, um, orden, ordenalmacen, tiempocumplimiento, fechapedido, fechaceptacion, fechagerencia, observacion, estado, cotizacion_id } = req.body;
  try {
    const query = 'INSERT INTO aceptacion (item, caracteristicas, cantidad, um, orden, ordenalmacen, tiempocumplimiento, fechapedido, fechaceptacion, fechagerencia , observacion, estado, cotizacion_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *'; 
    const values = [item, caracteristicas, cantidad, um, orden, ordenalmacen, tiempocumplimiento, fechapedido, fechaceptacion, fechagerencia, observacion, estado, cotizacion_id];
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al agregar aceptacion:', error);
    res.status(500).json({ error: 'Error al agregar aceptacion' });
}

});

module.exports = router;