<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/MenuItem.php';

$database = new Database();
$db = $database->connect();

$menu = new MenuItem($db);

// Get raw posted data
$data = json_decode(file_get_contents("php://input"));

if(
    !empty($data->name) &&
    !empty($data->category) &&
    !empty($data->price) &&
    !empty($data->prepTime) &&
    !empty($data->description)
) {
    $menu->id = uniqid('m_');
    $menu->name = $data->name;
    $menu->category = $data->category;
    $menu->price = $data->price;
    $menu->prep_time = $data->prepTime;
    $menu->description = $data->description;
    $menu->dietary = $data->dietary;
    $menu->available = isset($data->available) ? $data->available : 1;
    $menu->image = isset($data->image) ? $data->image : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2000&auto=format&fit=crop';
    
    if($menu->create()) {
        echo json_encode(array('message' => 'Menu Item Created', 'id' => $menu->id));
    } else {
        echo json_encode(array('message' => 'Menu Item Not Created'));
    }
} else {
    echo json_encode(array('message' => 'Incomplete Data'));
}
?>
