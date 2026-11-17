# Validação do redesign — 17/11/2026

> Histórico da primeira auditoria. O resultado atualizado está no [aceite local final](validation-final-2026-11-17.md), após as correções e a exclusão da assinatura GPG por instrução do usuário.

**Resultado: implementação parcial; roadmap ainda não aprovado integralmente.** O build funciona e os contratos de conteúdo foram preservados, mas existem falhas reproduzíveis em responsividade, menu e tema, além de diferenças visuais relevantes e testes desatualizados.

Escopo: checkout local, incluindo alterações não commitadas já presentes no início da auditoria. Nenhum código de implementação foi corrigido, checkbox alterado, conteúdo publicado modificado ou deploy executado. Esta auditoria adiciona apenas este relatório e evidências. Não havia AGENTS.md na raiz nem nos diretórios ancestrais inspecionados.

## Achados que impedem o aceite

| Prioridade | Achado e evidência | Local e ação necessária |
| --- | --- | --- |
| Alta | Menu modal permite rolar o fundo. Com o dialog aberto, um evento real de roda sobre o backdrop mudou `scrollY` de 0 para 500. A classe `menu-open` é adicionada, mas não possui regra CSS de bloqueio. Viola S05/I05. | `static/js/mobile-navigation.js:26` e `static/css/styles.css`. Bloquear rolagem durante o modal e restaurar no fechamento e breakpoint. |
| Média | Escolha explícita de tema é perdida quando localStorage está bloqueado e o sistema muda. Reprodução: sistema dark → escolher light → sistema light → dark; resultado final dark. Viola a precedência definida na seção 5 da spec e I03/I04. | `static/js/theme-toggle.js:69`. Manter a escolha explícita também em memória, independentemente da persistência. |
| Média | Ordem mobile incorreta: bio → índice → assinatura → foto. A ordem exigida é bio → foto → índice → assinatura. Em 390 px, índice começa em y≈405, assinatura em y≈669 e foto em y≈804. | `layouts/index.html:5`. Separar os blocos no DOM e usar áreas de grid para a composição desktop. |
| Média | Overflow horizontal em 320 px. No Chromium com scrollbar, largura útil 305 px e `scrollWidth` 316 px. O seletor EN/PT alcança x≈316.27. Viola V03. | `static/css/styles.css:1365` e regras do seletor. Permitir quebra/reorganização e reduzir os mínimos do cabeçalho de recentes. |
| Média | `make verify-site-ui` falha porque o teste espera `primary-navigation`, texto `menu` e `id=theme-toggle`, contratos substituídos pela implementação. Os mocks de JS também representam os scripts antigos. | `scripts/verify_site_ui.mjs:175` e funções `testThemeToggle`/`testMobileNavigation`. Atualizar os testes para dialog, controles compartilhados e os comportamentos atuais; incluir home-logs na verificação de sintaxe do shell. |
| Média | Hierarquia e medidas visuais ainda divergem do design consolidado. Em 390 px, título de recentes permanece 28/38 px (esperado 20/28), descrição 15/26 (esperado 14/24), índice herda 18 px e logs possuem padding lateral adicional das regras antigas. O prompt não forma a barra de terminal, índice/aviso não têm o tratamento visual dos PNGs e o menu não apresenta a árvore solicitada. | `static/css/styles.css:682`, `:1314`, `:1374` e `layouts/index.html`. Revisar a cascata antiga e comparar novamente as quatro capturas. Não atribuir estas diferenças à substituição autorizada do retrato ou à remoção dos status fictícios. |

Observações adicionais: o cabeçalho desktop mediu cerca de 121 px e o mobile 49 px, contra alturas iniciais de referência de 80/64 px. O espaçamento superior do body permanece 99 px nos dois layouts. Isso evidencia falta de sincronização entre cabeçalho e compensação, embora as âncoras Home/Índice testadas tenham permanecido visíveis. O retrato desktop mediu cerca de 351 px, acima da orientação aproximada de 288–320 px. O retrato local e o recorte circular claro foram reutilizados corretamente.

