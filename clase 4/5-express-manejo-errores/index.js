// Configura stdin para que entregue texto UTF-8
// en lugar de objetos Buffer
process.stdin.setEncoding('utf-8');

// Variable donde se acumulará todo el contenido recibido
// desde stdin
let input = '';

// Escucha el evento 'data'
// Cada vez que llegan datos, los agrega al string input
process.stdin.on('data', chunk => input += chunk);

// Escucha el evento 'end'
// Se ejecuta cuando stdin se cierra (EOF)
process.stdin.on('end', () => {

  // Elimina espacios/saltos de línea al principio y final
  // y divide el texto completo en un array de líneas
  const lines = input.trim().split('\n');

  // La primera línea contiene la cantidad de comandos
  // parseInt convierte el string a número
  const n = parseInt(lines[0]);

  // Obtiene únicamente las líneas que contienen comandos
  // Ej:
  // ["3", "VALIDATE hola", "FIND 1", "FIND 99"]
  // =>
  // ["VALIDATE hola", "FIND 1", "FIND 99"]
  const commands = lines.slice(1, n + 1);

  // Simulación de una base de datos
  // Contiene IDs considerados válidos
  const validIds = ['1', '2', '3', '10'];

  // Clase de error personalizada
  // Se usará para errores de validación (HTTP 400)
  class ValidationError extends Error {}

  // Clase de error personalizada
  // Se usará para recursos no encontrados (HTTP 404)
  class NotFoundError extends Error {}

  // Función asíncrona que procesa un comando
  async function processRequest(commandLine) {

    // Divide la línea en dos partes
    // Ej:
    // "VALIDATE hola"
    // =>
    // ["VALIDATE", "hola"]
    const [command, param] = commandLine.split(' ');

    // Verifica si el comando es VALIDATE
    if (command === 'VALIDATE') {

      // Expresión regular:
      // ^ = inicio
      // [a-zA-Z]+ = una o más letras
      // $ = fin
      //
      // Acepta:
      // hola
      // Pablo
      //
      // Rechaza:
      // hola123
      // 123
      // hola-mundo
      if (!/^[a-zA-Z]+$/.test(param)) {

        // Lanza un error personalizado
        throw new ValidationError('Bad Request');
      }

      // Si pasó la validación
      return '200 OK';

    // Verifica si el comando es FIND
    } else if (command === 'FIND') {

      // Busca el ID dentro de la base simulada
      if (!validIds.includes(param)) {

        // Si no existe, lanza error 404
        throw new NotFoundError('Not Found');
      }

      // Si existe
      return '200 OK';

    } else {

      // Si el comando no es conocido
      // lanza un error genérico
      throw new Error('Internal Server Error');
    }
  }

  // IIFE Async (Immediately Invoked Function Expression)
  // Se crea y ejecuta inmediatamente
  (async () => {

    // Recorre todos los comandos recibidos
    for (const cmd of commands) {

      try {

        // Espera el resultado de processRequest
        const result = await processRequest(cmd);

        // Imprime la respuesta exitosa
        console.log(result);

      } catch (err) {

        // Si el error es ValidationError
        if (err instanceof ValidationError) {

          // Simula una respuesta HTTP 400
          console.log('400 Bad Request');

        // Si el error es NotFoundError
        } else if (err instanceof NotFoundError) {

          // Simula una respuesta HTTP 404
          console.log('404 Not Found');

        } else {

          // Cualquier otro error se trata como 500
          console.log('500 Internal Server Error');
        }
      }
    }
  })();
});

/*
Ejemplo de ejecución:

echo "3
VALIDATE hola
VALIDATE hola123
FIND 42" | node index.js

Proceso:

1) VALIDATE hola
   - contiene solo letras
   - devuelve 200 OK

2) VALIDATE hola123
   - contiene números
   - lanza ValidationError
   - imprime 400 Bad Request

3) FIND 42
   - 42 no existe en validIds
   - lanza NotFoundError
   - imprime 404 Not Found

Salida:

200 OK
400 Bad Request
404 Not Found
*/