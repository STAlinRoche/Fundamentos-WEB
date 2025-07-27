const prompt= require('prompt-sync')();


//crear una funcion para validar notas de 0 a 20

function validarNota(nombreNota){
    let nota;
    do {
        nota = parseFloat(prompt( `Ingrese ${nombreNota} (0-20`))
        if(isNaN(nota) || nota < 0 || nota > 20){
            console.log("No cumple con el valor pedidio");
        }

        
    } while (isNaN(nota) < 0 || nota < 0 || nota > 20);
    
    return 0;
}

/*
let n1=parseFloat(prompt("Inrgese una"))
*/

let n1 = parseInt(prompt("ingrese la primera nota (n1)"));
let n2 = parseInt(prompt("Ingrese la segunda nota (n2)"));
let n3 = parseInt(prompt("Ingrese la tercer nota (n3)"));

let promedio = (n1+n2+n3)/3;

console.log("Calcular nota");

console.log(`Numero 1: ${n1.toFixed(2)}`);
console.log(`Numero 2: ${n2.toFixed(2)}`); 
console.log(`Numero 3: ${n3.toFixed(2)}`);

console.log(`Promedio: ${promedio.toFixed(2)}`);

