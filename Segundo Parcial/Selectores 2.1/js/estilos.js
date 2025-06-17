document.getElementById("Calcular").addEventListener("click", function() {
    
    //obtener valores de los campos de entrada
    const limite = parseFloat(document.getElementById("limite").value);
    const tipo1 = parseInt(document.getElementById("tipo1").value);
    const tipo2Selec = document.getElementById("tipo2").value;
    const criterio = document.getElementById("criterio").value;

    //variable para almacenar el resultado
    let tipoTarjeta;

    //condiciones
    if (tipo2Selec === "") {
        tipoTarjeta = tipo1;
    } else {
        const tipo2 = parseInt(tipo2Selec);
        //si el criterio es "mayor que", utilice el tipo de tarjeta mas ato
        if (criterio === "mayor") {
            if (tipo1 > tipo2) {
                tipoTarjeta = tipo1;
            } else {
                tipoTarjeta = tipo2;
            }
        } else {
            tipoTarjeta = tipo1;
        }
    }


    //calcular los porcentajes
    let porcentajes
    if (tipoTarjeta === 1) {
        porcentajes = 0.25;
    } else if (tipoTarjeta === 2) {
        porcentajes = 0.35;
    } else if (tipoTarjeta === 3) {
        porcentajes = 0.40;
    } else {
        porcentajes = 0.50;
    }

    //calcular el monto a pagar
    const aumentoLimite = limite * porcentajes;
    const nuevoLimite = limite + aumentoLimite;

    //mostrar el resultado
    const resultado = document.getElementById("resultado");

    resultado.innerHTML = 
    `
    <strong>Tipo de Tarjeta utilizada:</strong> ${tipoTarjeta} <br>
    <strong>Porcentaje aplicado:</strong> ${porcentajes * 100}% <br>
    <strong>Nuevo límite de crédito:</strong> $${nuevoLimite.toFixed(2)} <br>
    <strong>Aumento del límite de crédito:</strong> $${aumentoLimite.toFixed(2)} <br>
        
    `;


});