# Direção visual consolidada

Medidas deste documento são decisões de implementação, derivadas da estrutura HTML e da hierarquia dos PNGs. Capturas têm escalas diferentes. Comparar proporções e alinhamento em CSS pixels, sem usar largura bruta do PNG como largura do contêiner.

## Referência por estado

| Estado | Referência em stitch/ |
| --- | --- |
| Desktop dark | home_adler_medrado/screen.png |
| Desktop light | home_light_parchment_adler_medrado_1/screen.png |
| Mobile dark | home_mobile_adler_medrado_1/screen.png |
| Mobile light | home_mobile_adler_medrado_2/screen.png |
| Menu aberto | menu_drawer_mobile_adler_medrado/screen.png, adaptado aos dois temas |

A variante home_light_parchment_adler_medrado_2 é escura. Seu rótulo Light não define estado correto. Evitar combiná-la com a paleta clara por inferência do nome.

## Estrutura e ritmo

| Propriedade | Desktop a partir de 1024 px | Abaixo de 1024 px |
| --- | --- | --- |
| Contêiner | max-width 960 px, margin-inline auto, border-box | width 100%, border-box |
| Padding lateral do contêiner | 24 px | 16 px |
| Cabeçalho | Duas faixas, altura inicial 80 px | Faixa compacta, altura inicial 64 px mais safe-area |
| Hero | Padding 24–32 px, grid 7/5, gap 24 px | Coluna única, painéis com padding 12–16 px |
| Logs | Duas colunas iguais, gap 16 px | Um painel de idioma visível com JS |
| Intervalo entre seções | 32–40 px | 20–24 px |
| Espaço entre blocos internos | 16–24 px | 12–16 px |
| Raio de cartões | 6–8 px | 4–8 px |
| Borda estrutural | 1 px | 1 px |

No tablet de 768 a 1023 px, conservar composição empilhada e aumentar o conforto dos espaços conforme disponível. Abaixo de 640 px, simplificar metadados e esconder slogans secundários. Não mudar a largura entre temas.

Nome e descrição têm precedência visual. Árvore e retrato formam o segundo nível. Metadados e decoração ficam no terceiro. A estética terminal deve resultar da tipografia, bordas, comandos e alinhamento, com pouca ornamentação.

## Tokens CSS de referência

Usar nomes equivalentes se o projeto já tiver tokens. Centralizar cores, sem copiar dezenas de variantes Material do export.

| Papel | Obsidian dark | Parchment light |
| --- | --- | --- |
| Fundo | #0f1417 | #f5f2eb |
| Painel principal | #0e1418 | #ffffff |
| Painel rebaixado/barra | #0a0f12 | #eae5d9 |
| Painel secundário | #171c1f | #fbf9f5 |
| Texto principal | #dfe3e7 | #1a1d20 |
| Texto secundário legível | #8a99a8 | #5c6370 |
| Borda estrutural | #1a262c | #d6cebf |
| Destaque/prompt | #00ff66 | #0a6836 |
| Links | #00d9b4 | #0369a1 |
| Acento auxiliar | #00b0ff | #b45309 |
| Foco | #00ff66 | #0a6836 |

Verificar contraste nas combinações efetivas, inclusive opacidade e fundo de hover. Texto normal mira 4,5:1 e controles/foco 3:1. Bordas muito discretas são decoração e não devem ser o único indicador de controle. Usar sublinhado em links de texto e outline visível de 2 px com offset no teclado.

## Tipografia

JetBrains Mono, com fallback ui-monospace, SFMono-Regular, Consolas, monospace. Reutilizar os pesos disponíveis, com preferência por 400, 500, 600 e 700, evitando baixar variantes sem uso. Font-display swap. Conservar tipografia editorial atual dentro do corpo de artigos.

| Elemento | Desktop | Mobile |
| --- | --- | --- |
| h1 da home | 36/48 px, peso 700, tracking -0.02em | 26/36 px, peso 700 |
| Título de recentes | 28/38 px, peso 700 | 20/28 px, peso 600 |
| Descrição e corpo de home | 15/26 px | 14/24 px |
| Título de post | 14/22 px | 14/22 px |
| Metadados | 12/20 px | 12/20 px |
| Labels decorativos | 10–11/16 px | 10–11/16 px, reduzir quantidade |

As telas mobile usam bastante texto pequeno. Este pacote aumenta texto de leitura sem ampliar badges secundários. Botões de toque devem ter área útil de aproximadamente 44×44 px, admitindo padding invisível dentro do layout.

## Retrato e efeitos

Desktop dark usa moldura retangular com cantos de 8–12 px, proporção próxima de 1:1. Desktop light usa recorte circular. Limitar largura a aproximadamente 288–320 px conforme coluna, sem overflow. Mobile usa frame retangular largo, proporção aproximada 3:2, object-fit cover e posição que preserve o rosto. Usar o mesmo arquivo de identidade em ambos os temas, sem forçar transformação monocromática se isso prejudicar a foto.

Reservar dimensões para reduzir deslocamento de layout. Foto é img com alt factual e breve, sem repetir a descrição imaginária do mock. Se o rosto não puder ser identificado, não inventar alt que o chame de Adler.

Permitir glow escuro muito sutil na moldura/prompt e leve separação por borda/sombra no claro. Evitar radar pulsante e animações contínuas. Cursor pode ficar estático. Qualquer movimento adotado respeita prefers-reduced-motion. Pontos de terminal são aria-hidden. O fundo não recebe textura que reduza a legibilidade.

## Restrições de layout

Usar min-width 0 nas colunas, listas e elementos flexíveis. Quebrar strings longas e fingerprint quando necessário. Evitar width 100vw para o corpo e altura mínima fixa de captura. Preservar rolagem nativa, zoom e seleção. Reservar espaço para cabeçalho/barra inferior fixos e para safe-area. O drawer recebe max-height compatível com 100dvh e overflow-y auto, com fallback de viewport apropriado ao projeto.
