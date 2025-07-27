//importar libreria
const prompt = require('prompt-sync')();

//funcion con paramentros 
function calculadorGastos(alojamiento, alimentacion, entrenimiento) {

    return alojamiento + alimentacion + entrenimiento;
} 

//ingreso de datos
let alojamiento = parseFloat(prompt("Introduce el gasto de alojamiento: "));
let alimentacion = parseFloat(prompt("Introduce el gasto de alimentación: "));
let entretenimiento = parseFloat(prompt("Introduce el gasto de entretenimiento: "));

const totalGastos = calculadorGastos(alojamiento, alimentacion, entretenimiento);