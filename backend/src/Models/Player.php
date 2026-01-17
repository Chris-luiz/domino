<?php

declare(strict_types=1);

namespace App\Models;

class Player
{
    private $id;

    private string $nome;

    private array $pedras;
    
    private $token;
    
    private int $vez;

    private int $pontos = 0;

    public function __construct(string $nome, int $id, $token)
    {
        $this->id = $id;
        $this->nome = $nome;
        $this->token = $token;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getNome(): string
    {
        return $this->nome;
    }

    public function getToken()
    {
        return $this->token;
    }

    public function getPontos(): int
    {
        return $this->pontos;
    }

    public function getPedras(): array
    {
        return $this->pedras;
    }


    public function getVez(): int
    {
        return $this->vez;
    }

    public function setVez(int $vez)
    {
        $this->vez = $vez;
    }

    public function setPedras($pedras): void
    {
        $this->pedras = $pedras;
    }

    public function pontuar(int $pontos): void
    {
        $this->pontos += $pontos;
    }

    public function jogarPedra($buscada)
    {
        $busca = $this->pedras[$buscada];

        unset($this->pedras[$buscada]);

        return $busca;
    }

    public function getMyInfo()
    {
        return [
            'vez' => $this->getVez(),
            'nome' => $this->getNome(),
            'pedras' => $this->getPedras(),
            'pontos' => $this->getPontos(),
        ];
    }

    public function getInfo()
    {
        return [
            'vez' => $this->getVez(),
            'nome' => $this->getNome(),
            'pontos' => $this->getPontos(),
        ];
    }
}
