<?php

$file = './diary.json';

$_POST      = json_decode(file_get_contents('php://input'), true);

$text		= $_POST['message'];
$text 		= strtolower($text);

if (file_exists($file)) {
	$string     = file_get_contents($file);
	$data       = json_decode($string);

	$words 		= explode(' ', $text);

	$count = 0;
	$key_text = '';

	foreach ($data as $key => $value) {
		$txt = strtolower($key);
		$txt = explode(' ', $txt);

		$cnt = 0;

		foreach($words as $word) {
			if (in_array($word, $txt)) {
				$cnt++;
			}
		}

		if ($cnt > $count) {
			$count = $cnt;
			$key_text = $key;
		}
	}

	if ($key_text) {
		echo json_encode($data->$key_text);
	} else {
		echo '';
	}
	
} else {
	echo '';
}

?>