<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'db_connect.php'; 

$targetDir = "obrazy/";
if (!file_exists($targetDir)) {
    mkdir($targetDir, 0777, true);
}

$con = $conn; 

if (mysqli_connect_errno()) {
    echo json_encode(["success" => false, "error" => "Błąd połączenia z bazą danych"]);
    exit();
}

if (!isset($_POST["title"]) || !isset($_POST["description"])) {
    echo json_encode(["success" => false, "error" => "Brak wymaganych danych"]);
    exit();
}

$title = $_POST["title"];
$description = $_POST["description"];
$image_url = "";

if (isset($_FILES["image"])) {
    $imageName = uniqid() . "_" . basename($_FILES["image"]["name"]);
    $targetFilePath = $targetDir . $imageName;
    $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);

    $allowTypes = array("jpg", "jpeg", "png", "gif", "webp");
    if (in_array(strtolower($fileType), $allowTypes)) {
        if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFilePath)) {
            $image_url = "http://localhost/backend/" . $targetFilePath;
        } else {
            echo json_encode(["success" => false, "error" => "Błąd przesyłania pliku"]);
            exit();
        }
    } else {
        echo json_encode(["success" => false, "error" => "Nieobsługiwany format obrazu"]);
        exit();
    }
} else {
    echo json_encode(["success" => false, "error" => "Brak obrazu"]);
    exit();
}

$stmt = $con->prepare("INSERT INTO news (title, description, image_url) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $title, $description, $image_url);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Nowość dodana!"]);
} else {
    echo json_encode(["success" => false, "error" => "Błąd dodawania nowości"]);
}

$stmt->close();
$con->close();
?>
