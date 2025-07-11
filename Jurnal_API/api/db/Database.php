<?php
class Database
{
    public $connection;
    public $host = "localhost";
    public $dbname = "jurnal_harian";
    public $username = "root";
    public $password = "";

    public function getConnection()
    {
        try {
            $this->connection = new PDO(
                "mysql:host=" . $this->host
                . ";dbname=" . $this->dbname,
                $this->username,
                $this->password
            );
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
        return $this->connection;
    }
}
?>