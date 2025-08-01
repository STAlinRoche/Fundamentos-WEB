const prompt = require('prompt-sync')();

const cantidad = parseInt(prompt("¿Cuántas personas quieres ingresar? "));

for (let i = 0; i < cantidad; i++) {
    console.log(`\nPersona ${i}:`);

    const peso = parseFloat(prompt("Ingresa el peso de la persona (en kg): "));
    const altura = parseFloat(prompt("Ingresa la altura de la persona (en metros):"));

    const imc = peso / (altura * altura);

    let clasificacion = "";
    if (imc < 18.5) {
        clasificacion = "Bajo peso";
    } else if (imc < 24.9) {
        clasificacion = "Peso normal";
    } else if (imc < 29.9) {
        clasificacion = "Sobrepeso";
    } else {
        clasificacion = "Obesidad";
    }

    console.log(`El IMC de la persona ${i} es: ${imc.toFixed(2)} (${clasificacion})`);
}

