<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Obsługa preflight request (CORS)
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

$mysqli = new mysqli("localhost", "root", "", "boardgames");

if ($mysqli->connect_error) {
    die(json_encode(["success" => false, "error" => "Błąd połączenia z bazą"]));
}

$query = "SELECT id, username, email, role, badges FROM users ORDER BY id ASC";
$result = $mysqli->query($query);

$users = [];
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

echo json_encode($users);
$mysqli->close();
?>
