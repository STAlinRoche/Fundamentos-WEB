function calcularBtn(){

    //obtener el valor del input, id="arrayInput"
    const input=document.getElementById("arrayInput").value;

    //convertir el string a un array de numeros
    //split the string by commas and convert to numbers
    //trim to remove spaces
    const numero=input.split(",").map(x=> parseFloat(x.trim()));

    //para presentar el resultado id="resultado"
    const resultado=document.getElementById("resultado");

    //logica 
    //verifcar si son exacatamente 10 numeros
    //verificar si algun elemento no es un numero
    if (input.trim() === "") {
        resultado.className = "alert alert-warning";
        resultado.textContent = "El campo está vacío. Por favor ingrese los números.";
        return;
    }
    if (numero.length !== 10 || numero.some(isNaN)) {
        resultado.className = "alert alert-danger";
        resultado.textContent = "Por favor ingrese exactamente 10 números separados por comas";
        return;
    }

    //calcular
    //const suma = numero.reduce((acc, num) => acc + num, 0);

    //calculo manual
    //for

    let suma = 0;
    for(let i = 0; i < numero.length; i++) {
        suma += numero[i];
    }

    // mostrar el resultado
    resultado.textContent = `La suma de los numeros es: ${suma}`;






}