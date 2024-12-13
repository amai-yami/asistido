

// Función para cargar los alumnos en la tabla y sus notas
function cargarAlumnosNotas() {
    agregarControlesBusquedaNotas();
    mostrarTabla();

    fetch('../bd/listar_alumnos.php')
        .then(response => response.json())
        .then(data => {
            const notasBody = document.getElementById('notasBody');
            notasBody.innerHTML = '';  // Limpiar la tabla antes de agregar los nuevos alumnos

            // Eliminar el botón "Guardar Notas" si ya existe
            const buttonGuardarExistente = document.getElementById('guardarNotasButton');
            if (buttonGuardarExistente) {
                buttonGuardarExistente.parentElement.remove();  // Eliminar el botón existente
            }

            if (data.error) {
                mensajenotas.textContent = 'Error: ' + data.error;
                return;
            }

            if (Array.isArray(data) && data.length > 0) {
                data.forEach(alumno => {
                    // Crear una fila para cada alumno
                    const rowNotas = document.createElement('tr');
                    rowNotas.innerHTML = ` 
                        <td>${alumno.nombre} ${alumno.apellido}</td>
                        <td><input type="number" name="parcial1_${alumno.id}" min="0" max="10" value="${alumno.parcial1 || ''}" style="width: 70px; height: 30px; margin: 2px; text-align: center;"></td>
                        <td><input type="number" name="parcial2_${alumno.id}" min="0" max="10" value="${alumno.parcial2 || ''}" style="width: 70px; height: 30px; margin: 2px; text-align: center;"></td>
                        <td><input type="number" name="final_${alumno.id}" min="0" max="10" value="${alumno.final || ''}" style="width: 70px; height: 30px; margin: 2px; text-align: center;"></td>
                    `;
                    notasBody.appendChild(rowNotas);  // Agregar la fila a la tabla
                });
                agregarBotonGuardarnotas(); // Agregar botón "Guardar Notas"
            } else {
                mensajenotas.textContent = 'Error: No se encontraron alumnos disponibles.';
            }
        })
        .catch(error => {
            mensajenotas.textContent = 'Error al cargar los alumnos: ' + error.message;
        });
}

// Función para ver las notas
function verNotas() {
    limpiarControlesBusqueda();
    mostrarTabla();
    const notasBody = document.getElementById('notasBody');
    notasBody.innerHTML = '<tr><td colspan="4">Cargando notas...</td></tr>';

    fetch('../bd/obtener_notas.php')
        .then(response => response.json())
        .then(data => {
            notasBody.innerHTML = ''; // Limpiar la tabla antes de agregar los datos

            if (data.length === 0) {
                mensajenotas.textContent = 'No se encontraron notas para mostrar.';
                return;
            }

            data.forEach(alumno => {
                // Crear una fila con las notas del alumno
                const rowNotas = document.createElement('tr');
                rowNotas.innerHTML = `
                    <td>${alumno.nombre} ${alumno.apellido}</td>
                    <td>${alumno.parcial1 !== null ? alumno.parcial1 : 'N/A'}</td>
                    <td>${alumno.parcial2 !== null ? alumno.parcial2 : 'N/A'}</td>
                    <td>${alumno.final !== null ? alumno.final : 'N/A'}</td>
                `;
                notasBody.appendChild(rowNotas);  // Agregar la fila a la tabla
            });
        })
        .catch(error => {
            mensajenotas.textContent = 'Error al cargar las notas: ' + error.message;
        });
}

