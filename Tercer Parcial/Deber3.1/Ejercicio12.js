const prompt = require('prompt-sync')();

let precio = parseFloat(prompt("Ingrese el precio del producto: "));

if (isNaN(precio) || precio < 0) {
  console.log("Error: Ingrese un valor válido y positivo.");
} else {
  if (precio > 200) {
    let descuento = precio * 20 / 100;
    let total = precio - descuento;
    console.log("Se aplica un 20% de descuento: " + descuento.toFixed(2));
    console.log("Total a pagar: $" + total.toFixed(2));
  } else {
    console.log("No hay descuento.");
    console.log("Total a pagar: $" + precio.toFixed(2));
  }
}
