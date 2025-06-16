function generarSeleccion() {
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const contenedor = document.getElementById("contenedorFocos");
  contenedor.innerHTML = "";

  for (let i = 0; i < cantidad; i++) {
    contenedor.innerHTML += `
      <label>Foco ${i + 1}:</label>
      <select class="color-foco">
        <option value="verde">Verde</option>
        <option value="blanco">Blanco</option>
        <option value="rojo">Rojo</option>
      </select>
    `;
  }

  document.getElementById("btnContar").style.display = "block";
  document.getElementById("detalle").innerHTML = "";
}

function contarFocos() {
  const focos = document.querySelectorAll(".color-foco");
  let verdes = 0, blancos = 0, rojos = 0;

  focos.forEach(foco => {
    const color = foco.value;
    if (color === "verde") verdes++;
    else if (color === "blanco") blancos++;
    else if (color === "rojo") rojos++;
  });

  document.getElementById("detalle").innerHTML = `
    Focos verdes: ${verdes}<br>
    Focos blancos: ${blancos}<br>
    Focos rojos: ${rojos}
  `;
}
