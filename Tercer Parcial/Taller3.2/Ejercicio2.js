const prompt = require('prompt-sync')();

// creamos los vectores
let A = [];
let B = [];
let C = [];

// Pedimos el tamaño de los vectores
const size = parseInt(prompt("Ingrese el tamaño de los vectores: "));

// Llenamos los vectores A y B
for (let i = 0; i < size; i++) {
    A[i] = parseInt(prompt(`Ingrese el elemento ${i + 1} del vector A: `));
    B[i] = parseInt(prompt(`Ingrese el elemento ${i + 1} del vector B: `));
}

// Sumar elementos y llenar vector C
for (let i = 0; i < A.length; i++) {
    C[i] = A[i] + B[i];
}

// Mostrar resultados
console.log("Vector A:", A);
console.log("Vector B:", B);
console.log("Vector C = A + B:");

for (let i = 0; i < C.length; i++) {
    console.log(`C[${i}] = ${A[i]} + ${B[i]} = ${C[i]}`);
}

// Mostrar el vector C al final en una sola línea
console.log("Vector C =", C);