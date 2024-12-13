<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cómo hacer uso de la Página</title>
    <link rel="preload" href="./resources/css/acerca-de.css?v=<?php echo time(); ?>" as="style" onload="this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="./resources/css/acerca-de.css?v=<?php echo time(); ?>"></noscript>

    
    <style>/* Estilo general */
body {
    font-family: 'Roboto', sans-serif;
    background-color:rgb(255, 253, 253); /* Fondo suave */
    color: #333333; /* Texto oscuro, fácil de leer */
    margin: 0;
    padding: 0;
    overflow-x: hidden; /* Evita el scroll horizontal */
}

header {
    background-color: #007BFF;
    padding: 15px 0;
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1000;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra suave */
}

nav ul {
    display: flex;
    justify-content: center;
    list-style: none;
    margin: 0;
    padding: 0;
}

nav ul li {
    margin: 0 15px;
}

nav ul li a {
    color: rgb(10, 0, 0);
    padding: 15px 25px;
    text-decoration: none;
    border-radius: 8px; 
    transition: all 0.3s ease-in-out;
}

nav ul li a:hover {
    background-color: #0056b3; 
    transform: scale(1.05); /* Agrandar el enlace ligeramente */
}

main {
    display: flex;
    flex-wrap: wrap; /* Permite que se muevan a la siguiente fila si no caben */
    justify-content: space-around; /* Espacio alrededor de cada panel */
}

.panel {
    width: 45%; /* Los paneles ocuparán el 45% del ancho del contenedor */
    margin: 10px; /* Espaciado entre los paneles */
}


.panel h2 {
    font-size: 24px;
    color: #333333;
    margin-bottom: 10px;
    text-align: center;
}

.panel p {
    font-size: 16px;
    color: #555555;
    line-height: 1.6;
}
.hidden {
    display: none !important;
}

button, .btn {
    background-color: #007BFF;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
}

button:hover, .btn:hover {
    background-color: #0056b3;
    transform: translateY(-2px); /* Eleva ligeramente el botón */
}

button:active, .btn:active {
    transform: translateY(0); /* Devuelve el botón a su posición */
}

button.disabled, .btn.disabled {
    background-color: #cccccc;
    pointer-events: none;
}

input[type="text"], input[type="email"], input[type="password"], select, textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    font-size: 16px;
    transition: border-color 0.3s;
}

input[type="text"]:focus, input[type="email"]:focus, input[type="password"]:focus, select:focus, textarea:focus {
    border-color: #007BFF;
    outline: none;
}

/* Estilo del pie de página */
footer {
    text-align: center; /* Centrar texto del footer */
    padding: 20px 0; /* Espaciado superior e inferior */
    background-color: #333; /* Color de fondo del footer */
    color: white; /* Color del texto */
}

.card {
    background-color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 20px;
    transition: all 0.3s ease-in-out;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}


.link {
    position: relative;
    display: inline-block;
    font-size: 18px; /* Tamaño de la flecha */
}

/* Estilo para el login de usuario */

   /* Contenedor para el usuario */
   #userContainer {
    position: relative;
    display: inline-block;
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.7);  /* Fondo translúcido */
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
}

#userContainer:hover {
    background-color: rgba(255, 255, 255, 1);
}

/* Estilos para el texto de iniciar sesión */
#userDisplay {
    font-size: 1.1rem;
    font-weight: bold;
    color: #007bff;
    cursor: pointer;
    transition: color 0.3s ease;
}

#userDisplay:hover {
    color: #0056b3; /* Color más oscuro al pasar el cursor */
}

/* Contenedor del usuario */
#userContainer {
    position: relative;
    display: inline-block;
}

/* Menú de logout */
#logoutMenu {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    min-width: 150px;
    display: none;  /* Empieza oculto */
}

/* Mostrar el menú de logout cuando el contenedor se pasa el cursor */
#userContainer:hover #logoutMenu {
    display: block;
}

/* Agregar transición de opacidad para suavizar la aparición del menú */
#logoutMenu {
    opacity: 0;
    transition: opacity 0.2s ease;
}

#userContainer:hover #logoutMenu {
    opacity: 1;
}

/* Botón de cerrar sesión */
#cerrarSesion {
    background-color: #007bff; /* Azul similar al texto de userDisplay */
    color: #fff; /* Texto blanco */
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    width: 100%; /* Para que ocupe todo el ancho del contenedor */
    text-align: center;
}

#cerrarSesion:hover {
    background-color: #0056b3; /* Azul más oscuro */
    transform: scale(1.05); /* Pequeño efecto de aumento */
}

#cerrarSesion:active {
    background-color: #004080; /* Azul aún más oscuro */
    transform: scale(0.95); /* Efecto de presionado */
}



    </style>
</head>
<body>
    <header>
        <nav>
            <ul>

            <li><a href="index.php" class="link" title="Volver">&#8592;</a></li> 
            <li><a href="login.php" class="link" id="loginLink">Iniciar Sesión</a></li>

            <li id="userContainer" style="display: none;">
                <span id="userDisplay">Iniciar Sesión</span>
                <div id="logoutMenu" style="display: none;">
                    <button id="cerrarSesion">Cerrar Sesión</button>
                </div>
            </li>

                <li><a href="#" class="link" id="toggleMaterias">Cómo Seleccionar Materias</a></li>
                <li><a href="#" class="link" id="togglePanel">Cómo Crear Alumnos</a></li>
                <li><a href="#" class="link" id="toggleAsistencias">Cómo Poner Asistencias</a></li>
                <li><a href="#" class="link" id="toggleNotas">Cómo Dar Notas</a></li>
            </ul>
        </nav>
    </header>

    <main>
          <!-- Panel para materias -->
        <section id="materiasPanel" class="panel hidden">
            <h2>Seleccionar Materia</h2>
            <p>Aquí se mostrará cómo seleccionar las materias.</p> <br>
           <strong> <p>todabia no funciona</p></strong>
        </section>

          <!-- Panel para los alumnos -->
        <section id="registroPanel" class="panel hidden">
            <h2>Registro de Alumnos</h2>
            <p>Aquí se mostrará cómo registrar alumnos.</p>
        </section>


          <!-- Panel para asistencias -->
        <section id="asistenciasPanel" class="panel hidden">
            <h2>Asistencias</h2>
            <p>Aquí se mostrará cómo registrar asistencias.</p>

            <div>
            <h3>la ubicacion de la asistencia </h3>
            <p> presione para desplegar la opcion de las asistencias</p>
            <img src="resources\img\asistencias\sistemas asistencias.png" style="width:150%; height:auto; margin-bottom:0px;" > 
            </div>
            <br>
            
            <div>
            <h3>las opciones de la asistencia </h3>
            <p> botones que cumplen funciones especificas para las asistencias</p>
            <img src="resources\img\asistencias\botones de asistencias.png" style="width:150%; height:auto; margin-bottom:0px;" > 
            </div>
            
        </section>

          <!-- Panel para Notas -->
        <section id="notasPanel" class="panel hidden">
            <h2>Notas de Alumnos</h2>
            <p>Aquí se mostrará cómo registrar las notas.</p>
        </section>

        <br><br>
      
    </main>


    <img src="resources/mesas.jpeg" alt="" style="width:100%; height:auto; margin-bottom:0px;"> 

    <script src="./resources/js/usuario.js" defer></script>
    <script src="./resources/js/registropanel.js" defer></script> 

    <footer>
        <p><strong>Asistido</strong>. <br><br> © 2024 Todos los derechos reservados.</p>
    </footer>
</body>
</html>
