<?php
require_once 'db.php';
$conn = get_db_connection();

if (!isset($_SESSION['is_admin']) || $_SESSION['is_admin'] !== true) {
    json_response(['error' => 'Acceso denegado'], 403);
}

$action = $_GET['action'] ?? '';
$date = $_GET['date'] ?? date('Y-m-d');

switch ($action) {
    case 'reservations':
        $stmt = $conn->prepare("SELECT r.*, u.nombre as cliente_nombre, u.apellido as cliente_apellido, m.numero_mesa 
                                FROM reservaciones r 
                                JOIN usuarios u ON r.id_usuario = u.id 
                                JOIN mesas m ON r.id_mesa = m.id 
                                WHERE r.fecha = ? AND r.estado = 'confirmada'
                                ORDER BY r.hora");
        $stmt->bind_param("s", $date);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        json_response($result);
        $stmt->close();
        break;

    case 'availability':
        // Mesas
        $tables_result = $conn->query("SELECT id, numero_mesa, capacidad FROM mesas ORDER BY numero_mesa");
        $tables = $tables_result->fetch_all(MYSQLI_ASSOC);

        // Reservas del día
        $bookings_stmt = $conn->prepare("SELECT r.id_mesa, r.hora, u.nombre as nombre_cliente FROM reservaciones r JOIN usuarios u ON r.id_usuario = u.id WHERE r.fecha = ? AND r.estado = 'confirmada'");
        $bookings_stmt->bind_param("s", $date);
        $bookings_stmt->execute();
        $bookings = $bookings_stmt->get_result()->fetch_all(MYSQLI_ASSOC);

        // Franjas horarias
        $time_slots = [];
        for ($h = 14; $h <= 20; $h++) {
            for ($m = 0; $m < 60; $m += 30) {
                 if ($h === 20 && $m > 0) continue;
                 $time_slots[] = str_pad($h, 2, '0', STR_PAD_LEFT) . ':' . str_pad($m, 2, '0', STR_PAD_LEFT) . ':00';
            }
        }

        json_response(['tables' => $tables, 'bookings' => $bookings, 'time_slots' => $time_slots]);
        break;


    case 'search':
        $type = $_GET['type'] ?? '';
        $value = $_GET['value'] ?? '';

        if (empty($type) || empty($value)) {
            json_response(['error' => 'Tipo y valor de búsqueda son requeridos'], 400);
        }

        // Preparamos la base de la consulta
        $sql = "SELECT r.*, u.nombre as cliente_nombre, u.apellido as cliente_apellido, u.cedula, m.numero_mesa 
                FROM reservaciones r 
                JOIN usuarios u ON r.id_usuario = u.id 
                JOIN mesas m ON r.id_mesa = m.id WHERE ";

        // Añadimos la condición WHERE dinámicamente para seguridad
        switch ($type) {
            case 'fecha':
                $sql .= "r.fecha = ?";
                break;
            case 'cedula':
                $sql .= "u.cedula = ?";
                break;
            case 'nombre':
                $sql .= "u.nombre LIKE ?";
                $value = "%" . $value . "%"; // Para búsqueda parcial
                break;
            case 'apellido':
                $sql .= "u.apellido LIKE ?";
                $value = "%" . $value . "%"; // Para búsqueda parcial
                break;
            default:
                json_response(['error' => 'Tipo de búsqueda no válido'], 400);
                break;
        }
        
        $sql .= " ORDER BY r.fecha DESC, r.hora ASC";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $value);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        json_response($result);
        $stmt->close();
        break;
    default:
        json_response(['error' => 'Acción de admin no válida'], 400);
        break;
}

$conn->close();