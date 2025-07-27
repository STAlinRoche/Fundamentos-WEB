const prompt = require('prompt-sync')();

const FILAS = 4;
const COLUMNAS = 4;
let matriz = [];
let contadorCeros = 0;

for (let i = 0; i < FILAS; i++) {
  matriz[i] = [];
  for (let j = 0; j < COLUMNAS; j++) {
    let valor = prompt(`Ingrese valor para posición [${i}][${j}]: `);
    let num = parseInt(valor);
    matriz[i][j] = num;

    if (num === 0) {
      contadorCeros++;
    }
  }
}

console.log(`\nCantidad de ceros en la matriz: ${contadorCeros}`);
