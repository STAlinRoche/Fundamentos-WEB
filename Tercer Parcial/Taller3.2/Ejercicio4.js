const prompt = require('prompt-sync')();

let vector = [];

for (let i = 0; i < 6; i++) {
  let valor = prompt(`Ingrese el elemento ${i + 1}: `);
  vector[i] = valor;
}

for (let i = 0; i < 3; i++) { 
  let temp = vector[i];
  vector[i] = vector[5 - i];
  vector[5 - i] = temp;
}

console.log("\nVector invertido:");
for (let i = 0; i < 6; i++) {
  console.log(`Elemento ${i + 1}: ${vector[i]}`);
}
