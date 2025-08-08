// ==========================================
// EJERCICIO 1: Registro de usuarios con Map
// ==========================================

const usuarios = new Map();

usuarios.set("0102030405", { nombre: "Andrea", edad: 28 });
usuarios.set("0607080910", { nombre: "Luis", edad: 34 });
usuarios.set("1122334455", { nombre: "María", edad: 22 });

console.log("Usuarios registrados:");
usuarios.forEach((datos, cedula) => {
  console.log(`Cédula: ${cedula}, Nombre: ${datos.nombre}, Edad: ${datos.edad}`);
});


// ==========================================
// EJERCICIO 2: Búsqueda de usuarios y validación
// ==========================================

const cedulaBuscar = "0607080910";

if (usuarios.has(cedulaBuscar)) {
  const datos = usuarios.get(cedulaBuscar);
  console.log(`\nUsuario encontrado: ${datos.nombre}, Edad: ${datos.edad}`);
} else {
  console.log("\nUsuario no registrado.");
}


// ==========================================
// EJERCICIO 3: Eliminar un usuario y verificar
// ==========================================

usuarios.delete("1122334455");

console.log("\nDespués de eliminar al usuario con cédula 1122334455:");
usuarios.forEach((datos, cedula) => {
  console.log(`${cedula}: ${datos.nombre}`);
});


// ==========================================
// EJERCICIO 4: Convertir Map a Array y ordenar por edad
// ==========================================

const usuariosOrdenados = Array.from(usuarios.entries())
  .sort((a, b) => a[1].edad - b[1].edad);

console.log("\nUsuarios ordenados por edad:");
usuariosOrdenados.forEach(([cedula, datos]) => {
  console.log(`${datos.nombre} - Edad: ${datos.edad}`);
});


// ==========================================
// EJERCICIO 5: Limpiar el Map
// ==========================================

usuarios.clear();
console.log("\nCantidad de usuarios después de limpiar:", usuarios.size);
