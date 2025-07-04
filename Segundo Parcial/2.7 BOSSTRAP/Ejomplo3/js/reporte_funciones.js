document.getElementById("formInforme").addEventListener("submit", function(e) {
    event.preventDefault(); // Prevent the default form submission

    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const responsable = document.getElementById("responsable").value;
    const sector = document.getElementById("sector").value;
    const motivo = document.getElementById("motivo").value;
    const manipulacion = document.querySelector('input[name="manipulacion"]:checked').value;
    const descripcion = document.getElementById("descripcion").value;

    //validar campos que esten llenos, verificar que ningun campo este vacio o null
    //si faltara algun dato mostrar un mensaje de alerta
    if (!fecha || !hora || !responsable || !sector || !motivo || !manipulacion || !descripcion) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    //crear el objeto informe
    const informe = {
        fecha, hora, responsable, sector, motivo, manipulacion, descripcion
    };

    //guardar en el local storage
    let informes = JSON.parse(localStorage.getItem("informes")) || [];
    informes.push(informe);
    localStorage.setItem("informes", JSON.stringify(informes));
    window.location.href = "reportes.html"; // Redirigir a la página de reportes


});