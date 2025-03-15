<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'db_connect.php'; 

$con = $conn; 

if (mysqli_connect_errno()) {
    echo json_encode(["error" => "Błąd połączenia z bazą danych"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$id = $data["id"] ?? 0;

if (!$id) {
    echo json_encode(["error" => "Nie podano ID gry"]);
    exit();
}

$stmt = $con->prepare("DELETE FROM games WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["message" => "Gra została usunięta!"]);
} else {
    echo json_encode(["error" => "Błąd podczas usuwania gry"]);
}

$stmt->close();
$con->close();
?>
