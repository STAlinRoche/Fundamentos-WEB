document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();

  const A = document.getElementById("stock").value.split(',').map(Number);
  const B = document.getElementById("pedidos").value.split(',').map(Number);
  const C = [];

  if (A.length !== 10 || B.length !== 10 || A.includes(NaN) || B.includes(NaN)) {
    document.getElementById("resultado").innerText = "Debes ingresar exactamente 10 valores numéricos en cada vector.";
    return;
  }

  let i = 0;

  // Ciclo DO-WHILE para generar vector C
  do {
    if (A[i] === B[i]) {
      C.push(A[i]);
    } else if (B[i] > A[i]) {
      C.push(2 * (B[i] - A[i]));
    } else { // A[i] > B[i]
      C.push(B[i]);
    }
    i++;
  } while (i < 10);

  document.getElementById("resultado").innerText =
    `Stock (A):       [${A.join(', ')}]\n` +
    `Pedidos (B):     [${B.join(', ')}]\n` +
    `Reposición (C):  [${C.join(', ')}]`;
});
