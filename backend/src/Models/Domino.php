<?php

declare(strict_types=1);

namespace App\Models;

class Domino
{
    public int $id;
    public int $esquerda;
    public int $direita;

    public function __construct(int $direita, int $esquerda, int $id)
    {
        $this->id = $id;
        $this->direita = $direita;
        $this->esquerda = $esquerda;
    }

    public function validar(int $direita, int $esquerda): bool
    {
        return $this->direita == $direita && $this->esquerda == $esquerda;
    }
}
