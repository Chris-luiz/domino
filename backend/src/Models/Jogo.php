<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Domino;
use App\Models\Player;

class Jogo
{
    private array $pilha = [];
    private $players = [];
    private $numerosSorteados = [];

    const NUMERO_TOTAL = 28;

    public function __construct()
    {
        $count = 1;
        for ($i = 0; $i <= 6; $i++) {
            for ($j = $i; $j <= 6; $j++) {
                array_push($this->pilha, new Domino($i, $j, $count));
                $count++;
            }
        }
    }

    public function addPlayer(Player $newPlayer): void
    {
        $newPlayer->setPedras($this->sortearSetePedras());
        
        // $this->players[$newPlayer->getId()] = $newPlayer;
        $this->players[] = $newPlayer;

        var_dump($this->players);

        // array_push($this->players, [
        //     $id => $newPlayer
        // ]);
    }

    public function hasPlayer(int $id): bool
    {
        return isset($this->players[$id]) ? true : false;

        return $player;
    }

    public function getPlayers(bool $onlyName = false): array
    {

        if ($onlyName) {
            return array_map(function ($item) {
                return [
                    'id' => $item->getId(),
                    'nome' => $item->getNome()
                ];
            }, $this->players);
        }
        // return $this->players;

        // foreach ($this->players as $player) {
        //     echo $player->getNome() . PHP_EOL;

        //     echo count($this->players);
        // }

        return $this->players;
    }

    public function getPilha(): array
    {
        return $this->pilha;
    }

    private function getNumeroAleatorio()
    {
        $numeroAleatorio = random_int(0, self::NUMERO_TOTAL - count($this->numerosSorteados));

        while (in_array($numeroAleatorio, $this->numerosSorteados)) {
            $numeroAleatorio = random_int(0, self::NUMERO_TOTAL);
        }

        array_push($this->numerosSorteados, $numeroAleatorio);

        return $numeroAleatorio;
    }

    public function sortearSetePedras()
    {
        $mao = [];

        for ($i = 1; $i <= 7; $i++) {
            $numeroAleatorio = $this->getNumeroAleatorio();

            array_push($mao, $this->pilha[$numeroAleatorio]);

            unset($this->pilha[$numeroAleatorio]);

            array_filter($this->pilha, function ($item) {
                return $item !== null;
            });
        }

        return $mao;
    }
}
