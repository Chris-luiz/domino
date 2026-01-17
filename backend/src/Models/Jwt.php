<?php

declare(strict_types=1);

namespace App\Models;

use Firebase\JWT\JWT as FirebaseJWT;
use Firebase\JWT\Key;

class Jwt
{
    public static function generate()
    {
        $key = '49d83h9384hf939h98h2d9hisdnfbh0bf2803g89c723b890bf98h908n9usdbncv89bw4';
        
        $payload = [
            "iss" => "http://172.16.45.93:5500",
            "iat" => time(),
            "exp" => time() + 3600 * 12 * 12,
            "user_id" => random_int(0, 50),
        ];

        $jwt = FirebaseJWT::encode($payload, $key, 'HS256');

        return $jwt;

        try {
            $decoded = FirebaseJWT::decode($jwt, new Key($key, 'HS256'));
            echo "Usuário ID: " . $decoded->user_id;
        } catch (\Exception $e) {
            echo "Token inválido: " . $e->getMessage();
        }
    }
}
