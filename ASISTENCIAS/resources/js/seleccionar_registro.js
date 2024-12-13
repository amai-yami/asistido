// Mostrar formulario para registrar alumno
function RegistrarMateria() { 
    const formContainer = document.getElementById('formContenedor');
    formContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos inputs

    const formHtml = `
        <form id="formRegistrar" onsubmit="event.preventDefault(); registrarAlumno();">
            
            <label for="instituto">instituto:</label>
            <input type="text" id="instituto" name="instituto" required>
            
            <label for="carrera">carrera:</label>
            <input type="text" id="carrera" name="carrera" required>
            
            <label for="anio">Año:</label>
            <input type="text" id="anio" name="anio" required>
            
            <label for="Curso"> Curso:</label>
            <input type="text" id="Curso" name="Curso" required >
            
            <label for="Materia">Materia:</label>
            <input type="text" id="Materia" name="Materia" required>     <br><br>
            
            <button type="submit">Registrar datos</button>
        </form>
    `;
    formContainer.innerHTML = formHtml; // Agregar el formulario al contenedor
}

// Mostrar formulario para modificar alumno
function mostrarRegistromateria() {
    const formContainer = document.getElementById('formContenedor');
    formContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos inputs

    const formHtml = `
        <!-- Selección de instituto -->
        <label for="instituto">Seleccionar Instituto:</label>
        <select id="instituto" name="instituto" required>
            <option value="">-- Selecciona un Instituto --</option>
            <!-- Las opciones se cargarán aquí dinámicamente -->
        </select>

        <!-- Selección de carrera -->
        <label for="carrera">Seleccionar Carrera/Departamento:</label>
        <select id="carrera" name="carrera" required>
            <option value="">-- Selecciona una Carrera --</option>
            <!-- Las opciones se cargarán aquí dinámicamente -->
        </select>

        <!-- Selección de Año -->
        <label for="anio">Seleccionar Año:</label>
        <select id="anio" name="anio" required>
            <option value="">-- Selecciona un Año --</option>
            <!-- Las opciones se cargarán aquí dinámicamente -->
        </select>

        <!-- Selección de Curso -->
        <label for="curso">Seleccionar Curso:</label>
        <select id="curso" name="curso" required>
            <option value="">-- Selecciona un Curso --</option>
            <!-- Las opciones se cargarán aquí dinámicamente -->
        </select>

        <!-- Selección de Materia -->
        <label for="materias">Seleccionar Materia:</label>
        <select id="materias" name="materias" required>
            <option value="">-- Selecciona una Materia --</option>
            <!-- Las opciones se cargarán aquí dinámicamente -->
        </select>
    `;

    formContainer.innerHTML = formHtml; // Agregar el formulario al contenedor
}


