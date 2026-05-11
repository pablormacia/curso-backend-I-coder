const calculadoraPositiva = (a,b)=>{
    return new Promise((resolve,reject)=>{
        const suma = a + b
        if(suma>=0){
            resolve(suma)
        }else{
            reject(new Error("El resultado no es positivo"))
        }
    })
}

async function usarCalculadora(a, b) {
  try {
    const resultado = await calculadoraPositiva(a, b);
    console.log('Resultado positivo:', resultado);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

usarCalculadora(2,-3)

