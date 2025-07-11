<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
include "../db/Database.php";
$database = new Database();
$conn = $database->getConnection();

$data = json_decode(file_get_contents("php://input"), true);

$pengguna_id = $data['pengguna_id'] ?? 0;
$tanggal = $data['tanggal'] ?? '';
$kegiatan = $data['kegiatan'] ?? '';
$kuantitas = $data['kuantitas'] ?? 0;
$satuan = $data['satuan'] ?? '';
$keterangan = $data['keterangan'] ?? '';

if ($pengguna_id && $tanggal && $kegiatan && $kuantitas > 0 && $satuan) {
    try {
        // 1. Insert ke tabel jurnal
        $sqlJurnal = "INSERT INTO jurnal (pengguna_id, tanggal, keterangan) VALUES (?, ?, ?)";
        $stmtJurnal = $conn->prepare($sqlJurnal);
        $stmtJurnal->execute([$pengguna_id, $tanggal, $keterangan]);
        $jurnal_id = $conn->lastInsertId();

        // 2. Cari id kegiatan dari tabel kegiatan (atau insert jika belum ada)
        $sqlKegiatan = "SELECT id FROM kegiatan WHERE nama = ? AND satuan = ? AND pengguna_id = ?";
        $stmtKegiatan = $conn->prepare($sqlKegiatan);
        $stmtKegiatan->execute([$kegiatan, $satuan, $pengguna_id]);
        $rowKegiatan = $stmtKegiatan->fetch(PDO::FETCH_ASSOC);

        if ($rowKegiatan) {
            $kegiatan_id = $rowKegiatan['id'];
        } else {
            // Insert kegiatan baru
            $sqlInsertKegiatan = "INSERT INTO kegiatan (nama, satuan, pengguna_id) VALUES (?, ?, ?)";
            $stmtInsertKegiatan = $conn->prepare($sqlInsertKegiatan);
            $stmtInsertKegiatan->execute([$kegiatan, $satuan, $pengguna_id]);
            $kegiatan_id = $conn->lastInsertId();
        }

        // 3. Insert ke tabel jurnal_kegiatan
        $sqlJurnalKegiatan = "INSERT INTO jurnal_kegiatan (jurnal_id, kegiatan_id, kuantitas) VALUES (?, ?, ?)";
        $stmtJurnalKegiatan = $conn->prepare($sqlJurnalKegiatan);
        $stmtJurnalKegiatan->execute([$jurnal_id, $kegiatan_id, $kuantitas]);

        echo json_encode(["success" => true]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "Query error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Data tidak lengkap"]);
}
?>