<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$mysqli = new mysqli("localhost", "root", "", "boardgames");

if ($mysqli->connect_error) {
    die(json_encode(["success" => false, "error" => "Błąd połączenia z bazą"]));
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST["id"];
    $title = $_POST["title"];
    $description = $_POST["description"];

    if (!$id || !$title || !$description) {
        echo json_encode(["success" => false, "error" => "Brak wymaganych danych"]);
        exit();
    }

    $query = "UPDATE news SET title=?, description=? WHERE id=?";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("ssi", $title, $description, $id);
    
    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => "Błąd edycji"]);
    }

    $stmt->close();
    $mysqli->close();
}
?>
