<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/InventoryItem.php';

$database = new Database();
$db = $database->connect();

$inv = new InventoryItem($db);

$data = json_decode(file_get_contents("php://input"));

if(
    !empty($data->name) &&
    !empty($data->category) &&
    isset($data->quantity) &&
    !empty($data->unit) &&
    isset($data->minQty)
) {
    $inv->name = $data->name;
    $inv->category = $data->category;
    $inv->quantity = $data->quantity;
    $inv->unit = $data->unit;
    $inv->min_qty = $data->minQty;
    
    // Auto calculate status
    if ($inv->quantity <= $inv->min_qty / 2) {
        $inv->status = "Critical";
    } else if ($inv->quantity <= $inv->min_qty) {
        $inv->status = "Low";
    } else {
        $inv->status = "Good";
    }
    
    if($inv->create()) {
        echo json_encode(array('message' => 'Item Created', 'id' => $inv->id, 'status' => $inv->status));
    } else {
        echo json_encode(array('message' => 'Item Not Created'));
    }
} else {
    echo json_encode(array('message' => 'Incomplete Data'));
}
?>
