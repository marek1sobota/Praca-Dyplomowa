<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'db_connect.php'; 

$con = $conn; 
if ($con->connect_error) {
    die(json_encode(["error" => "Błąd połączenia z bazą danych"]));
}

$data = json_decode(file_get_contents("php://input"), true);

// Sprawdzenie, czy użytkownik jest zalogowany
if (!isset($data["organizer_id"]) || empty($data["organizer_id"])) {
    echo json_encode(["error" => "Nie jesteś zalogowany! Zaloguj się, aby dodać spotkanie."]);
    exit();
}

// Sprawdzenie wymaganych pól
if (!isset($data["title"], $data["description"], $data["date"], $data["time"], $data["location"])) {
    echo json_encode(["error" => "Brak wymaganych danych"]);
    exit();
}

$title = $con->real_escape_string($data["title"]);
$description = $con->real_escape_string($data["description"]);
$date = $con->real_escape_string($data["date"]);
$time = $con->real_escape_string($data["time"]);
$location = $con->real_escape_string($data["location"]);
$organizer_id = (int) $data["organizer_id"];

// Wstawienie danych do bazy
$sql = "INSERT INTO meetings (title, description, date, time, location, organizer_id) 
        VALUES ('$title', '$description', '$date', '$time', '$location', $organizer_id)";

if ($con->query($sql) === TRUE) {
    echo json_encode(["message" => "Spotkanie dodane pomyślnie"]);
} else {
    echo json_encode(["error" => "Błąd dodawania spotkania"]);
}

$con->close();
?> 