const prompt = require('prompt-sync')();

let precioUnitario = parseFloat(prompt("Ingrese el precio unitario del artículo: "));
let cantidad = parseInt(prompt("Ingrese la cantidad de artículos comprados: "));

if (isNaN(precioUnitario) || isNaN(cantidad) || precioUnitario < 0 || cantidad <= 0) {
  console.log("Error: Ingrese valores válidos y positivos.");
} else {
  let total = precioUnitario * cantidad;
  let descuento = 0;

  if (cantidad > 20) {
    descuento = total * 10 / 100;
    console.log("Se aplica un descuento del 10%.");
  } else if (cantidad > 10 || cantidad <= 20) {
    descuento = total * 5 / 100;
    console.log("Se aplica un descuento del 5%.");
  } else {
    console.log("No se aplica descuento.");
  }

  let totalFinal = total - descuento;
  console.log("Total a pagar: $" + totalFinal.toFixed(2));
}
