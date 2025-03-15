<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'db_connect.php';

$targetDir = "obrazy/"; 

$con = $conn;
if (mysqli_connect_errno()) {
    echo json_encode(["error" => "Błąd połączenia z bazą danych"]);
    exit();
}

if (!isset($_POST["id"], $_POST["tytul"], $_POST["liczba_graczy"], $_POST["czas_gry"], $_POST["trudnosc"], $_POST["wiek_PEGI"], $_POST["opis"])) {
    echo json_encode(["error" => "Brak wymaganych danych"]);
    exit();
}

$id = intval($_POST["id"]);
$tytul = $_POST["tytul"];
$liczba_graczy = $_POST["liczba_graczy"];
$czas_gry = intval($_POST["czas_gry"]);
$trudnosc = $_POST["trudnosc"];
$wiek_PEGI = intval($_POST["wiek_PEGI"]);
$opis = $_POST["opis"];

// Sprawdzenie, czy gra istnieje
$sqlCheck = "SELECT obraz_url FROM games WHERE id = ?";
$stmtCheck = $con->prepare($sqlCheck);
$stmtCheck->bind_param("i", $id);
$stmtCheck->execute();
$result = $stmtCheck->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["error" => "Gra o podanym ID nie istnieje"]);
    exit();
}

$row = $result->fetch_assoc();
$obraz_url = $row["obraz_url"];

// Obsługa nowego obrazu (opcjonalnie)
if (isset($_FILES["obraz"]) && $_FILES["obraz"]["size"] > 0) {
    $imageName = uniqid() . "_" . basename($_FILES["obraz"]["name"]);
    $targetFilePath = $targetDir . $imageName;
    $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);

    $allowTypes = array("jpg", "jpeg", "png", "gif", "webp");
    if (in_array(strtolower($fileType), $allowTypes)) {
        if (move_uploaded_file($_FILES["obraz"]["tmp_name"], $targetFilePath)) {
            $obraz_url = "http://localhost/backend/" . $targetFilePath;
        } else {
            echo json_encode(["error" => "Błąd przesyłania nowego obrazu"]);
            exit();
        }
    } else {
        echo json_encode(["error" => "Nieobsługiwany format obrazu"]);
        exit();
    }
}

// Aktualizacja gry w bazie danych
$sqlUpdate = "UPDATE games SET tytul=?, liczba_graczy=?, czas_gry=?, trudnosc=?, wiek_PEGI=?, obraz_url=?, opis=? WHERE id=?";
$stmtUpdate = $con->prepare($sqlUpdate);
$stmtUpdate->bind_param("ssissssi", $tytul, $liczba_graczy, $czas_gry, $trudnosc, $wiek_PEGI, $obraz_url, $opis, $id);

if ($stmtUpdate->execute()) {
    echo json_encode(["message" => "Gra zaktualizowana pomyślnie"]);
} else {
    echo json_encode(["error" => "Błąd aktualizacji gry"]);
}

$stmtCheck->close();
$stmtUpdate->close();
$con->close();
?>
