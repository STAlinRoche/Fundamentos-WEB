document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault();

    let usuario = {
        nombre: document.getElementById("nombre").value,
        diasRetraso: parseInt(document.getElementById("dias").value),
        multa: 0,

        calcularMulta: function() {
            if (this.diasRetraso === 1) {
                this.multa = 400;
            } else if (this.diasRetraso > 1) {
                this.multa = 400 + (this.diasRetraso - 1) * 600;
            } else {
                this.multa = 0;
            }
        },

        mostrarMulta: function() {
            let resultado = document.getElementById("resultado");

            if (this.diasRetraso <= 0) {
                resultado.innerHTML = `No hay multa para <strong>${this.nombre}</strong>, no hay retraso.`;
            } else {
                resultado.innerHTML = `El usuario <strong>${this.nombre}</strong> tiene una multa de <strong>$${this.multa}</strong> por ${this.diasRetraso} día(s) de retraso.`;
            }
        }
    };

    usuario.calcularMulta();
    usuario.mostrarMulta();
});
