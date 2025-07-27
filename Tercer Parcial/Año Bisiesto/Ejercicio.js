let prompt = require('prompt-sync')();

let compra = prompt("Ingrese el valor de la compra:");
compra = parseFloat(compra);

if (isNaN(compra)) {
    console.log("Por favor, ingrese un número válido.");
} else {
    let descuento = 0;
    let rango;

    if (compra < 100) {
        rango = 1;
    } else if (compra >= 100 && compra <= 300) {
        rango = 2;
    } else if (compra > 300 && compra <= 500) {
        rango = 3;
    } else if (compra > 500 && compra <= 600) {
        rango = 4;
    } else if (compra > 600) {
        rango = 5;
    } else {
        rango = 0;
    }

    switch (rango) {
        case 1:
            descuento = 0;
            break;
        case 2:
            descuento = compra * 0.05;
            break;
        case 3:
            descuento = compra * 0.10;
            break;
        case 4:
            descuento = compra * 0.12;
            break;
        case 5:
            descuento = compra * 0.15;
            break;
        default:
            descuento = 0;
            break;
    }

    console.log("Total de la compra: " + compra + " euros");
    console.log("Descuento aplicado: " + descuento + " euros");
    console.log("Total a pagar: " + (compra - descuento) + " euros");
}