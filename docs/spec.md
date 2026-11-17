# Especificação do redesign Hugo

Revisão 2 · 17/11/2026 · Execução posterior

## 1. Resultado e alcance

Implementar a proposta terminal do Stitch na home de adlermedrado.com.br, com temas Obsidian e Parchment, navegação mobile sobreposta, publicações recentes EN/PT e links de assinatura. Entregar uma implementação Hugo funcional e revisável localmente.

A home recebe o layout completo. Cabeçalho, navegação, tema e rodapé compartilhados se propagam às páginas que usam esses componentes. O corpo dos artigos conserva conteúdo, recursos e largura de leitura existentes. Identificar essas dependências antes de aplicar CSS global.

O checkout ainda precisa ser inspecionado. O acesso anterior ao WSL retornou E_ACCESSDENIED. Nome de tema, caminhos dos templates, versão Hugo, representação de idioma e processo de assinatura permanecem por confirmar. O texto extraído pelo Stitch registra conteúdo e rotas da coleta, sujeito à confirmação no projeto.

## 2. Autoridade das referências

Seguir instruções do usuário e AGENTS.md aplicáveis. Para decisões deste redesign, usar esta especificação e design.md. Preservar os contratos reais do checkout. PNGs selecionados em design.md orientam a aparência. HTMLs e DESIGN.md originais são material de consulta. As contradições resolvidas estão em analysis.md.

Os guias originais descrevem componentes adicionais, como campos e controles de formulário, que não são solicitados para a home. Implementar os componentes especificados neste pacote. Registrar adaptações técnicas necessárias no relatório final.

## 3. Fontes dos dados

| Dado | Fonte a usar | Tratamento de ausência |
| --- | --- | --- |
| Nome, alias, descrição e papel | Conteúdo/configuração atual da home | Consultar texto extraído e confirmar no checkout |
| Retrato | Asset de identidade local existente | Reservar área sem foto e registrar pendência |
| Menus e destinos | Configuração/páginas resolvidas pelo Hugo | Conferir rotas observadas na seção 4 |
| Recentes e idioma | Coleções, taxonomias e front matter atuais | Estado vazio por idioma e registro dos itens sem classificação |
| Assinatura, chave e fingerprint | Artefatos públicos e procedimento atual | Omitir detalhe ausente e manter link de verificação válido |
| Onion e Markdown | Configuração/links atuais | Omitir controle sem destino |
| RSS | Output real Hugo | Conferir /index.xml, observado na captura |
| Autoria e ano | Convenção do rodapé atual | Ano do build e autoria real |

Fotos dos HTMLs são ilustrações remotas diferentes para desktop e mobile. Usar um único retrato real/local do projeto, com recortes responsivos. Evitar atribuir a Adler a identidade da pessoa ilustrada pelo Stitch.

## 4. Componentes e comportamento

### S01. Cabeçalho

Identidade com prompt, nome/alias e link para a home. Desktop apresenta navegação horizontal abaixo da identidade, tema e links públicos opcionais. Mobile apresenta identidade compacta, controle de tema e botão MENU. Ícone de pessoa só aparece como link se houver função real, como About. Ícones interativos precisam de nome acessível.

Rotas observadas no texto extraído são /about, /projects, /posts, /missives, /now, /uses, /contact, /index.xml e /start. Confirmar sua resolução e reutilizar o mecanismo do projeto, considerando baseURL, trailing slash e prefixos de idioma. aria-current corresponde à página real. A home não deve marcar About como atual por copiar o mock.

Cabeçalho fixo como nas telas, com espaço equivalente no fluxo e compensação para âncoras e foco. A altura pode variar com zoom. Slogan só aparece quando existir no conteúdo atual e houver espaço. Omiti-lo em larguras compactas.

### S02. Apresentação

