const prompt = require('prompt-sync')();

const rentaAnual = parseFloat(prompt('Renta anual: '));
let tasaImpositiva;
let impuesto;
let total;

if (rentaAnual < 10000) tasaImpositiva = 0.05;
else if (rentaAnual <= 20000) tasaImpositiva = 0.15;
else if (rentaAnual <= 35000) tasaImpositiva = 0.20;
else if (rentaAnual <= 60000) tasaImpositiva = 0.30;
else tasaImpositiva = 0.45;

impuesto = rentaAnual * tasaImpositiva;
total = rentaAnual + impuesto;

console.log(`Tipo impositivo: ${tasaImpositiva * 100}%`);
console.log(`Impuesto a pagar: ${impuesto}`);
console.log(`Total (renta + impuesto): ${total}`);
