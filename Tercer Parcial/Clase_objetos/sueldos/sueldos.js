document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir envío del formulario

    let trabajador = {
        nombre: document.getElementById("nombre").value,
        horas: parseInt(document.getElementById("horas").value),
        horasExtras: parseInt(document.getElementById("horasExtras").value),
        valorHora: parseFloat(document.getElementById("valorHora").value),
        sueldo: 0,

        // Calcular pago
        calcularPago: function() {
            let pagoNormal = this.horas * this.valorHora;
            let pagoExtra = this.horasExtras * (this.valorHora * 1.60);
            this.sueldo = pagoNormal + pagoExtra;
        },

        // Mostrar resultado
        mostrarResultado: function() {
            let resultado = document.getElementById("resultado");
            resultado.innerHTML = `El sueldo de ${this.nombre} es: $${this.sueldo.toFixed(2)}`;
        }
    };


    trabajador.calcularPago();
    trabajador.mostrarResultado();
});
