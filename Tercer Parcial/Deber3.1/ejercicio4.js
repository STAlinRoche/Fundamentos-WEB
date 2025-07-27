const prompt = require('prompt-sync')();

const tipo = prompt('¿Quieres pizza vegetariana? (s/n): ').toLowerCase();
const opciones = tipo === 's'
  ? ['Pimiento', 'Tofu']
  : ['Peperoni', 'Jamón', 'Salmón'];

console.log('Selecciona un ingrediente adicional:');
opciones.forEach((ing, i) => console.log(`${i + 1}. ${ing}`));

const eleccion = parseInt(prompt(`Opción (1-${opciones.length}): `));
const ingrediente = opciones[eleccion - 1];
const vegetariana = tipo === 's';

console.log(`\nTu pizza es ${vegetariana ? 'vegetariana' : 'no vegetariana'} y lleva: tomate, mozzarella, ${ingrediente}.`);
