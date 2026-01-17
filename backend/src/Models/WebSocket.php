<?php

declare(strict_types=1);

namespace App\Models;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use SplObjectStorage;

use App\Models\Jogo;

class WebSocket implements MessageComponentInterface
{

    private Jogo $jogo;
    protected $clients;

    public function __construct()
    {
        $this->clients = new SplObjectStorage;
        $this->jogo = new Jogo();
    }

    public function onOpen(ConnectionInterface $conn)
    {
        $this->clients->attach($conn);

        echo "New connection! {$conn->resourceId}\n";
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {

        $payload = json_decode($msg, true);

        if (!$payload || !isset($payload['action'])) {
            $from->send(json_encode([
                'type' => 'error',
                'message' => 'Mensagem Inválida'
            ]));

            return;
        }

        $action = $payload['action']; // explode(jogo.adicionarPlayer) new Jogo() ->adicionarPLayer()
        $data   = $payload['data'] ?? [];

        $numRecv = count($this->clients) - 1;

        $returnStatment = $this->handleAction($from, $action, $data);

        echo sprintf('Connection %d sending message "%s" to %d other connection%s' . "\n", $from->resourceId, $msg, $numRecv, $numRecv == 1 ? '' : 's');


        foreach ($this->clients as $client) {

            if ($returnStatment['returnToMe']) {
                $client->send(json_encode($returnStatment));
                // $client->send($msg);
            } else {
                if ($from !== $client) {
                    $client->send(json_encode($returnStatment));
                }
            }
        }
    }

    private function handleAction($from, $action, $data)
    {
        return $this->$action($data, $from);
    }

    public function onClose(ConnectionInterface $conn)
    {
        $this->clients->detach($conn);

        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e)
    {
        echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }








    private function addPlayer($data, $from)
    {
        if (count($this->jogo->getPlayers()) < 4) {

            $player = new Player($data['nome'], $from->resourceId);
            $this->jogo->addPlayer($player);

            return [
                'type' => 'success',
                'returnToMe' => true,
                'data' => [
                    'players' => $this->jogo->getPlayers(true),
                    'jwt' => Jwt::generate(),
                ]
            ];
        }
    }
}
