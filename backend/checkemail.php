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

$email = $eData['email'];
$result = "";

if ($email != "") {
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($res->num_rows != 0) {
        $result = "Konto z tym emailem już istnieje!";
    } else {
        $result = "";
    }
    $stmt->close();
} else {
    $result = "";
}

$con->close();
$response[] = array("result" => $result);
echo json_encode($response);
?>