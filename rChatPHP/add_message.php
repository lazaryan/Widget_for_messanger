<?php

$file = './user.json';

$_POST      = json_decode(file_get_contents('php://input'), true);

$message    = $_POST['message'];
$id         = $_POST['id'];

$string     = file_get_contents($file);
$data       = json_decode($string);

if (is_null($data->$id->dialog)) {
    $data->$id->dialog = array();
}

array_push($data->$id->dialog, $message);

# echo json_encode($data->$id->dialog);

$fl = fopen($file, 'w');
$write = fwrite($fl, json_encode($data));

echo 'Ok';

?>