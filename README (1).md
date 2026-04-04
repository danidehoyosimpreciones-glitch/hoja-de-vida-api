# 📄 Hoja de Vida — Daniela Judith Villalba De Hoyos

## Estructura del proyecto

```
📁 proyecto/
├── welcome.html          ← Pantalla de bienvenida (abre este primero)
├── index.html            ← Página principal
├── datos.html
├── estudios.html
├── experiencia.html      ← Conectado a la API
├── referencias.html
├── documentos.html
├── soportes.html
├── contacto.html
├── estilos.css           ← Estilos nuevos (paleta otoñal)
└── 📁 api/
    ├── server.js         ← Servidor principal
    ├── package.json
    ├── .env.example      ← Copia esto como .env
    ├── 📁 models/
    │   └── Experiencia.js
    └── 📁 routes/
        └── experiencias.js
```

---

## 🌐 Parte 1 — Sitio Web

1. Copia todos los archivos HTML y `estilos.css` en la misma carpeta.
2. Abre `welcome.html` en tu navegador — esta es la entrada principal.
3. Automáticamente redirigirá a `index.html` después de unos segundos.

> **Tip:** Si usas VS Code, instala la extensión **Live Server** y haz clic derecho
> sobre `welcome.html` → "Open with Live Server".

---

## ⚙️ Parte 2 — API (Node.js + Express + MongoDB)

### Requisitos previos
- [Node.js](https://nodejs.org) v18 o superior
- [MongoDB](https://www.mongodb.com/try/download/community) instalado localmente,
  **o** una cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas) (gratis)

### Instalación

```bash
# 1. Entrar a la carpeta de la API
cd api

# 2. Instalar dependencias
npm install

# 3. Crear el archivo de variables de entorno
cp .env.example .env
# Abre .env y ajusta MONGO_URI si usas Atlas
```

### Configuración de MongoDB

**Opción A — Local (MongoDB instalado en tu PC):**
```env
MONGO_URI=mongodb://localhost:27017/hoja_de_vida
```

**Opción B — MongoDB Atlas (nube, gratis):**
1. Entra a https://cloud.mongodb.com
2. Crea un cluster gratuito
3. Copia la cadena de conexión y pégala en `.env`:
```env
MONGO_URI=mongodb+srv://tuUsuario:tuContrasena@cluster0.xxxxx.mongodb.net/hoja_de_vida
```

### Ejecutar la API

```bash
# Modo producción
npm start

# Modo desarrollo (reinicio automático)
npm run dev
```

Verás en consola:
```
✅  Conectado a MongoDB
🚀  Servidor corriendo en http://localhost:3000
📚  Swagger UI en   http://localhost:3000/api-docs
```

---

## 📋 Endpoints disponibles

| Método | URL                          | Descripción                  |
|--------|------------------------------|------------------------------|
| GET    | /api/experiencias            | Listar todas las experiencias |
| GET    | /api/experiencias/:id        | Obtener una experiencia       |
| POST   | /api/experiencias            | Crear nueva experiencia       |
| PUT    | /api/experiencias/:id        | Actualizar experiencia        |
| DELETE | /api/experiencias/:id        | Eliminar experiencia          |

---

## 🧪 Probar con Swagger (recomendado)

1. Con el servidor corriendo, abre: **http://localhost:3000/api-docs**
2. Verás toda la documentación interactiva.
3. Para probar, haz clic en un endpoint → "Try it out" → completa los campos → "Execute".

### Ejemplo — Crear experiencia (POST):
```json
{
  "cargo": "Monitora Académica",
  "empresa": "Universidad de Cartagena",
  "fechaInicio": "2024-08",
  "fechaFin": null,
  "ciudad": "Cartagena",
  "descripcion": "Apoyo a estudiantes en materias de programación y bases de datos."
}
```

---

## 🧪 Probar con Postman

1. Descarga Postman: https://www.postman.com/downloads
2. Importa la colección haciendo clic en "Import" → "Link" y pega:
   `http://localhost:3000/api-docs` (Postman puede importar desde Swagger)

### Solicitudes rápidas:

**GET todas:**
```
GET http://localhost:3000/api/experiencias
```

**Crear nueva (POST):**
```
POST http://localhost:3000/api/experiencias
Content-Type: application/json

{
  "cargo": "Desarrolladora Web",
  "empresa": "Mi Empresa",
  "fechaInicio": "2025-01"
}
```

**Actualizar (PUT):**
```
PUT http://localhost:3000/api/experiencias/PEGA_EL_ID_AQUI
Content-Type: application/json

{
  "cargo": "Desarrolladora Senior",
  "empresa": "Mi Empresa",
  "fechaInicio": "2025-01"
}
```

**Eliminar (DELETE):**
```
DELETE http://localhost:3000/api/experiencias/PEGA_EL_ID_AQUI
```

---

## 🔗 Conectar el frontend con la API

La página `experiencia.html` ya está configurada para conectarse automáticamente
a `http://localhost:3000/api/experiencias`. Solo asegúrate de que el servidor
esté corriendo mientras navegas por esa página.

---

*© 2026 — Daniela Judith Villalba De Hoyos · Universidad de Cartagena*
