<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'db_connect.php';
$con = $conn;

if (mysqli_connect_errno()) {
    echo json_encode(["error" => "Błąd połączenia z bazą danych"]);
    exit();
}

$sql = "SELECT id, tytul, liczba_graczy, czas_gry, trudnosc, wiek_PEGI, obraz_url, opis FROM games ORDER BY tytul ASC";
$result = $con->query($sql);

$games = [];
while ($row = $result->fetch_assoc()) {
    $games[] = $row;
}

echo json_encode($games);
$con->close();
?>