// Función para buscar un alumno
function buscarAlumnoNotas() {
    const searchValue = document.getElementById('searchNotas').value;

    if (!searchValue.trim()) {
        mensajenotas.textContent = 'Por favor ingresa un nombre o apellido para buscar.';
        return;
    }

    fetch(`../bd/buscar_alumno.php?search=${searchValue}`)
        .then(response => response.json())
        .then(data => {
            const notasBody = document.getElementById('notasBody');
            notasBody.innerHTML = ''; // Limpiamos la tabla antes de mostrar los nuevos resultados

            // Eliminar el botón "Guardar Notas" si ya existe
            const buttonGuardarExistente = document.getElementById('guardarNotasButton');
            if (buttonGuardarExistente) {
                buttonGuardarExistente.parentElement.remove();  // Eliminar el botón existente
            }

            if (Array.isArray(data) && data.length > 0) {
                data.forEach(alumno => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${alumno.nombre} ${alumno.apellido}</td>
                        <td><input type="number" name="parcial1_${alumno.id}" min="0" max="10" style="width: 70px; height: 30px; margin: 2px; text-align: center;"></td>
                        <td><input type="number" name="parcial2_${alumno.id}" min="0" max="10" style="width: 70px; height: 30px; margin: 2px; text-align: center;"></td>
                        <td><input type="number" name="final_${alumno.id}" min="0" max="10" style="width: 70px; height: 30px; margin: 2px; text-align: center;"></td>
                    `;
                    notasBody.appendChild(row);
                });
                agregarBotonGuardarnotas();
            } else {
                mensajenotas.textContent = 'No se encontraron alumnos con ese nombre o apellido.';
            }
        })
        .catch(error => {
            mensajenotas.textContent = 'Error al buscar el alumno: ' + error.message;
        });
}





/// Constantes para el rango de notas
const NOTA_MIN = 0;
const NOTA_MAX = 10;
document.getElementById('mensajenotas').textContent = '';

// Función para guardar las notas
function guardarNotas() {
    const rows = document.querySelectorAll('#notasBody tr');
    const notas = {};

    rows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        const idAlumno = inputs[0].name.split('_')[1];
        const parcial1 = inputs[0].value;
        const parcial2 = inputs[1].value;
        const final = inputs[2].value;

        if (notas[idAlumno] === undefined) {
            notas[idAlumno] = {};
        }

        if (parcial1 !== '' && (parseFloat(parcial1) < NOTA_MIN || parseFloat(parcial1) > NOTA_MAX)) {
            document.getElementById('mensajenotas').textContent = `Error: La nota del parcial 1 del alumno con ID ${idAlumno} debe estar entre ${NOTA_MIN} y ${NOTA_MAX}.`;
            setTimeout(() => { document.getElementById('mensajenotas').textContent = ''; }, 5000); // Limpiar el mensaje después de 5 segundos
            return;
        }
        if (parcial2 !== '' && (parseFloat(parcial2) < NOTA_MIN || parseFloat(parcial2) > NOTA_MAX)) {
            document.getElementById('mensajenotas').textContent = `Error: La nota del parcial 2 del alumno con ID ${idAlumno} debe estar entre ${NOTA_MIN} y ${NOTA_MAX}.`;
            setTimeout(() => { document.getElementById('mensajenotas').textContent = ''; }, 5000); // Limpiar el mensaje después de 5 segundos
            return;
        }
        if (final !== '' && (parseFloat(final) < NOTA_MIN || parseFloat(final) > NOTA_MAX)) {
            document.getElementById('mensajenotas').textContent = `Error: La nota final del alumno con ID ${idAlumno} debe estar entre ${NOTA_MIN} y ${NOTA_MAX}.`;
            setTimeout(() => { document.getElementById('mensajenotas').textContent = ''; }, 5000); // Limpiar el mensaje después de 5 segundos
            return;
        }

        if (parcial1 !== '') {
            notas[idAlumno].parcial1 = parseFloat(parcial1);
        }
        if (parcial2 !== '') {
            notas[idAlumno].parcial2 = parseFloat(parcial2);
        }
        if (final !== '') {
            notas[idAlumno].final = parseFloat(final);
        }
    });

    const formData = new URLSearchParams();
    Object.keys(notas).forEach(id => {
        if (notas[id].parcial1 !== undefined) {
            formData.append(`parcial1[${id}]`, notas[id].parcial1);
        }
        if (notas[id].parcial2 !== undefined) {
            formData.append(`parcial2[${id}]`, notas[id].parcial2);
        }
        if (notas[id].final !== undefined) {
            formData.append(`final[${id}]`, notas[id].final);
        }
    });

    fetch('../bd/guardar_notas.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('mensajenotas').textContent = data.success;
            setTimeout(() => { document.getElementById('mensajenotas').textContent = ''; }, 5000); // Limpiar el mensaje después de 5 segundos
        } else {
            document.getElementById('mensajenotas').textContent = 'Error: ' + data.error;
            setTimeout(() => { document.getElementById('mensajenotas').textContent = ''; }, 5000); // Limpiar el mensaje después de 5 segundos
        }
    })
    .catch(error => {
        document.getElementById('mensajenotas').textContent = 'Error al guardar las notas: ' + error.message;
        setTimeout(() => { document.getElementById('mensajenotas').textContent = ''; }, 5000); // Limpiar el mensaje después de 5 segundos
    });
}


//------------------------------ condiciones


async function condicionalumnos() {
    try {
        // Capturar los valores de los inputs
        const diasClase = document.getElementById('diasClase').value;
        const porcentajeAsistenciaPromocion = document.getElementById('porcentajeAsistenciaPromocion').value;
        const porcentajeNotaPromocion = document.getElementById('porcentajeNotaPromocion').value;
        const porcentajeAsistenciaRegular = document.getElementById('porcentajeAsistenciaRegular').value;
        const porcentajeNotaRegular = document.getElementById('porcentajeNotaRegular').value;

        // Limpiar cualquier mensaje previo
        document.getElementById('mensajenotas').textContent = '';

        // Validar que todos los campos estén completos
        if (!diasClase || !porcentajeAsistenciaPromocion || !porcentajeNotaPromocion || !porcentajeAsistenciaRegular || !porcentajeNotaRegular) {
            document.getElementById('mensajenotas').textContent = 'Error: Por favor, complete todos los campos.';
            setTimeout(() => { document.getElementById('mensajenotas').textContent = ''; }, 5000); // Limpiar el mensaje después de 5 segundos
            return;
        }

        // Validar que los valores sean razonables
        if (diasClase < 0 || 
            porcentajeAsistenciaPromocion < 0 || porcentajeAsistenciaPromocion > 100 ||
            porcentajeNotaPromocion < 0 || porcentajeNotaPromocion > 10 ||
            porcentajeAsistenciaRegular < 0 || porcentajeAsistenciaRegular > 100 ||
            porcentajeNotaRegular < 0 || porcentajeNotaRegular > 10) {
            document.getElementById('mensajenotas').textContent = 'Error: Los valores deben estar en el rango adecuado (0-100).';
            setTimeout(() => { document.getElementById('mensajenotas').textContent = ''; }, 5000); // Limpiar el mensaje después de 5 segundos
            return;
        }

        const datosFormulario = {
            diasClase: diasClase,
            promocion: {
                porcentajeAsistencia: porcentajeAsistenciaPromocion,
                porcentajeNota: porcentajeNotaPromocion
            },
            regularizacion: {
                porcentajeAsistencia: porcentajeAsistenciaRegular,
                porcentajeNota: porcentajeNotaRegular
            }
        };

        const button = document.querySelector('button[type="button"]');
        button.disabled = true; // Deshabilitar el botón mientras se procesa

        const response = await fetch('../bd/condiciones.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosFormulario)
        });

        // Comprobar si la respuesta del servidor es exitosa
        if (!response.ok) {
            const errorMessage = await response.text(); // Obtener mensaje de error
            document.getElementById('mensajenotas').textContent = 'Error: ' + errorMessage;
            setTimeout(() => { document.getElementById('mensajenotas').textContent = ''; }, 5000); // Limpiar el mensaje después de 5 segundos
            throw new Error(`Error en la respuesta del servidor: ${errorMessage}`);
        }

        const condicion = await response.json();
        mostrarCondicion(condicion);
    } catch (error) {
        console.error('Error en la solicitud o el procesamiento:', error);
        document.getElementById('mensajenotas').textContent = 'Error: Ocurrió un error al consultar las condiciones. Por favor, intente más tarde.';
        setTimeout(() => { document.getElementById('mensajenotas').textContent = ''; }, 5000); // Limpiar el mensaje después de 5 segundos
    } finally {
        const button = document.querySelector('button[type="button"]');
        button.disabled = false; // Volver a habilitar el botón
    }
}

function mostrarCondicion(condicion) {
    const notasBody = document.getElementById('notasBody');
    notasBody.innerHTML = `
        <h3 style="text-align: left;">Condición de los Alumnos:</h3>
        <div style="margin-top: 10px;">
            ${condicion.map(alumno => `
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px; padding: 8px; border-bottom: 1px solid #ddd;">
                    <span style="flex: 1; font-weight: bold;">${alumno.alumno}</span>
                    <span style="flex: 1; text-align: right;">${alumno.condicion}</span>
                </div>
            `).join('')}
        </div>
    `;
}

function mostrarFormulario() {
    limpiarControlesBusqueda();  // Limpiar controles de búsqueda si es necesario
    const formContainer = document.getElementById('notasBody');
   
    ocultarTabla()
    // Limpiar el contenedor antes de mostrar el formulario
    formContainer.innerHTML = '';

    // Mostrar el formulario
    formContainer.innerHTML = `
        <h3 style="text-align: left;">Condición del Alumno</h3>
        <form>
            <div style="display: flex; flex-direction: column; gap: 20px; margin-top: 10px;">
                <div>
                    <label for="diasClase" style="display: block; font-weight: bold;">Días de Clase:</label>
                    <input type="number" id="diasClase" name="diasClase" placeholder="Días de Clase" required style="width: 100%; padding: 8px;">
                </div>

                <div>
                    <h4 style="margin: 10px 0; font-weight: bold;">Promoción</h4>
                    <div style="display: flex; gap: 20px;">
                        <div style="flex: 1;">
                            <label for="porcentajeAsistenciaPromocion">Porcentaje de Asistencia:</label>
                            <input type="number" id="porcentajeAsistenciaPromocion" name="porcentajeAsistenciaPromocion" placeholder="% Asistencia Promoción" required style="width: 100%; padding: 8px;">
                        </div>
                        <div style="flex: 1;">
                            <label for="porcentajeNotaPromocion">Nota Mínima:</label>
                            <input type="number" id="porcentajeNotaPromocion" name="porcentajeNotaPromocion" placeholder="% Nota Promoción" required style="width: 100%; padding: 8px;">
                        </div>
                    </div>
                </div>

                <div>
                    <h4 style="margin: 10px 0; font-weight: bold;">Regularización</h4>
                    <div style="display: flex; gap: 20px;">
                        <div style="flex: 1;">
                            <label for="porcentajeAsistenciaRegular">Porcentaje de Asistencia:</label>
                            <input type="number" id="porcentajeAsistenciaRegular" name="porcentajeAsistenciaRegular" placeholder="% Asistencia Regularización" required style="width: 100%; padding: 8px;">
                        </div>
                        <div style="flex: 1;">
                            <label for="porcentajeNotaRegular">Nota Mínima:</label>
                            <input type="number" id="porcentajeNotaRegular" name="porcentajeNotaRegular" placeholder="% Nota Regularización" required style="width: 100%; padding: 8px;">
                        </div>
                    </div>
                </div>

                <button type="button" onclick="condicionalumnos()" style="padding: 10px; background-color: #4CAF50; color: white; border: none; cursor: pointer;">Verificar Información</button>
            </div>
        </form>
    `;
}
















//------------------------------herramientas
function agregarBotonGuardarnotas() {
    if (!document.querySelector('button[onclick="guardarNotas()"]')) {
        const notasBody = document.getElementById('notasBody');
        const controlsRow = document.createElement('div');
        controlsRow.style.marginTop = '20px';  // Espaciado superior para el botón
        controlsRow.style.paddingLeft = '80px';  // Mover solo el contenido del div hacia la derecha

        controlsRow.innerHTML = `
            <button onclick="guardarNotas()">Guardar notas</button>
        `;

        // Añadir el contenedor del botón a la tabla
        notasBody.appendChild(controlsRow);
    }
}

// Función para limpiar los controles de búsqueda 
function limpiarControlesBusqueda() {
    const contenedorBusquedaFecha = document.getElementById('contenedorBusquedaNotas');
    contenedorBusquedaFecha.innerHTML = ''; // Limpiar todo el contenido dentro del contenedor
}

// Función para agregar la barra de búsqueda
function agregarControlesBusquedaNotas() {
    // Contenedor para los controles de búsqueda
    const contenedorBusqueda = document.getElementById('contenedorBusquedaNotas');
    
    // Limpiar los controles de búsqueda previos (para evitar duplicados)
    contenedorBusqueda.innerHTML = '';

    // Campo de búsqueda
    const inputBusqueda = document.createElement('input');
    inputBusqueda.id = 'searchNotas';
    inputBusqueda.type = 'text';
    inputBusqueda.placeholder = 'Buscar por nombre o apellido';
    inputBusqueda.style.marginRight = '10px';
    
    // Botón de búsqueda
    const buttonBusqueda = document.createElement('button');
    buttonBusqueda.textContent = 'Buscar';
    buttonBusqueda.addEventListener('click', buscarAlumnoNotas);
    
    // Agregar los elementos al contenedor
    contenedorBusqueda.appendChild(inputBusqueda);
    contenedorBusqueda.appendChild(buttonBusqueda);
}




// Función para ocultar la cabecera (thead) y mostrar el cuerpo (tbody)
function ocultarTabla() {
    const tablaNota = document.getElementById('tablanota');
    const formulario = document.getElementById('notasBody');
    
    if (tablaNota) {
        // Usa la clase 'hidden' que ya tienes en tu CSS
        tablaNota.classList.add('hidden'); // Ocultar la cabecera sin perder su espacio
    }

    if (formulario) {
        formulario.classList.remove('hidden'); // Mostrar el cuerpo de la tabla
    }
}

// Función para mostrar la cabecera (thead) y ocultar el cuerpo (tbody)
function mostrarTabla(){
    const tablaNota = document.getElementById('tablanota');
    const formulario = document.getElementById('notasBody');
    
    if (tablaNota) {
        // Quita la clase 'hidden' para mostrar la cabecera
        tablaNota.classList.remove('hidden'); 
    }

    if (formulario) {
        formulario.classList.remove('hidden'); // Asegura que el cuerpo también esté visible
    }
}
