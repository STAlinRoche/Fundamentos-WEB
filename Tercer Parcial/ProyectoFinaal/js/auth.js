document.addEventListener('DOMContentLoaded', () => {
    const loginFormContainer = document.getElementById('login-form-container');
    const registerFormContainer = document.getElementById('register-form-container');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const alertContainer = document.getElementById('alert-container');


    function validarCedulaEcuador(cedula) {
        // 1. Requisitos iniciales
        if (typeof cedula !== 'string' || cedula.length !== 10 || !/^\d+$/.test(cedula)) {
            return false;
        }

        // 2. Validación del código de provincia
        const provincia = parseInt(cedula.substring(0, 2), 10);
        if (provincia < 1 || provincia > 24) { // 24 provincias
            return false;
        }

        // 3. Validación del tercer dígito
        const tercerDigito = parseInt(cedula[2], 10);
        if (tercerDigito >= 6) {
            return false;
        }

        // 4. Algoritmo Módulo 10
        const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
        const digitoVerificador = parseInt(cedula[9], 10);
        let suma = 0;

        for (let i = 0; i < 9; i++) {
            let producto = parseInt(cedula[i], 10) * coeficientes[i];
            if (producto >= 10) {
                producto -= 9;
            }
            suma += producto;
        }

        const residuo = suma % 10;
        const resultado = (residuo === 0) ? 0 : 10 - residuo;

        // 5. Comparación final
        return resultado === digitoVerificador;
    }
    // Cambiar a la vista de registro
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginFormContainer.classList.add('d-none');
        registerFormContainer.classList.remove('d-none');
    });

    // Cambiar a la vista de login
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerFormContainer.classList.add('d-none');
        loginFormContainer.classList.remove('d-none');
    });

    // Manejar el envío del formulario de login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const cedula = document.getElementById('login-cedula').value;
        const contrasena = document.getElementById('login-password').value;

        if (!validarCedulaEcuador(cedula)) {
            showAlert('danger', 'La cédula ingresada no es válida.');
            return; // Detiene el envío del formulario
        }


        const response = await fetch('php/auth_api.php?action=login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cedula, contrasena })
        });

        const result = await response.json();

        if (response.ok) {
            showAlert('success', result.success);
            sessionStorage.setItem('justLoggedIn', 'true');
            setTimeout(() => {
                if (result.isAdmin) {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'reservations.html';
                }
            }, 1000);
        } else {
            showAlert('danger', result.error);
        }
    });

    // Manejar el envío del formulario de registro
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('reg-nombre').value;
        const apellido = document.getElementById('reg-apellido').value;
        const cedula = document.getElementById('reg-cedula').value;
        const correo = document.getElementById('reg-correo').value;
        const contrasena = document.getElementById('reg-password').value;

        if (!validarCedulaEcuador(cedula)) {
            showAlert('danger', 'La cédula ingresada no es válida.');
            return; // Detiene el envío del formulario
        }

        const response = await fetch('php/auth_api.php?action=register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, apellido, cedula, correo, contrasena })
        });

        const result = await response.json();

        if (response.ok) {
            showAlert('success', result.success + ' Ahora puedes iniciar sesión.');
            registerForm.reset();
            // Volver al login
            registerFormContainer.classList.add('d-none');
            loginFormContainer.classList.remove('d-none');
        } else {
            showAlert('danger', result.error);
        }
    });

    function showAlert(type, message) {
        alertContainer.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
        setTimeout(() => alertContainer.innerHTML = '', 4000);
    }
});