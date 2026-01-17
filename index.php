<?php

$host = '127.0.0.1';
$port = 8001;
$message = 'Olá Mundo';

$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
$server = socket_connect($socket, $host, $port);

socket_write($socket, $message, strlen($message));

$result = socket_read($socket, 1024);
echo 'Servidor Response: ' . $result;

socket_close($socket);