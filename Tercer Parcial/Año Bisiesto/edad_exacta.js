const prompt = require('prompt-sync')();

//leer la fecha de nacimiento
let fechaNacimiento = prompt("Ingrese su fecha de nacimiento (DD/MM/AAAA): ");

let  [diaNac, mesNac, anioNac] = fechaNacimiento.split('/').map(Number);

let hoy = new Date();
let anioAc = hoy.getFullYear();
let mesAc = hoy.getMonth() + 1 ;
let diaAc = hoy.getDate();

//Calcular la fecha

let anios = anioAc - anioNac;
let meses = mesAc - mesNac;
let dias = diaAc - diaNac;

if (dias < 0) {
    dias +=30;
    meses--;
}


if (meses < 0) {
    meses += 12;
    anios--;
}


console.log(`Edad exacta: ${anios} años, ${meses} meses y ${dias} días.`);