<?php
class Order {
    private $conn;
    private $table = 'orders';

    public $id;
    public $table_id;
    public $waiter;
    public $status;
    public $subtotal;
    public $tax;
    public $total;
    public $created_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function read() {
        $query = 'SELECT 
                    o.id,
                    o.table_id,
                    t.table_number as table_name,
                    o.waiter,
                    o.status,
                    o.subtotal,
                    o.tax,
                    o.total,
                    o.created_at,
                    (SELECT COUNT(*) FROM order_items oi WHERE oi.order_id = o.id) as items_count
                  FROM ' . $this->table . ' o
                  LEFT JOIN restaurant_tables t ON o.table_id = t.id
                  ORDER BY o.created_at DESC';
                  
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function read_items($order_id) {
         $query = 'SELECT 
                    oi.id,
                    oi.quantity,
                    oi.note,
                    m.name,
                    m.price
                  FROM order_items oi
                  LEFT JOIN menu_items m ON oi.menu_item_id = m.id
                  WHERE oi.order_id = :order_id';
                  
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':order_id', $order_id);
        $stmt->execute();
        return $stmt;
    }

    public function update_status() {
         $query = 'UPDATE ' . $this->table . ' 
            SET status = :status 
            WHERE id = :id';
        
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
