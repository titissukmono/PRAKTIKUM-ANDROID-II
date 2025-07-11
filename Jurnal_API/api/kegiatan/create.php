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

$sql = "INSERT INTO kegiatan SET nama=?, satuan=?, pengguna_id=?";
$statement = $connection->prepare($sql);
$statement->bindParam(1, $posted_data->nama);
$statement->bindParam(2, $posted_data->satuan);
$statement->bindParam(3, $posted_data->pengguna_id);
$statement->execute();

$id = $connection->lastInsertId();
$sql = "SELECT * FROM kegiatan WHERE id=?";
$statement = $connection->prepare($sql);
$statement->bindParam(1, $id);
$statement->execute();
$num = $statement->rowCount();
if ($num > 0) {
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $item = array(
            "id" => $row['id'],
            "nama" => $row['nama'],
            "satuan" => $row['satuan'],
            "pengguna_id" => $row['pengguna_id'],
        );
        array_push($response["data"], $item);
    }
    $response["message"] = "Berhasil create kegiatan";
    $response["success"] = true;
} else {
    $response["message"] = "Data kosong";
}

echo json_encode($response);
?>