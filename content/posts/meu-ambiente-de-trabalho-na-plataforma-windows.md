---
title: "Meu ambiente de trabalho na plataforma Windows"
date: "2014-12-23"
tags:
  - "windows"
---

A cerca de um ano e alguns meses eu tenho usado a plataforma Microsoft Windows de uma forma sistemática e eu achei interessante escrever um pouco sobre o que eu costumo usar em meu computador.

#### Multimídia

- Eu faço uso recorrente do player desktop do [Rdio](http://rdio.com) para ouvir música em streaming. Este é um serviço que vale muito a pena e apesar de ver bastante gente migrando para o Spotify eu estou feliz com o Rdio pois ele me atende bem;
- [VLC](http://www.videolan.org/vlc/) — Player de vídeo open-source com suporte à maioria dos formatos disponíveis no mercado;
- [gPodder](http://gpodder.org/) — Gerenciador de podcasts. Ele é bem simples de usar e promete fazer sincronização dos podcasts com dispositivos móveis, no meu caso nunca funcionou com o Android, mas eu não ligo porque faço a sincronização manualmente mesmo. No geral é um software simples que em geral faz o que se propõe a fazer;

#### Gerenciamento de Pacotes

- [Chocolatey](https://chocolatey.org/) - Tenta fazer em ambiente Windows o que o APT, Zypper, Yum, etc., fazem em ambiente Linux. No geral ele é bom, hoje em dia não me vejo usando o Windows sem ele. [Eu escrevi um post sobre ele algum tempo atrás](http://blog.adlermedrado.com.br/2014/08/gerenciador-de-pacotes-para-windows/);

#### Emulador de terminal

- [Cmder](http://bliker.github.io/cmder/) — Até o momento o melhor emulador de terminal para Windows que eu já vi. Baixando o pacote completo ele já vem com Git e outras ferramentas úteis de ambientes _nix_ que o tornam além de uma opção mais atraente ao Prompt do DOS_ e ao _Powershell_ em uma ferramenta poderosa. Se você gosta de usar o terminal e está usando o Windows, o Cmder é para você;

#### Client de e-mail

- [Postbox](http://postbox-inc.com/) — Simplesmente o melhor cliente de e-mail do universo. É baseado no Mozilla Thunderbird, ou seja, é o Thunderbird funcionando direito. É pago mas não é caro, custa cerca de U$10 e vale cada centavo, além de suportar a grande maioria dos plugins para o Thunderbird, alguns foram otimizados para funcionar com ele como o Enigmail, sem falar na variedade de funcionalidades _out of the box_ que ele possui;

#### Editores de texto e suíte de escritório

- [Atom](https://atom.io/) — Eu tenho usado o Atom em meu dia-a-dia e estou gostando **mesmo ele sendo meio pesadinho**, mas como ele está numa fase beta e no geral ele tem me atendido eu estou insistindo. Quando ele sair da fase beta ele será uma ferramenta paga e eu estou considerando a hipótese de pagar por ela dependendo do preço;</p>
- [Markdownpad](http://markdownpad.com/) — Simplesmente o melhor editor Markdown para Windows. Ele possui uma versão grátis e uma paga. Eu comprei ele por valer cada centavo. É com ele que eu redijo os posts deste blog e o [meu livro](https://leanpub.com/devphpms) (que espero finalizar em breve);
- [Microsoft Office](http://office.microsoft.com/pt-br/) — É a melhor ferramenta do gênero e não adianta me falar de LibreOffice (esse nome me dá vontade de vomitar), porque ele ainda precisa comer muito feijão com arroz para se igualar ao seu congênere da Microsoft, verdade seja dita;

#### Ambiente de Desenvolvimento

- [Github for Windows](https://windows.github.com/) — As vezes eu o utilizo para gerir meus repositórios no Github, apesar de estar aos poucos deixando de usa-lo para o usar o sourcetree;
- [Sourcetree](https://www.atlassian.com/software/sourcetree/overview) — Ferramenta que facilita a gestão de repositórios Git e Mercurial;
- [Visual Studio Community 2013](http://www.visualstudio.com/en-us/news/vs2013-community-vs.aspx) — Estou utilizando para estudar C#, ASP.net MVC e ASP.net Web API;
- Para desenvolvimento [PHP](http://www.php.net) estou usando o Atom, mas estou realmente considerando a compra da licença do [PHPStorm](https://www.jetbrains.com/phpstorm/), que é a melhor IDE para PHP do mercado;
- [IIS 8.0](http://windows.microsoft.com/pt-br/windows-8/internet-information-services-iis-8-0) e [Microsoft Web Platform Installer](http://www.microsoft.com/web/downloads/platform.aspx) — Eu tenho usado este ambiente para rodar aplicações PHP e ASP.net localmente quando necessário, eu já testei usa-lo com node.js também e aparentemente rodou suave. No caso do PHP, eu tenho as versões do PHP 5.3,5.4,5.5 e 5.6 instaladas com ele.
- [Eclipse](http://www.eclipse.org) — Para usar com Java e linguagens que rodam sob a JVM, como Scala por exemplo, apesar de ainda não ter usado Scala e Play Framework profissionalmente, eu tenho estudado e gostado bastante;
- Tenho estudado a linguagem [Elixir](http://elixir-lang.org/) e para isso tenho usado o editor Atom também;
- Vim com o spf13-vim — Melhor distribuição do Vim que conheço e podeser instalada com o chocolatey usando o comando: _choco install spf13-vim_;

#### Browsers

- Mozilla Firefox;
- Internet Explorer 11;
- Google Chrome;

_Estou usando nesta ordem de preferência_.

#### Ambiente de Virtualização

- [Oracle Virtualbox](http://www.virtualbox.org);
- [Vagrant](https://www.vagrantup.com/);

_A maioria das VMs são CentOS, mas possuo algumas Ubuntu 14.04, ambas distros usadas com Vagrant e uma instalação desktop do CentOS com interface gráfica para uso cotidiano_.

#### Client SSH, SFTP e FTP

- [Putty](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) — Simples e objetivo, é o melhor _client_ SSH que existe;
- [WinSCP](http://winscp.net/eng/index.php) — Mesma coisa que o Putty, só que para SFTP e FTP

#### Criptografia

- [GPG4Win](http://www.gpg4win.org/) — Port para Windows do GnuPG. Uso normalmente para criptografar e-mails;
- [Enigmail](https://www.enigmail.net/home/index.php) — Plugin GPG/GnuPG para Thunderbird que uso com o Postbox;
- [Safe](http://www.getsafe.org/) — Ferramenta que me permite gerir volumes criptografados;

_Se quiser me mandar e-mail criptografado, minha chave pública PGP segue abaixo:_

    -----BEGIN PGP PUBLIC KEY BLOCK-----
    
    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
    KU3Diyo=
    =dHry
    -----END PGP PUBLIC KEY BLOCK-----

Ferramentas de Comunicação aka Instant Messengers

- [Skype](http://www.skype.com) — Se não fosse tão vulnerável e cheio de bugs, seria  
    perfeito;
- [Pidgin](https://www.pidgin.im/) — Eu não gosto do Google Hangouts, por isso enquanto houver  
    a possibilidade, eu usarei o Pidgin para me comunicar via Google Talk;
- [HipChat](https://www.hipchat.com/) — Uma das melhores ferramentas de comunicação para equipes de desenvolvimento já criadas;

Cloud Drive

- [Dropbox](http://dropbox.com);
- [OneDrive](https://onedrive.live.com/about/pt-br/);

Bitcoin Wallet

- [Multibit](https://multibit.org/) — Não é a melhor opção, admito, mas eu realmente não tive _paciência_ ainda para usar o app oficial do [Bitcoin](https://bitcoin.org) devido à demora para fazer o download do [blockchain](https://en.bitcoin.it/wiki/Block_chain), como eu não movimento tanto dinheiro assim, eu prefiro assumir o risco.

Resumindo …

Acho que é isso, se eu me lembrar de algo relevante eu atualizarei o post.

E você, tem alguma sugestão de algo interessante que eu não tenha colocado na lista?
