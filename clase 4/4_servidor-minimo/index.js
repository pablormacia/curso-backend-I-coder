process.stdin.setEncoding('utf-8');

let input = '';
process.stdin.on('data', chunk => {
  input += chunk;
});

process.stdin.on('end', () => {
  const lines = input.trim().split('\n');
  const method = lines[0];
  const path = lines[1];

  if (path === '/saludo') {
    switch (method) {
      case 'GET':
        console.log('Hola desde GET');
        break;
      case 'POST':
        console.log('Hola desde POST');
        break;
      case 'PUT':
        console.log('Hola desde PUT');
        break;
      case 'DELETE':
        console.log('Hola desde DELETE');
        break;
      case 'PATCH':
        console.log('Hola desde PATCH');
        break;
      default:
        console.log('Ruta o método no soportado');
    }
  } else {
    console.log('Ruta o método no soportado');
  }
});


/* 
>> GET
>> /saludo" | node index.js
Hola desde GET
 */