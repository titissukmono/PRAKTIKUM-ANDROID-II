<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
include "../db/Database.php";
$database = new Database();
$conn = $database->getConnection();

$data = json_decode(file_get_contents("php://input"), true);
$pengguna_id = $data['pengguna_id'] ?? 0;
$pesan = $data['pesan'] ?? '';
$waktu = $data['waktu'] ?? '';
$status = $data['status'] ?? 'aktif';

if ($pengguna_id && $pesan && $waktu) {
    $sql = "INSERT INTO pengingat (pengguna_id, pesan, waktu, status) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $result = $stmt->execute([$pengguna_id, $pesan, $waktu, $status]);
    echo json_encode(["success" => $result]);
} else {
    echo json_encode(["success" => false, "message" => "Data tidak lengkap"]);
}
?>