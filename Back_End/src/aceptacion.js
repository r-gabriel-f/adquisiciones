const express = require("express");
const pool = require("./db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM aceptacion";
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener aceptacion:", error);
    res.status(500).json({ error: "Error al obtener aceptacion" });
  }
});

// Agregar un nuevo aceptacion
router.post("/", async (req, res) => {
  const {
    item,
    caracteristicas,
    cantidad,
    um,
    orden,
    ordenalmacen,
    tiempocumplimiento,
    fechapedido,
    fechaceptacion,
    fechagerencia,
    observacion,
    estado,
    opciones,
    cotizacion_id,
  } = req.body;
  try {
    const query =
      "INSERT INTO aceptacion (item, caracteristicas, cantidad, um, orden, ordenalmacen, tiempocumplimiento, fechapedido, fechaceptacion, fechagerencia , observacion, estado,opciones, cotizacion_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *";
    const values = [
      item,
      caracteristicas,
      cantidad,
      um,
      orden,
      ordenalmacen,
      tiempocumplimiento,
      fechapedido,
      fechaceptacion,
      fechagerencia,
      observacion,
      estado,
      opciones,
      cotizacion_id,
    ];
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al agregar aceptacion:", error);
    res.status(500).json({ error: "Error al agregar aceptacion" });
  }
});

// actualizar
router.put("/:id", async (req, res) => {
  const aceptacionID = req.params.id;
  const {
    item,
    caracteristicas,
    cantidad,
    um,
    orden,
    ordenalmacen,
    tiempocumplimiento,
    fechapedido,
    fechaceptacion,
    fechagerencia,
    observacion,
    estado,
    opciones,
    cotizacion_id,
  } = req.body;

  try {
    const query = `
      UPDATE aceptacion
      SET item = $1, caracteristicas = $2, cantidad = $3, um = $4, orden = $5, ordenalmacen = $6, tiempocumplimiento = $7, fechapedido = $8, fechaceptacion = $9,fechagerencia = $10, observacion = $11, estado = $12,opciones = $13, cotizacion_id = $14
      WHERE id_aceptacion = $15
      RETURNING *
    `;
    const values = [
      item,
      caracteristicas,
      cantidad,
      um,
      orden,
      ordenalmacen,
      tiempocumplimiento,
      fechapedido,
      fechaceptacion,
      fechagerencia,
      observacion,
      estado,
      opciones,
      cotizacion_id,
    ];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "aceptacion no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al aceptar pedido:", error);
    res.status(500).json({ error: "Error al aceptar pedido" });
  }
});

module.exports = router;