## Verificações realizadas

Hugo 0.167.0; Node 24.22.0; Chromium headless, automação pelo Chrome DevTools Protocol. Nenhuma dependência npm instalada. Os scripts de teste e builds auxiliares estão em `/tmp/adler-roadmap-audit/`.

| Cenário | Resultado |
| --- | --- |
| V01/V02 | Quatro estados capturados e comparados visualmente com os PNGs selecionados. Desktop usa contêiner de 960 px e grid 7/5. Fidelidade completa reprovada pelos achados acima. |
| V03 | Testadas larguras 320, 390, 768, 1023, 1024 e 1440. Falha horizontal em 320; não observada nas demais larguras testadas. |
| V04 | String longa inserida temporariamente no DOM quebrou sem ampliar a página em 720 px. Zoom real de 200% e fingerprint completo não foram validados. |
| V05 | Asset local existe e carrega. Cenário de imagem ausente/falha não executado. |
| V06 | Artigo de amostra aberto em 1440 px nos dois temas; um h1, 14 blocos de código e coluna de leitura de aproximadamente 798 px, sem overflow da página. Comparação editorial completa com baseline e página simples nos dois temas permanecem pendentes. |
| I01/I02 | Sistema dark aplicado; escolha light preservada ao navegar para About. Sem JS, CSS também aplicou sistema light. |
| I03/I04 | Falha de armazenamento não quebra a página nem impede troca imediata, mas a escolha é sobrescrita na mudança de sistema. Matriz completa de valor inválido e sistema antes/depois de escolha com armazenamento normal não executada. |
| I05 | Tab e Shift+Tab testados dentro do dialog; Escape fecha, atualiza aria-expanded e restaura foco em MENU. Bloqueio de rolagem falha. Ciclagem completa de todos os focos não executada. |
| I06 | Fechamento por botão testado. Handlers de backdrop e links inspecionados; cliques reais nesses dois caminhos permanecem pendentes. |
| I07/I09 | Menu aberto fecha ao entrar em desktop e permanece fechado ao voltar. PT é preservado em mobile → desktop com ambos visíveis → mobile. |
| I08 | Tema do cabeçalho e botões light/dark do menu sincronizados. |
| I10 | Sem JS: os dois painéis aparecem, seletor fica oculto, details de navegação aparece e tema CSS segue sistema claro/escuro. |
| I11/I12 | Atalhos apontam para IDs existentes da home; Home e Índice exercitados. Em viewport de 400 px o menu tem área rolável. Toque, último link em todos os estados e navegação inferior a partir de artigo não foram exercitados integralmente. |
| D01 | Coleção usa Type=posts e Params.languages, conforme a taxonomia real `tongue = languages`; cinco itens EN e cinco PT renderizados, com datas e títulos reais. Ordenação implementada com ByDate.Reverse. |
| D02/D03 | Fixtures isoladas com 0, 1 e 6 posts EN e 1 PT: estado vazio correto, limite cinco, PT preservado, draft e futuro excluídos. Conteúdo real não alterado. |
| D04 | Nenhum destino local da home ausente no build, incluindo arquivos de idioma, RSS, Markdown e verificação; nenhum placeholder novo identificado. Conectividade externa/onion não testada. |
| D05 | Nenhum erro JS, falha de rede ou resposta >=400 nas navegações monitoradas. Assets do redesign servidos localmente; fallback monospace disponível, sem WOFF2 de JetBrains adicionado. |
| D06 | Build HEAD e checkout atual passam. 958 arquivos no baseline e 959 no final; única adição `js/home-logs.js`, nenhuma remoção. Canonical e alternate preservados em todos os HTMLs comuns. `index.xml`, `index.md` e `index.json` idênticos byte a byte. Build onion passa. |
| D07 | Não aprovado: verificação da amostra local `public/index.html.asc` contra `public/index.html` retornou BAD signature usando a chave pública do projeto. Não comprova regressão deste redesign: os arquivos existentes podem pertencer a gerações distintas. Build final temporário não foi assinado. |
| D08 | Home com um h1, grupos/controles com nomes e foco visível definido em CSS. Auditoria completa de contraste e acessibilidade permanece pendente. |
| D09 | `git diff --check` passou. Alterações pré-existentes preservadas; builds fora de public. Nenhuma publicação ou mudança de infraestrutura. |

