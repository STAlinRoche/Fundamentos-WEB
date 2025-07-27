//funcionaes para realizar las operaciones de suma, resta, multiplicación y división
function sumar() {
    let a = parseFloat(document.getElementById("numero1").value);
    let b = parseFloat(document.getElementById("numero2").value);
    let resultado = a + b;
    document.getElementById("resultado").innerHTML =  `
    La suma de ${a} y ${b} es: ${resultado}`;

    //mostrar el resultado en la consola
    console.log(`La suma de ${a} y ${b} es: ${resultado}`);
}

function restar() {
    let a = parseFloat(document.getElementById("numero1").value);
    let b = parseFloat(document.getElementById("numero2").value);
    let resultado = a - b;
    //mostar el resultado en el elemento con innertetx
     document.getElementById("resultado").innerText = `La resta de ${a} y ${b} es: ${resultado}`;

    //mostrar el resultado en la consola
    console.log(`La resta de ${a} y ${b} es: ${resultado}`);
}

function multiplicar() {
    let a = parseFloat(document.getElementById("numero1").value);
    let b = parseFloat(document.getElementById("numero2").value);
    let resultado = a * b;
    
    //mostrar el resultado en el elemento con document.write
    document.writeln(`La resta de ${a} y ${b} es: ${resultado}`);

    //mostrar el resultado en la consola
    console.log(`La multiplicación de ${a} y ${b} es: ${resultado}`);
}

function dividir() {
    let a = parseFloat(document.getElementById("numero1").value);
    let b = parseFloat(document.getElementById("numero2").value);
    if (b === 0) {
        document.getElementById("resultado").innerHTML = "Error: División por cero no permitida.";
        console.error("Error: División por cero no permitida.");
        return;
    }
    let resultado = a / b;
    document.getElementById("resultado").innerHTML = `
    La división de ${a} y ${b} es: ${resultado}`;

    //mostrar el resultado en la consola
    console.log(`La división de ${a} y ${b} es: ${resultado}`);

    //mostrar el resultado en alert
    window.alert(`La división de ${a} y ${b} es: ${resultado}`);
}