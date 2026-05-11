const calculadoraPositiva = (...numeros) => {
  console.log("Inicializando operación...");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const suma = numeros.reduce((acc, current) => acc + current, 0);

      if (suma >= 0) {
        resolve(suma);
      } else {
        reject(new Error("El resultado no es positivo"));
      }
    }, 2000);
  });
};

async function usarCalculadora(...numeros) {
  try {
    const resultado = await calculadoraPositiva(...numeros);
    console.log("Resultado positivo:", resultado);
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    console.log("Operación finalizada");
  }
}

/* calculadoraPositiva(2,-3,-5)
.then(()=>console.log("Inicializando"))
.then(resultado=>console.log(resultado))
.catch(error=>console.log(error.message))
.finally(()=>console.log("Operación finalizada"))
 */
usarCalculadora(2, -3, -5);
