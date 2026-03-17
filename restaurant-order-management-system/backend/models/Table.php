<?php
class Table {
    private $conn;
    private $table_name = 'restaurant_tables';

    public $id;
    public $table_number;
    public $seats;
    public $status;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function read() {
        $query = 'SELECT * FROM ' . $this->table_name . ' ORDER BY table_number ASC';
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function update_status() {
        $query = 'UPDATE ' . $this->table_name . ' SET status = :status WHERE id = :id';
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':id', $this->id);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>
