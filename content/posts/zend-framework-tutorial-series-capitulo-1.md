---
title: "Zend Framework tutorial series capitulo 1"
date: 2010-01-19T18:56:50-03:00
draft: false
tags:
  - "zend-framework"
---

Estou iniciando uma série de tutoriais sobre Zend Framework onde eu pretendo mostrar desde os conceitos básicos até os
avançados.

Tentarei colocar um novo capítulo semanalmente, desta forma teremos uma janela boa para praticar o conteúdo proposto.

Este primeiro Tutorial da série visa demonstrar a instalação e configuração do ambiente bem como criar a estrutura de
diretórios de uma aplicação utilizando o Zend_Tool.

Antes de mais nada, os pré-requisitos para continuar este tutorial são:
1- Conhecimento de PHP utilizando os conceitos de Orientação a Objetos.
2- Configuração do ambiente (Apache, PHP, etc).
3- Domínio do Sistema Operacional que está utilizando.

IMPORTANTE: Caso você não possua este conhecimento eu sugiro que não continue com este tutorial e sim busque conhecer
estes pré-requisitos.

Eu vou partir do princípio que você já possui o ambiente pra rodar PHP instalado em sua máquina, ok?

Vamos lá!

Após terminar de ler este capítulo da série você estará apto a:
- Configurar variáveis de ambiente do sistema operacional
- Configurar domínios virtuais no apache
- Configurar o sistema operacional para lidar com hosts locais
- Criar a estrutura de diretórios de uma aplicação escrita em Zend Framework utilizando o Zend_Tool

**Baixando o Zend Framework e configurando o ambiente**

Primeiramente, baixe o Zend Framework em: http://framework.zend.com/

Descompacte o conteúdo deste pacote no local que você desejar e inclua o conteúdo da pasta library no include_path do
seu ambiente PHP.

