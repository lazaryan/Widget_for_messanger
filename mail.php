<?php

$name = $_POST['name'];
$email = $_POST['email'];

$name = htmlspecialchars($name);
$email = htmlspecialchars($email);

$name = trim($name);
$email = trim($email);

$to = 'lazaryan99@mail.ru';
$from = 'lazaryan99@mail.ru';
$title = 'Chat-bot';
$mess = 'Имя пользователя: ' . $name . '<br />';
$mess .= 'Почта пользователя: ' . $email;

mail($to, $title, $mess, 'From:'.$from);

?>