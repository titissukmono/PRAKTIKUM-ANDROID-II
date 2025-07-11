<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Koneksi ke database
include "../db/Database.php";
$database = new Database();
$conn = $database->getConnection();

// Cek koneksi (PDO akan throw exception jika gagal, jadi tidak perlu cek $conn->connect_error)

// Ambil user_id dari parameter GET
$user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;
if ($user_id === 0) {
    echo json_encode(["success" => false, "message" => "Parameter user_id diperlukan"]);
    exit();
}

try {
    // Query data pengingat
    $sql = "SELECT id, pengguna_id, pesan, waktu, status FROM pengingat WHERE pengguna_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$user_id]);
    $reminders = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($reminders);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Query error: " . $e->getMessage()]);
}
?>