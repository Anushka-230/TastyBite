<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Order.php';

$database = new Database();
$db = $database->connect();

$order = new Order($db);
$result = $order->read();
$num = $result->rowCount();

if($num > 0) {
    $orders_arr = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $order_item = array(
            'id' => $id,
            'table' => "Table " . $table_name,
            'waiter' => $waiter,
            'status' => $status,
            'amount' => (float)$total,
            'subtotal' => (float)$subtotal,
            'tax' => (float)$tax,
            'date' => date('n/j/Y', strtotime($created_at)),
            'time' => date('g:i:s A', strtotime($created_at)),
            'items' => (int)$items_count,
            'itemsDetail' => array()
        );

        // Fetch detail items for invoice/kitchen
        $items_result = $order->read_items($id);
        while($item_row = $items_result->fetch(PDO::FETCH_ASSOC)) {
             array_push($order_item['itemsDetail'], array(
                 'name' => $item_row['name'],
                 'quantity' => (int)$item_row['quantity'],
                 'price' => (float)$item_row['price'],
                 'note' => $item_row['note']
             ));
        }

        array_push($orders_arr, $order_item);
    }

    echo json_encode($orders_arr);
} else {
    echo json_encode(array());
}
?>
