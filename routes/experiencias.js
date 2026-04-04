const express = require('express');
const router  = express.Router();
const Experiencia = require('../models/Experiencia');

// ─────────────────────────────────────────────────
/**
 * @swagger
 * tags:
 *   name: Experiencias
 *   description: CRUD de experiencias profesionales
 */

// ─── GET ALL ──────────────────────────────────────
/**
 * @swagger
 * /api/experiencias:
 *   get:
 *     summary: Obtener todas las experiencias profesionales
 *     tags: [Experiencias]
 *     responses:
 *       200:
 *         description: Lista de experiencias ordenadas por fecha de inicio (más reciente primero)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Experiencia'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', async (req, res) => {
  try {
    const experiencias = await Experiencia.find().sort({ fechaInicio: -1 });
    res.json(experiencias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener experiencias', error: error.message });
  }
});

// ─── GET ONE ──────────────────────────────────────
/**
 * @swagger
 * /api/experiencias/{id}:
 *   get:
 *     summary: Obtener una experiencia por ID
 *     tags: [Experiencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la experiencia (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Experiencia encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Experiencia'
 *       404:
 *         description: Experiencia no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', async (req, res) => {
  try {
    const exp = await Experiencia.findById(req.params.id);
    if (!exp) return res.status(404).json({ mensaje: 'Experiencia no encontrada' });
    res.json(exp);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la experiencia', error: error.message });
  }
});

// ─── POST ─────────────────────────────────────────
/**
 * @swagger
 * /api/experiencias:
 *   post:
 *     summary: Crear una nueva experiencia profesional
 *     tags: [Experiencias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExperienciaInput'
 *           example:
 *             cargo: "Desarrolladora Web Junior"
 *             empresa: "TechCo S.A.S"
 *             fechaInicio: "2024-01"
 *             fechaFin: null
 *             ciudad: "Cartagena"
 *             descripcion: "Desarrollo de interfaces con React y consumo de APIs REST"
 *     responses:
 *       201:
 *         description: Experiencia creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Experiencia'
 *       400:
 *         description: Datos inválidos o faltantes
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', async (req, res) => {
  try {
    const { cargo, empresa, fechaInicio, fechaFin, ciudad, descripcion } = req.body;
    if (!cargo || !empresa || !fechaInicio) {
      return res.status(400).json({ mensaje: 'Los campos cargo, empresa y fechaInicio son obligatorios' });
    }
    const nuevaExp = new Experiencia({ cargo, empresa, fechaInicio, fechaFin: fechaFin || null, ciudad, descripcion });
    const guardada = await nuevaExp.save();
    res.status(201).json(guardada);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear la experiencia', error: error.message });
  }
});

// ─── PUT ──────────────────────────────────────────
/**
 * @swagger
 * /api/experiencias/{id}:
 *   put:
 *     summary: Actualizar una experiencia existente
 *     tags: [Experiencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la experiencia a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExperienciaInput'
 *     responses:
 *       200:
 *         description: Experiencia actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Experiencia'
 *       404:
 *         description: Experiencia no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', async (req, res) => {
  try {
    const actualizada = await Experiencia.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!actualizada) return res.status(404).json({ mensaje: 'Experiencia no encontrada' });
    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la experiencia', error: error.message });
  }
});

// ─── DELETE ───────────────────────────────────────
/**
 * @swagger
 * /api/experiencias/{id}:
 *   delete:
 *     summary: Eliminar una experiencia
 *     tags: [Experiencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la experiencia a eliminar
 *     responses:
 *       200:
 *         description: Experiencia eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Experiencia eliminada correctamente
 *       404:
 *         description: Experiencia no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', async (req, res) => {
  try {
    const eliminada = await Experiencia.findByIdAndDelete(req.params.id);
    if (!eliminada) return res.status(404).json({ mensaje: 'Experiencia no encontrada' });
    res.json({ mensaje: 'Experiencia eliminada correctamente', id: req.params.id });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la experiencia', error: error.message });
  }
});

module.exports = router;
