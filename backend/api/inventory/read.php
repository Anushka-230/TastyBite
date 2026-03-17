<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/InventoryItem.php';

// Instantiate DB & connect
$database = new Database();
$db = $database->connect();

$inventory = new InventoryItem($db);
$result = $inventory->read();
$num = $result->rowCount();

if($num > 0) {
    $inv_arr = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $item = array(
            'id' => (string)$id,
            'name' => $name,
            'category' => $category,
            'quantity' => (int)$quantity,
            'unit' => $unit,
            'minQty' => (int)$min_qty,
            'status' => $status
        );

        array_push($inv_arr, $item);
    }

    echo json_encode($inv_arr);
} else {
    echo json_encode(array());
}
?>
