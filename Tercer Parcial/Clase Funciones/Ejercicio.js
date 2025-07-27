const prompt = require('prompt-sync')();

const inicio = parseInt(prompt('Ingrese el primer número: '));
const fin = parseInt(prompt('Ingrese el segundo número: '));

function esPrimo(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

console.log(`Números primos entre ${inicio} y ${fin}:`);
for (let i = inicio; i <= fin; i++) {
    if (esPrimo(i)) {
        console.log(i);
    }
}