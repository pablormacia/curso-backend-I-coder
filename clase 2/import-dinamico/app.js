async function usarCalculadora(operacion, a, b) {

  console.log("Cargando módulo...")

  const modulo = await import(`./modulos/${operacion}.js`)

  console.log("Módulo cargado")

  modulo.operar(a, b)
}

usarCalculadora("suma", 10, 5)