Desktop usa barra de terminal sobre grid 7/5. Coluna textual reúne papel profissional, h1 Adler Medrado, alias, descrição, índice e aviso de assinatura. Coluna visual contém retrato e detalhes públicos existentes. Rodapé do painel apresenta self-hosting/mirror/Markdown e o link para o feed Markdown.

No mobile, usar esta ordem de leitura e DOM lógico, com áreas de grid para alcançar a composição desktop.

1. Barra de terminal e prompt whoami --verbose.
2. Papel profissional, h1, alias e descrição.
3. Retrato.
4. Índice de navegação.
5. Aviso de assinatura.
6. Self-hosting, onion e Markdown.

Evitar duplicar a apresentação completa por viewport. Preservar as cinco intenções do índice extraído, incluindo Start Here quando a página existir. Usar lista semântica, com ramos decorativos ocultos a leitores de tela, quebra de linha e recuo pendente. Espaços repetidos não servem como layout.

Os pontos coloridos e o prompt são decoração, sem campo executável. A página tem um h1. O aviso de assinatura reutiliza a redação atual quando ela corresponde ao fluxo real.

### S03. Publicações recentes

Renderizar até cinco posts publicados por idioma, English e Portuguese. Reutilizar a seleção atual de posts. Excluir drafts e conteúdo futuro conforme a política atual. Não mudar flags de produção para exibir os exemplos do mock. Missives só participam se já integrarem a coleção atual.

Confirmar o mecanismo de idioma no checkout. A captura aponta para /languages/english/ e /languages/portuguese/, sugerindo taxonomia. Filtrar apenas por Page.Lang pode classificar todos os posts incorretamente. Inspecionar ao menos um post de cada idioma e o template atual. Usar taxonomia/front matter/multilinguismo conforme os dados reais. Itens não classificados devem ser registrados, sem adivinhar o idioma pelo título.

Ordenar por data de publicação decrescente conforme convenção atual, com desempate estável por permalink se necessário. Contagem no cabeçalho corresponde aos itens exibidos, no máximo cinco. Data visual ISO YYYY-MM-DD, em time com datetime. Datas, títulos, destinos e contagens vêm do Hugo.

Desktop mostra EN à esquerda e PT à direita. Cada painel tem título/arquivo, contagem, linhas com data, idioma e título e link para o arquivo completo. Títulos podem ocupar várias linhas e ficam integralmente acessíveis. Evitar depender de tooltip. Usar um link principal por entrada e seta decorativa.

Mobile exibe controles EN/PT e uma lista por vez. Idioma inicial acompanha a página quando EN/PT, com fallback EN. Seleção é local à página e dispensa persistência. Usar grupo nomeado com botões aria-pressed e aria-controls. role=tab exige teclado completo de abas e pode ser evitado neste escopo. Renderizar ambos os painéis no HTML. Sem JS, mostrar ambos com títulos e esconder os controles de alternância. Desktop sempre mostra ambos, qualquer que seja a seleção mobile. Ao voltar para mobile, restaurar a seleção local.

Coleção vazia recebe mensagem breve no idioma correspondente, mantendo o arquivo se existir. Um grupo vazio não afeta o outro. A seleção EN/PT não navega para outro idioma do site.

### S04. Integridade e rodapé

Após recentes, reproduzir bloco de verificação e privacidade, com destino real para o procedimento. A captura usa /posts/verify-signatures. Confirmar a rota. Badge do Mozilla Observatory pode reutilizar a informação existente, mas uma nota exibida precisa ter base no projeto. Se faltar evidência, manter só o link de análise.

Rodapé usa autoria atual e destinos públicos disponíveis. Barra mobile inferior oferece três atalhos reais com estética terminal e rótulos Home, Índice e Posts. Apontar para home e IDs existentes do índice e dos recentes. Nas páginas internas, usar essas âncoras na home. Reservar altura e safe-area. Só exibir estado ativo por seção quando existir lógica correspondente. Omitir os indicadores decorativos UID/TTY/GPG:OK e ano abreviado.

### S05. Menu mobile

