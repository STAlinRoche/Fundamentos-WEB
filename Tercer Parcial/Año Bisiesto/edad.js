const prompt = require('prompt-sync')();

let edad = parseInt(prompt("Ingrese su edad: "));

// lógica para determinar si la persona es mayor de edad

if (edad <= 12) {
    console.log("La persona es un niño");
}else if (edad > 11 && edad < 18) {
    console.log("La persona es un adolescente");
}else if (edad >= 18 && edad <= 80) {
    console.log("La persona es un adulto"); 
}