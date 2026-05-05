//Clases 

class Producto {
    constructor(nombreP,precioP){ //La P es para diferenciar que es un parámetro , no se suele usar aí
        this.nombre = nombreP //atributos o propiedades
        this.precio = precioP 
    }
    mostrarInfo(){
        console.log(`Esta es un producto ${this.nombre} que vale $${this.precio}`)
    }
}

const tv = new Producto("Sony 55'", 500000) //Instancia de la clase
const pc = new Producto("Hp",900000)

console.log(tv)
console.log(pc)

tv.mostrarInfo()
pc.mostrarInfo()