# Critérios de aceite

Resultados locais registrados em [validation-final-2026-11-17.md](validation-final-2026-11-17.md). D07 foi excluído deste aceite pelo usuário e será executado manualmente depois.

Registrar para cada cenário resultado obtido, comando/ferramenta usada e eventual limitação. A lista começa pendente porque este pacote é planejamento. Aproveitar testes existentes do projeto. Usar inspeções e verificações direcionadas para os comportamentos novos.

## Comparação visual

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| V01 | Home a 1440 px, dark e light | Contêiner 960 px, hero 7/5, dois painéis EN/PT e mesmas proporções entre temas |
| V02 | Home a 390 px, dark e light | Ordem mobile definida, tema/menu alcançáveis, títulos completos e barra inferior livre |
| V03 | Home a 320, 768, 1023 e 1024 px | Nenhuma rolagem horizontal da página, mudança de layout coerente e sem sobreposição |
| V04 | Zoom de 200%, título muito longo e fingerprint completo | Texto legível, quebra de linha e foco/âncoras visíveis |
| V05 | Retrato ausente ou carregamento falha | Layout utilizável e fallback registrado, sem foto ilustrativa atribuída ao autor |
| V06 | Artigo com código/listas e página simples, ambos os temas | Conteúdo e largura editorial preservados, componentes globais consistentes |

Capturar pelo menos quatro estados V01/V02 e o menu aberto. Comparar com os PNGs selecionados em design.md, considerando escala da captura, dados reais e diferenças autorizadas em analysis.md. Se não houver ferramenta visual, registrar a revisão pendente e evitar afirmar fidelidade validada.

## Tema e navegação

| ID | Ação | Resultado esperado |
| --- | --- | --- |
| I01 | Primeira visita com sistema claro/escuro e sem preferência | Modo do sistema aplicado |
| I02 | Escolher tema, recarregar e navegar para artigo | Escolha explícita persiste e controles mostram estado efetivo |
| I03 | Armazenamento bloqueado ou valor inválido | Página não quebra. Valor inválido segue sistema. Troca funciona no documento |
| I04 | Alterar tema do sistema antes/depois de escolha explícita | Segue sistema antes, preserva escolha depois |
| I05 | Abrir menu por teclado, usar Tab/Shift+Tab e Escape | Foco contido no modal, fechamento restaura acionador e rolagem |
| I06 | Fechar por botão, backdrop e ativação de link | Menu fecha e estado aria-expanded acompanha |
| I07 | Com menu aberto, mudar para desktop e voltar | Nenhum bloqueio residual, conteúdo navegável e menu fechado |
| I08 | Trocar tema pelo menu e pelo cabeçalho | Componentes e controles sincronizados |
| I09 | Selecionar PT no mobile, ir para desktop e voltar | Desktop mostra ambos, mobile mantém PT selecionado |
| I10 | Desativar JS e recarregar | Menu/destinos acessíveis, ambos os grupos de posts visíveis e tema CSS funcional |
| I11 | Ativar atalhos inferiores em home e página interna | Navega para home/índice/recentes reais, sem conteúdo encoberto |
| I12 | Rolar em viewport baixo e usar toque/teclado | Último item e botão de fechar alcançáveis, alvos e foco visíveis |

## Conteúdo e build

| ID | Verificação | Resultado esperado |
| --- | --- | --- |
| D01 | Comparar posts recentes com coleções reais | Até cinco por idioma, ordem e classificação corretas, metadados dinâmicos |
| D02 | Coleção com 0, 1 e mais de 5 posts em fixture/cópia temporária | Mensagem vazia, contagem real e limite cinco, outro idioma preservado |
| D03 | Adicionar post temporário, draft e futuro | Publicado entra conforme ordem. Demais seguem política de produção |
| D04 | Abrir menus, árvore, arquivos, RSS, Markdown, onion e verificação | Destinos resolvem conforme projeto, sem href # de placeholder |
| D05 | Inspecionar rede e console | Sem novos CDNs de mock, palavras internas de ícone, recursos 404 ou erros JS |
| D06 | Executar build original/final e comparar rotas e outputs | Build passa, outputs necessários existem, canonical/hreflang/feed preservados |
| D07 | Validar amostra assinada pelo procedimento real | Assinatura e artefato correspondem, sem claims de verificação fabricados |
| D08 | Revisar HTML/foco/contraste | Um h1, headings coerentes, links distinguíveis e contraste conforme design.md |
| D09 | Revisar diff e git status | Mudanças focadas e alterações anteriores do usuário preservadas |

Se D07 depender da chave privada de produção, registrar exatamente qual checagem local passou e qual verificação pós-build/deploy ficou pendente. Nunca incluir chave privada em fixture ou relatório.

## Relatório do executor

Entregar caminhos reais alterados, mecanismo de idioma identificado, comandos de build/preview, cenários executados, evidências visuais e pendências concretas. Identificar ajustes ao plano e seu motivo. Distinguir build bem-sucedido, testes de comportamento e inspeção visual, para que o usuário saiba o que foi verificado.
