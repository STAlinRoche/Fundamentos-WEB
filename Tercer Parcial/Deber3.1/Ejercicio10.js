const prompt = require('prompt-sync')();

let costo = parseFloat(prompt("Ingrese el costo del artículo: "));

if (isNaN(costo) || costo <= 0) {
  console.log("Error: el costo debe ser un número positivo.");
} else {
  let ganancia = costo * 15 / 100;
  let precioVenta = costo + ganancia;

  console.log("La ganancia del 15% es: " + ganancia);
  console.log("El precio de venta debe ser: " + precioVenta);
}
