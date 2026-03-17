<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';

$database = new Database();
$db = $database->connect();

$data = json_decode(file_get_contents("php://input"));

if(
    !empty($data->table_id) &&
    !empty($data->waiter) &&
    !empty($data->subtotal) &&
    isset($data->tax) &&
    !empty($data->total) &&
    !empty($data->items) &&
    is_array($data->items)
) {
    try {
        // Begin Transaction
        $db->beginTransaction();

        $order_id = 'ORD-' . strtoupper(uniqid());

        // 1. Insert Order
        $query = "INSERT INTO orders 
                  SET id = :id, table_id = :table_id, waiter = :waiter, 
                      subtotal = :subtotal, tax = :tax, total = :total, status = 'Preparing'";
        
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $order_id);
        $stmt->bindParam(':table_id', $data->table_id);
        $stmt->bindParam(':waiter', $data->waiter);
        $stmt->bindParam(':subtotal', $data->subtotal);
        $stmt->bindParam(':tax', $data->tax);
        $stmt->bindParam(':total', $data->total);
        
        $stmt->execute();

        // 2. Insert Order Items
        $query_items = "INSERT INTO order_items (order_id, menu_item_id, quantity, note) 
                        VALUES (:order_id, :menu_item_id, :quantity, :note)";
        $stmt_items = $db->prepare($query_items);
        
        foreach($data->items as $item) {
            $note = isset($item->note) ? $item->note : null;
            
            $stmt_items->bindParam(':order_id', $order_id);
            $stmt_items->bindParam(':menu_item_id', $item->id);
            $stmt_items->bindParam(':quantity', $item->quantity);
            $stmt_items->bindParam(':note', $note);
            
            $stmt_items->execute();
        }

        // Commit Transaction
        $db->commit();

        echo json_encode(array(
            'message' => 'Order Created', 
            'id' => $order_id
        ));

    } catch(Exception $e) {
        $db->rollBack();
        echo json_encode(array('message' => 'Order Not Created', 'error' => $e->getMessage()));
    }
} else {
    echo json_encode(array('message' => 'Incomplete Data'));
}
?>
