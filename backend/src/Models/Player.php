<?php

declare (strict_types=1);

namespace App\Models;

class Player 
{
    private $id;

    private string $nome;

    private array $pedras;

    private int $pontos = 0;

    public function __construct(string $nome, int $id)
    {
        $this->id = $id;
        $this->nome = $nome;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getNome(): string
    {
        return $this->nome;
    }
    
    public function getPontos(): int
    {
        return $this->pontos;
    }
    
    public function getPedras(): array
    {
        return $this->pedras;
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
}