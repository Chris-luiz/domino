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

        echo "Entrnado na OnMessage" . PHP_EOL;

        if (!$this->jogo->getStart()) {


            $payload = json_decode($msg, true);

            if (!$payload || !isset($payload['action'])) {
                $from->send(json_encode([
                    'type' => 'error',
                    'message' => 'Mensagem Inválida'
                ]));

                return [
                    'type' => 'error',
                    'returnToMe' => ''
                ];
            }

            $action = $payload['action']; // explode(jogo.adicionarPlayer) new Jogo() ->adicionarPLayer()
            $token = $payload['token'] ?? null;
            $data   = $payload['data'] ?? [];

            if ($token) {
                $decoded = Jwt::decode($token);
                $decoded->user_id;

                foreach ($this->jogo->getPlayers() as $player) {
                    $decodedPlayer = Jwt::decode($player->getToken());

                    if ($decodedPlayer->user_id == $decoded->user_id) {
                        $from->send(json_encode([
                            'type' => 'success',
                            'returnToMe' => true,
                            'gameStart' => $this->jogo->getStart(),
                            'data' => [
                                'players' => $this->jogo->getPlayers(true),
                                'jwt' => $player->getToken(),
                            ]
                        ]));

                        return;
                    }
                }

                foreach ($this->clients as $client) {
                    $client->send(json_encode([
                        'type' => 'error',
                        'reset' => true,
                    ]));
                }

                return;
            }

            echo $action . PHP_EOL;

            $numRecv = count($this->clients) - 1;

            $returnStatment = $this->handleAction($from, $action, $data);

            $start = $returnStatment['gameStart'];

            if ($start) {
            }

            // echo sprintf('Connection %d sending message "%s" to %d other connection%s' . "\n", $from->resourceId, $msg, $numRecv, $numRecv == 1 ? '' : 's');

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
        } else {

            echo 'Jogo já foi iniciado' . PHP_EOL;
            $payload = json_decode($msg, true);


            $action = $payload['action']; // explode(jogo.adicionarPlayer) new Jogo() ->adicionarPLayer()
            $token  = $payload['token'] ?? null;
            $data   = $payload['data'] ?? [];

            $decoded = Jwt::decode($token);

            $me = null;
            $players = [];

            foreach ($this->jogo->getPlayers() as $player) {
                $decodedPlayer = Jwt::decode($player->getToken());

                if ($decodedPlayer->user_id == $decoded->user_id) {
                    $me = $player->getMyInfo();
                } else {
                    $players[] = $player->getInfo();
                }
            }

            foreach ($this->clients as $client) {
                $client->send(json_encode([
                    'type' => 'success',
                    'returnToMe' => true,
                    'gameStart' => $this->jogo->getStart(),
                    'data' => [
                        'me' => $me,
                        'players' => $players,
                        'jwt' => $token,
                    ]
                ]));
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

            $jwt = Jwt::generate($data['nome']);

            $player = new Player($data['nome'], $from->resourceId, $jwt);

            $this->jogo->addPlayer($player);

            return [
                'type' => 'success',
                'returnToMe' => true,
                'gameStart' => $this->jogo->getStart(),
                'data' => [
                    'players' => $this->jogo->getPlayers(true),
                    'jwt' => $jwt,
                ]
            ];
        } else {
            $this->jogo->start();
        }
    }
}
