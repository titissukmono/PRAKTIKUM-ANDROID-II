<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
include "../db/Database.php";

$database = new Database();
$connection = $database->getConnection();

$response["success"] = false;
$response["message"] = "";
$response["data"] = array();

// Ambil user_id dari query string
$user_id = isset($_GET['user_id']) ? $_GET['user_id'] : null;

if (!$user_id) {
    $response["message"] = "User ID tidak ditemukan";
    echo json_encode($response);
    exit;
}

// Query join tabel jurnal, jurnal_kegiatan, kegiatan, filter berdasarkan user
$sql = "SELECT 
            j.tanggal, 
            k.nama AS kegiatan, 
            k.satuan, 
            jk.kuantitas, 
            j.keterangan,
            p.nama AS nama_user
        FROM jurnal j
        JOIN jurnal_kegiatan jk ON jk.jurnal_id = j.id
        JOIN kegiatan k ON jk.kegiatan_id = k.id
        JOIN pengguna p ON j.pengguna_id = p.id
        WHERE j.pengguna_id = :user_id
        ORDER BY j.tanggal DESC";

$statement = $connection->prepare($sql);
$statement->bindParam(':user_id', $user_id, PDO::PARAM_INT);
$statement->execute();
$num = $statement->rowCount();

if ($num > 0) {
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $item = array(
            "tanggal" => $row['tanggal'],
            "kegiatan" => $row['kegiatan'],
            "satuan" => $row['satuan'],
            "kuantitas" => (int) $row['kuantitas'],
            "keterangan" => $row['keterangan'],
            "nama_user" => $row['nama_user'],
        );
        array_push($response["data"], $item);
    }
    $response["message"] = "Berhasil read jurnal";
    $response["success"] = true;
} else {
    $response["message"] = "Data kosong";
}

echo json_encode($response);
?>