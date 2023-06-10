---
title: "Erro incômodo com o Postgresql no Mac"
date: "2016-10-02"
tags:
  - "mac"
  - "macos"
  - "macos-sierra"
  - "postgres"
  - "postgresql"
---

Esse é um post bem curto que resolvi escrever depois de me incomodar com um erro esquisito no Postgresql no Mac após a
atualização para o MacOS Sierra.

O servidor do Postgresql estava funcionando OK mas o client cli me retorna o erro abaixo sempre que eu o executava:

![](/posts/images/1*nKXkh2PzTW85hhl59x3-3w.png)

WTF?

Eu costumo usar o _homebrew_ para instalar a maioria das coisas no meu mac, primeiramente eu pensei que fosse algum
problema com algum link simbólico incorreto, então eu executei o comando abaixo para ver se resolvia:

![](/posts/images/1*aOcgI9fU746SkcSacFKqNA.png)

Recriando os links

Mesmo assim o erro persistu, então eu removi o readline e reinstalei:

![](/posts/images/1*mpcBc2Tu-ShIzR770ebQrg.png)

Reinstalando …

Mas nada.:(

Tentei reinstalar forçando o _build from source_:

![](/posts/images/1*eLE49JvI5vtL6ieIYF_eyQ.png)

Nessa hora eu já tava ficando puto

E nada … resolvi então chutar o balde o reinstalar o PostgreSQL:

![](/posts/images/1*n7GMinuLwIcIqldxekZb8w.png)

Reinstalando a porra toda

E funcionou.:)

![](/posts/images/1*qUqQk3QyIsE0YejWnjO9CA.png)

Tcham:)

Fica a dica para quem estiver passando pelo mesmo problema que eu.

Acredito que na atualização do sistema operacional alguma lib ficou desatualizada o que gerou este problema. Em outros
tempos não muito distantes, eu teria feito uma instalação limpa do sistema todo, ainda bem que hoje eu estou aprendendo
a lidar de forma diferente com este tipo de problema.
