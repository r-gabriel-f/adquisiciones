const express = require('express');
const pool = require('./db');

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM usuarios';
    const result = await pool.query(query);
    res.json(result.rows);

  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

module.exports = router;