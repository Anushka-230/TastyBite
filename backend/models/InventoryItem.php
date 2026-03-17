<?php
class InventoryItem {
    private $conn;
    private $table = 'inventory_items';

    public $id;
    public $name;
    public $category;
    public $quantity;
    public $unit;
    public $min_qty;
    public $status;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function read() {
        $query = 'SELECT * FROM ' . $this->table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function create() {
        $query = 'INSERT INTO ' . $this->table . ' 
            SET name = :name, category = :category, quantity = :quantity, 
                unit = :unit, min_qty = :min_qty, status = :status';
        
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':category', $this->category);
        $stmt->bindParam(':quantity', $this->quantity);
        $stmt->bindParam(':unit', $this->unit);
        $stmt->bindParam(':min_qty', $this->min_qty);
        $stmt->bindParam(':status', $this->status);

        if($stmt->execute()) {
            // Also return the inserted ID
            $this->id = $this->conn->lastInsertId();
            return true;
        }
        return false;
    }

    public function update() {
        $query = 'UPDATE ' . $this->table . ' 
            SET name = :name, category = :category, quantity = :quantity, 
                unit = :unit, min_qty = :min_qty, status = :status 
            WHERE id = :id';
        
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':category', $this->category);
        $stmt->bindParam(':quantity', $this->quantity);
        $stmt->bindParam(':unit', $this->unit);
        $stmt->bindParam(':min_qty', $this->min_qty);
        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':id', $this->id);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function delete() {
        $query = 'DELETE FROM ' . $this->table . ' WHERE id = :id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->id);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>
