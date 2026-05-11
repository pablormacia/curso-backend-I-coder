//"use strict"
//Hoisting

console.log(nombre)

var nombre = "Pablo"

saludar()
//saludar2()

function saludar(){
    console.log("Hola")
}

saludar2 = ()=>console.log("Hola función flecha")

let variableGlobal = "variable global let"

if(true){
    console.log(variableGlobal)
}

x=10
console.log(x)