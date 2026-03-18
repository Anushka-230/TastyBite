<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/User.php';

$database = new Database();
$db = $database->connect();

$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

if(
    !empty($data->name) &&
    !empty($data->email) &&
    !empty($data->password) &&
    !empty($data->role) &&
    isset($data->age) &&
    !empty($data->date_of_joining) &&
    isset($data->salary)
) {
    $user->name = $data->name;
    $user->email = $data->email;
    $user->password = password_hash($data->password, PASSWORD_DEFAULT);
    $user->role = $data->role;
    $user->age = $data->age;
    $user->date_of_joining = $data->date_of_joining;
    $user->salary = $data->salary;

    if($user->create()) {
        echo json_encode(array('message' => 'User Created', 'id' => $user->id));
    } else {
        echo json_encode(array('message' => 'User Not Created'));
    }
} else {
    echo json_encode(array('message' => 'Incomplete Data'));
}
?>