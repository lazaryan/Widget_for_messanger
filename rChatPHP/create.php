<?php
$file = './user.json';

$_POST = json_decode(file_get_contents('php://input'), true);

$id = $_POST['id'];

if (!file_exists($file)) {
	$data = new stdClass();
} else {
	$string = file_get_contents($file);
	$data = json_decode($string);
}

if (!isset($data->$id)){
    if (!isset($data)) {
        $data = new stdClass();
    }
    
	$data->$id = new stdClass();
	$data->$id->dialog = array();
	
	$fl = fopen($file, 'w');
	$write = fwrite($fl, json_encode($data));
	fclose($fl);
}

echo 'Ok';

?>