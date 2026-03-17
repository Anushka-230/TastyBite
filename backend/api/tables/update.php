<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Table.php';

$database = new Database();
$db = $database->connect();

$table = new Table($db);

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->id) && !empty($data->status)) {
    $table->id = $data->id;
    $table->status = $data->status;
    
    if($table->update_status()) {
        echo json_encode(array('message' => 'Table Status Updated'));
    } else {
        echo json_encode(array('message' => 'Table Status Not Updated'));
    }
} else {
    echo json_encode(array('message' => 'Missing Data'));
}
?>
