---
title: "De 21 a 71: tornando meu site legível por agentes"
date: 2026-07-29
languages: ["portuguese"]
draft: false
tags: ["ai", "agents", "webmcp", "dnssec", "nginx", "hugo", "privacy"]
description: "O que mudei no meu site para agentes descobrirem conteúdo, APIs e ferramentas sem inventar OAuth, MCP ou serviços que não existem."
---

Eu joguei o endereço deste site no
[Is It Agent Ready?](https://isitagentready.com/) e recebi uma nota 21.

Depois de algumas horas lendo RFC, mexendo no Hugo, configurando Nginx e
respirando fundo antes de apertar o botão de DNSSEC no Registro.br, a nota
subiu para 71. O site passou a ser classificado como **Agent-Integrated**.

A tentação óbvia seria continuar adicionando arquivos até o scanner ficar
verde em tudo. Não fiz isso.

Uma pontuação não é uma arquitetura. Publicar metadata de OAuth sem ter
autenticação ou anunciar um servidor MCP que não existe seria tecnicamente
desonesto. Agentes encontrariam mais arquivos, mas receberiam informação falsa.

O objetivo não era ganhar no videogame do checklist. Era tornar o que já existe
aqui mais fácil de descobrir e consumir por agentes.

## O que significa deixar um site pronto para agentes

Um navegador entrega HTML para uma pessoa e espera que ela entenda menus,
links, textos e formulários. Um agente também consegue analisar HTML, mas não
deveria precisar adivinhar tudo.

Um site mais amigável para agentes responde explicitamente:

- onde está sua documentação;
- quais APIs existem;
- como obter uma representação sem o ruído do HTML;
- quais usos do conteúdo são permitidos;
- quais ações estruturadas a página oferece;
- se autenticação é necessária;
- como verificar essas informações por HTTP ou DNS.

Boa parte disso não exige modelo de linguagem, framework mágico ou SaaS novo.
Exige formatos previsíveis, headers corretos e arquivos em lugares
padronizados.

É a parte menos cinematográfica da inteligência artificial: fazer HTTP direito.

## A arquitetura continuou simples

Este site é gerado com Hugo e publicado no meu próprio VPS. O Nginx entrega os
arquivos estáticos. A Cloudflare é meu DNS autoritativo, mas quase todos os
registros estão em modo `DNS only`.

Isso definiu uma regra para a implementação: tudo que pudesse ser resolvido no
Nginx seria resolvido no Nginx.

Eu não precisava colocar o domínio atrás do proxy da Cloudflare para ganhar
headers ou negociação de conteúdo. Também não precisava depender de Transform
Rules, Workers ou de uma funcionalidade disponível apenas em plano pago.

Cloudflare ficou responsável pelo que é DNS. Nginx ficou responsável pelo que
é HTTP. Hugo continuou responsável pelo conteúdo.

Separação de responsabilidades ainda funciona, mesmo quando colocam "AI" no
nome do problema.

## Link headers: descoberta começa na resposta HTTP

O primeiro problema era simples: a homepage não retornava nenhum response
header `Link`.

Eu já poderia colocar elementos `<link>` no `<head>` do HTML, mas isso não é a
mesma coisa. O [RFC 8288](https://www.rfc-editor.org/rfc/rfc8288) define links
no protocolo HTTP, e um agente pode descobri-los sem precisar interpretar o
documento inteiro.

O Nginx agora retorna:

```text
Link: </.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json",
      </.well-known/openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json",
      </agent-api.md>; rel="service-doc"; type="text/markdown",
      </.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"
```

Isso anuncia o catálogo de APIs, a especificação OpenAPI, a documentação em
Markdown e o índice de skills.

Uma requisição para `/` já entrega um mapa das coisas que uma máquina pode
querer consultar em seguida.

## HTML para pessoas, Markdown para agentes

O site continua retornando HTML por padrão. Nada mudou para quem abre uma página
normalmente.

Mas agora um cliente pode enviar:

```http
Accept: text/markdown
```

e receber:

```http
Content-Type: text/markdown
Vary: Accept
```

O Hugo gera uma versão Markdown das páginas durante o build. O Nginx inspeciona
o header `Accept` e entrega o arquivo correspondente.

O teste é direto:

```bash
curl -I -H 'Accept: text/markdown' https://adlermedrado.com.br/
```

A Cloudflare tem um recurso pronto pra isso, o Markdown for Agents. Ignorei.
O conteúdo já nasce em Markdown, eu controlo o servidor, e converter meu
próprio HTML de volta pra Markdown na borda seria pagar um Uber pra ir até a
esquina de casa.

## Content Signals: pode responder, não pode treinar

O `robots.txt` agora declara:

```text
User-agent: *
Allow: /
Content-Signal: ai-train=no, search=yes, ai-input=yes
```

Esses três valores têm significados diferentes:

- `search=yes`: permite indexação, links e pequenos trechos em resultados;
- `ai-input=yes`: permite usar o conteúdo em tempo real como entrada de um
  modelo, incluindo RAG, grounding, respostas e resumos;
- `ai-train=no`: não autoriza treinamento ou fine-tuning.

Minha escolha foi permitir que um agente leia um post para responder a uma
pergunta, mas não autorizar que o conteúdo vire material de treinamento.

[Content Signals](https://contentsignals.org/) ainda dependem de quem coleta
respeitar a declaração. Não são um firewall. Mesmo assim, prefiro declarar a
intenção de forma explícita a deixar silêncio onde poderia existir uma regra.

## Um catálogo para uma API que já existia

O site já publicava conteúdo estruturado. O que faltava era uma maneira
padronizada de descobri-lo.

Criei `/.well-known/api-catalog` seguindo o
[RFC 9727](https://www.rfc-editor.org/rfc/rfc9727). O catálogo aponta para:

- `/index.json`, com a lista de páginas e posts;
- `/.well-known/openapi.json`, com a descrição OpenAPI 3.1;
- `/agent-api.md`, com a documentação;
- `/health.json`, com o estado do serviço estático.

O catálogo é servido com:

```http
Content-Type: application/linkset+json
```

Não é uma API de escrita, não tem banco de dados e não aceita comandos. É apenas
uma visão estruturada do conteúdo público que o site já entrega.

Também publiquei `/.well-known/agent-skills/index.json`, com um skill chamado
`site-content`. Ele ensina um agente a consultar o índice, localizar um texto e
pedir a versão Markdown da página escolhida.

O índice inclui o SHA-256 do `SKILL.md`, então o artefato anunciado pode ser
verificado antes do uso.

## DNS-AID e o momento em que fiquei com medo

Descoberta por HTTP funciona depois que o agente encontra o site. DNS-AID
permite anunciar o ponto de entrada no próprio DNS.

Publiquei na Cloudflare:

```dns
_index._agents.adlermedrado.com.br. 3600 IN SVCB 1 adlermedrado.com.br. alpn="h2" port=443 mandatory=alpn,port
```

O registro diz que o índice para agentes está disponível no domínio principal,
via HTTP/2 na porta 443.

O requisito seguinte era assinar a zona com DNSSEC.

Habilitar DNSSEC na Cloudflare foi a parte fácil. A parte que faz a mão suar é
copiar o DS para o Registro.br sabendo que um valor incorreto pode fazer
resolvers validadores devolverem `SERVFAIL`.

No Registro.br, mantive os dois nameservers da Cloudflare e preenchi apenas:

- `Keytag 1`: o Key Tag exibido pela Cloudflare;
- `Digest 1`: o digest completo exibido pela Cloudflare.

Depois da propagação:

```bash
dig @1.1.1.1 adlermedrado.com.br DS +dnssec
```

passou a retornar:

```text
adlermedrado.com.br. 3600 IN DS 2371 13 2 ...
```

e, mais importante:

```text
flags: qr rd ra ad;
```

O `ad` significa que o resolver validou a cadeia DNSSEC. O scanner também
encontrou o SVCB com `AD=true`.

Medo encerrado. DNS funcionando. Nenhum domínio foi ferido durante o processo.

## WebMCP: ferramentas no navegador

WebMCP permite que uma página exponha funções JavaScript como ferramentas
estruturadas para agentes.

Em vez de o agente tentar entender visualmente a página, ele recebe nome,
descrição, JSON Schema dos parâmetros e uma função de execução. A especificação
ainda está em desenvolvimento, mas a ideia é boa: reduzir ambiguidade entre a
interface humana e a ação que uma máquina precisa realizar.

Este site registra dois tools:

```text
search_site_content
get_current_page
```

O primeiro pesquisa títulos e resumos em `/index.json`. O segundo retorna URL
canônica, título e descrição da página atual.

As duas operações são somente leitura. Não abrem conta, não enviam mensagem,
não modificam conteúdo e não coletam dados do visitante.

Um detalhe quase passou despercebido: minha Content Security Policy começava
com `default-src 'none'`. O JavaScript carregava, mas o `fetch("/index.json")`
do tool de busca seria bloqueado porque não havia `connect-src`.

A correção foi específica:

```text
connect-src 'self'
```

O script continua proibido de chamar serviços externos. Ele só pode consultar o
próprio site.

Eu não tenho Chrome instalado e WebMCP ainda está em early preview. Mesmo assim,
consegui validar a implementação: o teste local captura os tools registrados e
o Is It Agent Ready carregou a página como navegador, detectando os dois via
`navigator.modelContext`.

## Auth.md sem teatro de autenticação

Também publiquei `/auth.md`.

Ele não ensina um agente a criar conta porque não existe conta. O arquivo diz:

```text
Registration is not required or available.
Authentication and credentials are not required.
There are no protected API scopes.
```

O scanner encontra o documento, confirma HTTP 200 e `text/markdown`, mas ainda
marca o item como falha porque não há instruções de registro.

Está certo. Não há registro.

Eu prefiro perder pontos com uma declaração verdadeira a ganhar pontos
anunciando endpoints fictícios.

## O que eu deliberadamente não implementei

Alguns checks continuam vermelhos:

- OAuth/OIDC Discovery;
- OAuth Protected Resource Metadata;
- Auth.md Agent Registration;
- MCP Server Card;
- A2A Agent Card.

Eles não representam bugs neste site.

OAuth e OIDC fazem sentido quando existe API protegida, login, token, escopo e
um authorization server real. Nada disso existe aqui.

OAuth Protected Resource Metadata descreve como obter autorização para um
recurso protegido. Todo o conteúdo deste site é público.

MCP Server Card exige um servidor MCP com transporte e endpoint reais. WebMCP
no navegador não transforma o domínio em um servidor MCP remoto.

A2A Agent Card descreve um agente capaz de conversar com outros agentes. Este
site é um site, não um agente autônomo.

Os itens de comércio (x402, MPP, UCP, ACP e AP2) aparecem em cinza. E vão
continuar cinza. Não vendo nada aqui, e a última coisa que quero é acordar um
dia com um agente comprando hospedagem em meu nome.

Adicionar qualquer uma dessas coisas apenas para melhorar a nota seria
confundir suporte a protocolo com coleção de arquivos `.well-known`.

## O resultado

O site saiu de 21 para 71 e chegou ao nível **Agent-Integrated**.

Passaram:

- Link headers;
- DNS-AID com DNSSEC;
- negociação de Markdown;
- Content Signals;
- API Catalog;
- Agent Skills;
- WebMCP;
- `robots.txt` e sitemap.

Mais importante que a pontuação: cada item verde corresponde a algo que
realmente existe e funciona.

Agentes agora conseguem descobrir o conteúdo por HTTP e DNS, pedir Markdown,
consultar um catálogo, entender a política de uso e acessar ferramentas
estruturadas no navegador.

O resto permaneceu ausente porque deve permanecer ausente.

## O que aprendi

Deixar um site pronto para agentes não significa transformar tudo em chatbot,
adicionar login ou colocar um modelo de linguagem no servidor.

Na maior parte do tempo significa publicar bons metadados, respeitar protocolos
e não obrigar uma máquina a adivinhar o que você poderia declarar.

Também significa saber dizer não.

Um scanner é útil para encontrar lacunas. Ele não conhece a intenção da sua
arquitetura. Essa parte continua sendo responsabilidade de quem opera o site.

No fim, a melhoria mais importante não foi sair de 21 para 71.

Foi sair de um site que agentes precisavam interpretar para um site que consegue
explicar a si mesmo, sem mentir sobre o que é.

## E a versão na rede Tor?

E a versão deste site que roda como onion service na rede Tor?

Obviamente não configurei DNS-AID, DNSSEC nem metadados de descoberta específicos
para ela. Você sabe disso, né? Um endereço `.onion` não participa do DNS público,
então não há registro DS no Registro.br, SVCB na Cloudflare ou cadeia DNSSEC para
validar.

Como as duas versões saem do mesmo projeto Hugo, alguns arquivos estáticos acabam
viajando juntos no build. Mas transformar o onion service em outro alvo para um
scanner de *agent readiness* nunca foi o objetivo. Ele existe por outro motivo:
acesso pela rede Tor, com o mínimo possível de dependências e exposição. E vai
continuar assim.
