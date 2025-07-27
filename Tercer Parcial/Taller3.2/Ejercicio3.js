const prompt = require('prompt-sync')();

let N = parseInt(prompt("Ingrese el número de alumnos: "));
let nombres = [];
let promedios = [];

for (let i = 0; i < N; i++) {
  let nombre = prompt(`Ingrese el nombre del alumno ${i + 1}: `);
  let promedio = parseFloat(prompt(`Ingrese el promedio de ${nombre}: `));
  nombres[i] = nombre;
  promedios[i] = promedio;
}

for (let i = 0; i < N - 1; i++) {
  for (let j = 0; j < N - 1 - i; j++) {
    if (promedios[j] < promedios[j + 1]) {
      let tempP = promedios[j];
      promedios[j] = promedios[j + 1];
      promedios[j + 1] = tempP;


      let tempN = nombres[i];
      nombres[i] = nombres[i+1];
      nombres[i+1] = tempN;

    }
  }
}

console.log("\nLista de alumnos ordenada por promedio (mayor a menor):");
for (let i = 0; i < N; i++) {
  console.log(nombres[i] + ": " + promedios[i]);
}
