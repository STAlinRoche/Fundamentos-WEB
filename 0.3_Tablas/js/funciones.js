// Funciones para el manejo de tablas
let subtotal = 0;
let totalDescuento = 0;

//Funcion agregar

function agregarProducto() {
    //Captura de datos
    const codigo = document.getElementById("codigo").value;
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const descripcion = document.getElementById("descripcion").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const descuento = parseFloat(document.getElementById("descuento").value || 0);

    //Validaciones
    if (cantidad === "" || isNaN(cantidad)) {
        alert("Por favor, ingrese una cantidad valida.");
        return;
    }

    if (codigo.trim() === "") {
        alert("Por favor, ingrese un codigo valido.");
        return;
    }

    if (descripcion.trim() === "") {
        alert("Por favor, ingrese una descripcion valida.");
        return;
    }

    if (isNaN(precio) || precio <= 0) {
        alert("Por favor, ingrese un precio valido.");
        return;
    }

    if (isNaN(descuento) || descuento < 0) {
        alert("Por favor, ingrese un descuento valido.");
        return;
    }

    /*
    if (!cantidad || !codigo || !descripcion || isNaN(precio)) {
        alert("Por favor, complete todos los campos.");
        return;
    }
    */

    //calculos
    const valorsinDescuento = precio * cantidad;
    const totalProducto = valorsinDescuento - descuento;

    // Sumar de forma explícita (sin usar +=)
    subtotal = subtotal + valorsinDescuento;
    totalDescuento = totalDescuento + descuento;


    //tabla dinamica 
    const tabla = document.getElementById("tabla").getElementsByTagName("tbody")[0];
    const fila = tabla.insertRow();
    fila.innerHTML = `
        <td>${codigo}</td>
        <td>${cantidad}</td>
        <td>${descripcion}</td>
        <td>${precio.toFixed(2)}</td>
        <td>${descuento.toFixed(2)}</td>
        <td>${totalProducto.toFixed(2)}</td>
    `;

    actualizarTotales();
    limpiarCampos();
}

function actualizarTotales() {
    const subtotalIVA = subtotal;
    const iva = subtotalIVA * 0.15;
    const total = subtotalIVA + iva - totalDescuento;

    document.getElementById("subTotal").textContent = subtotal.toFixed(2);
    document.getElementById("subtotalIVA").textContent = subtotalIVA.toFixed(2);
    document.getElementById("totalDescuento").textContent = totalDescuento.toFixed(2);
    document.getElementById("valorIVA").textContent = iva.toFixed(2);
    document.getElementById("valorTotal").textContent = total.toFixed(2);

}


//funcion para limpiar los campos
function limpiarCampos() {
    document.getElementById("codigo").value = "";
    document.getElementById("cantidad").value = 1;
    document.getElementById("descripcion").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("descuento").value = "";

}    


document.getElementById("btnGenerarPDF").addEventListener("click", async () => {
  const { jsPDF } = window.jspdf;

  // Selecciona todo lo que quieras capturar (tabla + resumen)
  const factura = document.createElement("div");
  const tabla = document.getElementById("tabla").cloneNode(true);
  const resumen = document.getElementById("resumenTotales").cloneNode(true);

  factura.appendChild(tabla);
  factura.appendChild(resumen);
  factura.style.backgroundColor = "white"; // Asegura fondo blanco

  document.body.appendChild(factura); // temporal, para capturarlo

  const canvas = await html2canvas(factura);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("factura.pdf");

  document.body.removeChild(factura); // eliminarlo después de capturar
});

