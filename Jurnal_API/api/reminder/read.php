<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
include "../db/Database.php";
$database = new Database();
$conn = $database->getConnection();

$user_id = $_GET['user_id'];
$sql = "SELECT * FROM pengingat WHERE pengguna_id = ? ORDER BY waktu ASC";
$stmt = $conn->prepare($sql);
$stmt->execute([$user_id]);
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode(["success" => true, "data" => $data]);
?>