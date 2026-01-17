<?php
$host = '127.0.0.1';
$port = 8001;

$server = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
socket_set_option($server, SOL_SOCKET, SO_REUSEADDR, 1);
socket_bind($server, $host, $port);
socket_listen($server);

$clients = [$server]; 

echo "Servidor iniciado...\n";

while (true) {
    $read = $clients; // Copiamos o array para verificar quem enviou dados
    $write = null;
    $except = null;

    // A mágica: socket_select avisa qual socket mudou de estado
    if (socket_select($read, $write, $except, 0) < 1) continue;

    // Se o socket principal ($server) está no array $read, alguém quer conectar
    if (in_array($server, $read)) {
        $clients[] = socket_accept($server); //Adiciona um novo cliente
        echo "Novo usuário conectado! Total: " . (count($clients) - 1) . "\n";
        
        // Remove o servidor da lista de leitura para não processá-lo como mensagem
        $key = array_search($server, $read);
        unset($read[$key]);
    }

    foreach ($read as $clientSocket) {
        $data = socket_read($clientSocket, 1024);
        
        if ($data === false || bin2hex($data) == "") {
            // Cliente desconectou
            $key = array_search($clientSocket, $clients);
            unset($clients[$key]);
            socket_close($clientSocket);
            echo "Um usuário saiu.\n";
            continue;
        }

        // Se chegamos aqui, temos uma mensagem! 
        // Podemos enviar para todos os outros (Broadcast)
        foreach ($clients as $sendSocket) {
            if ($sendSocket != $server && $sendSocket != $clientSocket) {
                socket_write($sendSocket, "Alguém disse: " . $data);
            }
        }
    }
}