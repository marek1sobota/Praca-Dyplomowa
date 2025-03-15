<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type"); 
header("Content-Type: application/json"); 

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
require_once 'db_connect.php';
$con = $conn; 
if (mysqli_connect_errno()) {
    echo json_encode([["result" => "Failed to connect to MySQL: " . mysqli_connect_error()]]); 
    exit();
}

$eData = file_get_contents('php://input');
$eData = json_decode($eData, true);

$username = $eData['username'];
$password = $eData['password'];
$result = "";
$role = "user"; 

if (!empty($username) && !empty($password)) {
    $sql = "SELECT id, username, password, role FROM users WHERE username = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($res->num_rows > 0) {
        $row = $res->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            $result = "Logowanie zakończone sukcesem!";
            $role = $row['role']; 
            $user_id = $row['id']; 
        } else {
            $result = "Nieprawidłowe hasło!";
        }
    } else {
        $result = "Użytkownik nie istnieje!";
    }
    $stmt->close();
} else {
    $result = "Wypełnij wszystkie pola!";
}

$con->close();

$response[] = array("result" => $result, "role" => $role, "user_id" => $user_id ?? null);
echo json_encode($response);
?>
