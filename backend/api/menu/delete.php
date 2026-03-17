<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/MenuItem.php';

$database = new Database();
$db = $database->connect();

$menu = new MenuItem($db);

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->id)) {
    $menu->id = $data->id;
    
    if($menu->delete()) {
        echo json_encode(array('message' => 'Menu Item Deleted'));
    } else {
        echo json_encode(array('message' => 'Menu Item Not Deleted'));
    }
} else {
    echo json_encode(array('message' => 'Missing ID'));
}
?>
