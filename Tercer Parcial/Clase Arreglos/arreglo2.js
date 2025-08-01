//el usuario ingresa n elementos
//guardar en un array
//calcular: suma total, promedio, mayor y menor
//usar funciones para cada calculo
const prompt = require('prompt-sync')();

//funcion para la suma
function calcularSuma(arreglo){
    let suma = 0;
//recorrerel array con for of
    for (let num of arreglo) {
        suma += num;
    }
    return suma;
} 
//calcular promedio
function calcularPromedio(arreglo) {
    let suma = calcularSuma(arreglo);
    return suma / arreglo.length;
}
//calcular el mayor
function calcularMayor(arreglo) {
    return Math.max(...arreglo);
}
//calcular el menor
function calcularMenor(arreglo) {
    return Math.min(...arreglo);
}

//ingresar n elementos
let n = parseInt(prompt("Cuantos elementos tendra el arreglo: "));
let numeros = [];

for (let i = 0; i < n; i++) {
    let numero = parseFloat(prompt(`Ingrese el elemento ${i + 1}: `));
    numeros.push(numero);
}
//mostrar los elementos del arreglo
console.log("Los elementos del arreglo son:", numeros);

//calcular y mostrar resultados
console.log("La suma de los elementos es:", calcularSuma(numeros));
console.log("El promedio de los elementos es:", calcularPromedio(numeros));
console.log("El elemento mayor es:", calcularMayor(numeros));
console.log("El elemento menor es:", calcularMenor(numeros));