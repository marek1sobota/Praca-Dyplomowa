<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

require_once 'db_connect.php';
$con = $conn;

if ($con->connect_error) {
    die(json_encode(["error" => "Błąd połączenia z bazą danych"]));
}

$sql = "SELECT meetings.*, users.username AS organizer FROM meetings 
        JOIN users ON meetings.organizer_id = users.id 
        ORDER BY date ASC, time ASC";

$result = $con->query($sql);
$meetings = [];

while ($row = $result->fetch_assoc()) {
    $row['organizer_id'] = (int) $row['organizer_id']; 
    $meetings[] = $row;
}

echo json_encode($meetings);
$con->close();
?>
