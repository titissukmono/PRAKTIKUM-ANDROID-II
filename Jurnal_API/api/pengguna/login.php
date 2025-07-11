<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "../db/Database.php";

$database = new Database();
$connection = $database->getConnection();

$response["success"] = false;
$response["message"] = "";
$response["data"] = array();

$posted_data = json_decode(file_get_contents("php://input"));

$sql = "SELECT * FROM pengguna WHERE email = ? AND password = MD5(?)";
$statement = $connection->prepare($sql);
$statement->bindParam(1, $posted_data->email);
$statement->bindParam(2, $posted_data->password);
$statement->execute();

$num = $statement->rowCount();
if ($num > 0) {
    $row = $statement->fetch(PDO::FETCH_ASSOC);
    $response["data"] = md5($row['id']);
    $response["user_id"] = $row['id']; // <-- Tambahkan baris ini
    $response["message"] = "Berhasil Login";
    $response["success"] = true;
} else {
    $response["message"] = "Email/password salah";
}

echo json_encode($response);
