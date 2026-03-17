<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Order.php';

$database = new Database();
$db = $database->connect();

$order = new Order($db);

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->id) && !empty($data->status)) {
    $order->id = $data->id;
    $order->status = $data->status;
    
    if($order->update_status()) {
        echo json_encode(array('message' => 'Order Status Updated'));
    } else {
        echo json_encode(array('message' => 'Order Status Not Updated'));
    }
} else {
    echo json_encode(array('message' => 'Missing Data'));
}
?>
