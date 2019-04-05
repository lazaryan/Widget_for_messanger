<?php
$file = './bd.csv';

$_POST = json_decode(file_get_contents('php://input'), true);

$id = $_POST['id'];

if (!file_exists($file)) {
	$data = [];
} else {
	$fl = fopen($file, 'r');

	while (($buffer = fgets($fl)) !== false) {
        $data[] = explode(';', $buffer);
    }

	fclose($fl);
}

$found = false;

foreach ($data as $key => $el) {
	echo $el[0] . '___' . $id . '___';
	if ($el[0] == $id) {
		$found = true;
		break;
	}
}

if (!$found) {
	$data[] = array($id . ';');

	$fl = fopen($file, 'a');
	$cnt = count($data);

	fputcsv($fl, $data[$cnt - 1]);

	fclose($fl);
}

echo 'Ok';

?>