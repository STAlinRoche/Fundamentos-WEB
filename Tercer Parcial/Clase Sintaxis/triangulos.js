const prompt = require('prompt-sync')();

// Función para validar un lado positivo
function validarLado(nombreLado) {
    let lado;
    do {
        lado = parseFloat(prompt(`Ingrese ${nombreLado} (> 0): `));
        if (isNaN(lado) || lado <= 0) {
            console.log(" Error: debe ingresar un número mayor que 0.");
        }
    } while (isNaN(lado) || lado <= 0);
    return lado;
}

// Función para verificar si los lados forman un triángulo
function esTrianguloValido(a, b, c) {
    return a + b > c && a + c > b && b + c > a;
}

// Función para determinar el tipo de triángulo
function tipoTriangulo(a, b, c) {
    if (a === b && b === c) {
        return "Equilátero";
    } else if (a === b || a === c || b === c) {
        return "Isósceles";
    } else {
        return "Escaleno";
    }
}

// Programa principal
console.log(" Verificador de tipo de triángulo ");

const lado1 = validarLado("el primer lado");
const lado2 = validarLado("el segundo lado");
const lado3 = validarLado("el tercer lado");

console.log("\n Lados ingresados:");
console.log(`Lado 1: ${lado1}`);
console.log(`Lado 2: ${lado2}`);
console.log(`Lado 3: ${lado3}`);

if (!esTrianguloValido(lado1, lado2, lado3)) {
    console.log("\n No se puede formar un triángulo con estos lados.");
} else {
    const tipo = tipoTriangulo(lado1, lado2, lado3);
    console.log(`\n Es un triángulo ${tipo}.`);
}
