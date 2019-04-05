<?php

$file = './user.json';

$_POST      = json_decode(file_get_contents('php://input'), true);

$message    	= $_POST['message'];
$id         	= $_POST['id'];
$date       	= $_POST['date'];
$ip       		= $_POST['ip'];
$system_info    = $_POST['systemInfo'];
$type    		= $_POST['type'];
$add_statistic  = $_POST['addStatistic'];

$mes = 'type: ' . $type;
$mes .= '|' . 'text: ' . $message['message'];
$mes .= '|' . 'date: '. $date;
$mes .= '|' . 'ip: '. $ip;
$mes .= '|' . 'system info: '. $system_info;

if ($type == 'message') {
	$string     = file_get_contents($file);
	$data       = json_decode($string);

	if (is_null($data->$id->dialog)) {
    	$data->$id->dialog = array();
	}

	array_push($data->$id->dialog, $message);

	# echo json_encode($data->$id->dialog);

	$fl = fopen($file, 'w');
	$write = fwrite($fl, json_encode($data));
	fclose($fl);
}

if (!$add_statistic) {
	return;
}

# Теперь запись в БД....

$file = './bd.csv';

if (!file_exists($file)) {
	$data[] = [$id];
} else {
	$fl = fopen($file, 'r');

	$data = [];

	$i = -1;

	while (($buffer = fgets($fl)) !== false) {
		$i++;
        $data[] = explode(';', $buffer);

        $cnt = count($data[$i]);

        $data[$i][$cnt - 1] = '';
    }

	fclose($fl);
}

$pos = -1;

foreach ($data as $key => $value) {
	if ($value[0] === $id) {
		$pos = $key;
		break;
	}
}


if ($pos !== -1) {
	# echo PHP_EOL;

	$cnt = count($data[$pos]);

	$data[$pos][$cnt - 1] = $mes;
	$data[$pos][$cnt] = '';

	for ($i = 0; $i < $cnt + 1; $i++) {
		$data[$pos][$i] = trim($data[$pos][$i], '\"');
	}
} else {
	$data = [$id, $mes, ''];
}

function trim_line ($el) {
	return trim($el, '\"');
}

$fl = fopen($file, 'w');

foreach ($data as $key => $line) {
	fputcsv($fl, array_map('trim_line', $line), ';');
}

fclose($fl);

echo 'Ok';

?>