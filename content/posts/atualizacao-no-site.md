---
title: "Atualizacao No Site"
date: 2008-05-09T03:06:57-03:00
draft: false
tags:
  - "site"
---

Incluí no meu site uma área destinada à galeria de fotos. Eu coloco minhas fotos no flickr e não irei mudar isso.

O que eu fiz foi apenas um mashup onde eu busco as 10 últimas imagens que enviei ao flickr e coloco no meu site.

Implementar isso foi muito fácil utilizando o componente do Zend Framework para acesso à API do Flickr,
**Zend_Services_Flickr**. 

Segue abaixo um exemplo de código para busca de imagens no Flickr utilizando o Zend Framework:

Controller:
```php
$flickr = new Zend_Service_Flickr(’MINHA_CHAVE_DO_FLICKR;
$this->view->imgRes = $flickr->userSearch(’EMAIL_DO_USUARIO);
```
Na View, basta manipular o objeto **Zend_Services_Flickr_Resultset** e **Zend_Services_Flickr_Image**.

Simples demais!!!

Abraço.
