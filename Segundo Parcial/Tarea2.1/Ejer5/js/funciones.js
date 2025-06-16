function calcular() {
  const saldoInicial = 3;
  const incremento = 3;
  const dias = parseInt(document.getElementById("dias").value);

  if (isNaN(dias) || dias < 1 || dias > 365) {
    alert("Ingrese un número válido de días (1 a 365).");
    return;
  }

  let ahorro = saldoInicial;
  let total = 0;
  let detalle = "";

  for (let i = 1; i <= dias; i++) {
    detalle += `Día ${i}: $${ahorro.toFixed(2)}<br>`;
    total += ahorro;
    ahorro *= incremento;
  }

  document.getElementById("detalle").innerHTML = detalle;
  document.getElementById("total").innerHTML = `<strong>Saldo total después de ${dias} días: $${total.toFixed(2)}</strong>`;
}
