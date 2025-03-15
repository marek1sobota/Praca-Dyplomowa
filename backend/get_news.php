<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$mysqli = new mysqli("localhost", "root", "", "boardgames");

if ($mysqli->connect_error) {
    die(json_encode(["success" => false, "error" => "Błąd połączenia z bazą"]));
}

$query = "SELECT id, title, description, image_url FROM news ORDER BY id DESC";
$result = $mysqli->query($query);

$news = [];
while ($row = $result->fetch_assoc()) {
    $news[] = $row;
}

echo json_encode($news);
$mysqli->close();
?>
