let frutas = ["Manzana", "Banana", "Naranja"];
actualizarLista();

function actualizarLista() {
  const lista = document.getElementById("listaFrutas");
  lista.innerHTML = "";
  frutas.forEach(fruta => {
    const li = document.createElement("li");
    li.textContent = fruta;
    lista.appendChild(li);
  });
}

function agregarFruta() {
  const input = document.getElementById("nuevaFruta");
  const fruta = input.value.trim();
  if (fruta) {
    frutas.push(fruta);
    input.value = "";
    actualizarLista();
  } else {
    alert("Escribe el nombre de una fruta para agregar.");
  }
}

function eliminarFruta() {
  if (frutas.length > 0) {
    const eliminada = frutas.pop();
    alert(`Se eliminó: ${eliminada}`);
    actualizarLista();
  } else {
    alert("No hay frutas para eliminar.");
  }
}
