'use strict';
// Activa el modo estricto de JavaScript.
// Hace que ciertos errores sean más visibles y evita comportamientos antiguos.

// Importa readline para leer líneas desde stdin
const readline = require('readline');


// =====================================
// Variables para almacenar el input
// =====================================

// Array donde se guardarán todas las líneas leídas
let inputLines = [];

// Índice de la línea actual que se está procesando
let currentLine = 0;


// =====================================
// Configuración de readline
// =====================================

// Crea una interfaz para leer desde stdin
const rl = readline.createInterface({

  // Entrada estándar
  input: process.stdin,

  // Salida estándar
  output: process.stdout,

  // false porque estamos procesando input automático,
  // no una terminal interactiva
  terminal: false
});


// =====================================
// Lectura del input
// =====================================

// Cada vez que llega una línea se agrega al array
rl.on('line', (line) => {
  inputLines.push(line);
});

// Cuando termina la lectura completa del input
// se ejecuta main()
rl.on('close', () => {
  main();
});


// =====================================
// Helper para leer líneas secuencialmente
// =====================================

function readLine() {

  // Devuelve la línea actual
  // y luego incrementa el índice
  return inputLines[currentLine++];
}


// =====================================
// Base de datos simulada en memoria
// =====================================

// Array donde se almacenarán los items creados
const items = [];

// ID autoincremental
let nextId = 1;


// =====================================
// Procesador principal de requests
// =====================================

function processRequest(request) {

  // Destructuring
  // Extrae method, path y body del request
  const { method, path, body } = request;

  // Ruta principal del recurso
  const basePath = '/items';


  // =====================================
  // Helper para obtener el id desde la URL
  // =====================================

  function getIdFromPath(p) {

    // Divide la ruta usando "/"
    //
    // "/items/5"
    // =>
    // ["", "items", "5"]
    const parts = p.split('/');

    // Verifica que la estructura sea correcta
    if (parts.length === 3 && parts[1] === 'items') {

      // Convierte el id a número
      const id = parseInt(parts[2]);

      // Si no es un número devuelve null
      return isNaN(id) ? null : id;
    }

    // Ruta inválida
    return null;
  }


  // =====================================
  // POST /items
  // Crear item
  // =====================================

  if (method === 'POST' && path === basePath) {

    // Valida body
    if (!body || typeof body.name !== 'string') {
      return {
        error: 'Falta campo name en body'
      };
    }

    // Crea nuevo item
    const newItem = {
      id: nextId++,
      name: body.name
    };

    // Lo guarda en memoria
    items.push(newItem);

    // Devuelve el item creado
    return newItem;
  }


  // =====================================
  // GET /items
  // Obtener todos los items
  // =====================================

  if (method === 'GET' && path === basePath) {

    // Devuelve el array completo
    return items;
  }


  // =====================================
  // GET /items/:id
  // Obtener un item específico
  // =====================================

  if (method === 'GET') {

    // Extrae id desde la URL
    const id = getIdFromPath(path);

    // Verifica formato
    if (id === null) {
      return {
        error: 'Ruta inválida'
      };
    }

    // Busca el item por id
    const item = items.find(i => i.id === id);

    // Si no existe
    if (!item) {
      return {
        error: `Item ${id} no encontrado`
      };
    }

    // Devuelve el item encontrado
    return item;
  }


  // =====================================
  // PUT /items/:id
  // Actualizar item
  // =====================================

  if (method === 'PUT') {

    // Obtiene id
    const id = getIdFromPath(path);

    // Verifica formato
    if (id === null) {
      return {
        error: 'Ruta inválida'
      };
    }

    // Verifica body
    if (!body || typeof body.name !== 'string') {
      return {
        error: 'Falta campo name en body'
      };
    }

    // Busca item
    const item = items.find(i => i.id === id);

    // Si no existe
    if (!item) {
      return {
        error: `Item ${id} no encontrado`
      };
    }

    // Actualiza el nombre
    item.name = body.name;

    // Devuelve item actualizado
    return item;
  }


  // =====================================
  // DELETE /items/:id
  // Eliminar item
  // =====================================

  if (method === 'DELETE') {

    // Obtiene id
    const id = getIdFromPath(path);

    // Verifica formato
    if (id === null) {
      return {
        error: 'Ruta inválida'
      };
    }

    // Busca posición del item
    const index = items.findIndex(i => i.id === id);

    // Si no existe
    if (index === -1) {
      return {
        error: `Item ${id} no encontrado`
      };
    }

    // Elimina 1 elemento comenzando desde index
    items.splice(index, 1);

    // Devuelve mensaje de éxito
    return {
      message: `Item ${id} eliminado`
    };
  }


  // =====================================
  // Método no implementado
  // =====================================

  return {
    error: 'Operación no implementada'
  };
}


// =====================================
// Función principal
// =====================================

function main() {

  // Primera línea:
  // cantidad de requests a procesar
  const N = parseInt(readLine());

  // Procesa N requests
  for (let i = 0; i < N; i++) {

    // Lee una línea JSON
    const request = JSON.parse(readLine());

    // Procesa la request
    const response = processRequest(request);

    // Convierte la respuesta a JSON
    // y la imprime
    console.log(JSON.stringify(response));
  }
}

/* 
Ej entrada:
3
{"method":"POST","path":"/items","body":{"name":"Item1"}}
{"method":"GET","path":"/items","body":null}
{"method":"DELETE","path":"/items/1","body":null}

Salida:
{"id":1,"name":"Item1"}
[{"id":1,"name":"Item1"}]
{"message":"Item 1 eliminado"}

*/