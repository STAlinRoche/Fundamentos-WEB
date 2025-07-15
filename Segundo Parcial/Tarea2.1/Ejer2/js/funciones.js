function calcular() {
  const precioS = 20;
  const precioD = 25;
  const precioT = 28;

  const cantidadS = parseInt(document.getElementById("sencillas").value) || 0;
  const cantidadD = parseInt(document.getElementById("dobles").value) || 0;
  const cantidadT = parseInt(document.getElementById("triples").value) || 0;
  const conTarjeta = document.getElementById("tarjeta").value === "si";

  // Validar que no haya valores negativos o cero
  if (
    cantidadS < 0 || cantidadD < 0 || cantidadT < 0 ||
    (cantidadS === 0 && cantidadD === 0 && cantidadT === 0)
  ) {
    document.getElementById("detalle").innerHTML = `<span style="color: red;">⚠️ Por favor, ingresa cantidades mayores a 0. No se permiten valores negativos.</span>`;
    return;
  }

  const subtotal = (cantidadS * precioS) + (cantidadD * precioD) + (cantidadT * precioT);
  const recargo = conTarjeta ? subtotal * 0.05 : 0;
  const total = subtotal + recargo;

  const detalle = `
    Sencillas: ${cantidadS} x $${precioS} = $${(cantidadS * precioS).toFixed(2)}<br>
    Dobles: ${cantidadD} x $${precioD} = $${(cantidadD * precioD).toFixed(2)}<br>
    Triples: ${cantidadT} x $${precioT} = $${(cantidadT * precioT).toFixed(2)}<br>
    ${conTarjeta ? "Recargo por tarjeta (5%): $" + recargo.toFixed(2) + "<br>" : ""}
    <strong>Total a pagar: $${total.toFixed(2)}</strong>
  `;

  document.getElementById("detalle").innerHTML = detalle;
}
