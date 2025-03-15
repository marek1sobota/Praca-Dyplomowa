<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$mysqli = new mysqli("localhost", "root", "", "boardgames");

if ($mysqli->connect_error) {
    die(json_encode(["error" => "Błąd połączenia z bazą danych"]));
}

$username = $_GET["username"];
$query = "SELECT badges FROM users WHERE username = ?";
$stmt = $mysqli->prepare($query);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user) {
    echo json_encode(["badges" => $user["badges"]]);
} else {
    echo json_encode(["badges" => ""]);
}

$stmt->close();
$mysqli->close();
?>