Usar moldura terminal e lista vertical em árvore do menu dedicado, com oito destinos principais, controles Light/Dark e links públicos existentes de onion/verificação. Adaptar ao modo claro. O painel fica próximo do topo, com rolagem em tela baixa, evitando a grande área vazia do PNG.

Reutilizar modal acessível existente ou dialog nativo com showModal e tratamento de fechamento. MENU recebe aria-expanded e aria-controls. Ao abrir, guardar acionador, impedir rolagem do fundo e focar Fechar. Conter foco enquanto modal. Fechar por botão, Escape, backdrop ou seleção de destino. Restaurar foco quando o acionador existir. Ao entrar em desktop, fechar e limpar bloqueios de rolagem/inércia. Menu começa fechado.

Sem JS, oferecer os destinos no fluxo por details/summary ou navegação visível equivalente. Ocultar o fallback apenas quando a melhoria estiver pronta. :q! pode acompanhar Fechar. A dica UP/DOWN só aparece se o atalho existir. Tab/Shift+Tab e links nativos são suficientes.

## 5. Máquina de estados do tema

Escolhas explícitas são light e dark. Sem escolha armazenada válida, seguir prefers-color-scheme e mudanças do sistema. A escolha explícita prevalece, atualiza todos os controles e persiste pela chave já usada no projeto. Se precisar criar uma, usar theme com light/dark. Ignorar outros valores. Leituras/escritas de armazenamento usam try/catch. Falha de persistência mantém a troca funcionando no documento.

Aplicar preferência antes da pintura conforme CSP/pipeline existentes. Reutilizar nonce, hash ou script local adotado, sem relaxar CSP. Aplicar color-scheme aos controles nativos. Sem JS, CSS segue o sistema via media query. Cabeçalho e menu compartilham uma função de atualização. Texto, estado e tema efetivo sempre coincidem.

## 6. Integração Hugo e assets

Identificar baseof, home, partials, assets, tema e pipeline antes de editar. Reutilizar componentes e overrides do projeto. Registrar caminhos reais no relatório. Usar stack de build existente. Traduzir classes do Stitch para CSS ou para o pipeline já utilizado.

Produção serve os recursos visuais necessários localmente. Tailwind Play CDN, Google Fonts e googleusercontent são dependências demonstrativas dos mocks. Se JetBrains Mono existir, reutilizar. Caso contrário, obter WOFF2 oficial com licença e incluir conforme o repositório, ou registrar fallback monospace até o asset estar disponível. Reutilizar ícones locais ou glifos com nome acessível. Evitar font de ícones completa para poucos símbolos. receipt_long e person nunca devem aparecer como palavras internas na interface.

Escopar CSS da home. Preservar outputs Markdown/RSS, canonical/hreflang, taxonomias, redirecionamentos e metadados. Reutilizar traduções e fontes atuais de conteúdo.

## 7. Assinaturas e bytes do build

Localizar o artefato assinado e a ordem renderização/assinatura. Alterações em bytes de HTML assinado exigem nova assinatura pelo fluxo existente. Troca de tema em runtime modifica DOM, mas a validação deve considerar o artefato exato do procedimento público, seja HTML, Markdown ou outro formato.

Verificar amostra baseline com chave pública. Após mudança, executar fluxo de teste disponível e verificar sua saída. Se assinatura final ocorrer exclusivamente no deploy, registrar essa checagem pendente. Fixture com chave de teste pode validar integração quando o projeto oferecer esse caminho. Não enfraquecer verificação nem inferir assinatura válida pela simples existência de .asc. O redesign termina na revisão local, com publicação posterior.

## 8. Conclusão

Seguir roadmap.md e acceptance.md. Entregar diff revisável, comando exato de build/preview, resumo dos arquivos alterados, verificações, capturas quando disponíveis e limitações reais. Ferramenta visual indisponível gera verificação pendente explícita. Checkboxes só recebem conclusão após evidência correspondente.
