# JetBrains Mono: instalação e validação

A pendência de fonte em fallback do relatório inicial foi resolvida. O site inclui os WOFF2 oficiais da versão 2.304, com licença OFL em `static/fonts/jetbrains-mono/`. A origem e o commit estão no README desse diretório.

Foram incluídos os pesos normais 400, 500, 600 e 700, além de itálico 400. As declarações usam `font-display: swap`, URLs locais e preload do peso regular. O fallback permanece disponível durante o carregamento ou em caso de falha da fonte.

## Resultados

- `HUGO_CACHEDIR=/tmp/adler-audit-cache make verify-site-ui`: passou; o teste agora verifica declarações locais, assinatura binária WOFF2 e presença da licença, mantendo a proibição de serviços externos de fontes.
- `HUGO_CACHEDIR=/tmp/adler-audit-cache make verify-agent-discovery`: passou.
- Builds minificados normal e onion: passaram, com destino temporário.
- `git diff --check`: passou.
- Chromium: 36 combinações de página, largura e tema aprovadas. Home, About, Projects, Contact, Start e artigo com código foram conferidos em 320, 390 e 1440 px, nos temas dark/light. Sem overflow horizontal e com compensação da altura do cabeçalho correta.
- Todos os cinco estilos carregaram pela Font Loading API. `CSS.getPlatformFontsForNode` confirmou JetBrains Mono como fonte personalizada efetivamente renderizada no h1, papel profissional e alias do cabeçalho. Isso confirma uso real da fonte, além da declaração CSS.
- Nenhum erro JS, falha de rede ou resposta HTTP >=400 durante os testes. Fontes solicitadas exclusivamente ao servidor local. Tamanho zero em alguns registros de recursos corresponde ao reaproveitamento de cache; o carregamento e a renderização foram verificados separadamente.

[Resultados do navegador](validation-evidence/font-loading.json).

Builds usados:

```sh
HUGO_CACHEDIR=/tmp/adler-audit-cache .tools/bin/hugo --minify --destination /tmp/adler-font-review
HUGO_CACHEDIR=/tmp/adler-audit-cache .tools/bin/hugo --minify --config config.toml,config.onion.toml --destination /tmp/adler-font-onion-review
```

Os testes de navegador e estes builds não assinam nem publicam o site. As demais pendências do aceite não são encerradas por esta validação de fontes.
