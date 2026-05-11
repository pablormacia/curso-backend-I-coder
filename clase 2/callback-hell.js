function obtenerUsuario(callback) {
  setTimeout(() => {
    callback({ id: 1, nombre: "Pablo" })
  }, 1000)
}

function obtenerPedidos(userId, callback) {
  setTimeout(() => {
    callback(["pedido1", "pedido2"])
  }, 1000)
}

function obtenerDetalle(pedido, callback) {
  setTimeout(() => {
    callback(`Detalle de ${pedido}`)
  }, 1000)
}

obtenerUsuario((usuario) => {

  console.log("Usuario:", usuario)

  obtenerPedidos(usuario.id, (pedidos) => {

    console.log("Pedidos:", pedidos)

    obtenerDetalle(pedidos[0], (detalle) => {

      console.log("Detalle:", detalle)

    })

  })

})

