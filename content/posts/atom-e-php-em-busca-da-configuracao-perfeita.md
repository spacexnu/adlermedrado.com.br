---
title: "Atom e PHP: Em busca da configuração perfeita"
date: "2015-08-04"
tags:
  - "atom"
  - "editor"
  - "php"
---

Como eu
disse [recentemente](http://blog.adlermedrado.com.br/2015/07/31/migrando-para-o-atom.html "Migrando para o Atom"), eu
deixei de usar o Textmate, passei a usar o [Atom](https://atom.io) e recomendei alguns _packages_ que eu estou usando e
estão me ajudando diariamente.

Neste post eu quero mostrar mais alguns _packages_ bem úteis para desenvolvimento PHP:

- linter-phpmd
- linter-phpcs
- php-getters-setters

Os dois primeiros para funcionar precisam que tanto o PHPMD (PHP Mess Detector) e o PHP\_CodeSniffer esteja instalados
no ambiente e acessíveis por meio do PATH, ou seja, os comandos phpcs e phpmd devem ser acessíveis de qualquer local.

No screenshot abaixo eu estou com uma classe do Core do Magento aberta e é possível observar algumas recomendações para
melhorar o código:

Já o PHP Getters Setters, como o nome diz, permite gerar automaticamente os métodos Getters e Setters para os atributos
de uma classe. É uma mão na roda.

Para instalar estas _packages_, basta acessar as configurações do Atom e pesquisar por elas no local adequado, ou
digitar no terminal/prompt:
```bash
apm install linter-phpmd
apm install linter-phpcs
apm install php-getters-setters
```