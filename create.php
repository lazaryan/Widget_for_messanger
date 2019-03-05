<?php
$file = './user.json';

$_POST = json_decode(file_get_contents('php://input'), true);

if (!file_exists($file)) {
	$fp = fopen($file, "w");
	fclose($fp);
}

$string = file_get_contents($file);
$data = json_decode($string);

if (!isset($data)) {
	$data = new stdClass();
}

if (!$data->$_POST['id']){
	$data->$_POST['id'] = [
		'dateCreate' => '',
		'dialog' => []
	];

	$fl = fopen($file, 'w');
	$write = fwrite($fl, json_encode($data));
}

echo 'Ok';

?>