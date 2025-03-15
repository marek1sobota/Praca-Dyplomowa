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
    echo json_encode(["error" => "Błąd połączenia z bazą danych"]);
    exit();
}

$tytul = $_POST["tytul"];
$liczba_graczy = $_POST["liczba_graczy"];
$czas_gry = $_POST["czas_gry"];
$trudnosc = $_POST["trudnosc"];
$wiek_PEGI = $_POST["wiek_PEGI"];
$opis = isset($_POST["opis"]) ? $_POST["opis"] : NULL; 

// Obsługa obrazu
if (isset($_FILES["obraz"])) {
    $imageName = uniqid() . "_" . basename($_FILES["obraz"]["name"]);
    $targetFilePath = $targetDir . $imageName;
    $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);

    $allowTypes = array("jpg", "jpeg", "png", "gif", "webp");
    if (in_array(strtolower($fileType), $allowTypes)) {
        if (move_uploaded_file($_FILES["obraz"]["tmp_name"], $targetFilePath)) {
            $obraz_url = "http://localhost/backend/" . $targetFilePath;
        } else {
            echo json_encode(["error" => "Błąd przesyłania pliku"]);
            exit();
        }
    } else {
        echo json_encode(["error" => "Nieobsługiwany format obrazu"]);
        exit();
    }
} else {
    echo json_encode(["error" => "Brak obrazu"]);
    exit();
}

// Wstawienie danych do bazy
$stmt = $con->prepare("INSERT INTO games (tytul, liczba_graczy, czas_gry, trudnosc, wiek_PEGI, obraz_url, opis) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssissss", $tytul, $liczba_graczy, $czas_gry, $trudnosc, $wiek_PEGI, $obraz_url, $opis);

if ($stmt->execute()) {
    echo json_encode(["message" => "Gra dodana!"]);
} else {
    echo json_encode(["error" => "Błąd dodawania gry"]);
}

$stmt->close();
$con->close();
?>