A primeira tentativa de Escape via CDP não fechou o dialog porque faltava foco efetivo na sessão headless; o teste foi repetido com `Page.bringToFront`, emulação de foco e keycode 27. O resultado válido está em `extra-results.json`. Não há achado de falha de Escape.

## Builds e assinatura

Comandos principais executados:

```sh
HUGO_CACHEDIR=/tmp/adler-audit-cache make verify-site-ui
HUGO_CACHEDIR=/tmp/adler-audit-cache make verify-agent-discovery
HUGO_CACHEDIR=/tmp/adler-audit-cache .tools/bin/hugo --minify --destination /tmp/adler-roadmap-audit/final
HUGO_CACHEDIR=/tmp/adler-audit-cache .tools/bin/hugo --minify --config config.toml,config.onion.toml --destination /tmp/adler-roadmap-audit/onion
python3 /tmp/adler-roadmap-audit/compare.py
python3 /tmp/adler-roadmap-audit/fixtures.py
git diff --check
```

Descoberta de agentes passou; UI falhou pelo contrato antigo. Sem `HUGO_CACHEDIR`, o uso de `--gc` falha neste sandbox por não poder escrever no cache padrão em `/home/spacexnu/.cache`. Esse impedimento do ambiente foi contornado e não foi tratado como defeito do site.

Baseline reconstruído de `git archive HEAD` em diretório temporário, sem resetar o checkout. A comparação confirma preservação dos outputs em relação ao HEAD; não certifica o histórico do build original da execução anterior.

O fluxo real é build → `clearsign_html.sh` → deploy. O script gera assinaturas detached `.asc` para os bytes dos artefatos. A validação da amostra local usou um GNUPGHOME isolado em `/tmp`, importando somente `static/pub-key.asc`. Nenhuma chave privada foi consultada ou usada. Antes de aprovar D07, é necessário verificar um par original/assinatura correspondente e depois assinar/verificar o build final pelo fluxo autorizado. A presença de `.asc` não basta.

Preview local, sem incluir drafts:

```sh
HUGO_CACHEDIR=/tmp/adler-audit-cache .tools/bin/hugo server --bind 127.0.0.1 --port 1313 --destination /tmp/adler-roadmap-preview
```

## Evidências e situação do roadmap

- [Desktop dark](validation-evidence/desktop-dark.png) e [desktop light](validation-evidence/desktop-light.png).
- [Mobile dark](validation-evidence/mobile-dark.png) e [mobile light](validation-evidence/mobile-light.png).
- [Menu dark](validation-evidence/menu-dark.png), [menu light](validation-evidence/menu-light.png) e [320 px](validation-evidence/mobile-320.png).
- Resultados brutos: [navegador](validation-evidence/browser-results.json), [teclado e rolagem](validation-evidence/extra-results.json), [largura mínima e artigo](validation-evidence/narrow-results.json), [comparação de outputs](validation-evidence/compare.json), [fixtures](validation-evidence/fixtures-results.json).

R0: mapeamento recuperado nesta auditoria; ausência de relatório anterior impede certificar todas as afirmações históricas. R1/R2: implementação substancial, mas checkboxes não equivalem ao aceite — há falha de tema, ordem mobile e diferenças de composição. R3: parcialmente funcional, com falhas de rolagem e largura mínima. R4: permanece incompleta; testes, assinatura, ajustes visuais e cenários pendentes precisam ser resolvidos antes de marcar conclusão. Os checkboxes originais foram mantidos para preservar a distinção entre auditoria e implementação.
