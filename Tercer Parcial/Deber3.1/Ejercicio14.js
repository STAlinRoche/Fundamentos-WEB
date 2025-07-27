const prompt = require('prompt-sync')();

let precioPorKilo = parseFloat(prompt("Ingrese el precio por kilo de manzana: "));
let kilos = parseFloat(prompt("Ingrese la cantidad de kilos comprados: "));

if (isNaN(precioPorKilo) || isNaN(kilos) || precioPorKilo < 0 || kilos <= 0) {
  console.log("Error: Ingrese valores válidos y positivos.");
} else {
  let total = precioPorKilo * kilos;
  let descuento = 0;

  if (kilos > 10) {
    descuento = total * 20 / 100;
    console.log("Se aplica un 20% de descuento.");
  } else if (kilos > 5) {
    descuento = total * 15 / 100;
    console.log("Se aplica un 15% de descuento.");
  } else if (kilos > 2) {
    descuento = total * 10 / 100;
    console.log("Se aplica un 10% de descuento.");
  } else {
    console.log("No se aplica descuento.");
  }

  let totalFinal = total - descuento;
  console.log("Total a pagar: $" + totalFinal.toFixed(2));
}
