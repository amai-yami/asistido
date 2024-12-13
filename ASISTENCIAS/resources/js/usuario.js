document.addEventListener("DOMContentLoaded", function () {
    // Función para actualizar el estado de la sesión
    function actualizarEstadoSesion(usuario) {
        const userDisplay = document.getElementById("userDisplay");
        const logoutMenu = document.getElementById("logoutMenu");

        if (usuario) {
            userDisplay.innerText = usuario;  // Mostrar el nombre del usuario
            logoutMenu.style.display = "none";  // Asegurarse de que el menú está oculto inicialmente
        } else {
            userDisplay.innerText = "Iniciar Sesión";  // Mostrar "Iniciar Sesión"
            logoutMenu.style.display = "none";  // Asegurar que el menú de logout esté oculto
        }
    }

    // Verificar si el usuario está logueado al cargar la página
    fetch('../bd/obtener_usuario.php')
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener datos del usuario.");
            }
            return response.json();
        })
        .then(data => {
            actualizarEstadoSesion(data.usuario);
        })
        .catch(error => {
            console.error("Error al cargar el nombre del usuario:", error);
        });

    // Manejar el clic en "Iniciar Sesión"
    const loginLink = document.getElementById("userDisplay");
    if (loginLink) {
        loginLink.addEventListener("click", function() {
            if (loginLink.innerText === "Iniciar Sesión") {
                window.location.href = "login.php";
            }
        });
    }

    // Manejar el clic en "Cerrar Sesión"
    const cerrarSesionBtn = document.getElementById("cerrarSesion");
    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener("click", function() {
            fetch('../bd/cerrar_sesion.php', { method: 'POST' })
                .then(response => {
                    if (response.ok) {
                        actualizarEstadoSesion(null); // Usuario desconectado
                    } else {
                        console.error("Error al cerrar sesión.");
                    }
                })
                .catch(error => {
                    console.error("Error al cerrar sesión:", error);
                });
        });
    }

    // Mostrar y ocultar el menú de "Cerrar sesión" usando userContainer
    const userContainer = document.getElementById("userContainer");
    const userDisplay = document.getElementById("userDisplay");
    const logoutMenu = document.getElementById("logoutMenu");

    if (userContainer) {
        userContainer.addEventListener("mouseover", function() {
            if (userDisplay.innerText !== "Iniciar Sesión") {
                logoutMenu.style.display = "block";  // Mostrar el menú
            }
        });

        userContainer.addEventListener("mouseout", function() {
            logoutMenu.style.display = "none";  // Ocultar el menú
        });
    }
});




///login

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('button[type="submit"]'); // Seleccionamos el botón de inicio de sesión
    const form = document.getElementById('loginForm'); // Seleccionamos el formulario
    const mensajeError = document.createElement('div'); // Elemento para mostrar el mensaje de error
    mensajeError.style.color = 'red'; // Estilo para el mensaje de error
    form.appendChild(mensajeError); // Lo agregamos al formulario

    // Definimos la acción que se ejecutará cuando el botón de "Ingresar" sea clickeado
    loginButton.onclick = function (e) {
        e.preventDefault(); // Prevenimos que el formulario se envíe de forma tradicional

        const usuario = document.getElementById('usuario').value;
        const contrasena = document.getElementById('contrasena').value;

        // Realizamos la solicitud AJAX
        fetch('../bd/procesar_login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `usuario=${encodeURIComponent(usuario)}&contrasena=${encodeURIComponent(contrasena)}`
        })
        .then(response => response.json()) // Esperamos una respuesta JSON
        .then(data => {
            if (data.success) {
                // Si el login fue exitoso, redirigimos al usuario
                window.location.href = "index.php"; // Redirigir a la página principal
            } else {
                // Si hubo un error, mostramos el mensaje de error
                mensajeError.textContent = data.error; // Mostramos el mensaje de error
            }
        })
        .catch(error => {
            // Manejo de errores si la solicitud AJAX falla
            mensajeError.textContent = "Hubo un problema con la solicitud. Intenta de nuevo más tarde.";
        });
    };
});


//registrar

document.getElementById('registro-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío tradicional del formulario

    const formData = new FormData(this);

    // Validar los campos del formulario antes de enviar
    if (!formData.get('usuario') || !formData.get('correo') || !formData.get('contrasena') || !formData.get('nombre') || !formData.get('apellido')) {
        displayMessage('Error: Todos los campos son obligatorios.', 'red');
        return; // Detener la ejecución si falta algún campo
    }

    fetch('../bd/insert_usuario.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json()) // Esperar una respuesta en formato JSON
    .then(data => {
        // Mostrar el mensaje según la respuesta del servidor
        if (data.success) {
            displayMessage(data.message + ' <a href="login.php">Iniciar sesión</a>', 'green');
        } else {
            displayMessage(data.message, 'red');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        displayMessage('Hubo un problema al registrar el usuario. Intenta de nuevo.', 'red');
    });
});

// Función para mostrar los mensajes en el contenedor
function displayMessage(message, color) {
    const messageContainer = document.getElementById('error-message');
    messageContainer.style.color = color;
    messageContainer.innerHTML = message;
}
