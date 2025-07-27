const prompt = require('prompt-sync')();

let anio= parseInt(prompt("Ingrese un año: "));


//logica


//visualizar en consola

console.log("Verificar si un año es bisiesto" + anio+"es bisiesto: ");


if(anio % 400===0){
    console.log("el año es bisiesti" + anio + "divisible para 400");
} else if(anio % 4 === 0){
    console.log("el año es bisiesto" + anio);
    if(anio % 100 != 0){
        console.log("el año es bisiesto (divisible para 4 y no entre 100)" + anio);
    }else{
        console.log("el año no es bisiesto (divisible entre 100 per no para 400)" + anio);
    }       
}else{
    console.log("el año no es bisiesto (no divisible por 4)" );
}





