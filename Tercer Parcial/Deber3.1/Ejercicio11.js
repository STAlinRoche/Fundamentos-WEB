const prompt = require('prompt-sync')();

let examen = parseFloat(prompt("Ingrese la nota del examen escrito (0 a 100): "));
let lecciones = parseFloat(prompt("Ingrese la nota de las lecciones (0 a 10): "));
let tareas = parseFloat(prompt("Ingrese la nota de las tareas (0 a 10): "));
let practicas = parseFloat(prompt("Ingrese la nota de las prácticas (0 a 10): "));

if (
  isNaN(examen) || isNaN(lecciones) || isNaN(tareas) || isNaN(practicas) ||
  examen < 0 || examen > 100 ||
  lecciones < 0 || lecciones > 10 ||
  tareas < 0 || tareas > 10 ||
  practicas < 0 || practicas > 10
) {
  console.log("Error: Ingrese notas válidas dentro de los rangos especificados.");
} else {
  let notaExamen = (examen * 60 / 100) * 20 / 100;     
  let notaLecciones = (lecciones * 20 / 10) * 20 / 100;  
  let notaTareas = (tareas * 20 / 10) * 15 / 100;
  let notaPracticas = (practicas * 20 / 10) * 5 / 100;

  let notaFinal = notaExamen + notaLecciones + notaTareas + notaPracticas;

  console.log("La nota final sobre 20 es: " + notaFinal.toFixed(2));
}
