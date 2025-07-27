const prompt = require('prompt-sync')();

// Entradas
const cantidadDocenas = parseInt(prompt('Cantidad de docenas compradas: '));
const precioPorDocena  = parseFloat(prompt('Precio por docena: '));

// Cálculos
const montoCompra      = cantidadDocenas * precioPorDocena;
const tasaDescuento    = cantidadDocenas > 3 ? 0.15 : 0.10;
const montoDescuento   = montoCompra * tasaDescuento;
const montoAPagar      = montoCompra - montoDescuento;
const unidadesObsequio = cantidadDocenas > 3 ? cantidadDocenas - 3 : 0;

// Salidas
console.log(`Monto de compra: ${montoCompra.toFixed(2)} €`);
console.log(`Descuento (${tasaDescuento * 100}%): -${montoDescuento.toFixed(2)} €`);
console.log(`Monto a pagar: ${montoAPagar.toFixed(2)} €`);
console.log(`Unidades de obsequio: ${unidadesObsequio}`);
