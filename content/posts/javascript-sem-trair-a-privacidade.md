---
title: "Adicionei JavaScript no site e a sua privacidade continua intacta"
date: 2026-06-09T10:00:00-03:00
languages: ["portuguese"]
draft: false
tags: ["privacidade", "javascript", "hugo", "meta"]
---

# JavaScript sem trair a premissa

Quem acompanha este site sabe que ele tem uma premissa inegociável: **eu não
rastreio quem visita**. Não tem Google Analytics, não tem pixel, não tem cookie
de terceiro, não tem fingerprinting. Eu não sei quem visitou, não sei quantas
pessoas visitaram, não sei de onde vieram. E gosto que seja assim.

Durante muito tempo isso andou junto de outra regra implícita: nada de
JavaScript. Mas o site hoje roda dois scripts. O primeiro é o
[toggle de tema claro/escuro](/posts/tema-claro-vinte-linhas-de-javascript/),
que chegou faz pouco tempo. O segundo, mais recente ainda, são as taglines
aleatórias no estilo BBS que aparecem abaixo do cabeçalho. Este post existe pra
explicar por que isso **não fere a premissa** e, de quebra, contar uma faxina
que fiz na estrutura do site.

## JavaScript não é o inimigo. Rastreamento é.

A regra "sem JavaScript" sempre foi um meio, nunca o fim. O fim é: nenhum byte
de informação sobre você sai do seu navegador por causa deste site. JavaScript
virou sinônimo de rastreamento porque é assim que 99% da web o usa: pra carregar
analytics, pra fingerprintar seu navegador, pra te seguir entre sites. Mas a
linguagem em si é só uma ferramenta. O que importa é o que o código faz.

Olha o que os dois scripts deste site fazem:

**O toggle de tema** guarda a sua preferência (claro ou escuro) no
`localStorage` do **seu** navegador. Esse dado nunca sai de lá. Eu não tenho
como ler, não é enviado em requisição nenhuma, e você pode apagar quando quiser.
É o seu navegador lembrando uma coisa pra **você**, não pra mim.

**As taglines** são ainda mais simples: uma lista de frases embutida no próprio
arquivo JS e um `Math.random()` que sorteia uma a cada carregamento de página.
Nada é gravado, nada é lido, nada é enviado. O navegador sorteia, mostra e
esquece.

Os dois arquivos são servidos do meu próprio servidor, sem CDN de terceiro e
sem dependência externa. Não existe nenhuma chamada de rede nos scripts.
Nenhuma. E como todo o resto dos assets deste site, eles são assinados com GPG:
você pode conferir o `.asc` correspondente e verificar que o que chegou no seu
navegador foi o que eu publiquei.

Não confia? Ótimo, nem deveria. O código é minúsculo e legível: dá pra auditar
em menos de um minuto com um "view source". E se você navega com JavaScript
desligado, o site continua funcionando inteiro. O tema escuro é o padrão e uma
tagline fixa aparece no lugar da sorteada.

## A faxina: adeus, dark-flat

Aproveitando que estava mexendo no site, resolvi um incômodo antigo. O tema que
eu uso aqui, o **dark-flat**, vivia num repositório separado, plugado no site
como git submodule. Parecia organizado, mas na prática era o contrário.

Com o tempo, eu fui sobrepondo partials do tema com versões locais no
repositório do site: `head.html`, `header.html`, layouts inteiros. Resultado:
metade do tema valendo de um lugar, metade do outro, e eu tendo que lembrar da
ordem de precedência do Hugo pra saber qual arquivo estava de fato em uso. Pra
piorar, qualquer ajuste de CSS exigia commit e push no repo do tema **e depois**
outro commit no repo do site só pra atualizar o ponteiro do submodule. Duas
operações pra mudar uma cor.

Um tema separado faz sentido quando ele é um produto, algo que outras pessoas
vão usar em outros sites. Não era o caso. O dark-flat só existia pra este site,
então a separação era atrito puro, sem benefício nenhum.

A solução foi óbvia: movi os arquivos do tema pra dentro do repositório do site,
mantive as versões locais onde já havia sobreposição (que era exatamente o que o
Hugo já renderizava) e removi o submodule. Verifiquei o build antes e depois:
saída idêntica, byte a byte. Agora é um repositório só, um commit por mudança, e
zero ambiguidade sobre qual arquivo está valendo.

## Resumo

O site continua sem saber quem você é. Continua funcionando sem JavaScript.
Continua assinado com GPG. Só ganhou um toggle de tema, umas taglines com cheiro
de BBS dos anos 90 e uma estrutura que não me dá mais dor de cabeça pra manter.

Privacidade não é sobre dogma técnico. É sobre o que acontece com os seus
dados. Aqui, a resposta continua a mesma de sempre: nada.
