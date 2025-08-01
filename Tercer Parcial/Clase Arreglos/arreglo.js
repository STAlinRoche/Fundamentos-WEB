const prompt = require('prompt-sync')();

let n= parseInt(prompt("Cuantos elementos tendra el arreglo: "));

let numeros = [];

for (let i = 0; i < n; i++) {
    let numero = parseFloat(prompt(`Ingrese el elemento ${i + 1}: `));
    numeros.push(numero);
}
console.log("Los elementos del arreglo son:", numeros);

// Calcular la suma de los elementos del arreglo
let suma = 0;

for (let i = 0; i < numeros.length; i++) {
    suma += numeros[i];
}

console.log("La suma de los elementos del arreglo es:", suma);