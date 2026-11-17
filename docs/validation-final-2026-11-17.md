# Aceite local final — 17/11/2026

> Atualização posterior: o usuário executou o build e a assinatura. A [verificação do diretório assinado](signed-build-validation-2026-11-17.md) confirmou 955 assinaturas válidas e identificou 46 arquivos residuais em `public/`; esse ponto precisa ser considerado antes de publicar.

**Resultado: aprovado no escopo local validado, com assinatura GPG excluída por solicitação do usuário.** Os problemas do relatório inicial foram resolvidos. Publicação e verificação criptográfica continuam sob responsabilidade do usuário em etapa posterior.

Este relatório substitui o status pendente de `validation-2026-11-17.md`, preservado como histórico da primeira auditoria. Considera as alterações visuais e de conteúdo solicitadas na conversa após o protótipo.

## Correções encontradas nesta rodada

1. O dialog nativo permitia uma parada de Tab fora do conteúdo do modal na passagem entre o último e o primeiro controle. `static/js/mobile-navigation.js` agora fecha o ciclo explicitamente nos dois sentidos. Foi acrescentado um teste de regressão em `scripts/verify_site_ui.mjs`.
2. Alguns links focados pelo teclado ficavam atrás da barra inferior mobile. `static/css/styles.css` agora reserva a área inferior no scrollport com `scroll-padding-bottom`, incluindo safe-area. A repetição de 43 paradas de Tab confirmou foco visível acima da barra e abaixo do cabeçalho.

## Resultados por critério

| Critério | Resultado e evidência |
| --- | --- |
| V01/V02 | Aprovados. Capturas desktop 1440 px e mobile 390 px nos dois temas, com menu aberto nos dois temas. Home com um h1, contêiner desktop de 960 px, composição 7/5 e ordem mobile bio → retrato → índice → assinatura → links. Revisão visual realizada. |
| V03 | Aprovado em 320, 390, 768, 1023, 1024 e 1440 px: sem overflow horizontal, prompt separado do cabeçalho e mudança coerente dos painéis por breakpoint. |
| V04 | Zoom real do Chromium em 200%, aplicado por `chrome.settingsPrivate.setDefaultZoom(2)`, com janela de 1440 px e viewport CSS de 720 px, `devicePixelRatio=2`. Home, About, Projects, Contact, Start e artigo com código, nos dois temas: 12 estados sem overflow e com compensação correta do cabeçalho. String longa no título de um post e fingerprint completo também quebraram sem ampliar a página em 320 px. |
| V05 | Aprovado. Requisição do retrato bloqueada deliberadamente: área e proporção permanecem reservadas, alt factual presente e navegação utilizável. O fallback é a área do img com texto alternativo; nenhuma imagem substituta é atribuída ao autor. |
| V06 | Aprovado para amostras. Artigo com 14 blocos de código e páginas simples conferidos nos dois temas. Texto editorial de About, Projects, Contact, Start, Now, Uses e artigo idêntico ao baseline, excluindo o componente de recentes, cujo formato mudou intencionalmente. Colunas internas centralizadas e fonte local verificadas também nas rodadas anteriores. |
| I01–I04 | Aprovados. Preferência inicial do sistema, atualização antes de escolha explícita, persistência entre páginas, valor inválido e localStorage bloqueado exercitados no navegador. A escolha explícita em memória prevalece sobre alterações do sistema mesmo sem armazenamento. |
| I05 | Aprovado após correção. Abertura com Enter, foco inicial em Fechar, ciclo completo de Tab e Shift+Tab, Escape, restauração do acionador, bloqueio do fundo e restauração da posição de rolagem. |
| I06 | Aprovado. Cliques reais por CDP no botão Fechar, backdrop e link do menu; dialog fechado e aria-expanded atualizado, com navegação para About no caso do link. |
| I07–I09 | Aprovados. Resize com menu aberto limpa o estado; controles de tema sincronizados; seleção PT sobrevive ao percurso mobile → desktop → mobile, mantendo ambos os idiomas no desktop. |
| I10 | Aprovado com execução de JS desativada no Chromium: ambos os idiomas visíveis, seletor oculto, details de navegação disponível e CSS seguindo sistema claro/escuro. |
| I11/I12 | Aprovados. Atalhos Home/Índice/Posts exercitados a partir de About; destino e âncora presentes e visíveis. Menu aberto por evento de toque. Em viewport de 390×400 px, último link e botão Fechar alcançáveis pelo teclado e visíveis com rolagem interna. Foco da página testado separadamente em 43 paradas, sem encobrimento pelas barras fixas. |
| D01 | Aprovado. Até cinco posts por idioma, classificação por `Params.languages` e taxonomia `tongue = languages`, ordem por data e metadados gerados pelo Hugo. Nenhum post Markdown na coleção inspecionada sem declaração `languages`. |
| D02/D03 | Aprovados. Seis fixtures isoladas: 0, 1 e 6 posts para cada idioma, mantendo 1 no outro. Estado vazio, limite cinco, ordem do mais recente, entrada de post publicado, exclusão de draft e futuro confirmados. Nenhum conteúdo publicado modificado. |
| D04 | Aprovado localmente. Menus, árvore, arquivos EN/PT, Markdown, RSS, chave e procedimento de verificação resolvem no build; nenhum destino local da home ausente. Build onion gera com a configuração existente. Conectividade do serviço Tor e disponibilidade de serviços externos não fazem parte da validação local. |
| D05 | Aprovado. Sem erro JS ou erro de rede inesperado nos fluxos monitorados. Fontes WOFF2 servidas localmente; nenhum novo CDN. A única falha de imagem registrada foi provocada pelo teste V05 e identificada separadamente no JSON. |
| D06 | Aprovado. Builds normal e onion passam. Comparação com HEAD: nenhuma rota/arquivo removido, canonical e alternate preservados em todos os HTMLs comuns, RSS e Content API idênticos. Adições limitadas à fonte/licença/documentação e `home-logs.js`. `index.md` mudou somente na descrição da home, de “Security-minded engineer…” para “Software engineer…”, conforme solicitado. |
| D07 | **Excluído deste aceite por instrução do usuário.** Assinatura e verificação serão feitas manualmente depois. Nenhuma chave privada usada e nenhuma nova verificação GPG executada nesta rodada. |
| D08 | Aprovado nas amostras e métodos descritos abaixo: zero violações automáticas e revisão complementar dos casos de contraste inconclusivos, mais testes reais de foco. Não representa certificação integral de WCAG nem validação em todos os navegadores. |
| D09 | Aprovado. `git diff --check` passou; alterações anteriores preservadas, ferramentas e builds temporários fora do projeto. Nenhum deploy, push ou mudança de infraestrutura. |

