<?php
require_once 'db.php';
$conn = get_db_connection();

if (!isset($_SESSION['user_id'])) {
    json_response(['error' => 'No autorizado'], 401);
}
$id_usuario = $_SESSION['user_id'];

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Obtener reservas (una o todas)
        $id_reserva = $_GET['id'] ?? null;
        if ($id_reserva) {
            $stmt = $conn->prepare("SELECT * FROM reservaciones WHERE id = ? AND id_usuario = ?");
            $stmt->bind_param("ii", $id_reserva, $id_usuario);
            $stmt->execute();
            $result = $stmt->get_result()->fetch_assoc();
            json_response($result);
        } else {
            $stmt = $conn->prepare("SELECT r.*, m.numero_mesa, m.capacidad FROM reservaciones r JOIN mesas m ON r.id_mesa = m.id WHERE r.id_usuario = ? ORDER BY r.fecha DESC, r.hora DESC");
            $stmt->bind_param("i", $id_usuario);
            $stmt->execute();
            $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            json_response($result);
        }
        $stmt->close();
        break;

    case 'POST':
        // Crear una nueva reserva
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $conn->prepare("INSERT INTO reservaciones (id_usuario, id_mesa, fecha, hora, cantidad_personas, pedido_especial) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("iisssi", $id_usuario, $data['id_mesa'], $data['fecha'], $data['hora'], $data['cantidad_personas'], $data['pedido_especial']);
        if ($stmt->execute()) {
            json_response(['success' => 'Reservación realizada con éxito.'], 201);
        } else {
            json_response(['error' => 'No se pudo crear la reservación.'], 500);
        }
        $stmt->close();
        break;

    case 'PUT':
        // Actualizar una reserva
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $conn->prepare("UPDATE reservaciones SET id_mesa = ?, fecha = ?, hora = ?, cantidad_personas = ?, pedido_especial = ? WHERE id = ? AND id_usuario = ?");
        $stmt->bind_param("issisii", $data['id_mesa'], $data['fecha'], $data['hora'], $data['cantidad_personas'], $data['pedido_especial'], $data['id'], $id_usuario);
        if ($stmt->execute()) {
            json_response(['success' => 'Reservación actualizada con éxito.']);
        } else {
            json_response(['error' => 'No se pudo actualizar la reservación.'], 500);
        }
        $stmt->close();
        break;

    case 'DELETE':
        // Cancelar una reserva (cambio de estado)
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $conn->prepare("UPDATE reservaciones SET estado = 'cancelada' WHERE id = ? AND id_usuario = ?");
        $stmt->bind_param("ii", $data['id'], $id_usuario);
        if ($stmt->execute()) {
            json_response(['success' => 'Reservación cancelada.']);
        } else {
            json_response(['error' => 'No se pudo cancelar la reservación.'], 500);
        }
        $stmt->close();
        break;

    default:
        json_response(['error' => 'Método no permitido'], 405);
        break;
}

$conn->close();