function calcular() {
  const saldoInicial = parseFloat(document.getElementById("saldo").value);
  const incrementoStr = document.getElementById("incremento").value.replace('%', '');
  const incremento = parseFloat(incrementoStr) / 100;
  const anios = parseInt(document.getElementById("anios").value);

  let salario = saldoInicial;
  let resultadoHTML = "";
  let sumaTotal = 0;

  for (let i = 1; i <= anios; i++) {
    resultadoHTML += `Año ${i}: $${salario.toFixed(2)}<br>`;
    sumaTotal += salario;
    salario *= 1 + incremento;
  }

  resultadoHTML += `<br><strong>Salario final después de ${anios} años: $${sumaTotal.toFixed(2)}</strong>`;
  document.getElementById("resultado").innerHTML = resultadoHTML;
}
