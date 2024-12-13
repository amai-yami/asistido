// ------------------------------------------- registro de asistencias
function cargarAlumnos() {
    // Llamar a la función para agregar los controles fuera de la tabla
    agregarControlesBusquedaYFecha();
    fetch('../bd/listar_alumnos.php')
        .then(response => response.ok ? response.json() : Promise.reject(`Error ${response.status}`))
        .then(data => {
            const asistenciasBody = document.getElementById('asistenciasBody');

            asistenciasBody.innerHTML = ''; // Limpia TODO el contenedor
            

            if (data.error) {
                const errorRow = document.createElement('tr');
                errorRow.innerHTML = `<td colspan="2">${data.error}</td>`;
                asistenciasBody.appendChild(errorRow);
                mostrarMensaje(data.error, 'error');
                return;
            }

            // Generar filas de los alumnos
            data.forEach(alumno => {
                const row = document.createElement('tr');
                row.setAttribute('data-alumno', alumno.id); // Identificador para futuras limpiezas
                row.innerHTML = `
                    <td>${alumno.nombre} ${alumno.apellido}</td>
                    <td><input type="checkbox" name="asistencia_${alumno.id}" value="presente"> Presente</td>
                `;
                asistenciasBody.appendChild(row);
            });
             // Agregar el botón de guardar
             agregarBotonGuardarAsistencias();
            
        })
        .catch(error => mostrarMensaje(`Error al cargar alumnos: ${error}`));
}



function buscarAlumnoAsistencia() {
    const searchValue = document.getElementById('searchAsistencia').value.trim();
    fetch(`../bd/buscar_alumno.php?search=${searchValue}`)
        .then(response => response.json())
        .then(data => {
            const asistenciasBody = document.getElementById('asistenciasBody');

            // Vaciar el contenido actual de la tabla
            asistenciasBody.innerHTML = '';

            // Agregar controles de búsqueda y fecha
            agregarControlesBusquedaYFecha();

            // Verificar si no hay resultados
            if (data.length === 0) {
                mostrarMensaje("No se encontraron alumnos", "error");
                return;
            }

           // Recorrer los alumnos encontrados y agregarlos
data.forEach(alumno => {
    const row = document.createElement('tr');
    row.setAttribute('data-alumno', alumno.id);
    row.innerHTML = 
        `<td>
            <strong>Matricula:</strong> ${alumno.matricula} 
            <strong>DNI:</strong> ${alumno.dni} 
            <strong>Nombre completo:</strong> ${alumno.nombre} ${alumno.apellido}
        </td>
        <td>
            <input type="checkbox" name="asistencia_${alumno.id}" value="presente"> 
            Presente
        </td>`;
    asistenciasBody.appendChild(row);
});

            // Agregar el botón para guardar asistencias
            agregarBotonGuardarAsistencias();
        })
        .catch(error => {
            mostrarMensaje('Error al buscar alumno: ' + error.message, 'error');
        });
}

