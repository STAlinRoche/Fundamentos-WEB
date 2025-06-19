function determinarPaquete() {
  let dinero = parseFloat(document.getElementById('dinero').value);
  let resultado = document.getElementById('resultado');

  if (isNaN(dinero) || dinero < 0) {
    resultado.textContent = "Ingrese un valor numérico válido.";
    return;
  }

  if (dinero >= 50000) {
    resultado.textContent = "Paquete A: TV, modular, 3 zapatos, 5 camisas, 5 pantalones.";
  } else if (dinero >= 20000) {
    resultado.textContent = "Paquete B: Grabadora, 3 zapatos, 5 camisas, 5 pantalones.";
  } else if (dinero >= 10000) {
    resultado.textContent = "Paquete C: 2 zapatos, 3 camisas, 3 pantalones.";
  } else {
    resultado.textContent = "Paquete D: 1 zapato, 2 camisas, 2 pantalones.";
  }
}
