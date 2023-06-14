---
title: "Dica: Solução de problema ao configurar Kitematic/Docker"
date: "2015-06-03"
---

**Este é o tipo de post que eu escrevo para servir de referência futura mas que também pode acabar ajudando outras
pessoas.**

Um projeto que estou trabalhando usa o [RabbitMQ](https://www.rabbitmq.com) e para tentar manter o meu OS X o mais
higienizado possível e também para manter a uniformidade entre o meu ambiente e os demais envolvidos no projeto, nós
decidimos utilizar o [Docker](https://www.docker.com/) e um container do RabbitMQ.

Para facilitar, existe um projeto chamado [Kitematic](https://kitematic.com/) que auxilia na configuração do Docker e na
instalação de containers, entretanto, o Kitematic está em versão beta ainda e por isso ele possui algumas arestas que
precisam ser aparadas, mas no geral ele funciona bem.

#### Problema na instalação

Na hora em que o Kitematic é instalado ele verifica se o Virtualbox está instalado no computador, caso não esteja, ele
baixa e faz a instalação automaticamente, após isso prossegue com a instalação, mas quando chegou em 99% ele ficou
parado e não avançou mais, conforme a imagem abaixo:

Eu quase desisti após xingar bastante, mas então eu executei os seguintes comandos no terminal:
```bash
docker-machine rm -f dev
docker-machine create -d virtualbox dev
```
E tudo passou a funcionar corretamente.

Durante o período em que eu esperava a instalação finalizar, eu abri uma issue
no [Github do projeto](https://github.com/kitematic/kitematic) e em seguida ao conseguir resolver eu postei a solução
na [própria issue](https://github.com/kitematic/kitematic/issues/585) e a fechei, como o projeto ainda está na fase beta
é normal ter problemas e aparentemente os desenvolvedores já estão cientes deste.
