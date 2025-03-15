<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'db_connect.php'; 

$con = $conn; 

$eData = json_decode(file_get_contents("php://input"), true);
$id = $eData['id'];

$sql = "DELETE FROM meetings WHERE id=?";
$stmt = $con->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["message" => "Spotkanie usunięte"]);
} else {
    echo json_encode(["error" => "Błąd usuwania"]);
}

$stmt->close();
$con->close();
?>