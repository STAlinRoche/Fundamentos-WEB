document.getElementById("vectorForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const A = document.getElementById("vectorA").value.split(',').map(Number);
  const B = document.getElementById("vectorB").value.split(',').map(Number);
  const C = [];

  if (A.length !== B.length) {
    document.getElementById("resultado").innerText = "Los vectores deben tener la misma longitud.";
    return;
  }

  // Ciclo FOR
  for (let i = 0; i < A.length; i++) {
    C.push(A[i] + B[i]);
  }

  document.getElementById("resultado").innerText = `Vector C: [${C.join(', ')}]`;
});
