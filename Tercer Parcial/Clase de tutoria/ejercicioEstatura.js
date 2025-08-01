const readline = require('readline-sync');

let total = 0;
let count = 0;
let input;

do {
    input = readline.question('Ingresa la estatura de la persona (o escribe "fin" para terminar): ');
    if (input.toLowerCase() !== 'fin') {
        let height = parseFloat(input);
        if (!isNaN(height) && height > 0) {
            total += height;
            count++;
        } else {
            console.log('Por favor, ingresa un número válido.');
        }
    }
} while (input.toLowerCase() !== 'fin');

if (count === 0) {
    console.log('No se ingresaron estaturas.');
} else {
    console.log('El promedio de estaturas es: ' + (total / count).toFixed(2) + ' metros');
}
