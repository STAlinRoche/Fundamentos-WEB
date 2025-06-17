document.addEventListener("DOMContentLoaded", function () {
    const tabla = document.getElementById("tablaProductos");
    const info = document.getElementById("producto");

    const filas = tabla.querySelectorAll("tbody tr");

    for (let i = 0; i < filas.length; i++) {
        filas[i].addEventListener("click", function () {
            const columnas = filas[i].querySelectorAll("td");
            const nombre = columnas[0].textContent;
            const precio = columnas[1].textContent;
            const cantidad = columnas[2].textContent;
            const origen = columnas[3].textContent;

            info.innerHTML = `
                <h2>Producto seleccionado</h2>
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Precio:</strong> ${precio}</p>
                <p><strong>Cantidad:</strong> ${cantidad}</p>
                <p><strong>Origen:</strong> ${origen}</p>
            `;
        });
    }
});

