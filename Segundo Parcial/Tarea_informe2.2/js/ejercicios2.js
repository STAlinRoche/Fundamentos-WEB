const nombres = [];
const promedios = [];

document.getElementById("alumnoForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const promedio = parseFloat(document.getElementById("promedio").value);

  if (!nombre || isNaN(promedio)) {
    alert("Ingrese nombre y promedio válidos.");
    return;
  }

  nombres.push(nombre);
  promedios.push(promedio);

  document.getElementById("alumnoForm").reset();
  document.getElementById("resultado").innerText = `Alumno agregado: ${nombre} (${promedio})`;
});

document.getElementById("ordenarBtn").addEventListener("click", function() {
  // Ordenar por promedio de mayor a menor usando burbuja
  for (let i = 0; i < promedios.length - 1; i++) {
    for (let j = 0; j < promedios.length - i - 1; j++) {
      if (promedios[j] < promedios[j + 1]) {
        // Intercambiar promedios
        let tempProm = promedios[j];
        promedios[j] = promedios[j + 1];
        promedios[j + 1] = tempProm;

        // Intercambiar nombres
        let tempNom = nombres[j];
        nombres[j] = nombres[j + 1];
        nombres[j + 1] = tempNom;
      }
    }
  }

  let salida = "Lista de alumnos ordenados:\n";
  for (let i = 0; i < nombres.length; i++) {
    salida += `${i + 1}. ${nombres[i]} - ${promedios[i]}\n`;
  }

  document.getElementById("resultado").innerText = salida;
});
