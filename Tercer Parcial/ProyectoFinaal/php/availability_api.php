<?php
require_once 'db.php';

$conn = get_db_connection();
$fecha = $_GET['fecha'] ?? null;
$hora = $_GET['hora'] ?? null;

if (!$fecha || !$hora) {
    json_response(['error' => 'Fecha y hora son requeridas'], 400);
}

// 1. Obtener todas las mesas
$mesas_result = $conn->query("SELECT id, numero_mesa, capacidad FROM mesas");
$todas_las_mesas = [];
while ($row = $mesas_result->fetch_assoc()) {
    $todas_las_mesas[] = $row;
}

// 2. Obtener IDs de las mesas ya reservadas para esa fecha y hora
$stmt = $conn->prepare("SELECT id_mesa FROM reservaciones WHERE fecha = ? AND hora = ? AND estado = 'confirmada'");
$stmt->bind_param("ss", $fecha, $hora);
$stmt->execute();
$result = $stmt->get_result();
$mesas_reservadas_ids = [];
while ($row = $result->fetch_assoc()) {
    $mesas_reservadas_ids[] = $row['id_mesa'];
}
$stmt->close();

// 3. Filtrar las mesas disponibles
$mesas_disponibles = array_filter($todas_las_mesas, function($mesa) use ($mesas_reservadas_ids) {
    return !in_array($mesa['id'], $mesas_reservadas_ids);
});

// 4. Agrupar por capacidad
$disponibilidad_agrupada = [];
foreach ($mesas_disponibles as $mesa) {
    $capacidad = $mesa['capacidad'];
    if (!isset($disponibilidad_agrupada[$capacidad])) {
        $disponibilidad_agrupada[$capacidad] = [];
    }
    $disponibilidad_agrupada[$capacidad][] = ['id' => $mesa['id'], 'numero_mesa' => $mesa['numero_mesa']];
}

json_response(['available' => $disponibilidad_agrupada]);

$conn->close();