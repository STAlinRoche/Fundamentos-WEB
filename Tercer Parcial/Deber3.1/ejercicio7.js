const prompt = require('prompt-sync')();

const numero = prompt('Número de tres cifras: ');
const invertido = numero.split('').reverse().join('');

console.log(
  numero === invertido
    ? 'El número es igual al revés'
    : 'El número NO es igual al revés'
);
