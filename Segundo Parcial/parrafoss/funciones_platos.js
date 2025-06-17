document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

    const personas = parseInt(document.getElementById("personas").value);
    const resultado = document.getElementById("resultado");

    if (isNaN(personas) || personas <= 0) {
        resultado.textContent = "Por favor, ingresa un número válido de personas.";
        return;
    }

    let costoPersona;

    if (personas < 200) {
        costoPersona = 95;
    } else if (personas === 200) {
        costoPersona = 95;
    } else if (personas >= 201 && personas <= 300) {
        costoPersona = 85;
    } else {
        costoPersona = 75;
    }

    resultado.innerHTML = `
        <p>Costo por persona: <strong>$${costoPersona}</strong></p>
        <p>Total: <strong>$${costoPersona * personas}</strong></p>
    `;
});
