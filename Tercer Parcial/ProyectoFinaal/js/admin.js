document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS DEL DOM ---
    const filterTypeSelect = document.getElementById('filter-type');
    const filterInputContainer = document.getElementById('filter-input-container');
    const searchBtn = document.getElementById('search-btn');
    const logoutBtn = document.getElementById('logout-btn');

    const availabilityCard = document.getElementById('availability-card');
    const adminAvailabilityList = document.getElementById('admin-availability-list');
    const adminReservationsList = document.getElementById('admin-reservations-list');

    const exportAvailabilityBtn = document.getElementById('export-availability-pdf');
    const exportReservationsBtn = document.getElementById('export-reservations-pdf');

    // --- INICIALIZACIÓN ---
    checkAdminStatus();
    updateFilterInput(); // Configura el input inicial al cargar la página

    // --- FUNCIONES ---

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

    async function checkAdminStatus() {
        const response = await fetch('php/auth_api.php?action=status');
        const result = await response.json();
        if (!result.loggedIn || !result.isAdmin) {
            window.location.href = 'login.html';
        } else {
            // Ejecutar búsqueda inicial solo después de confirmar que es admin
            performSearch();
        }
    }

    // FUNCIÓN PARA ACTUALIZAR EL INPUT DINÁMICO
    function updateFilterInput() {
        const filterType = filterTypeSelect.value;
        let inputHTML = '';
        const availabilityCardDiv = document.getElementById('availability-card-container'); // Contenedor de la tarjeta de disponibilidad

        if (filterType === 'fecha') {
            const today = new Date().toISOString().split('T')[0];
            inputHTML = `<input type="date" id="filter-value" class="form-control" value="${today}">`;
            availabilityCardDiv.style.display = 'block'; // Mostrar tarjeta de disponibilidad
            exportAvailabilityBtn.disabled = false;
        } else {
            let placeholder = '';
            switch (filterType) {
                case 'cedula':
                    placeholder = 'Ingrese la cédula';
                    pattern = '\\d{10}';
                    title = 'La cédula debe contener 10 dígitos numéricos.';
                    break;
                case 'nombre':
                    placeholder = 'Ingrese el nombre';
                    pattern = '[A-Za-zÀ-ÿ\\s]+';
                    title = 'El nombre solo puede contener letras y espacios.';
                    break;
                case 'apellido':
                    placeholder = 'Ingrese el apellido';
                    pattern = '[A-Za-zÀ-ÿ\\s]+';
                    title = 'El apellido solo puede contener letras y espacios.';
                    break;
            }
            inputHTML = `<input type="text" id="filter-value" class="form-control" placeholder="${placeholder}" pattern="${pattern}" title="${title}">`;
            availabilityCardDiv.style.display = 'none'; // Ocultar tarjeta de disponibilidad
            exportAvailabilityBtn.disabled = true;
        }
        filterInputContainer.innerHTML = inputHTML;
    }

    // FUNCIÓN PARA REALIZAR LA BÚSQUEDA
    async function performSearch() {
        const type = filterTypeSelect.value;
        const valueInput = document.getElementById('filter-value');
        if (!valueInput || !valueInput.value) {
            alert('Por favor, ingrese un valor para la búsqueda.');
            return;
        }
        const value = valueInput.value;
        if (!validarCedulaEcuador(cedula)) {
        showAlert('danger', 'La cédula ingresada no es válida.');
        return; // Detiene el envío del formulario
    }   

        // Actualizar disponibilidad solo si se busca por fecha
        if (type === 'fecha') {
            loadAvailability(value);
        }

        // Realizar la búsqueda de reservas
        try {
            const response = await fetch(`php/admin_api.php?action=search&type=${type}&value=${encodeURIComponent(value)}`);
            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.statusText}`);
            }
            const reservations = await response.json();
            displaySearchResults(reservations);
        } catch (error) {
            console.error('Error al realizar la búsqueda:', error);
            adminReservationsList.innerHTML = '<p class="p-3 text-danger">Error al cargar los datos. Revise la consola.</p>';
        }
    }

    // FUNCIÓN PARA MOSTRAR LOS RESULTADOS
    function displaySearchResults(reservations) {
        let html = '<p class="p-3">No se encontraron reservas con ese criterio.</p>';
        if (reservations.length > 0) {
            html = `<table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Cliente</th>
                                <th>Cédula</th>
                                <th>Mesa</th>
                                <th>Personas</th>
                            </tr>
                        </thead>
                        <tbody>`;
            reservations.forEach(res => {
                html += `<tr>
                            <td>${res.fecha}</td>
                            <td>${res.hora.substring(0, 5)}</td>
                            <td>${res.cliente_nombre} ${res.cliente_apellido}</td>
                            <td>${res.cedula}</td>
                            <td>#${res.numero_mesa}</td>
                            <td>${res.cantidad_personas}</td>
                        </tr>`;
            });
            html += '</tbody></table>';
        }
        adminReservationsList.innerHTML = html;
    }

    async function loadAvailability(date) {
        const response = await fetch(`php/admin_api.php?action=availability&date=${date}`);
        const result = await response.json();
        let html = '<p class="text-danger">No se pudo cargar la disponibilidad.</p>';
        if (response.ok) {
            html = `<table class="table table-bordered admin-availability-table">
                        <thead><tr><th>Mesa</th>`;
            result.time_slots.forEach(slot => {
                html += `<th class="time-slot">${slot.substring(0, 5)}</th>`;
            });
            html += '</tr></thead><tbody>';
            result.tables.forEach(table => {
                html += `<tr><td><strong>#${table.numero_mesa}</strong> (${table.capacidad}p)</td>`;
                result.time_slots.forEach(slot => {
                    const booking = result.bookings.find(b => b.id_mesa == table.id && b.hora == slot);
                    if (booking) {
                        html += `<td class="status-booked" title="Reservado por ${booking.nombre_cliente}">OCUPADO</td>`;
                    } else {
                        html += '<td class="status-free">Libre</td>';
                    }
                });
                html += '</tr>';
            });
            html += '</tbody></table>';
        }
        adminAvailabilityList.innerHTML = html;
    }

    // --- FUNCIONES PARA GENERAR PDF (con jsPDF) ---

    async function generateReservationsPDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Obtenemos los datos que se están mostrando actualmente en la tabla de reservas
        const type = filterTypeSelect.value;
        const value = document.getElementById('filter-value').value;
        const response = await fetch(`php/admin_api.php?action=search&type=${type}&value=${encodeURIComponent(value)}`);
        const reservations = await response.json();

        doc.setFontSize(18);
        doc.text(`Reporte de Reservas (${type}: ${value})`, 14, 22);

        if (reservations.length === 0) {
            doc.setFontSize(12);
            doc.text("No se encontraron reservas con este criterio.", 14, 30);
        } else {
            const head = [['Fecha', 'Hora', 'Cliente', 'Cédula', 'Mesa', 'Personas']];
            const body = reservations.map(res => [
                res.fecha,
                res.hora.substring(0, 5),
                `${res.cliente_nombre} ${res.cliente_apellido}`,
                res.cedula,
                `#${res.numero_mesa}`,
                res.cantidad_personas
            ]);

            doc.autoTable({ startY: 30, head: head, body: body });
        }

        doc.save(`reporte_reservas_${type}_${value}.pdf`);
    }

    async function generateAvailabilityPDF() {
        const date = document.getElementById('filter-value').value;
        if (filterTypeSelect.value !== 'fecha' || !date) {
            alert('Solo se puede exportar la disponibilidad cuando se busca por fecha.');
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: 'landscape' });

        const response = await fetch(`php/admin_api.php?action=availability&date=${date}`);
        const data = await response.json();

        doc.setFontSize(18);
        doc.text(`Reporte de Disponibilidad - ${date}`, 14, 22);

        const head = [['Mesa', ...data.time_slots.map(ts => ts.substring(0, 5))]];
        const body = data.tables.map(table => {
            const row = [`#${table.numero_mesa} (${table.capacidad}p)`];
            data.time_slots.forEach(slot => {
                const isBooked = data.bookings.some(b => b.id_mesa == table.id && b.hora == slot);
                row.push(isBooked ? 'Ocupado' : 'Libre');
            });
            return row;
        });

        doc.autoTable({
            startY: 30,
            head: head,
            body: body,
            didDrawCell: (hookData) => {
                if (hookData.section === 'body' && hookData.column.index > 0) {
                    if (hookData.cell.raw === 'Ocupado') {
                        doc.setFillColor(255, 218, 218);
                    } else {
                        doc.setFillColor(212, 237, 218);
                    }
                    doc.rect(hookData.cell.x, hookData.cell.y, hookData.cell.width, hookData.cell.height, 'F');
                }
            },
        });

        doc.save(`disponibilidad_${date}.pdf`);
    }

    // --- EVENT LISTENERS ---

    filterTypeSelect.addEventListener('change', updateFilterInput);

    searchBtn.addEventListener('click', performSearch);

    exportReservationsBtn.addEventListener('click', generateReservationsPDF);
    exportAvailabilityBtn.addEventListener('click', generateAvailabilityPDF);

    logoutBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        await fetch('php/auth_api.php?action=logout');
        window.location.href = 'index.html';
    });
});