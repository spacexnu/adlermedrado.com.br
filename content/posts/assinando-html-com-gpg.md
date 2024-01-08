---
title: "Assinando páginas HTML com GPG"
date: 2024-01-07T11:44:54-03:00
draft: false
tags:
  - "site"
  - "gpg"
  - "seguranca"
---

Há alguns meses eu reformulei este site, eu estava usando wordpress e não estava
muito feliz com isso, então decidi usar um gerador de páginas estáticas, nesse caso o [Hugo](https://gohugo.io).

No passado eu já utilizei o [Pelican](https://getpelican.com), o [Jekyll](https://jekyllrb.com) e o Dangolino,
este último era uma ferramenta criada por mim, mas que descontinuei depois de algum tempo.
Se não me engano, há posts aqui falando sobre eles.

## Por que assinar as páginas?

Eu vejo a criptografia como um mecanismo de defesa, acredito que as pessoas devem
criptografar tudo, para tentar garantir segurança, privacidade e autenticidade, entre outras coisas.

Nesse caso específico, quando eu resolvi reestruturar esse site pensei em garantir que
o conteúdo aqui publicado fosse de fato produzido por mim, isso evitaria uma situação
em que uma pessoa com acesso indevido ao meu servidor alterasse conteúdo postado aqui e
me comprometesse de alguma maneira.

Esse foi um ponto, mas atualmente com a quantidade de fake news publicadas na internet,
bem como o uso indiscriminado de IA, é difícil saber o que é ou não confiável,
e eu quero que pelo menos o que eu postar, seja facilmente identificado como legítimo.

## Fazendo isso no meu site, vai mudar alguma coisa?

Isoladamente não vai mudar nada, mas imagina se todo mundo que publicasse
algo em seus sites fizesse isso? Já mudaria alguma coisa, certo?

Usar GPG/PGP não é trivial, entretanto também não um bicho de sete cabeças,
tem posts aqui que eu já abordei o assunto, fazem alguns anos e podem estar
desatualizados, mas serve como ponto de partida se você está começando a estudar o assunto agora.

## Como funciona uma assinatura GPG

[GPG](https://www.gnupg.org) ou GNU Privacy Guard é uma implementação livre do
[OpenPGP](https://www.openpgp.org), que é um padrão para criptografia, descriptografia,
assinatura, etc, baseado no PGP, desenvolvido por Phil Zimmermann.

Basicamente o GPG é uma suite de software que te permite gerir chaves criptográficas e
criptografar e descriptografar usando as chaves geridas por ele.

Quando uma pessoa cria um par de chaves, ela pode compartilhar a chave pública com outras pessoas,
que por sua vez também compartilham as suas e quando há uma relação de confiança entre elas,
as suas chaves podem ser mutuamente assinadas o que demonstra para terceiros que as chaves são legítimas.

A minha chave pública está disponível [aqui](/pub-key.asc) bem como no
[servidor do OpenPGP](https://keys.openpgp.org/search?q=FF676DC52A0191C3).

Voltando...

No caso das assinaturas das páginas HTML do meu site, qualquer pessoa pode verificar
se elas estão assinadas com a minha chave ou não, nesse segundo caso o conteúdo não é legítimo.

## Assinar o próprio arquivo ou em um arquivo separado?

Os arquivos do meu site estão assinados no próprio html, mas a assinatura poderia
estar em um arquivo separado.

Em um arquivo separado, seria algo assim: O endereço https://site.com/index.html
teria um endereço com um arquivo correspondente chamado https://site.com/index.asc,
cujo conteúdo é a assinatura criptográfica do arquivo index.html.

Eu optei por deixar no mesmo arquivo para facilitar
o processo de validação, mas ambas as maneiras são válidas.

Caso tenha curiosidade para ver como é o arquivo com a assinatura embutida, utilize
a funcionalidade _Mostrar código-fonte do seu navegador_.

## Como validar a integridade do arquivo assinado?

Primeiro a minha chave pública deve ser importada para seu gerenciador de chaves (GPG Suite por exemplo),
depois basta fazer o download do arquivo html e usar o comando _verify_ do GPG para checar a integridade.

Para validar o arquivo HTML da home do meu site, basta executar o seguinte comando no seu terminal:

```bash
curl https://adlermedrado.com.br/ | gpg --verify
```
Resultado:

```bash
curl https://adlermedrado.com.br/ | gpg --verify
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  7413    0  7413    0     0   7803      0 --:--:-- --:--:-- --:--:--  7803
gpg: Signature made Dom 31 Dez 13:19:04 2023 -03
gpg:                using RSA key 39A90E7D803B5C02D3EFEBA7FF676DC52A0191C3
gpg: Good signature from "Adler Medrado <adler@adlermedrado.com.br>" [ultimate]
```
Para mostrar o que aconteceria caso o conteúdo do arquivo fosse modificado, eu
fiz uma modificação e mandei verificar novamente. O resultado:

```bash
curl https://adlermedrado.com.br/ | gpg --verify
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  7423    0  7423    0     0   7813      0 --:--:-- --:--:-- --:--:--  7813
gpg: Signature made Dom 31 Dez 13:19:04 2023 -03
gpg:                using RSA key 39A90E7D803B5C02D3EFEBA7FF676DC52A0191C3
gpg: BAD signature from "Adler Medrado <adler@adlermedrado.com.br>" [ultimate]
```
Esse resultado indica que o arquivo foi modificado, ou seja, não está íntegro
de acordo com a assinatua contida nele.

## Como assinar os arquivos

Como mencionei anteriormente, estou usando o Hugo para gerar os arquivos estáticos
do site, para isso o Hugo possui um comando específico. Como são diversos comandos
usados nesse processo, eu coloquei todos em um arquivo Makefile pois minha memória
é péssima.

```Makefile
help:
	@echo "targets:"
	@echo "serve: Run a local hugo development server"
	@echo "build: Build the minified version of the site"
	@echo "clear-sign: PGP Clearsign all HTML pages of the site"
	@echo "deploy: Deploy files to server"
	@echo "help: Show this help"

serve:
	hugo server -D

build:
	hugo --gc --minify

clear-sign:
	./clearsign_html.sh

deploy:
	rsync -rvhe ssh --progress --delete ./public/ host:dir

.PHONY: serve build signature
```
Após redigir um novo post, eu uso o comando _build_ para converter os arquivos
markdown em html, em seguida eu uso o comando _clear-sign_ para assinar cada
arquivo individualmente e em seguida eu atualizo o servidor com os novos arquivos
usando o comando _deploy_.

Para realizar as assinaturas, eu criei um pequeno script bash que é executado
para cada arquivo:

```bash
#!/usr/bin/env bash

shopt -s globstar

function sign_html {
  html=$1
  temp=/tmp/pgp-html-$$

  echo "Copying file $1 to $temp in order to be signed"
  (
    echo '-->'
    cat "$html"
    echo '<!--'
  ) >$temp

  echo "Signing $temp and renaming to $html"
  (
    echo '<!--'
    gpg --clearsign --default-key YOUR_KEY --output - $temp
    echo '-->'
  ) >"$html"

  echo "Cleaning the garbage..."
  rm $temp
}

for i in public/**/*.html; do
  sign_html "$i"
done

```
## Se você não usa, considere refletir sobre o assunto

Gerenciar chaves não é trivial, é necessário estudar e conhecer a ferramenta e os conceitos,
é por isso que a maioria das pessoas só usam criptografia em casos que consideram importantes.

É por isso que eu acho projetos como o [Keybase](https://keybase.io) interessantes,
pois facilitam a gestão de chaves e promovem o uso da criptografia.

Se você nunca usou GPG, sugiro que comece por lá.

## E daqui pra frente?

Eu abordei apenas um único ponto relacionado à criptografia, esse universo é
vasto e eu aprendo coias novas diariamente e se você tiver tempo e interesse no assunto,
irá se deparar com temas muito interessantes como Bitcoin (criptomoedas em geral)
e o protocolo do [Nostr](https://nostr.com), por exemplo.

Divirta-se, espero que aos poucos as pessoas passem a compreender mais sobre a
importancia desse tema e cheguem à mesma conclusão que eu:
**Criptografia é nossa defesa. Criptografe tudo o que puder.**
