//1.declaras la funcion
function saludar() {

    console.log("¡Hola, mundo!");

}

saludar();

//2. declaras la funcion con un parametro
function saludarConNombre(nombre) {
    console.log("¡Hola," +nombre+ "" );
}

saludarConNombre("Juan");

//3. funciones con retorno de un valor
function sumar(a, b) {
    return a + b;
}

let resultado = sumar(5, 3);
console.log("El resultado de la suma es: " + resultado);

//4. funcion con exprtesiones
const resta = function(a, b) {
    return a - b;
};

console.log("El resultado de la resta es: " + resta(10, 4));


//5. funcion flecha
const sumarFlecha = (a, b) =>  a+b;
console.log("El resultado de la suma con función flecha es: " + sumarFlecha(7, 2));



