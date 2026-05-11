//ECMAScript 2016 (ES7) y 2017 (ES8)
//Operador Exponencial (**)

const base = 2;
const exponente = 3;
const resultado = base ** exponente; // 8
console.log("Resultado exponente: ", exponente)

//Método Array.includes()

const frutas = ['manzana', 'banana', 'cereza'];
console.log("Resultado includes()", frutas.includes('banana')); // true
console.log("Resultado includes()",frutas.includes('pera'));   // false

//Sintaxis async/await ES8

function fakeFetch() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const ok = Math.random() > 0.3

      if (ok) {
        resolve({ status: 200, data: ["producto1", "producto2"] })
      } else {
        reject("Error del servidor")
      }
    }, 1500)
  })
}

//Con promesa encadenada:
fakeFetch()
  .then(data => console.log(data))
  .catch(err => console.error(err))

//Con async/await

async function obtenerDatos() {
  try {
    const res = await fakeFetch()
    console.log(res.data)
  } catch (error) {
    console.error(error)
  }
}

obtenerDatos()

//Object.entries() y Object.values()

const usuario = { nombre: 'Ana', edad: 30 };

console.log(Object.entries(usuario));
// [['nombre', 'Ana'], ['edad', 30]]

console.log(Object.values(usuario));
// ['Ana', 30]