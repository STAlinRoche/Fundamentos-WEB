const prompt = require('prompt-sync')();
// Edades sin vector
const edad1 = 18;
const edad2 = 20;
const edad3 = 19;
const edad4 = 21;

console.log("Edades sin vector:");
console.log("Alumno 1:", edad1, "años");
console.log("Alumno 2:", edad2, "años");
console.log("Alumno 3:", edad3, "años");
console.log("Alumno 4:", edad4, "años");


// Almacenando las edades con un vector (arreglo)
let edades = [];
for (let i = 0; i < 4; i++) {
    edades[i] = parseInt(prompt(`Ingrese la edad del alumno ${i + 1}: `));
}

console.log("Edades con vector:");
for (let i = 0; i < edades.length; i++) {
    console.log(`Alumno ${i + 1}: ${edades[i]} años`);
}
