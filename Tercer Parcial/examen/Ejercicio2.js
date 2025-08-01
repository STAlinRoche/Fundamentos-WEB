const prompt = require('prompt-sync')();

const dia = prompt('ingrese el dia de la llamada');
const duracion = parseInt(prompt('ingrese la duracion de la llamada'));
const turno = prompt('turno matutina o vespertino?');



if (dia === "lunes" || dia === "martes" || dia === "miercoles" || dia === "jueves" || dia === "viernes") {
    if (turno === "matutina") {
        let porcentaje = 0.15;
        let total = tiempo(duracion);
        let totalPagar = total * porcentaje + total;
        console.log(`El total a pagar es: $${totalPagar}`);
    } else if (turno === "vespertino") {
        let porcentaje = 0.10;
        let total = tiempo(duracion);
        let totalPagar = total * porcentaje + total;
        console.log(`El total a pagar es: $${totalPagar}`);

    }
}else if (dia === "domingo") {
    let porcentaje = 0.3;
    let total = tiempo(duracion);
    let totalPagar = total * porcentaje + total;
    console.log(`El total a pagar es: $${totalPagar.toFixed(2)}`);
}else {
    let total = tiempo(duracion);
    console.log(`El total a pagar es: $${total.toFixed(2)}`);
}

function tiempo(duracion) {
 if (duracion >= 0 && duracion <= 5) {
     total = duracion * 1;
     return total;
 } else if (duracion > 5 && duracion <= 8) {
     total = 5 + 0.8 *3;
     return total;
 } else if (duracion > 8 && duracion <= 10) {
     total = 5 + 2.4 + 1,4;
     return total;
 } else if (duracion > 10) {
     total = (duracion - 10) * 0.5 + (8.8);
     return total;
 }
}