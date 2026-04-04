require('dotenv').config();
const express        = require('express');
const mongoose       = require('mongoose');
const cors           = require('cors');
const swaggerJsDoc   = require('swagger-jsdoc');
const swaggerUi      = require('swagger-ui-express');

const experienciasRouter = require('./routes/experiencias');

const app  = express();
const PORT = process.env.PORT || 3000;

// ─── MIDDLEWARES ──────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── SWAGGER CONFIG ───────────────────────────────
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '📄 API Hoja de Vida - Daniela Villalba',
      version: '1.0.0',
      description: `
## API REST para gestión de experiencias profesionales

Desarrollada con **Express.js** y **MongoDB** como parte de la hoja de vida de
Daniela Judith Villalba De Hoyos — Estudiante de Ingeniería de Software,
Universidad de Cartagena.

### Operaciones disponibles
- **GET** /api/experiencias — Listar todas
- **GET** /api/experiencias/:id — Obtener una por ID
- **POST** /api/experiencias — Crear nueva
- **PUT** /api/experiencias/:id — Actualizar existente
- **DELETE** /api/experiencias/:id — Eliminar
      `,
      contact: {
        name: 'Daniela Villalba',
        email: 'dvillalbadh@unicartagena.edu.co'
      }
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Servidor local de desarrollo'
      }
    ]
  },
  apis: ['./routes/*.js', './models/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
  customCss: `
    .swagger-ui .topbar { background: #2D1B3D !important; }
    .swagger-ui .topbar-wrapper img { content: url('data:image/svg+xml,<svg/>'); }
    .swagger-ui .topbar-wrapper .link::after { content: "Daniela Villalba · API"; color: #D4A574; font-weight: bold; }
  `,
  customSiteTitle: 'API Hoja de Vida - Swagger'
}));

// ─── RUTAS ────────────────────────────────────────
app.use('/api/experiencias', experienciasRouter);

// Ruta raíz informativa
app.get('/', (req, res) => {
  res.json({
    mensaje: '🎓 API Hoja de Vida - Daniela Villalba',
    version: '1.0.0',
    documentacion: `http://localhost:${PORT}/api-docs`,
    endpoints: {
      'GET    /api/experiencias':      'Listar todas las experiencias',
      'GET    /api/experiencias/:id':  'Obtener una experiencia',
      'POST   /api/experiencias':      'Crear nueva experiencia',
      'PUT    /api/experiencias/:id':  'Actualizar experiencia',
      'DELETE /api/experiencias/:id':  'Eliminar experiencia'
    }
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada', ruta: req.originalUrl });
});

// ─── CONEXIÓN MONGODB ─────────────────────────────
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hoja_de_vida')
  .then(() => {
    console.log('✅  Conectado a MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀  Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📚  Swagger UI en   http://localhost:${PORT}/api-docs`);
    });
  })
  .catch(err => {
    console.error('❌  Error conectando a MongoDB:', err.message);
    process.exit(1);
  });

module.exports = app;
