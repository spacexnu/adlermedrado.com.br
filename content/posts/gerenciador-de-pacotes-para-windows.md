---
title: "Gerenciador de pacotes para Windows"
date: "2014-08-24"
tags:
  - windows
---

Não é segredo que nos últimos meses eu tenho usado [Windows](http://windows.microsoft.com/pt-br/windows/home) como a
minha principal plataforma de trabalho, apesar de lidar com servidores linux diariamente e também usar VMs linux como
ambiente de trabalho em alguns projetos.

Como estou acostumado a trabalhar com diversas ferramentas comuns em ambientes _nix_ eu sempre busco por alternativas
similares para a plataforma Windows e hoje eu irei demonstrar rapidamente o [chocolatey](https://chocolatey.org/), que é
um gerenciador de pacotes similar ao apt-get no linux, só que para windows.

Para instalar, basta abrir uma janela do [Powershell](http://technet.microsoft.com/pt-br/library/bb978526.aspx) em modo 
administrador e digitar:

    iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))

Após a instalação, o comando _choco_ será disponibilizado no sistema, e a partir daí diversas aplicações poderão ser
instaladas (e desinstaladas se for o caso) via linha de comando.

Os comandos básicos são:

_list_

    choco list

Exemplo: Listar todos pacotes que possuem _git_ no nome

    choco list git

_update_

Ex: Atualiza todos os pacotes

    choco update

Ex: Atualiza pacote específico

    choco update git

_uninstall_

    choco uninstall git

_help_

    choco /?

É isso. Mais uma _hidden gem_ do mundo windows que até pouco tempo atrás eu não conhecia.

Para conhecer melhor, visite a [documentação do projeto](https://github.com/chocolatey/chocolatey/wiki).