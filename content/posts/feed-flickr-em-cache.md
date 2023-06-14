---
title: "Feed e Flickr em cache"
date: 2008-05-10T10:10:46-03:00
draft: false
tags:
  - "code"
---

Quem está me acompanhando no twitter e tem lido meus últimos posts, sabe que criei um site e etc, porém, nos últimos
dias meu server no dreamhost está um pouco lento e justamente no consumo dos feeds do meu blog e na requisição REST para
minha página no Flickr o meu site tem tipo um comportamento um pouco lento. É lógico que não é culpa exclusiva do
consumo de feed e do REST do Flickr, porém, para melhorar um pouco eu usei o componente _Zend_Cache_ do ZF para colocar
estes dois objetos em cache.

Eu coloquei o cache em arquivo em disco, porquê não estou com saco pra recompilar meu PHP no Dreamhost para usar o APC,
então a melhora na performance poderia ser ainda melhor.

Um exemplo de como usar o _Zend_Cache_ colocando objeto serializado em arquivo:

```php
private function getFeed()
{
    $frontend = array(
    'lifetime' => 7200, // vida do cache eh duas horas
    'automatic_serialization' => true
    );

    $backend = array(
        'cache_dir' => 'meu_dir' // Diretorio para colocar o cache
    );

    // getting a Zend_Cache_Core object
    $cache = Zend_Cache::factory('Core', 'File', $frontend, $backend);

    if(!$objFeed = $cache->load('feed')) {
        $objFeed = new Zend_Feed_Rss('http://adlermedrado.com.br/blog/?feed=rss2');
        $cache->save($objFeed, 'feed');
    }
    return $objFeed;
}
```