<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/MenuItem.php';

// Instantiate DB & connect
$database = new Database();
$db = $database->connect();

// Instantiate menu object
$menu = new MenuItem($db);

// Menu read query
$result = $menu->read();
$num = $result->rowCount();

if($num > 0) {
    $menu_arr = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $menu_item = array(
            'id' => $id,
            'name' => $name,
            'category' => $category,
            'price' => (float)$price,
            'prepTime' => $prep_time,
            'description' => html_entity_decode($description),
            'dietary' => $dietary,
            'available' => (bool)$available,
            'image' => $image
        );

        array_push($menu_arr, $menu_item);
    }

    echo json_encode($menu_arr);
} else {
    echo json_encode(array());
}
?>
