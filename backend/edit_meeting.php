<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$con = $conn;

if (mysqli_connect_errno()) {
    echo json_encode(["error" => "Błąd połączenia z bazą danych"]);
    exit();
}

$eData = json_decode(file_get_contents("php://input"), true);
$id = $eData['id'];
$title = $eData['title'];
$description = $eData['description'];
$date = $eData['date'];
$time = $eData['time'];
$location = $eData['location'];

$sql = "UPDATE meetings SET title=?, description=?, date=?, time=?, location=? WHERE id=?";
$stmt = $con->prepare($sql);
$stmt->bind_param("sssssi", $title, $description, $date, $time, $location, $id);

if ($stmt->execute()) {
    echo json_encode(["message" => "Spotkanie zaktualizowane"]);
} else {
    echo json_encode(["error" => "Błąd aktualizacji"]);
}

$stmt->close();
$con->close();
?>
