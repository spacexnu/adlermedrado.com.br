---
title: "Mudanças no Zend_Loader"
date: 2009-05-28T19:42:10-03:00
draft: false
tags:
  - "zend-framework"
---

Com o advento da versão 1.8.0 do Zend Framework algumas mudanças no Zend_Loader serão necessárias quando for utilizado o
autoload.

Até então nós habilitávamos o Zend_Loader no bootstrapper para usar o autoload da seguinte forma:

`Zend_Loader::registerAutoload();`

Com o código acima, todas as classes incluindo as que utilizassem a estrutura de namespaces do ZF seriam inclusas no
pelo autoload no ato da criação de sua instância desde que estivessem no include_path, porém, esta maneira está
deprecated e com isso algumas mudanças são necessárias para que seu código continue funcionando em versões futuras e não
receba um notice nas versões atuais.

**O que mudou ?**

Foi criada uma nova classe chamada `Zend_Loader_Autoloader` que implementa algumas novas funcionalidades e facilita a
inclusão de bibliotecas externas à nossa aplicação. Para utilizarmos, basta criarmos uma instância dela no bootstrapper
conforme o exemplo abaixo e pronto.

**Como assim?**

Antes de mostrar o código vamos entender como a coisa funciona:

Ao criar uma instância da classe `Zend_Loader_Autoloader` no bootstrapper o ZF registra a regra de autoloading com
spl_autoload e assim o processo é automatizado.

Quando a instância é criada, o ZF já busca pelas classes dos namespaces `Zend_` e `ZendX_` automaticamente, porém qualquer
classe adicional não será encontrada.

Mas antes de resolver isso segue o código que deve ser escrito para habilitar o autoload para `Zend_` e `ZendX_`:

    // Inicializa o autoloader padrão para Zend_ e ZendX_
    $autoloader = Zend_Loader_Autoloader::getInstance();

Beleza. Agora vamos configurar para que outras classes sem namespace sejam incluídas pelo autoload (lembrando que elas
devem estar no include_path).

    // Inicializa o autoloader padrão para Zend_ e ZendX_
    $autoloader->setFallbackAutoloader(true);

**Fácil demais não é?**

Agora supondo que você crie o seu próprio namespace e por exemplo crie suas próprias classes usando herança e extendendo
classes do próprio ZF.

Quando eu faço isso eu normalmente uso o prefixo `Base_` para o meu namespace, então, para colocar este namespace no
autoload eu faço assim:

    // Registra o namespace Base_ no autoloader
    $autoloader->registerNamespace('Base_');

**Tranquilo, certo?**

Bem, lembra de um post que coloquei aqui a algum tempo atrás que mostrava como integrar outras libs com o autoload do
ZF? Naquele caso foi integrando o ezComponentes com o ZF.

Bem, esquece tudo aquilo porque aquilo já não nos pertence mais. Agora nós devemos fazer assim:

    $autoloader->pushAutoloader(array('ezcBase', 'autoload'), 'ezc');

**Concluindo**

Apesar de ter havido uma quebra de compatibilidade com versões anteriores estas modificações foram bem legais porque
facilitam no nosso dia-a-dia e com isso nossa produtividade aumenta.

Ainda existem outros aspectos que poderiam ser abordados mas que não julguei importantes para o post, como retornar
todos os namespaces registrados, excluir um determinado namespace do autoloader e etc.

Outro ponto que achei bacana nesse novo objeto é que nós podemos modificar as configurações de autoloading em outros
locais diferentes do bootstrapper como por exemplo num controller.

Espero que gostem da dica.

Abraços.