## Acessibilidade e contraste

Axe-core 4.10.3 foi baixado exclusivamente em `/tmp` e injetado no navegador de teste. Não se tornou dependência do site. Foram auditados 26 estados: seis páginas × duas larguras (390/1440) × dois temas, mais menu aberto nos dois temas. As páginas foram Home, About, Projects, Contact, Start e `/posts/debugging-an-audacity-crash-on-windows/`.

Nenhuma violação automática. Os casos inconclusivos de contraste foram examinados pelas cores computadas, composição alfa dos fundos e extremos dos gradientes:

| Trecho | Dark | Light |
| --- | --- | --- |
| Ramos decorativos da árvore | 6,61:1 | 4,81:1 |
| Texto de About sobre gradiente | ≥13,64:1 | ≥14,36:1 |
| Trechos de código sinalizados como inconclusivos | 13,94:1 | 13,94:1 |

Todos superam 4,5:1. Os ramos da árvore são decorativos e estão ocultos para leitores de tela. O foco de teclado testado apresentou outline sólido de 2 px. Os testes funcionais adicionais totalizaram 42 verificações aprovadas.

Limite da verificação: Chromium headless com eventos reais de teclado, mouse e toque por CDP; não houve ensaio com leitor de tela ou aparelho físico. Os resultados locais não auditam a configuração do servidor público nem renovam a análise pública do Mozilla Observatory.

## Alterações autorizadas em relação ao protótipo

- Comando `whoami`, sem `--verbose`.
- Papel profissional “Software engineer” e descrição correspondente.
- Nome e alias alinhados no desktop; alias com badge no mobile.
- Identidade “Adler Medrado | spacexnu”, tagline completa e espaço acima do painel.
- Retrato local retangular nos dois temas, com glow adaptado à paleta clara.
- Rodapé compartilhado com assinatura, chave, privacidade e selo Mozilla A+ solicitado pelo usuário. O selo é conteúdo solicitado; não foi feito novo scan do domínio.
- Largura editorial uniforme nas páginas internas e JetBrains Mono servida localmente.

## Comandos e artefatos

```sh
HUGO_CACHEDIR=/tmp/adler-audit-cache make verify-site-ui
HUGO_CACHEDIR=/tmp/adler-audit-cache make verify-agent-discovery
HUGO_CACHEDIR=/tmp/adler-audit-cache .tools/bin/hugo --minify --destination /tmp/adler-final-review
HUGO_CACHEDIR=/tmp/adler-audit-cache .tools/bin/hugo --minify --config config.toml,config.onion.toml --destination /tmp/adler-final-onion
python3 /tmp/adler-final-content.py
git diff --check
```

Builds e scripts auxiliares ficaram em `/tmp`. O cache explícito contorna a restrição de escrita do sandbox no cache padrão do Hugo. Preview sem drafts:

```sh
HUGO_CACHEDIR=/tmp/adler-audit-cache .tools/bin/hugo server --bind 127.0.0.1 --port 1313 --destination /tmp/adler-final-preview
```

Capturas: [desktop dark](validation-evidence/final/desktop-dark.png), [desktop light](validation-evidence/final/desktop-light.png), [mobile dark](validation-evidence/final/mobile-dark.png), [mobile light](validation-evidence/final/mobile-light.png), [menu dark](validation-evidence/final/menu-dark.png), [menu light](validation-evidence/final/menu-light.png), [zoom 200%](validation-evidence/final/zoom-200.png).

Resultados brutos: [axe](validation-evidence/final/axe-results.json), [comportamento](validation-evidence/final/behavior-results.json), [foco na página](validation-evidence/final/page-focus-results.json), [zoom e cores](validation-evidence/final/zoom-contrast-results.json), [contraste calculado](validation-evidence/final/contrast-ratios.json), [conteúdo e fixtures](validation-evidence/final/content-results.json), [outputs](validation-evidence/final/outputs.json).
