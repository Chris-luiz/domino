<?php

$numeros = range(1, 4);
shuffle($numeros);

foreach ($numeros as $key => $vez) {
    echo $key . '  --  ' . $vez. PHP_EOL;
}