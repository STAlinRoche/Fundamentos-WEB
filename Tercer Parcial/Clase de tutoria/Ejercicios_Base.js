const prompt = require('prompt-sync')();

console.log("Bienvenidos a la clase de ciclos, bucles");

const nveces = parseInt(prompt("Cuantas veces quieres que se repita el bucle for? "));

console.log("Repeteciciones en for");
for (let i = 0; i < nveces; i++) {
    console.log("Repeticion numero: " + (i));
}

console.log("Ingrese los datos de una persona");
const persona = {
    nombre: prompt("Nombre: "),
    edad: parseInt(prompt("Edad: ")),
    ciudad: prompt("Ciudad: ")
};

console.log("Datos de la persona ingresada:");
for (let clave in persona) {   
    console.log(`${clave}: ${persona[clave]}`);
}

//uso del for of 
let numero= [];
let cantidad = parseInt(prompt("Cuantos numeros quieres ingresar? "));
for (let i = 0; i < cantidad; i++) {
    let n = parseInt(prompt(`Ingrese el numero ${i + 1}: `));
    numero.push(n);
}

console.log("Recorrer los numeros con for of:");
for (let num of numero) {
    console.log(num);
}