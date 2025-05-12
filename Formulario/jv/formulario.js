
//1 acceder al formulrio html mediante el atributo id=formRegistro
const form = document.getElementById('formRegistro');
//2 capturar el envio 
form.onsubmit = function (e) {
    e.preventDefault(); //evitar el envio del formulario

    //3 obtener los valores de los inputs
    const nombre = form.nombre.value.trim(); //capturar el valor del input nombre y eliminar espacios en blanco
    const apellido = form.apellido.value.trim(); //capturar el valor del input apellido y eliminar espacios en blanco
    const email = form.email.value.trim(); //capturar el valor del input email y eliminar espacios en blanco
    const password = form.contraseña.value.trim(); //capturar el valor del input password y eliminar espacios en blanco
    const edad = form.edad.value.trim(); //capturar el valor del input edad y eliminar espacios en blanco
    
    const pais = form.pais.value; //capturar el valor del input pais y eliminar espacios en blanco
    const provincias = form.provincia.value; //capturar el valor del input provincia y eliminar espacios en blanco

    //4 expresiones regulares
    const soloLetras = /^[A-Za-z]+$/; //expresion regular para validar solo letras y espacios en blanco
    //const emailValido = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/; //expresion regular para validar el email
    const soloConstraseñas = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/; //expresion (minimo 8 caracteres, al menos una letra y un numero)
    const soloNumeros = /^(1[89]|[2-5][0-9]|6[0-5])$/; //expresion regular para validar solo numeros


    
    //5 Validar el campo nombre
    if (nombre.length < 2 || !soloLetras.test(nombre)) {
        alert('El nombre es invalido');
        return;
    }

    if (apellido.length < 2 || !soloLetras.test(apellido)) {
        alert('El apellido es invalido');
        return;
    }

    /*if (email.length < 5 || !emailValido.test(email)) {
        alert('El email es invalido');
        return;
    }*/

    if (password.length < 8 || !soloConstraseñas.test(password)) {
        alert('La contraseña es invalida');
        return;
    }

    if (edad.length < 1 || !soloNumeros.test(edad)) {
        alert('La edad es invalida');
        return;
    }

    if(!pais){
        alert('El pais es invalido');
        return;
    }

    if(!provincia){
        alert('La provincia es invalida');
        return;
    }

    alert('Formulario enviado correctamente');
    //6 enviar el formulario
    form.reset(); //enviar el formulario

}