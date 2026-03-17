<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/InventoryItem.php';

$database = new Database();
$db = $database->connect();

$inv = new InventoryItem($db);

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->id)) {
    $inv->id = $data->id;
    
    if($inv->delete()) {
        echo json_encode(array('message' => 'Item Deleted'));
    } else {
        echo json_encode(array('message' => 'Item Not Deleted'));
    }
} else {
    echo json_encode(array('message' => 'Missing ID'));
}
?>
