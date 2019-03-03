<?php

$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];

$name = htmlspecialchars($name);
$email = htmlspecialchars($email);
$phone = htmlspecialchars($phone);
$message = htmlspecialchars($message);

$name = trim($name);
$email = trim($email);
$phone = trim($phone);
$message = trim($message);

$to = 'hprosmen@mail.ru';
$from = 'hprosmen@mail.ru';
$title = 'Chat-bot';
$mess = 'Имя пользователя: ' . $name . '<br />';
$mess .= 'Почта пользователя: ' . $email  . '<br />';
$mess .= 'Номер телефона пользователя: ' . $phone  . '<br />';
$mess .= 'Сообщение: ' . $message;

mail($to, $title, $mess, 'From:'.$from);

?>