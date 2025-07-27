const prompt = require('prompt-sync')();

let i1 = parseInt(prompt("Estado del interruptor 1 (0 = abierto, 1 = cerrado): "));
let i2 = parseInt(prompt("Estado del interruptor 2 (0 = abierto, 1 = cerrado): "));
let i3 = parseInt(prompt("Estado del interruptor 3 (0 = abierto, 1 = cerrado): "));

if (
  (i1 !== 0 && i1 !== 1) ||
  (i2 !== 0 && i2 !== 1) ||
  (i3 !== 0 && i3 !== 1)
) {
  console.log("Error: Solo se permiten valores 0 o 1.");
} else {
  let cerrados = 0;

  if (i1 === 1) {
    cerrados = cerrados + 1;
  }
  if (i2 === 1) {
    cerrados = cerrados + 1;
  }
  if (i3 === 1) {
    cerrados = cerrados + 1;
  }

  if (cerrados >= 2) {
    console.log("El equipo funcionará. Hay al menos dos interruptores cerrados.");
  } else {
    console.log("El equipo NO funcionará. Se requiere mínimo dos interruptores cerrados.");
  }
}
