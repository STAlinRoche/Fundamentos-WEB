const prompt = require('prompt-sync')();

const km = parseFloat(prompt('Kilómetros recorridos: '));
const tarifaInicial = 3000.00;      
let montoAlquiler = tarifaInicial;

if (km > 300) {
    const tramo1 = Math.min(km, 1000) - 300;
    montoAlquiler += tramo1 * 15.00;  

if (km > 1000) {
    const tramo2 = km - 1000;
    montoAlquiler += tramo2 * 10.00;
}

const ivaIncluido = montoAlquiler * 20 / 120;  

console.log(`Monto a pagar: $${montoAlquiler.toFixed(2)}`);
console.log(`IVA incluido (20%): $${ivaIncluido.toFixed(2)}`);
console.log(`Monto total (incluido IVA): $${(montoAlquiler + ivaIncluido).toFixed(2)}`);
} 