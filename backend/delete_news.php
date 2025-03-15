<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'db_connect.php';

$con = $conn;
if (mysqli_connect_errno()) {
    echo json_encode(["error" => "Błąd połączenia z bazą danych"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$id = $data["id"];

$stmt = $con->prepare("DELETE FROM news WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["message" => "Nowość usunięta"]);
} else {
    echo json_encode(["error" => "Błąd usuwania nowości"]);
}

$stmt->close();
$con->close();
?>
