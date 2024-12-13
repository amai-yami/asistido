<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Página de Inicio</title>
        <link rel="stylesheet" href="/resources/css/index.css">
    </head>
    <body>
            <header>
                <nav>
                    <ul>
                        <li id="userContainer">
                            <span id="userDisplay" onclick="handleLoginClick()">Iniciar Sesión</span>
                            <div id="logoutMenu">
                                <button id="cerrarSesion">Cerrar Sesión</button>
                            </div>
                        </li>
                        <li><a href="#" id="toggleMaterias">Seleccionar Materias</a></li>
                        <li><a href="#" id="togglePanel">Alumnos</a></li>
                        <li><a href="#" id="toggleAsistencias">Asistencias</a></li>
                        <li><a href="#" id="toggleNotas">Notas de la Clase</a></li>
                        <li><a href="acerca de.php">Uso de la Página</a></li>
                    </ul>
                </nav>
            </header>

        <main>
            
            <!-- Panel para seleccionar materias -->
            <div id="materiasPanel" class="panel">
                <h2>Seleccionar Materia</h2>
                <button type="button" onclick="RegistrarMateria()">registrar materias</button>
                <button type="button" onclick="mostrarRegistromateria()">buscar materias</button>
            
                <div id="formContenedor"></div> <!-- Contenedor donde se generarán los inputs -->
                
            </div>



            <!-- Panel para registrar, eliminar y modificar alumnos -->
            <div id="registroPanel" class="panel">
                <h2>Registro de Alumnos</h2>
                <button type="button" onclick="mostrarRegistro()">Registrar Alumno</button>
                <button type="button" onclick="mostrarEliminar()">Eliminar Alumno</button>
                <button type="button" onclick="mostrarModificar()">Modificar Alumno</button>
                <button type="button" onclick="eliminarCurso()">Eliminar Curso</button>
                <div id="formContainer"></div> <!-- Contenedor donde se generarán los inputs -->
                <div id="mensajePanel" style="margin-top: 10px;"></div> <!-- Div para mostrar mensajes generales -->
            </div>

            <!-- Panel para Asistencias -->
            <div id="asistenciasPanel" class="panel">
                <h2>Asistencias</h2>
                <button id="cargarAlumnosBtn" onclick="cargarAlumnos()">Listar Alumnos</button> <!--"Ver Alista de alumnos" -->
                <button onclick="verAsistencias()">Ver Asistencias</button>  <!--"Ver Asistencias" -->
                <button onclick="modificarAsistenciasFormulario()">Modificar</button><!--"MODIFICAR ASISTENCIAS"-->

                        <div id="contenedorBusquedaFecha">
                            <!-- Los controles de búsqueda y fecha se agregarán aquí dinámicamente -->
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre Completo</th> 
                                    <th>Asistencia</th>
                                </tr>
                            </thead>
                            <tbody id="asistenciasBody">
                                <!-- Las filas de asistencia se agregarán aquí dinámicamente -->
                            </tbody>
                        </table>

                <br><br> 
                <!-- Contenedor para mostrar mensajes -->
                <div id="mensajeUsuario" class="mensaje-usuario" style="display: none;"></div>
            </div>



            <!-- Panel para Notas -->
            <div id="notasPanel" class="panel">
                <h2>Notas de Alumnos</h2>

                 <!-- Botones de Acción -->
                 <div class="action-buttons">
                    <button id="cargarAlumnosBtn" onclick="cargarAlumnosNotas()">Listar Alumnos</button>
                    <button id="cargarNotasBtn" onclick="verNotas()">Listar Notas</button>
                    <button onclick="mostrarFormulario()">Ver Condición</button>
                </div>

                <br>
                <!-- Formulario de Búsqueda -->
                <div id="contenedorBusquedaNotas"></div>
           
                <!-- Tabla de Notas -->
                <table>
                    <thead id="tablanota">
                        <tr>
                            <th>Nombre Completo</th>
                            <th>Parcial 1</th>
                            <th>Parcial 2</th>
                            <th>Final</th>
                        </tr>
                    </thead>
                    
                    <tbody id="notasBody">
                        <!-- Las filas de notas se agregarán aquí dinámicamente -->
                    </tbody>
                </table> 
                        
              <!-- Mensajes de error o éxito (Contenedor de Mensajes) --> 
              <div id="mensajenotas"></div>

            </div>


            
         <img src="/resources/mesas.jpeg" alt="" style="width:100%; height:auto;">
        </main>
        
        
        <!-- Scripts -->
        <script src="./resources/js/usuario.js"></script> 
        <script src="./resources/js/alumno.js"defer></script> 
        <script src="./resources/js/model.js"></script> 
        <script src="./resources/js/seleccionar_registro.js"></script> 
        <script src="./resources/js/notas.js" ></script> 
        <script src="./resources/js/asistencia.js"></script> 

        
        <!-- Pie de página -->
        <footer>
            <p><strong>Asistido</strong>. <br><br> © 2024 Todos los derechos reservados.</p>
        </footer>

    </body>
</html>
