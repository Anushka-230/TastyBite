<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/User.php';

$database = new Database();
$db = $database->connect();

$user = new User($db);

$result = $user->read();
$num = $result->rowCount();

if($num > 0) {
    $users_arr = array();
    $users_arr['data'] = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $user_item = array(
            'id' => $id,
            'name' => $name,
            'email' => $email,
            'role' => $role,
            'age' => $age,
            'date_of_joining' => $date_of_joining,
            'salary' => $salary,
            'created_at' => $created_at
        );

        array_push($users_arr['data'], $user_item);
    }

    echo json_encode($users_arr);
} else {
    echo json_encode(array('message' => 'No Users Found'));
}
?>