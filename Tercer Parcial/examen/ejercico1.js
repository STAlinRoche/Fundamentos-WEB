const prompt = require('prompt-sync')();

let ciudades = parseInt(prompt("¿Cuántas ciudades hay?: "));
let total = 0;

for (let i = 1; i <= ciudades; i++) {
  let tiendas = parseInt(prompt(`Tiendas en ciudad ${i}: `));
  for (let j = 1; j <= tiendas; j++) {
    let empleados = parseInt(prompt(`Empleados en tienda ${j}: `));
    for (let k = 1; k <= empleados; k++) {
      let venta = parseFloat(prompt('Venta del empleado ${k}: $'));
      total = venta;
    }
  }
}

console.log(`Total recaudado en todas las ciudades: $${total}`);