// Ver asistencias registradas
function verAsistencias() {
    
    limpiarControlesBusquedaYFecha(); // Limpiar el contenedor antes de agregar nuevos controles
    fetch('../bd/ver_asistencias.php')
        .then(response => response.ok ? response.json() : Promise.reject(`Error ${response.status}`))
        .then(data => {
            if (data.error) {
                mostrarMensaje(data.error, 'error');
                return;
            }

            const asistenciasBody = document.getElementById('asistenciasBody');
            asistenciasBody.innerHTML = '';

            data.forEach(asistencia => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${asistencia.nombre_completo}</td>
                    <td>Asistió a ${asistencia.numero_asistencias} clases</td>
                `;
                asistenciasBody.appendChild(row);
            });
        })
        .catch(error => mostrarMensaje(`Error al cargar las asistencias: ${error}`, 'error'));
}

function modificarAsistenciasFormulario() {
    limpiarControlesBusquedaYFecha(); // Limpiar el contenedor antes de agregar nuevos controles
    fetch('../bd/listar_alumnos.php')  
        .then(response => response.json())
        .then(data => {
            const asistenciasBody = document.getElementById('asistenciasBody');
            asistenciasBody.innerHTML = '';

            if (data.error) {
                mostrarMensaje('No se encontraron alumnos.', 'error');
                return;
            }

            if (Array.isArray(data) && data.length > 0) {
                data.forEach(alumno => {
                    const rowAsistencias = document.createElement('tr');
                    rowAsistencias.innerHTML = `
                        <td>${alumno.nombre} ${alumno.apellido}</td>
                        <td>
                            <input type="number" name="asistencia_${alumno.id}" style="width: 130px;" 
                                   placeholder="Valor de asistencia" step="any" />
                        </td>
                    `;
                    asistenciasBody.appendChild(rowAsistencias);
                });

                const buttonRow = document.createElement('tr');
                buttonRow.innerHTML = ` 
                    <td colspan="2">
                        <button type="button" onclick="modificarAsistencia()">Modificar Asistencias</button>
                    </td>
                `;
                asistenciasBody.appendChild(buttonRow);
            } else {
                mostrarMensaje('No se encontraron alumnos disponibles.', 'error');
            }
        })
        .catch(error => {
            mostrarMensaje('Error al cargar los alumnos: ' + error.message, 'error');
        });
}

function modificarAsistencia() {
    const inputs = document.querySelectorAll('input[type="number"]');
    const asistencias = [];

    inputs.forEach(input => {
        const alumnoId = input.name.split('_')[1];
        let valorAsistencia = input.value.trim();

        if (valorAsistencia === "") {
            return;
        }

        valorAsistencia = parseFloat(valorAsistencia);

        if (isNaN(valorAsistencia)) {
            return;
        }

        asistencias.push({ alumnoId, valorAsistencia });
    });

    if (asistencias.length === 0) {
        mostrarMensaje('No se han registrado asistencias válidas.', 'error');
        return;
    }

    console.log("Asistencias enviadas al servidor:", asistencias);

    fetch('../bd/modificar_asistencia.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ asistencias })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            mostrarMensaje('Asistencias modificada con éxito', 'success');
        } else {
            mostrarMensaje('Error almodificar las asistencias: ' + (data.message || 'Desconocido'), 'error');
        }
    })
    .catch(error => {
        console.error('Error al modificar las asistencias:', error);
        mostrarMensaje('Error al modificar las asistencias: ' + error.message, 'error');
    });
}

// Guardar asistencias seleccionadas
function guardarAsistencias() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const asistencias = [];
    let fecha = document.getElementById('fecha').value;

    if (!fecha) {
        mostrarMensaje('Por favor, selecciona una fecha.', 'error');
        return;
    }

    fecha = ajustarFechaFormato(fecha);

    if (checkboxes.length === 0) {
        mostrarMensaje('No se seleccionaron alumnos.', 'error');
        return;
    }

    checkboxes.forEach(checkbox => {
        const alumnoId = checkbox.name.split('_')[1];
        asistencias.push({ alumnoId, asistencia: checkbox.value === 'presente', fecha });
    });

    fetch('../bd/guardar_asistencias.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(asistencias)
    })
    .then(response => response.ok ? response.json() : Promise.reject(`Error HTTP ${response.status}`))
    .then(data => {
        if (data.success) {
            mostrarMensaje('Asistencias registradas con éxito.', 'success');
            if (data.cumpleanios?.length) {
                mostrarMensaje(`¡Hoy es el cumpleaños de: ${data.cumpleanios.join(', ')}!`, 'info');
            }
        } else {
            mostrarMensaje(`Error al registrar asistencias: ${data.message || 'Desconocido'}`, 'error');
        }
    })
    .catch(error => mostrarMensaje(`Error al guardar asistencias: ${error}`, 'error'));
}





// ------------------------------------------- herramientas auxiliares

// Función para limpiar los controles de búsqueda y fecha
function limpiarControlesBusquedaYFecha() {
    const contenedorBusquedaFecha = document.getElementById('contenedorBusquedaFecha');
    contenedorBusquedaFecha.innerHTML = ''; // Limpiar todo el contenido dentro del contenedor
}


//fecha y barra de busqueda
function agregarControlesBusquedaYFecha() {
    // Contenedor para los controles fuera de la tabla
    const contenedorBusquedaFecha = document.getElementById('contenedorBusquedaFecha');
    
    if (!document.getElementById('searchAsistencia')) {
        const searchRow = document.createElement('div');  // Cambiado de 'tr' a 'div'
        searchRow.innerHTML = `
            <label for="searchAsistencia">Buscar Alumno:</label>
            <input type="text" id="searchAsistencia" name="searchAsistencia" placeholder="Nombre o Apellido" required>
            <button onclick="buscarAlumnoAsistencia()">Buscar</button>
        `;
        contenedorBusquedaFecha.appendChild(searchRow);
    }

    if (!document.getElementById('fecha')) {
        const fechaRow = document.createElement('div');  // Cambiado de 'tr' a 'div'
        fechaRow.innerHTML = `
            <label for="fecha">Fecha:</label>
            <input type="datetime-local" id="fecha" name="fecha" required>
        `;
        contenedorBusquedaFecha.appendChild(fechaRow);
    }
}

//boton de guardar libre
function agregarBotonGuardarAsistencias() {
    if (!document.querySelector('button[onclick="guardarAsistencias()"]')) {
        const asistenciasBody = document.getElementById('asistenciasBody');
        const controlsRow = document.createElement('tr');
        controlsRow.innerHTML = `
            <td colspan="2">
                <button onclick="guardarAsistencias()">Guardar Asistencias</button>
            </td>
        `;
        asistenciasBody.appendChild(controlsRow);
    }
}


// Función auxiliar para ajustar formato de fecha
function ajustarFechaFormato(fecha) {
    if (fecha.includes('T')) {
        fecha = fecha.replace('T', ' ');
    }
    return fecha.length === 16 ? fecha + ':00' : fecha;
}



//mensajes de error
function mostrarMensaje(mensaje, tipo, container = null) {
    if (container) {
        container.innerHTML = `<tr><td colspan="2">${mensaje}</td></tr>`;
    } else {
        const mensajeContainer = document.getElementById('mensajeUsuario');
        mensajeContainer.style.display = 'block';
        mensajeContainer.innerHTML = `<div class="${tipo}">${mensaje}</div>`;
        setTimeout(() => mensajeContainer.style.display = 'none', 5000);
    }
}