const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Experiencia:
 *       type: object
 *       required:
 *         - cargo
 *         - empresa
 *         - fechaInicio
 *       properties:
 *         _id:
 *           type: string
 *           description: ID generado por MongoDB
 *           example: 64f1a2b3c4d5e6f7a8b9c0d1
 *         cargo:
 *           type: string
 *           description: Nombre del cargo o posición
 *           example: Desarrolladora Web Junior
 *         empresa:
 *           type: string
 *           description: Nombre de la empresa u organización
 *           example: TechCo S.A.S
 *         fechaInicio:
 *           type: string
 *           format: date
 *           description: Fecha de inicio (YYYY-MM)
 *           example: "2024-01"
 *         fechaFin:
 *           type: string
 *           format: date
 *           nullable: true
 *           description: Fecha de fin (YYYY-MM). Null si es trabajo actual
 *           example: "2024-12"
 *         ciudad:
 *           type: string
 *           description: Ciudad donde se desempeñó el cargo
 *           example: Cartagena
 *         descripcion:
 *           type: string
 *           description: Descripción de funciones y logros
 *           example: Desarrollo de interfaces con React y consumo de APIs REST
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     ExperienciaInput:
 *       type: object
 *       required:
 *         - cargo
 *         - empresa
 *         - fechaInicio
 *       properties:
 *         cargo:
 *           type: string
 *           example: Desarrolladora Web Junior
 *         empresa:
 *           type: string
 *           example: TechCo S.A.S
 *         fechaInicio:
 *           type: string
 *           example: "2024-01"
 *         fechaFin:
 *           type: string
 *           nullable: true
 *           example: "2024-12"
 *         ciudad:
 *           type: string
 *           example: Cartagena
 *         descripcion:
 *           type: string
 *           example: Desarrollo de interfaces con React y consumo de APIs REST
 */

const experienciaSchema = new mongoose.Schema(
  {
    cargo:       { type: String, required: [true, 'El cargo es obligatorio'], trim: true },
    empresa:     { type: String, required: [true, 'La empresa es obligatoria'], trim: true },
    fechaInicio: { type: String, required: [true, 'La fecha de inicio es obligatoria'] },
    fechaFin:    { type: String, default: null },
    ciudad:      { type: String, trim: true, default: '' },
    descripcion: { type: String, trim: true, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Experiencia', experienciaSchema);
