# Análise dos artefatos

Revisão 2 · 17/11/2026

## Evidência disponível

Foram examinados visualmente os seis PNGs e consultados os seis HTMLs para estrutura, dependências, dados, controles, medidas e posições. Também foram lidos os dois DESIGN.md e a captura textual. O checkout WSL não pôde ser acessado na preparação anterior. Estado atual do tema, conteúdo e build precisa ser confirmado pelo executor.

## Classificação correta das telas

| Pasta em stitch/ | O que o PNG mostra | Uso decidido |
| --- | --- | --- |
| home_adler_medrado | Desktop escuro, hero 7/5, retrato retangular, árvore, logs lado a lado | Principal do desktop escuro |
| home_light_parchment_adler_medrado_1 | Desktop claro, fundo quente, cartões brancos, retrato circular | Principal do desktop claro |
| home_light_parchment_adler_medrado_2 | Desktop escuro apesar do nome, Light destacado no seletor | Consulta de composição escura. Estado de tema do controle é inconsistente |
| home_mobile_adler_medrado_1 | Mobile escuro, retrato monocromático, seletor EN/PT, barra inferior | Principal do mobile escuro |
| home_mobile_adler_medrado_2 | Mobile claro com a mesma sequência de conteúdo | Principal do mobile claro |
| menu_drawer_mobile_adler_medrado | Overlay escuro, lista vertical em árvore, aparência e status | Moldura e conteúdo do menu aberto |

## Conflitos resolvidos

| Evidência | Decisão |
| --- | --- |
| Obsidian guia usa máximo 960 px, Parchment guia cita 1280 px, HTMLs desktop usam 960 px | Contêiner de 960 px em ambos os modos |
| Guia claro exige cantos retos, mas PNGs e HTMLs têm cartões arredondados | Seguir PNGs, raios contidos até 8 px |
| Front matter claro inclui cinzas frios, mas a narrativa e o PNG claro usam papel quente | Paleta consolidada em design.md |
| Guia sugere avatar mobile antes da bio, mas PNGs põem nome e descrição primeiro | Ordem dos PNGs |
| Desktop escuro redefine rounded-full para 0.75rem, resultando em retrato retangular | Moldura retangular escura e circular clara, como os PNGs |
| Tema desktop apenas alterna classe dark, enquanto muitas cores são fixas | Implementar variáveis que realmente alterem todos os componentes |
| Controles mobile de tema e idioma carecem de comportamento completo | Implementar estados da especificação |
| Vários href usam # ou âncoras sem seção correspondente | Resolver links no Hugo |
| Home marca About como aria-current | Derivar estado da rota real |
| Overlay dedicado deixa grande área vazia por centralização vertical | Posicionar painel perto do topo com rolagem independente |
| Mobile bloqueia zoom/seleção e oculta scrollbars globalmente | Preservar zoom, seleção e rolagem nativos |

## Dados, rotas e afirmações

O texto extraído registra RSS em /index.xml. O drawer dedicado associa rss a /feed.md. São destinos de formatos diferentes e devem ser conectados separadamente. Os arquivos /languages/english/ e /languages/portuguese/ sugerem taxonomia de idioma, ponto crítico para evitar filtro incorreto por Page.Lang.

Os mocks incluem [42°N], UID 1000, kernel 6.11.2-hardened-gnu, PROD_HARDENED, SEC_LEVEL, SOVEREIGN_ENCRYPTED, SYS: SECURE, SIG: VALID, TLS A+ e fingerprint parcial 4FA1 91E0 B627 E780 C1F2. Esses valores não comprovam a configuração real. Omitir detalhes técnicos sem fonte e preservar estética por prompt, molduras, árvore e logs editoriais.

Assinatura, privacidade e link ao Observatory já aparecem na captura textual. Sua reutilização depende dos destinos e do processo atuais. Esta revisão não realizou auditoria do domínio. STREAM: LIVE e FORMAT: RFC5424 não descrevem o mecanismo estático de posts e são omitidos. Latest Logs e o comando ilustrativo journalctl continuam como linguagem visual.

As imagens remotas são ilustrações diferentes entre desktop e mobile. O pacote adota o retrato local do projeto para identidade e define fallback sem foto quando ausente.

## Decisões de execução

Títulos longos ficam completos, com quebra de linha, mesmo quando o mock os trunca. Mobile recebe alternância EN/PT funcional. Sem JS, os dois grupos permanecem acessíveis. Barra inferior usa Home/Índice/Posts ligados a destinos reais. O retrato mantém variação circular clara/retangular escura no desktop. Fontes e ícones seguem o pipeline local.

Essas decisões preenchem lacunas do protótipo e devem constar no relatório do executor caso precisem de adaptação. O pacote contém planejamento e referências. Nenhum build, teste do checkout ou implementação foi realizado nesta preparação.
