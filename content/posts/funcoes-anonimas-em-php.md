---
title: "Funções anônimas em PHP"
date: 2010-09-26T20:23:35-03:00
draft: false
tags:
  - "php"
---

### Introdução

Não é novidade para ninguém que foram incluídos no PHP 5.3 alguns recursos novos que a tornam uma linguagem melhor e
mais completa.

A novidade é que eu irei publicar aqui a partir deste post, exemplos de como escrever código PHP usando estas
funcionalidades.

Minha idéia é de escrever posts curtos e direto ao ponto.

As funções anônimas, também conhecidas como closures e lambda functions são funcionalidades que são definidas sem que
elas possuam um nome que as identifica e normalmente são usadas para definirmos funções que não serão utilizadas em
nenhum outro local, apenas naquele momento específico.

### Como eu uso isso?

Normalmente quando escrevemos uma função, nós declaramos o nome dela e assim sabemos como identifica-la na hora em que
precisamos usa-la.

Exemplo:
```php
<?php
function funcaoExemplo($parametro1, $parametro2) {
    return "Faça alguma coisa com o $parametro1 e com o $parametro2";
}
echo funcaoExemplo('Hello','World');
?>
```
O exemplo acima demonstra a maneira convencional que declaramos e usamos as funções em PHP, abaixo eu mostrarei alguns
exemplos de uso das funções anônimas.

O próximo exemplo é a declaração e uso de uma função semelhante à declarada no exemplo anterior, porém, na forma de
função anônima:

```php
<?php
$funcaoExemplo = function($parametro1, $parametro2) {
    return "Faça alguma coisa com o $parametro1 e com o $parametro2";
};

echo $funcaoExemplo('Hello','Função Anônima');
?>
```
Como você pôde observar, a função não recebe um nome quando é declarada e sim ela é atribuída a uma variável comum PHP.

Nós podemos utilizar nestas funções as variáveis declaradas fora de seu escopo, para isso nós devemos importar as
variáveis por meio do comando use. Exemplo:
```php
<?php
$nome = 'Adler';
$sobrenome = 'Brediks';
$mostraMeuNome = function() use ($nome, $sobrenome) {
    $sobrenome .= ' Medrado';
    echo "Seu nome é: $nome $sobrenome";
};
$mostraMeuNome();
?>
```
É possível usar variáveis passadas como referência. O exemplo anterior será modificado para ilustrar a funcionalidade:
```php
<?php
$nome = 'Adler';
$sobrenome = 'Brediks';
$mostraMeuNome = function() use ($nome, &$sobrenome) {
    $sobrenome .= ' Medrado';
    echo "Seu nome é: $nome $sobrenome";
};
echo '<br>';
$mostraMeuNome();
echo '<br>';
echo $sobrenome;
?>
```
Faça o teste e veja que se o operador de referência(&) for removido, a variável $sobrenome não é modificada fora do
escopo da função.

As closures podem ser muito bem aproveitadas em conjunto com funções nativas do PHP que necessitam de uma função de
callback, como a função array_map que será a função usada em meu exemplo. Veja:
```php
<?php
$arrExemploMap = array(1,2,3,4,5,6,7,8,9,10);
$ret = array_map(function($v) {
    return $v * $v;
}, $arrExemploMap);

var_dump($ret);
?>
```
O código acima exemplifica o que falei anteriormente a respeito de declarar funções que não serão usadas em mais nenhum
lugar.

### Usando isso em objetos

Esta funcionalidade também pode ser usada no paradigma POO e o conceito é exatamente o mesmo, basta preparar o seu
método para receber uma função desta como parâmetro. Exemplo:
```php
<?php
class Lambida {
    public function hello($param1, $callback) {
        echo 'Esse é o valor do $param1: ' . $param1 . '<br />';
        echo $callback();
    }
}

$lambida = new Lambida();
$lambida->hello('Eu amo muito tudo isso', function() {
    return 'Eu sou o retorno da funcao de callback'; }
);
?>
```
### Conclusão

Este é mais um recurso que o PHP oferece para torna-lo mais ágil e eficiente.

Os exemplos que eu apresentei já servem como ponto de partida para estudos mais aprofundados e eu espero que ele tenha
sido útil para você.

Se você já usou este recurso em situações diferentes das que eu apresentei, deixe seu comentário.

Abraços.
