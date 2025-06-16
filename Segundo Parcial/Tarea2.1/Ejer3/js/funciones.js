function generarInputs() {
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const contenedor = document.getElementById("inputs");
  contenedor.innerHTML = "";

  for (let i = 0; i < cantidad; i++) {
    contenedor.innerHTML += `
      <label>Número ${i + 1}:</label>
      <input type="number" class="numero">
    `;
  }

  document.getElementById("btnCalcular").style.display = "block";
  document.getElementById("detalle").innerHTML = "";
}

function contarNumeros() {
  const numeros = document.querySelectorAll(".numero");
  let ceros = 0, positivos = 0, negativos = 0;

  numeros.forEach(input => {
    const valor = parseFloat(input.value);
    if (valor === 0) {
      ceros++;
    } else if (valor > 0) {
      positivos++;
    } else {
      negativos++;
    }
  });

  document.getElementById("detalle").innerHTML = `
    Cantidades que son cero: ${ceros}<br>
    Cantidades mayores a cero: ${positivos}<br>
    Cantidades menores a cero: ${negativos}
  `;
}
