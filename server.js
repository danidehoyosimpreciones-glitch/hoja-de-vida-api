if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express        = require('express');
const mongoose       = require('mongoose');
const cors           = require('cors');
const swaggerJsDoc   = require('swagger-jsdoc');
const swaggerUi      = require('swagger-ui-express');

const experienciasRouter = require('./routes/experiencias');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Hoja de Vida - Daniela Villalba',
      version: '1.0.0',
      description: 'API REST para gestión de experiencias profesionales',
      contact: { name: 'Daniela Villalba', email: 'dvillalbadh@unicartagena.edu.co' }
    },
    servers: [
      { url: 'https://hoja-de-vida-api-1.onrender.com', description: 'Producción' },
      { url: `http://localhost:${PORT}`, description: 'Local' }
    ]
  },
  apis: ['./routes/*.js', './models/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/experiencias', experienciasRouter);

app.get('/', (req, res) => {
  res.json({
    mensaje: 'API Hoja de Vida - Daniela Villalba',
    version: '1.0.0',
    documentacion: '/api-docs'
  });
});

app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error conectando a MongoDB:', err.message);
    process.exit(1);
  });

module.exports = app;
