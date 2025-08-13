<?php
require_once 'db.php';

$action = $_GET['action'] ?? '';
$conn = get_db_connection();

switch ($action) {
    case 'register':
        handle_register($conn);
        break;
    case 'login':
        handle_login($conn);
        break;
    case 'logout':
        handle_logout();
        break;
    case 'status':
        handle_status();
        break;
    default:
        json_response(['error' => 'Acción no válida en auth'], 400);
}

function handle_register($conn) {
    $data = json_decode(file_get_contents('php://input'), true);
    $nombre = $data['nombre'] ?? '';
    $apellido = $data['apellido'] ?? '';
    $cedula = $data['cedula'] ?? '';
    $correo = $data['correo'] ?? '';
    $contrasena = $data['contrasena'] ?? '';

    if (empty($nombre) || empty($apellido) || empty($cedula) || empty($correo) || empty($contrasena)) {
        json_response(['error' => 'Todos los campos son obligatorios.'], 400);
    }

    $hashed_password = password_hash($contrasena, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO usuarios (nombre, apellido, cedula, correo, contrasena) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $nombre, $apellido, $cedula, $correo, $hashed_password);

    if ($stmt->execute()) {
        json_response(['success' => 'Usuario registrado con éxito.'], 201);
    } else {
        if ($conn->errno === 1062) {
             json_response(['error' => 'La cédula o el correo ya están registrados.'], 409);
        } else {
             json_response(['error' => 'Error del servidor al registrar.'], 500);
        }
    }
    $stmt->close();
}

function handle_login($conn) {
    $data = json_decode(file_get_contents('php://input'), true);
    $cedula = $data['cedula'] ?? '';
    $contrasena = $data['contrasena'] ?? '';

    // Lógica especial para el admin
    if ($cedula === '1755922877' && $contrasena === 'admin') {
         $stmt = $conn->prepare("SELECT id, nombre, es_admin FROM usuarios WHERE cedula = ?");
         $stmt->bind_param("s", $cedula);
         $stmt->execute();
         $result = $stmt->get_result();
         if ($user = $result->fetch_assoc()) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_nombre'] = $user['nombre'];
            $_SESSION['is_admin'] = true;
            json_response(['success' => 'Inicio de sesión de administrador exitoso.', 'isAdmin' => true]);
            return;
         }
    }
    
    $stmt = $conn->prepare("SELECT id, nombre, contrasena, es_admin FROM usuarios WHERE cedula = ?");
    $stmt->bind_param("s", $cedula);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($user = $result->fetch_assoc()) {
        if (password_verify($contrasena, $user['contrasena'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_nombre'] = $user['nombre'];
            $_SESSION['is_admin'] = (bool)$user['es_admin'];
            
            json_response([
                'success' => 'Inicio de sesión exitoso.',
                'isAdmin' => $_SESSION['is_admin']
            ]);
        } else {
            json_response(['error' => 'Cédula o contraseña incorrectas.'], 401);
        }
    } else {
        json_response(['error' => 'Cédula o contraseña incorrectas.'], 401);
    }
    $stmt->close();
}

function handle_logout() {
    session_unset();
    session_destroy();
    json_response(['success' => 'Sesión cerrada.']);
}

function handle_status() {
    if (isset($_SESSION['user_id'])) {
        json_response([
            'loggedIn' => true,
            'nombre' => $_SESSION['user_nombre'],
            'isAdmin' => $_SESSION['is_admin'] ?? false
        ]);
    } else {
        json_response(['loggedIn' => false]);
    }
}

$conn->close();