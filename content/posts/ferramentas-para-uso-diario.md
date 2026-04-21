---
title: "Ferramentas para uso diário"
date: 2023-10-12T10:44:28-03:00
languages: ["portuguese"]
tags:
  - "tools"
  - "dicas"
  - "general"
---

Eventualmente me perguntam o que eu costumo usar no computador em meu dia-a-dia,
então decidi escrever esse post, assim registro o que uso atualmente afim de
poder comparar com o que estarei usando no futuro.


Eu sou uma pessoa de hábitos simples, então diferente de muita gente que escreve
posts como esse, eu não tenho fogo no rabo e saio usando tudo que vejo pela
frente, sendo assim, segue a lista.


## Utilitários de uso geral


**[iCloud](https://icloud.com)** - Estou usando iCloud Drive para armaazenar
documentos, fotos, etc.

Como aqui em casa todos usamos produtos da Apple em algum nível, eu tenho uma
conta familiar no iCloud que é compartilhada com a minha esposa e meus filhos,
assim guardamos as fotos, documentos, etc, num único lugar.

Também com iCloud eu mantenho as minhas contas de email, o iCloud permite usar
domínios customizados de email, então meus emails sob o domínio `adlermedrado.com.br`
estão usando a infra do iCloud.

**Apple Mail** - Tanto no Mac quanto no iPad e iPhone, eu uso o apple mail,
inclusive o email do Gmail, que ainda uso para algumas coisas.

**[PGP](https://pt.wikipedia.org/wiki/Pretty_Good_Privacy)/[GnuPG](https://www.gnupg.org)** - Aproveitando
que estamos falando de email, eu uso o PGP/GPG para
criptografar emails que eu considero sensíveis (na verdade, não só emails).
Eu uso a versão opensource do [GPG Tools](https://gpgtools.org) no mac,
mas infelizmente após a atualização pro [macOS Sonoma](https://www.apple.com/br/macos/sonoma/)
a [integração dele com o apple mail foi prejudicada](https://gpgtools.org/sonoma) por mudanças que a apple
fez na API do Apple Mail, portanto, por enquanto crypt e decrypt só via linha de comando, mesmo.

Eu uso o GPG para assinar todas as páginas desse site, é só importar a [minha chave
pública](https://adlermedrado.com.br/pub-key.asc) e executar o comando que
está no rodapé dessa página, para validar a autenticidade.

**Apple Notes** - Para notas diárias eu uso o Apple Notes mesmo, assim já integra
com todos os meus dispositivos via iCloud.

**Apple Shortcuts** - Essa é uma ferramenta de automação presente nos SOs da Apple,
com ela é possível automatizar tarefas repetitivas. Como bom preguiçoso que sou,
eu tento automatizar tudo que posso, algumas coisas com o shortcuts, outras com
scripts bash. Por exemplo, eu tenho playlists no Apple Music que costumo escutar
quando vou treinar, então com o shortcuts basta um click e a playlist já abre
tocando no apple music. Com o shortcuts dá até para iniciar a playlist assim que
o GPS do iPhone identificar que cheguei na academia, bem prático.

**Apple Music** - Uso pra ouvir música 😬, o apple music vem incluso no pacote
familiar que eu pago do iCloud.

Eu também tenho o Youtube Music, que vem com o Youtube Premium por tabela e o
Spotify, queria muito não pagar o Spotify, mas meus filhos usam e aí eu pago o
plano família. Esporadicamente uso ele pra escutar alguns podcasts e também
algumas músicas tipo os álbuns antigos do Álibi e Câmbio Negro, que só tem lá

**Safari e Brave** - No dia-a-dia, eu uso o Safari para navegar na web, com exceção
de quando vou usar qualquer coisa relacionada ao [Nostr](https://nostr.com),
aí uso o Brave devido à integração com o [Alby](https://getalby.com), que
gerencia minhas chaves do Nostr e algumas coisas relacionadas à minha carteira
[Lightning Network](https://lightning.network) do [Bitcoin](https://bitcoin.org/en/).

Aproveitando: Se não conhece o Nostr e não conhece Bitcoin, procure se informar. Fica a dica.

**[Alfred App](https://www.alfredapp.com)** - Uso para substituir o spotilight do
macOS, ele tem uns recursos interessantes principalmente se pagar o PowerPack, como os workflows que automatizam muita coisa do nosso dia-a-dia.
Existem alternativas a ele, como o [Raycast](https://www.raycast.com),
mas eu não vejo motivos para mudar.

**Awake** - Ferramenta similar ao `caffeine` ou `amphetamine`, usadas para impedir
que o monitor desligue ou entre em modo de proteção de tela.


## Suíte de Escritório

**Apple Pages** - Para edição de textos

**Apple Numbers** - Para planilhas

**Apple Keynote** - Para apresentações

Mas depois de ver os trabalhos da faculdade que a minha filha produz usando o Canva,
estou seriamente pensando em usa-lo também para algumas coisas.


## Edição de áudio e vídeo

**Apple iMovie** - Os vídeos que publico no Youtube são editados com ele.
Por enquanto me atende.

**Apple Garage Band** - Quando preciso fazer edição de áudio.
Quem já escutou a minha famosa canção **suco de cajú**, sabe do que estou falando.


##  Terminal / Shell


**[Wezterm](https://wezfurlong.org/wezterm/)** - Depois de muitos anos usando o
[iTerm2](https://iterm2.com), decidi testar outras opções.

Tentei o [Alacritty](https://github.com/alacritty/alacritty) mas não curti muito, apesar de ser muito rápido.

Testei o [Warp](https://www.warp.dev) e apesar de ter uma proposta bem difente, não fez muito
sentido pra mim ter que criar um usuário/senha no site do Warp e ter que autenticar
pra usar o terminal. Não sei se isso ainda é necessário mas desisti na época
por causa disso, além disso, me pareceu muito inflado, cheio de coisas que eu provavelmente não usaria.


O Wezterm por sua vez, entregou para mim tudo que eu preciso, uma interface simples,
é extensível por meio de scripts lua, é rápido pois roda via GPU e é multiplataforma, ao contrário do iTerm2.
Um ponto interessante também, é que o desenvolvedor dele era core developer do PHP na época em que eu
usava muito essa linguagem e eu sempre admirei o trabalho dele, o que me dá confiança
em usar o emulador de terminal que ele desenvolve. Estou considerando até ajudar financeiramente com o projeto.

O iTerm2 não é ruim, pelo contrário, mas é tipo um canhão para matar uma mosca. Só isso.

**[Starship](https://starship.rs)** - Deixa o terminal bonito, cheio de firula e sem overhead.

**[Bash](https://www.gnu.org/software/bash/)** - Estou acostumado com ele. Tentei usar o ZSH por um tempo, quando ele tinha recursos que o bash não tinha,
mas hoje, o bash moderno já atende em tudo que preciso, sem falar que o bash está em todo lugar, qualquer script que você encontra na internet,
são feitos em bash. Outra dica: Shellcheck salva vidas.


**[tmux](https://github.com/tmux/tmux/wiki)** - Existem algumas alternativas ao tmux,
mas uso ele no dia-a-dia por ser o que estou mais acostumado, mesmo.

**[The Silver Searcher](https://github.com/ggreer/the_silver_searcher)** - É uma
ferramenta alternativa mais rápida ao clássico ack. O único problema é que não
está disponível por padrão em todos os servidores.


## Sec


**[1Password](https://1password.com)** - Já usei o Lastpass e achei ruim, usei por muito tempo o Bitwarden,
que é excelente também, inclusive pagando anualmente para ajudar o projeto, mas
nenhuma ferramenta desse gênero se compara ao 1Password.

A integração que o 1Password tem com o macOS e iPhone é a melhor que já vi dentre
esse tipo de ferramenta. Vale o preço.

Com ela eu guardo minhas senhas, notas secretas que eu não confio em deixar no Apple Notes,
OTP/2FA, gestão das minhas chaves SSH, assim não preciso deixa-las no _.ssh_ pois
uso um _ssh-agent_ do 1Password, que pede minha senha ou biometria  sempre que
preciso usar a chave e também protege minha chave privada em caso de acesso
indevido ao meu computador.

**[Kaspersky](https://www.kaspersky.com.br/home-security)** - Esse é o ponto mais
polêmico, pois muitos dizem que não precisa usar esse tipo de ferramenta em Mac,
mas ele é mais do que apenas um anti-virus, oferecendo alguma segurança a mais
contra phishing, etc.

E antes de aparecer alguém falando: **Ah, mas é russo, eles vão ficar te espionando.**
🤒 Tu confia no Facebook/Meta, Google,
Microsoft, etc. Não enche.

**[Proton](https://proton.me)** - Uso os serviços deles, mas acabando a vigência da assinatura anual
que tenho, vou parar de usar. Atualmente, a única ferramenta deles que ainda
estou usando, é a VPN. Ano que vem vou contratar outra, mas ainda não decidi qual.


## Development


Nesse ponto não entrarei em detalhes de tecnologias que uso, como linguagem,
RDBMS, Message brokers, etc, pois isso muda quase todo dia.

Vou focar apenas nas ferramentas:

**[Intellij Idea](https://www.jetbrains.com/idea/)** - É a melhor IDE que existe na
face da terra. Vale todo centavo que pago anualmente.

Ela possui suporte para todas as linguagens que eu uso atualmente, o que me
permite usar a mesma ferramenta pra tudo e assim não ter problema com teclas de
atalho, etc, que eu teria se usasse uma ferramenta pra cada tecnologia que uso.

Ela ainda oferece suporte a um monte de coisa, como Redis, RDBMS, Kubernetes,
Docker, etc.

Eu uso o IdeaVim para mapear os atalhos e comandos de teclado.

**[Neovim](https://neovim.io)** - Recentemente eu mudei de Vim para NeoVim, percebi
que alguns plugins do vim que eu usava, já não estavam mais com o
desenvolvimento ativo como antes, enquanto os plugins para neovim seguem com
força total.

Eu precisei mudar toda a minha configuração mas estou gostando do resultado.
Normalmente uso este editor para scripts ou escrever textos como esse aqui.

**[Github](https://github.com)** - Eu ainda uso o Github como principal plataforma
Git de meus repositórios, apesar de possuir alguma coisa no Gitlab também. Entretanto estou
estudando a possibilidade de migrar tudo para uma instância própria do Gitlab ou
Gitea, estou mais inclinado a usar o Gitea.


## É isso
**Importante:** Essa lista descreve o que uso nos meus computadores pessoais.
Apesar de eu usar algumas dessas ferramentas no computador do meu empregador, o
setup nem sempre é o mesmo, por diversos motivos.


**Outra coisa:** Eu gostaria de saber a sua opinião, quais ferramentas você usa, se concorda
ou discorda de algo que eu disse aqui, mas infelizmente aqui nesse site você
não poderá me dizer. Eu vou escrever um post sobre isso, mas eu reformulei esse
site a algum tempo e removi qualquer coisa que pudesse invadir a privacidade
de quem o visitasse, então aqui você não encontrará Javascript, manipulação de cookies,
variáveis de sessão, rastreadores das _Big Techs_, nada.

Portanto, caso queira me dar sua opinião ou fazer um comentário,
recomendo que me procure no [Twitter](https://twitter.com/adlermedrado) (ou melhor,
no [X](https://x.com/adlermedrado)) ou no [Nostr](https://iris.to/amedrado).

Falou, até mais.
