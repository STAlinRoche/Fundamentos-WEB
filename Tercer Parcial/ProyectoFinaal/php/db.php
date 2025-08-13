<?php
// Configuración de la base de datos
// Configuración de la base de datos
define('DB_HOST', 'localhost'); // Para XAMPP, 'localhost' o '127.0.0.1' suele ser correcto.
define('DB_USER', 'root');      // El usuario por defecto de XAMPP es 'root'.
define('DB_PASS', 'redes2025');          // La contraseña por defecto en XAMPP es VACÍA ('').
define('DB_NAME', 'fogot_reservas'); // Asegúrate de que tu base de datos se llame así.

// Función para obtener la conexión
function get_db_connection() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($conn->connect_error) {
        // En un entorno de producción, registrar el error en lugar de mostrarlo
        die("Error de conexión: " . $conn->connect_error);
    }
    $conn->set_charset("utf8");
    return $conn;
}

// Iniciar sesión en todos los scripts que lo necesiten
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Configuración de la cabecera para respuestas JSON
function json_response($data, $statusCode = 200) {
    header("Content-Type: application/json; charset=UTF-8");
    http_response_code($statusCode);
    echo json_encode($data);
    exit;
}

// Permitir peticiones CORS para desarrollo
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}