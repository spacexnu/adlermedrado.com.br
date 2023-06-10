---
title: "Configurando o Ruby no Windows"
date: "2014-06-16"
tags:
  - windows
  - ruby
---

Recentemente eu instalei o Windows no meu PC e como eu uso o [octopress](http://octopress.org/) para gerir este blog, eu
estava usando uma VM com linux como ‘plataforma de blogging’.

No entanto eu acho que não faz muito sentido manter uma máquina virtual só para isso, então eu instalei o ambiente Ruby
no windows para usar o octopress.

Como eu sempre usei ruby com Mac OS X ou Linux e não tinha experiência com a configuração do ambiente Ruby na plataforma
da Microsoft, eu apanhei um pouco para configurar, mas deu certo e os passos que eu executei estão listados abaixo:

- Faça o download do [Ruby Installer](http://rubyinstaller.org/ "Ruby Installer ");
- Instale-o clicando duas vezes para executar o instalador;
- Faça o download do Dev Kit específico para a versão que você escolheu e siga
  o [passo-a-passo da instalação dele](https://github.com/oneclick/rubyinstaller/wiki/Development-Kit);

O DevKit é necessário para compilar ruby gems nativas, como no meu caso eu estou usando
o [Octopress](http://octopress.org/), eu preciso de algumas extensões nativas.

A configuração foi bem mais simples do que eu estava imaginando, tendo em vista que a plataforma windows sempre foi uma
‘cidadã de segunda classe’ no mundo ruby.
