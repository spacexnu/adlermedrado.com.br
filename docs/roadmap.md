# Roteiro de execução

Validação local concluída: [relatório final](validation-final-2026-11-17.md). O usuário executou a assinatura manualmente e a [verificação posterior](signed-build-validation-2026-11-17.md) confirmou 955 assinaturas válidas, mas identificou 46 arquivos residuais em `public/`. Limpar o inventário e assinar novamente antes de publicar é recomendado; publicação não executada. As alterações solicitadas na conversa prevalecem sobre as diferenças visuais originais do pacote.

Executar da raiz do checkout, em ordem. Atualizar checkboxes durante a implementação. Cada etapa termina com um resultado verificável. Preservar alterações pré-existentes do usuário.

## R0. Reconhecimento e baseline

- [x] Ler os AGENTS.md aplicáveis e verificar git status.
- [x] Identificar versão Hugo, configuração, tema/módulos e comandos de build/preview em README, scripts e CI.
- [x] Mapear home, base, cabeçalho, rodapé, CSS, JS e retrato. Registrar caminhos reais no relatório de execução.
- [x] Inspecionar um post EN, um PT e o seletor de recentes. Confirmar taxonomia/front matter/multilinguismo usados.
- [x] Resolver menus, /start, arquivos EN/PT, RSS, Markdown, onion, verificação e chave pública.
- [x] Identificar artefato assinado e ordem do pipeline. Verificação criptográfica reservada ao usuário, conforme instrução posterior.
- [x] Executar build original em saída temporária. Registrar erros pré-existentes e inventário de URLs/outputs para comparação.

Conclui com caminhos e contratos mapeados e build original reproduzido, ou impedimento específico registrado. Falta de foto não impede progresso nas outras partes. Evitar inferir paths de template a partir dos nomes dos mocks.

## R1. Fundação visual e tema

- [x] Integrar tokens de design.md, fonte/fallback, ícones locais, foco e safe-area.
- [x] Implementar tema seguindo sistema, persistência tolerante a falhas e controles sincronizados.
- [x] Ajustar cabeçalho, menus e rodapé compartilhados.
- [x] Conferir home e artigo de amostra nos dois modos, incluindo parágrafos e blocos de código.

Conclui com troca e recarregamento funcionais, sem impacto involuntário na largura editorial dos artigos.

## R2. Home e dados

- [x] Montar apresentação, retrato, índice e informações públicas conforme S02.
- [x] Gerar até cinco posts por idioma com o mecanismo confirmado em R0.
- [x] Construir painéis desktop e linhas mobile a partir dos mesmos dados.
- [x] Implementar controles EN/PT, fallback sem JS, contagens, arquivos e estado vazio.
- [x] Conectar integridade, feeds e privacidade a destinos reais. Tratar placeholders conforme analysis.md.

Conclui com conteúdo novo participando dos recentes sem editar o template, títulos íntegros e links reais. Testar coleção curta/vazia em fixture ou cópia temporária, sem alterar conteúdo publicado.

## R3. Responsividade e menu

- [x] Aplicar breakpoints, ordem mobile e proporções de design.md.
- [x] Implementar menu sobreposto, foco, teclado, fechamento e fallback de S05.
- [x] Conectar atalhos inferiores e reservar espaço de conteúdo.
- [x] Redimensionar com menu aberto e com seleção PT ativa para conferir limpeza de estado.
- [x] Testar zoom, seleção, rolagem e JS desativado.

Conclui quando o visitante navega por teclado/toque, troca tema e alcança o último link sem obstrução.

## R4. Verificação e revisão

- [x] Executar acceptance.md, registrando resultados e limites da validação local; D07 excluído pelo usuário.
- [x] Rodar build final em saída temporária e comparar outputs/rotas/feed/canonical com baseline.
- [x] Assinatura executada manualmente pelo usuário e verificada com a chave pública: 955 assinaturas válidas. Inventário de saída com resíduos registrado no relatório posterior.
- [x] Comparar capturas dos quatro estados da home e menu com os PNGs e as alterações posteriores autorizadas. Corrigir hierarquia, proporções e legibilidade.
- [x] Revisar diff, dependências remotas e arquivos gerados. Manter saídas temporárias fora do commit.
- [x] Entregar resumo, comando exato de preview, arquivos alterados e evidências. Atualizar checkboxes.

Conclui com verificações locais atendidas e resultado pronto para revisão do usuário. Publicação, push e alteração de infraestrutura dependem de solicitação posterior.
