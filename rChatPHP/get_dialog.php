<?php

$file = './user.json';

$_POST      = json_decode(file_get_contents('php://input'), true);

$id         = $_POST['id'];

$string     = file_get_contents($file);
$data       = json_decode($string);

if (!isset($data) || !isset($data->$id)) {
	echo '';
} else {
	echo json_encode($data->$id->dialog);
}

?>