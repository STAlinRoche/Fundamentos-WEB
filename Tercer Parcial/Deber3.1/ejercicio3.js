const prompt = require('prompt-sync')();

const edad = parseInt(prompt('Edad del cliente: '));
let precioEntrada;

if (edad < 4) precioEntrada = 0;
else if (edad <= 18) precioEntrada = 5;
else precioEntrada = 10;

console.log(`Precio de la entrada: ${precioEntrada}$`);
