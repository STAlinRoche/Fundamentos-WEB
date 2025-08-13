document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const welcomeMessage = document.getElementById('welcome-message');
    const reservationsList = document.getElementById('reservations-list');
    const addReservationBtn = document.getElementById('add-reservation-btn');
    const formContainer = document.getElementById('reservation-form-container');
    const form = document.getElementById('reservation-form');
    const formTitle = document.getElementById('form-title');
    const cancelFormBtn = document.getElementById('cancel-form-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const alertContainer = document.getElementById('alert-container');

    // Campos del formulario
    const fechaInput = document.getElementById('fecha');
    const horaInput = document.getElementById('hora');
    const cantidadInput = document.getElementById('cantidad');
    const mesaInput = document.getElementById('mesa');
    const pedidoEspecialInput = document.getElementById('pedido-especial');
    const reservationIdInput = document.getElementById('reservation-id');
    const availabilityInfo = document.getElementById('availability-info');
    const tablesListDiv = document.getElementById('tables-list');

    // Inicialización
    checkLoginStatus();
    populateTimeAndPersonOptions();

    // ---- FUNCIONES ----

    // Verificar si el usuario está logueado
    async function checkLoginStatus() {
        const response = await fetch('php/auth_api.php?action=status');
        const result = await response.json();
        if (!result.loggedIn) {
            window.location.href = 'login.html';
        } else {
            welcomeMessage.innerHTML = `<h1 class="fw-bold">Bienvenido, ${result.nombre}!</h1>`;
            if (sessionStorage.getItem('justLoggedIn') === 'true') {
                // Si existe, mostramos el alert
                alert(`¡Bienvenido, ${result.nombre}!`);
                // Y la borramos para que no aparezca de nuevo al recargar
                sessionStorage.removeItem('justLoggedIn');
            }

            loadReservations();
        }
    }

    // Cargar las reservaciones del usuario
    async function loadReservations() {
        const response = await fetch('php/reservations_api.php');
        const reservations = await response.json();

        reservationsList.innerHTML = '';
        if (reservations.length === 0) {
            reservationsList.innerHTML = '<p>Aún no tienes reservaciones.</p>';
        } else {
            reservations.forEach(res => {
                const item = document.createElement('div');
                item.className = `reservation-item ${res.estado === 'cancelada' ? 'cancelled' : ''}`;
                item.innerHTML = `
                    <div class="details">
                        <p class="mb-0"><strong>Mesa:</strong> #${res.numero_mesa} (${res.capacidad} personas)
                        <br><strong>Fecha:</strong> ${res.fecha} a las ${res.hora.substring(0, 5)}</p>
                    </div>
                    <div class="actions">
                        ${res.estado !== 'cancelada' ? `
                        <button class="btn btn-sm btn-warning edit-btn" data-id="${res.id}">Editar</button>
                        <button class="btn btn-sm btn-danger cancel-btn" data-id="${res.id}">Cancelar</button>
                        ` : '<span class="badge bg-secondary">Cancelada</span>'}
                    </div>
                `;
                reservationsList.appendChild(item);
            });
        }
    }

    // Poblar las opciones de hora y cantidad de personas
    function populateTimeAndPersonOptions() {
        // Horas de 14:00 a 20:00 en intervalos de 30 min
        for (let h = 14; h <= 20; h++) {
            for (let m = 0; m < 60; m += 30) {
                if (h === 20 && m > 0) continue;
                const time = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
                horaInput.innerHTML += `<option value="${time}">${time}</option>`;
            }
        }
        // Personas de 1 a 10
        for (let i = 1; i <= 10; i++) {
            cantidadInput.innerHTML += `<option value="${i}">${i} ${i > 1 ? 'personas' : 'persona'}</option>`;
        }
    }

    // Verificar disponibilidad de mesas
    async function checkAvailability() {
        const fecha = fechaInput.value;
        const hora = horaInput.value;

        if (!fecha || !hora) return;

        const response = await fetch(`php/availability_api.php?fecha=${fecha}&hora=${hora}`);
        const result = await response.json();

        availabilityInfo.classList.remove('d-none');
        tablesListDiv.innerHTML = '';
        mesaInput.innerHTML = '<option value="">-- Seleccione una mesa disponible --</option>';
        mesaInput.disabled = true;

        if (result.error) {
            tablesListDiv.innerHTML = `<p class="text-danger">${result.error}</p>`;
        } else if (Object.keys(result.available).length > 0) {
            let html = '';
            for (const capacity in result.available) {
                const count = result.available[capacity].length;
                const mesaIds = result.available[capacity].map(m => m.id);
                const mesaNumeros = result.available[capacity].map(m => m.numero_mesa);
                html += `<p>Mesas para ${capacity} personas: <strong>${count} disponible(s)</strong></p>`;
                result.available[capacity].forEach(mesa => {
                    mesaInput.innerHTML += `<option value="${mesa.id}" data-capacidad="${capacity}">Mesa #${mesa.numero_mesa} (para ${capacity} personas)</option>`;
                });
            }
            tablesListDiv.innerHTML = html;
            mesaInput.disabled = false;
        } else {
            tablesListDiv.innerHTML = '<p class="text-warning">No hay mesas disponibles para la fecha y hora seleccionadas.</p>';
        }
    }

    // ---- EVENT LISTENERS ----

    // Mostrar/Ocultar formulario
    addReservationBtn.addEventListener('click', () => {
        form.reset();
        reservationIdInput.value = '';
        formTitle.textContent = 'Nueva Reservación';
        formContainer.classList.remove('d-none');
        addReservationBtn.classList.add('d-none');
        availabilityInfo.classList.add('d-none');
        mesaInput.disabled = true;
    });

    cancelFormBtn.addEventListener('click', () => {
        formContainer.classList.add('d-none');
        addReservationBtn.classList.remove('d-none');
        alertContainer.innerHTML = '';
    });

    // Verificar disponibilidad al cambiar fecha u hora
    fechaInput.addEventListener('change', checkAvailability);
    horaInput.addEventListener('change', checkAvailability);

    // Enviar formulario (Crear o Editar)
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const reservationData = {
            id: reservationIdInput.value,
            fecha: fechaInput.value,
            hora: horaInput.value,
            cantidad_personas: cantidadInput.value,
            id_mesa: mesaInput.value,
            pedido_especial: pedidoEspecialInput.value
        };

        const method = reservationData.id ? 'PUT' : 'POST';
        const response = await fetch('php/reservations_api.php', {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reservationData)
        });

        const result = await response.json();
        if (response.ok) {
            showAlert('success', result.success);
            loadReservations();
            formContainer.classList.add('d-none');
            addReservationBtn.classList.remove('d-none');
        } else {
            showAlert('danger', result.error);
        }
    });

    // Delegación de eventos para botones de editar y cancelar
    reservationsList.addEventListener('click', async (e) => {
        const id = e.target.dataset.id;
        if (e.target.classList.contains('edit-btn')) {
            // Lógica para editar
            const response = await fetch(`php/reservations_api.php?id=${id}`);
            const res = await response.json();

            formTitle.textContent = 'Editar Reservación';
            reservationIdInput.value = res.id;
            fechaInput.value = res.fecha;
            horaInput.value = res.hora.substring(0, 5);
            cantidadInput.value = res.cantidad_personas;
            pedidoEspecialInput.value = res.pedido_especial;

            await checkAvailability(); // Cargar disponibilidad
            mesaInput.value = res.id_mesa; // Seleccionar la mesa actual

            formContainer.classList.remove('d-none');
            addReservationBtn.classList.add('d-none');

        } else if (e.target.classList.contains('cancel-btn')) {
            // Lógica para cancelar
            if (confirm('¿Estás seguro de que quieres cancelar esta reservación?')) {
                const response = await fetch('php/reservations_api.php', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: id })
                });
                const result = await response.json();
                if (response.ok) {
                    alert(result.success);
                    loadReservations();
                } else {
                    alert(result.error);
                }
            }
        }
    });

    // Cerrar sesión
    logoutBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        await fetch('php/auth_api.php?action=logout');
        window.location.href = 'index.html';
    });

    // Función para mostrar alertas
    function showAlert(type, message) {
        alertContainer.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
        setTimeout(() => alertContainer.innerHTML = '', 4000);
    }
});