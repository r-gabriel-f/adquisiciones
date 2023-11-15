const express = require('express');
const pool = require('./db'); 

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM cotizacion';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener cotizacion:', error);
    res.status(500).json({ error: 'Error al obtener cotizacion' });
  }
});

// Agregar un nuevo producto
router.post('/', async (req, res) => {
  const { item, caracteristicas, cantidad, um, orden, ordenalmacen, tiempocumplimiento, fechapedido, fechaceptacion, observacion, estado, pedido_id } = req.body;
  try {
    const query = 'INSERT INTO cotizacion (item, caracteristicas, cantidad, um, orden, ordenalmacen, tiempocumplimiento, fechapedido, fechaceptacion , observacion, estado, pedido_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *'; 
    const values = [item, caracteristicas, cantidad, um, orden, ordenalmacen, tiempocumplimiento, fechapedido, fechaceptacion, observacion, estado, pedido_id];
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al agregar cotizacion:', error);
    res.status(500).json({ error: 'Error al agregar cotizacion' });
}

});




// actualizar 
router.put('/:id', async (req, res) => {
  const cotizacionID = req.params.id;
  const {item, caracteristicas, cantidad, um, orden, ordenalmacen, tiempocumplimiento, fechapedido, fechaceptacion, observacion, estado, pedido_id  } = req.body;

  try {
    const query = `
      UPDATE cotizacion
      SET item = $1, caracteristicas = $2, cantidad = $3, um = $4, orden = $5, ordenalmacen = $6, tiempocumplimiento = $7, fechapedido = $8, fechaceptacion = $9, observacion = $10, estado = $11, pedido_id = $12
      WHERE id_cotizacion = $13
      RETURNING *
    `;
    const values = [item, caracteristicas, cantidad, um, orden, ordenalmacen, tiempocumplimiento, fechapedido, fechaceptacion, observacion, estado, pedido_id, cotizacionID];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'pedido no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar pedido:', error);
    res.status(500).json({ error: 'Error al actualizar pedido' });
  }
});

module.exports = router;
