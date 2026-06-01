const express = require('express');
//import express from 'express'; //Si uso esta sintaxis, debo agregar "type": "module" en package.json

const app = express();
//Crea una aplicación Express.
/* 
app.get(...)
app.post(...)
app.put(...)
app.delete(...)
app.use(...)
app.listen(...) */

/* Express es una capa encima de Node que simplifica muchísimo cosas como:

rutas
parámetros
JSON
middlewares
manejo de errores */

// Middleware para parsear JSON
/* Un middleware es simplemente una función que se ejecuta ANTES de llegar a la ruta. */
app.use(express.json());

// Ruta GET '/' que responde con un mensaje JSON
app.get('/', (req, res) => {
//Define una ruta GET. El primer parámetro es la ruta, el segundo es una función que recibe el request y el response.
/* req.method
req.url
req.headers
req.body
req.params
req.query */
  res.json({ mensaje: 'Bienvenido a la app Express básica' });
});

// Ruta POST '/echo' que responde con el mismo JSON recibido
app.post('/echo', (req, res) => {
  res.json(req.body);
});

// Puerto de escucha
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

//export default app; // Si uso esta sintaxis, debo agregar "type": "module" en package.json
module.exports = app;


/* 
Request
 ↓
Autenticación
 ↓
Validación
 ↓
Logs
 ↓
Parseo JSON
 ↓
Ruta
 ↓
Response

Request
 ↓
Middleware A
 ↓
Middleware B
 ↓
Middleware C
 ↓
Controlador
 ↓
Response


Cada middleware puede:

modificar req
modificar res
detener la ejecución
pasar al siguiente

*/