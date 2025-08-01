const prompt = require('prompt-sync')();

const producto = {
    precioOriginal: 0,
    porcentajeDescuento: 0
};

producto.precioOriginal = parseFloat(prompt("Ingrese el precio original del producto: "));
producto.porcentajeDescuento = parseFloat(prompt("Ingrese el porcentaje de descuento: "));

console.log("Datos ingresados:");
for (let campo in producto) {
    console.log(`${campo}: ${producto[campo]}`);
}

function calcularPrecioFinal(precio, descuento) {
    return precio - (precio * descuento / 100);
}

const precioFinal = calcularPrecioFinal(producto.precioOriginal, producto.porcentajeDescuento);
console.log(`El precio final del producto después del descuento es: $${precioFinal.toFixed(2)}`);