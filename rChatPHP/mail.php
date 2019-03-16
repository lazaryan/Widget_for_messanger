<?php

$_POST      = json_decode(file_get_contents('php://input'), true);

$name       = $_POST['name'];
$email      = $_POST['email'];
$phone      = $_POST['phone'];
$message    = $_POST['message'];

$name       = htmlspecialchars($name);
$email      = htmlspecialchars($email);
$phone      = htmlspecialchars($phone);
$message    = htmlspecialchars($message);

$name       = trim($name);
$email      = trim($email);
$phone      = trim($phone);
$message    = trim($message);

$to         = 'hprosmen@mail.ru';
$from       = 'hprosmen@mail.ru';
$title      = 'Chat-bot';

$mess = '<p>Имя пользователя: ' . $name . '</p>' .
        '<p>Почта пользователя: ' . $email . '</p>' .
        '<p>Номер телефона пользователя: ' . $phone . '</p>' .
        '<p>Сообщение: ' . $message . '</p>';

mail($to, $title, $mess, 'From:'.$from);

echo 'Ok';
?>