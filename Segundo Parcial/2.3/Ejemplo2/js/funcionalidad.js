function calcularPago(){
    const precio = parseFloat(document.getElementById("precio").value);
    const tipo = document.getElementById("tipo").value;
    const kilo = parseFloat(document.getElementById("kilos").value);
    const tamanio = parseInt(document.getElementById("tamanio").value);
    const resultado = document.getElementById("resultado");


    //operaciones
    let calculo = 0;
    if (tipo === "A") {
        if (tamanio === 1) {
            calculo = 0.20; 
        }else if (tamanio === 2) {
            calculo = 0.30;
        }
    }else if (tipo === "B") {
        if (tamanio === 1) {
            calculo = -0.30; 
        }else if (tamanio === 2) {
            calculo = -0.50;
        }
    }

    //hacer las operaciones
    const precioTotal = precio + calculo;
    const total = precioTotal * kilo;

    //mostrar el resultado en html
    //tipo de uva
    //tamaño de uva
    //precio por kilo
    //Total a pagar
    resultado.innerHTML = `
        <p>Tipo de uva: ${tipo}</p>
        <p>Tamaño de uva: ${tamanio}</p>
        <p>Precio por kilo: $${precio.toFixed(2)}</p>
        <p>Total a pagar: $${total.toFixed(2)}</p>
    `;




}