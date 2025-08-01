function calcularSuma(arreglo) {
    let suma = 0;
    for (let num of arreglo) {
        suma += num;
    }
    return suma;
}

function calcularPromedio(arreglo) {
    let suma = calcularSuma(arreglo);
    return suma / arreglo.length;
}

function calcularMayor(arreglo) {
    return Math.max(...arreglo);
}

function calcularMenor(arreglo) {
    return Math.min(...arreglo);
}

function ejecutar() {
    let n = parseInt(document.getElementById("cantidad").value);

    if (isNaN(n) || n <= 0) {
        alert("Por favor, ingrese un número válido mayor que 0.");
        return;
    }

    let numeros = [];

    for (let i = 0; i < n; i++) {
        let numero = parseFloat(prompt(`Ingrese el elemento ${i + 1}: `));
        if (isNaN(numero)) {
            alert("Por favor, ingrese un número válido.");
            i--;
            continue;
        }
        numeros.push(numero);
    }

    let suma = calcularSuma(numeros);
    let promedio = calcularPromedio(numeros);
    let mayor = calcularMayor(numeros);
    let menor = calcularMenor(numeros);

    // Mostrar en consola (opcional)
    console.log("Los elementos del arreglo son:", numeros);
    console.log("La suma de los elementos es:", suma);
    console.log("El promedio de los elementos es:", promedio);
    console.log("El elemento mayor es:", mayor);
    console.log("El elemento menor es:", menor);

    // Mostrar en el HTML
    document.getElementById("resultado").innerHTML = `
        <p>Los elementos del arreglo son: ${numeros.join(', ')}</p>
        <p>La suma de los elementos es: ${suma}</p>
        <p>El promedio de los elementos es: ${promedio}</p>
        <p>El elemento mayor es: ${mayor}</p>
        <p>El elemento menor es: ${menor}</p>
    `;
}
