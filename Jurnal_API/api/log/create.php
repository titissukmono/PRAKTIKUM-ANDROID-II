<?php
include "../db/Database.php";
$database = new Database();
$conn = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));
$sql = "INSERT INTO log_aktivitas (pengguna_id, aktivitas) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->execute([$data->pengguna_id, $data->aktivitas]);
echo json_encode(["success" => true, "message" => "Log ditambahkan"]);
?>