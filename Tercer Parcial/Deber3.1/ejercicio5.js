const prompt = require('prompt-sync')();

const horas = parseInt(prompt('Horas de estacionamiento (1-12): '));
const minutos = parseInt(prompt('Minutos de estacionamiento (0-60): '));

if (isNaN(horas) || horas < 0 || horas > 12 || isNaN(minutos) || minutos < 0 || minutos > 60) {
    console.log('Entrada inválida. Horas deben estar entre 1 y 12, minutos entre 0 y 60.');
} else {
    const horasFacturables = horas + (minutos > 0 ? 1 : 0);
    const tarifaPorHora = 1500; 
    const pagoTotal = horasFacturables * tarifaPorHora;
    console.log(`Total a pagar: $/. ${pagoTotal.toLocaleString('es-PE')}`);
}
