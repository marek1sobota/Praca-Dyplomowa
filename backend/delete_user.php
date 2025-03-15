<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
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

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data["id"])) {
        echo json_encode(["success" => false, "error" => "Brak ID użytkownika"]);
        exit();
    }

    $id = $data["id"];

    $query = "DELETE FROM users WHERE id=?";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => "Błąd usuwania użytkownika"]);
    }

    $stmt->close();
    $mysqli->close();
}
?>
