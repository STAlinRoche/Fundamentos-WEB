const prompt = require('prompt-sync')();

let edadJuan = parseInt(prompt("Ingrese la edad de Juan: "));
let edadMario = parseInt(prompt("Ingrese la edad de Mario: "));
let edadPedro = parseInt(prompt("Ingrese la edad de Pedro: "));

if (isNaN(edadJuan) || isNaN(edadMario) || isNaN(edadPedro)) {
  console.log("Error: Ingrese solo números.");
} else {
  let juanMario = (edadJuan == edadMario) || (edadJuan == edadMario + 1) || (edadJuan + 1 == edadMario);
  let juanPedro = (edadJuan == edadPedro) || (edadJuan == edadPedro + 1) || (edadJuan + 1 == edadPedro);
  let marioPedro = (edadMario == edadPedro) || (edadMario == edadPedro + 1) || (edadMario + 1 == edadPedro);

  if (juanMario && juanPedro && marioPedro) {
    console.log("Juan, Mario y Pedro son contemporáneos.");
  } else if (juanMario) {
    console.log("Juan y Mario son contemporáneos.");
  } else if (juanPedro) {
    console.log("Juan y Pedro son contemporáneos.");
  } else if (marioPedro) {
    console.log("Mario y Pedro son contemporáneos.");
  } else {
    console.log("Ninguno de los tres es contemporáneo.");
  }
}
