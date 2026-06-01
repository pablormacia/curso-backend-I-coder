// Importa Express
const express = require('express');

// Crea una instancia de Router
// Un Router es como una mini aplicación Express
// que permite agrupar rutas relacionadas
const router = express.Router();


// ===============================
// Middleware de validación
// ===============================

// Middleware que valida el campo "name"
// Recibe:
// - req: request
// - res: response
// - next: función para continuar al siguiente middleware o handler
function validarNombre(req, res, next) {

  // Obtiene la propiedad "name" del body recibido
  // Equivale a:
  // const name = req.body.name;
  const { name } = req.body;

  // Verifica dos condiciones:
  //
  // 1) que sea un string
  // 2) que no esté vacío
  //
  // trim() elimina espacios al principio y al final
  //
  // Ejemplos inválidos:
  // undefined
  // null
  // 123
  // ""
  // "    "
  if (
    typeof name !== 'string' ||
    name.trim() === ''
  ) {

    // Devuelve inmediatamente una respuesta HTTP 400
    // (Bad Request)
    //
    // status(400) establece el código HTTP
    //
    // json(...) envía la respuesta como JSON
    return res.status(400).json({
      error:
        "El campo 'name' es obligatorio y debe ser una cadena no vacía."
    });
  }

  // Si la validación fue correcta,
  // pasa el control al siguiente middleware
  // o al handler final de la ruta
  next();
}


// ===============================
// Ruta POST /saludo
// ===============================

// Define una ruta POST
//
// Cuando llegue una petición a:
//
// POST /saludo
//
// Express ejecutará:
//
// 1. validarNombre
// 2. handler final
router.post(

  // Ruta
  '/saludo',

  // Middleware de validación
  validarNombre,

  // Handler principal
  (req, res) => {

    // Obtiene nuevamente el campo name del body
    const { name } = req.body;

    // Responde con un JSON
    //
    // Express automáticamente:
    // - convierte el objeto a JSON
    // - configura Content-Type: application/json
    res.json({
      message: `Hola, ${name}!`
    });
  }
);


// Exporta el router para que pueda ser usado
// desde otro archivo
//
// Ejemplo:
//
// const router = require('./router');
// app.use(router);
module.exports = router;