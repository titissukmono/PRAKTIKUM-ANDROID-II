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

$sql = "SELECT * FROM pengguna WHERE MD5(id) = ?";
$statement = $connection->prepare($sql);
$statement->bindParam(1, $posted_data->token);
$statement->execute();

$num = $statement->rowCount();
if ($num > 0) {
    $row = $statement->fetch(PDO::FETCH_ASSOC);
    $response["data"] = $row;
    $response["message"] = "Berhasil ambil token";
    $response["success"] = true;
} else {
    $response["message"] = "Gagal ambil token";
}

echo json_encode($response);
