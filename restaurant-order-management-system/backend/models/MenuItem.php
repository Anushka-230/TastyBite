<?php
class MenuItem {
    private $conn;
    private $table = 'menu_items';

    public $id;
    public $name;
    public $category;
    public $price;
    public $prep_time;
    public $description;
    public $dietary;
    public $available;
    public $image;

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
            SET id = :id, name = :name, category = :category, price = :price, 
                prep_time = :prep_time, description = :description, 
                dietary = :dietary, available = :available, image = :image';
        
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':category', $this->category);
        $stmt->bindParam(':price', $this->price);
        $stmt->bindParam(':prep_time', $this->prep_time);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':dietary', $this->dietary);
        $stmt->bindParam(':available', $this->available);
        $stmt->bindParam(':image', $this->image);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function update() {
        $query = 'UPDATE ' . $this->table . ' 
            SET name = :name, category = :category, price = :price, 
                prep_time = :prep_time, description = :description, 
                dietary = :dietary, available = :available, image = :image 
            WHERE id = :id';
        
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':category', $this->category);
        $stmt->bindParam(':price', $this->price);
        $stmt->bindParam(':prep_time', $this->prep_time);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':dietary', $this->dietary);
        $stmt->bindParam(':available', $this->available);
        $stmt->bindParam(':image', $this->image);
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
