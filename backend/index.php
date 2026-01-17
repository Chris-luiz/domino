<?php

use App\Models\WebSocket;
use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;
use Ratchet\WebSocket\WsServer;

require_once __DIR__ . '/vendor/autoload.php';

// $server = IoServer::factory(new Chat(), 8080);

$server = IoServer::factory(new HttpServer(new WsServer(new WebSocket())), 8080, '0.0.0.0');

$server->run();
