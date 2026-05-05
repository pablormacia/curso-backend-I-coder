class Usuario {
    constructor(nombre, edad) {
        this.nombre = nombre
        this.edad = edad
    }

    setEdad(nuevaEdad){
        if(typeof nuevaEdad !== "number" || nuevaEdad <=0){
            throw new Error("Edad inválida")
        }
        this.edad = nuevaEdad
    }
}

let usuario1 = new Usuario("Pablo",38)

console.log(usuario1)

usuario1.setEdad(39)

console.log(usuario1)

/* usuario1.setEdad("40")

console.log(usuario1) */

//Capturar los errores:

try{
    usuario1.setEdad("40")
}catch(error){
    console.log(error.message)
}