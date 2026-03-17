<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Table.php';

$database = new Database();
$db = $database->connect();

$table = new Table($db);
$result = $table->read();
$num = $result->rowCount();

if($num > 0) {
    $table_arr = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $table_item = array(
            'id' => $id,
            'number' => (int)$table_number,
            'seats' => (int)$seats,
            'status' => $status
        );

        array_push($table_arr, $table_item);
    }

    echo json_encode($table_arr);
} else {
    echo json_encode(array());
}
?>
