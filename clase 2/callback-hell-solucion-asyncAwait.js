
//Solución con Promises

function obtenerUsuario() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, nombre: "Pablo" })
    }, 1000)
  })
}

function obtenerPedidos(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["pedido1", "pedido2"])
    }, 1000)
  })
}

function obtenerDetalle(pedido) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Detalle de ${pedido}`)
    }, 1000)
  })
}


  //Consumir con async/await

  async function main() {

  try {

    const usuario = await obtenerUsuario()
    console.log("Usuario:", usuario)

    const pedidos = await obtenerPedidos(usuario.id)
    console.log("Pedidos:", pedidos)

    const detalle = await obtenerDetalle(pedidos[0])
    console.log("Detalle:", detalle)

  } catch(error) {
    console.log(error)
  }

}

main()