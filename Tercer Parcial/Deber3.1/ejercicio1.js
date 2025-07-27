const prompt = require('prompt-sync')();

// creamos los vectores
let A = [];
let B = [];
let C = [];

// Pedimos el número de alumnos
const size = parseInt(prompt("Número de alumnos: "));

// Llenamos A y B
for (let i = 0; i < size; i++) {
    A[i] = prompt(`Nombre del alumno ${i + 1}: `);
    B[i] = prompt(`Sexo de ${A[i]} (F/M): `);
}

// Determinamos el grupo y llenamos C
for (let i = 0; i < size; i++) {
    const inicial = A[i][0];
    C[i] = (B[i] === 'F' && inicial < 'M') || (B[i] === 'M' && inicial > 'N') ? 'A' : 'B';
}

// Mostramos resultados
for (let i = 0; i < size; i++) {
    console.log(`${A[i]} (${B[i]}) → Grupo ${C[i]}`);
}
