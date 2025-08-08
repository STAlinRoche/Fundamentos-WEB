let productos = {
    nombre: "Asus",
    precio: 400,
    stock: 4,
    proveedor: {
        nombre: "TechStore",
        ciudad: "Madrid",
    },

    calcular: function(cantidad) {
        return this.precio * cantidad;
    },

    mouse: {
        nombre: "Logitech",
        precio: 15,
        stock: 11,
        proveedor: {
            nombre: "GamerZone",
            ciudad: "Barcelona",
        },
        calcular: function(cantidad) {
            return this.precio * cantidad;
        }
    },

    teclado: {
        nombre: "Acer",
        precio: 15,
        stock: 1,
        proveedor: {
            nombre: "TechWorld",
            ciudad: "Madrid",
        },
        calcular: function(cantidad) {
            return this.precio * cantidad;
        }
    },
};

// formulario 
document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const tipo = document.getElementById("producto").value;
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const producto = productos[tipo];

    if (!producto) {
        alert("Selecciona un producto válido.");
        return;
    }

    if (cantidad > producto.stock) {
        alert("No hay suficiente stock disponible");
        return;
    }

    const calcularTotal = producto.calcular(cantidad);

    document.getElementById("resultado").innerHTML = `
        Producto: ${producto.nombre} <br>
        Precio unitario: ${producto.precio} <br>
        Proveedor: ${producto.proveedor.nombre} (${producto.proveedor.ciudad}) <br>
        Cantidad: ${cantidad} <br>
        Total: ${calcularTotal} <br>`;
});
