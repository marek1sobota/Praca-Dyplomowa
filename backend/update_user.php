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

    if (!isset($data["id"], $data["username"], $data["role"])) {
        echo json_encode(["success" => false, "error" => "Brak wymaganych danych"]);
        exit();
    }

    $id = $data["id"];
    $username = $mysqli->real_escape_string($data["username"]);
    $role = $mysqli->real_escape_string($data["role"]);
    $badges = isset($data["badges"]) ? $mysqli->real_escape_string($data["badges"]) : "";

    $query = "UPDATE users SET username=?, role=?, badges=? WHERE id=?";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("sssi", $username, $role, $badges, $id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => "Błąd aktualizacji"]);
    }

    $stmt->close();
    $mysqli->close();
}
?>
