---
title: "Quase um ano de Dangolino sem precisar alterar uma linha de código"
date: 2013-03-15T00:09:13-03:00
draft: false
tags:
  - "general"
---

Já faz algum tempo que eu postei aqui que eu estava usando o picasaweb para publicar as imagens no meu blog usando o
dangolino, mas, recentemente eu pensei melhor e decidi que quero manter as imagens no meu próprio servidor.

Os motivos são vários, mas o principal é que quero manter a integridade do meu conteúdo em único local, neste caso o meu
servidor, simplesmente pela facilidade que tenho de fazer backup dele, que é muito mais fácil para mim do que manter um
backup de serviços como o picasaweb ou o flickr por exemplo.

**Modificações no dangolino**

Pois bem, eu me sentei e comecei planejar e depois a codificar algumas modificações que estavam ficando legais, minha
idéia era a de que para cada post novo, deveria ser informado o caminho para um arquivo yaml com os caminhos dos
arquivos que seriam anexados ao post e no ato da geração do post com o comando dangolino.rb estes arquivos seriam
movidos a um diretório específico, os caminhos seriam mesclados no conteúdo do post e posteriormente seriam
sincronizados com o servidor via rsync, que é a maneira a qual eu já sincronizo os arquivos do meu site com meu
servidor.

**Mas as modificações são desnecessárias**

Depois de analisar bem a situação eu percebi que essa mudança poderia ser feito de uma maneira bem mais simples sem
precisar mexer em uma única linha de código do projeto.

Eu já possuo no meu site um diretório para imagens e demais arquivos anexados aos posts que foram importados do
wordpress quando comecei a usar o dangolino, então basta eu colocar os arquivos lá e referencia-los no conteúdo do post
da mesma maneira que eu estava fazendo quando apontava para uma imagem no picasaweb.

**Resumindo**

Eu sou adepto do 'quanto mais simples, melhor', então eu fico feliz de ver que minha app está me atendendo mesmo quando
os meus requisitos atuais não são mais os mesmos de quando eu a projetei a quase um ano atrás.

Ela não está um primor como eu já disse em outro post anteriormente e precisa de muito refactoring, mas, mesmo assim
está me atendendo bem.
