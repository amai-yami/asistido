<?php
session_start();
require 'conexion.php'; // Asegúrate de que este archivo exista y esté en la ubicación correcta

// Función para limpiar los datos de entrada
function clean_input($data) {
    return htmlspecialchars(stripslashes(trim($data)));
}

// Respuesta inicial
$response = ['success' => false, 'error' => 'Error desconocido.'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario = clean_input($_POST["usuario"]);
    $contrasena = clean_input($_POST["contrasena"]);

    try {
        // Crear una instancia de la clase Database
        $database = new Database();
        // Obtener la conexión
        $conn = $database->connect();

        // Preparar la consulta SQL
        $stmt = $conn->prepare('SELECT * FROM usuario WHERE usuario = :usuario');
        $stmt->bindParam(':usuario', $usuario, PDO::PARAM_STR);
        $stmt->execute();

        // Obtener el resultado
        $usuario_db = $stmt->fetch(PDO::FETCH_ASSOC);

        // Verificar si se encontró el usuario y si la contraseña coincide
        if ($usuario_db && password_verify($contrasena, $usuario_db['contrasena'])) {
            // Establecer variables de sesión
            $_SESSION["usuario"] = $usuario_db['nombre']; // Almacenar el nombre en la sesión
            $response['success'] = true;
        } else {
            // Error: Usuario o contraseña inválidos
            $response['error'] = "Usuario o contraseña incorrectos.";
        }
    } catch (PDOException $e) {
        $response['error'] = "Error de conexión: " . $e->getMessage();
    }
} else {
    // Error: No se recibieron los valores por POST
    $response['error'] = "No se recibieron los valores por POST.";
}

// Devolver la respuesta en formato JSON
echo json_encode($response);