Para setar o include_path você deverá alterar seu php.ini conforme orientações nesse link (http://www.php.net/manual/en/ini.core.php#ini.include-path).

Beleza!!! Agora vamos colocar o script do `Zend_Tool` no _PATH_ do sistema operacional.

No Mac, eu editei o arquivo _.bash_profile_ que se encontra no meu diretório home e coloquei o seguinte:

`export PATH=~/bin:/usr/local/bin:/Users/adlermedrado/dev/share/zf/bin:$PATH` onde _/Users/adlermedrado/dev/share/zf_ é o
local onde eu coloquei o conteúdo do arquivo que baixamos do site http://framework.zend.com e _/bin_ é onde se encontram
os scripts do Zend_Tool.

Em ambientes Windows, você deve ir no Painel de `Controle->Sistema->Avançado->Variáveis de Ambiente` e na variável `PATH` (
Se ela não existir, crie) colocar o caminho do local onde você descompactou o Zend Framework até o diretório bin.

_IMPORTANTE: Eu coloquei essa configuração do Windows conforme lembrei de cabeça. Caso haja algum erro me desculpem,
pois, eu não tenho nenhuma máquina windows aqui para verificar se o que falei está 100%.
Ok. Com as variáveis de ambiente configuradas, abra uma janela do terminal e digite o seguinte: zf.bat (windows) e
zf.sh (*nix)._

Se aparecer o help com uma listagem de comandos , está tudo certo. Caso o resultado seja uma mensagem de comando não
existente ou algo parecido, verifique a variável PATH do seu sistema operacional. 

**Criando a estrutura da aplicação**

Agora que o `Zend_Tool` está acessível da linha de comando, vamos criar a estrutura de nosso projeto.

O `Zend_Tool` é uma aplicação que roda na linha de comando (CLI) que nos facilita a criação de projetos com Zend
Framework.

Com ele nós po demos criar o projeto, controllers, actions, etc; Não precisa se preocupar pois veremos os comandos do
Zend_Tool detalhadamente nos próximos capítulos.

A seguir você poderá criar a estrutura de um projeto. Preparado?

No diretório de sua escolha (aqui na minha máquina eu escolhi: _/Users/adlermedrado/Sites/zf-series_) digite o seguinte
comando:

`zf.sh create project zf-series` (Lembre-se que em windows o comando é `zf.bat` ou somente `zf`).

Este comando criará a estrutura de diretórios necessária para uma aplicação com Zend Framework.

Você viu que dentro do diretório `zf_series` foram criados diversos diretórios mas nós entraremos em detalhes nesses
diretórios conforme formos avançando nos tutoriais com exceção do diretório public o qual falaremos agora.

O diretório public é o diretório público da aplicação (duh!)  ou seja, neste diretório nós colocaremos os arquivos de
imagens, javascript, CSS, etc. Este diretório será nosso DocumentRoot e como tal deve ser configurado no apache.

Os demais diretórios são da aplicação e não precisam ser acessados pela URL por intermédio do servidor web e isso nos dá
uma segurança maior pois os arquivos com regras de negócio, configurações de conexão com banco de dados, etc, não
precisam ser acessados pela URL para serem compilados e interpretados pelo PHP então, desta forma nós garantimos que
serão acessíveis pelo público somente arquivos de pouca importância (no sentido de segurança) como CSS, imagens e afins.

Como esta pasta é o DocumentRoot, nós devemos criar um domínio virtual para este projeto; Nós faremos isso configurando
o servidor web Apache Httpd.

**Configurando o servidor web**

No diretório onde meu Apache está instalado eu tenho um arquivo chamado extras/httpd_vhosts.conf e será nele que
adicionarei o domínio virtual para nossa aplicação.

Neste arquivo eu criei o meu virtual host da seguinte forma:

    <VirtualHost *:80>
    ServerAdmin adlermedrado@gmail.com
    DocumentRoot "/Users/adlermedrado/Sites/zf-series/public"
    ServerName zf-series
    ServerAlias zf-series
    ErrorLog "/private/var/log/apache2/zf-series-error_log"
    CustomLog "/private/var/log/apache2/zf-series-access_log" common
    <Directory "/Users/adlermedrado/Sites/zf-series/public">
    Options Includes FollowSymLinks
    AllowOverride All
    Order allow,deny
    Allow from all
    </Directory>
    </VirtualHost>

O próximo passo é configurar seu Sistema Operacional para que ele saiba que o endereço zf-series se encontra no domínio
virtual definido acima.

Em meu Mac eu editei o arquivo `/etc/hosts` e ele ficou da seguinte forma:

    ##
    # Host Database
    #
    # localhost is used to configure the loopback interface
    # when the system is booting. Do not change this entry.
    ##
    
    127.0.0.1 localhost
    255.255.255.255 broadcasthost
    ::1 localhost
    fe80::1%lo0 localhost
    
    # Meus dominios locais
    
    127.0.0.1 zf-series

Em um ambiente Windows você deve editar o arquivo `C:\Windows\System32\drivers\etc\hosts` e a edição dele é igual a do meu
exemplo acima.

**Testando o ambiente**

Se nossas configurações forem bem sucedidas, se nós digitarmos em um browser a URL http://zf-series ela será direcionada
para o index de nossa aplicação, se for mostrada uma tela de boas-vindas ao Zend Framework, a configuração foi realizada com sucesso.

Caso não funcione da forma correta, revise a configuração do domínio virtual e da configuração do DNS (hosts);

**Considerações finais**

Este primeiro capítudo da nossa série termina por aqui.

No próximo eu entrarei em detalhes na estrutura de pastas criada pelo Zend_Tool e na estrutura MVC do Zend Framework.

Nesta ocasião criaremos nosso primeiro controller e suas actions.

Espero que este tutorial seja útil para você. 
Não esqueça de dar seu feedback, ele é muito importante para os próximos capítulos da série.

Abraço.
