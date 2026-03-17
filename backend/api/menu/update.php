<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/MenuItem.php';

$database = new Database();
$db = $database->connect();

$menu = new MenuItem($db);

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->id)) {
    $menu->id = $data->id;
    $menu->name = $data->name;
    $menu->category = $data->category;
    $menu->price = $data->price;
    $menu->prep_time = $data->prepTime;
    $menu->description = $data->description;
    $menu->dietary = $data->dietary;
    $menu->available = $data->available;
    $menu->image = $data->image;
    
    if($menu->update()) {
        echo json_encode(array('message' => 'Menu Item Updated'));
    } else {
        echo json_encode(array('message' => 'Menu Item Not Updated'));
    }
} else {
    echo json_encode(array('message' => 'Missing ID'));
}
?>
