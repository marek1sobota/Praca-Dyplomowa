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
echo json_encode([["result" => "Failed to connect to MySQL: " . mysqli_connect_error()]]);
exit();
}

$eData = file_get_contents('php://input');
$eData = json_decode($eData, true);

$username = $eData['username'];
$password = $eData['password'];
$email = $eData['email'];
$result = "";

if ($username != "" && $password != "" && $email != "") {

$hashed_password = password_hash($password, PASSWORD_BCRYPT);


$sql = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
$stmt = $con->prepare($sql);
$stmt->bind_param("sss", $username, $hashed_password, $email);

if ($stmt->execute()) {
    $result = "Zarejestrowano pomyślnie!";
} else {
    $result = "Błąd rejestracji!";
}
$stmt->close();
} else {
$result = "Wypełnij wszystkie pola!";
}

$con->close();
$response[] = array("result" => $result);
echo json_encode($response);
?>