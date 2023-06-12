---
title: "Zend Framework tutorial series capítulo 2"
date: 2010-02-16T21:55:16-03:00
draft: false
tags:
  - "zend-framework"
---

Tudo bem?

Demorou um pouco para eu publicar este capítulo pois infelizmente eu tive alguns contratempos nas últimas semanas, mas
de qualquer forma, é muito bom saber que você se interessou por esta série de tutoriais e voltou para continuar
implementando um sistema de exemplo.

**Recapitulando**

No primeiro capítulo desta série eu mostrei como configurar o seu ambiente de desenvolvimento para utilizar o Zend
Framework com o `Zend_Tool`.

[Reveja o Capítulo 1 do tutorial](/posts/zend-framework-tutorial-series-capitulo-1/).
Uma observação importante: Eu estou utilizando a versão 1.10 do Zend Framework. Certifique-se que você também esteja
utilizando esta mesma versão para melhor aproveitamento do tutorial. Mantenha sua estrutura atualizada, ok?
Model, View, Controller

O Zend Framework utiliza o pattern MVC, que permite que as camadas das aplicações sejam separadas em camadas.

Basicamente, as camadas do MVC são 3: Model (Modelo), View (Visão) e Controller (Controle) e cada uma dessas camadas
devem implementar especificamente aquilo que diz respeito à funcionalidade em questão; Mas você deve estar se
perguntando: "WTF esse cara tá falando? Até agora ele falou, falou e falou mas não disse diretamente o que é o Model, o
View e nem o Controller". E eu responderia: "Relaxa... , vou falar sobre isso agora.".

**Enfim, Vamos lá**

A camada de modelo é onde nós implementamos a lógica de negócios, acesso a tabelas e banco de dados e a manipulação
direta (INSERT, UPDATE, DELETE) desses dados.

A camada de visão é aquela onde nós recebemos informação fornecida pelo usuário e também onde nós mostramos informações
ao usuário proveniente da camada de modelo por exemplo.

A camada de controle é a camada que nós usamos para unir os dados das duas camadas citadas anteriormente. Por exemplo:
No controller nós podemos trabalhar com dados provenientes do modelo, prepara-lo e em seguida passa-los para a view que
apresentará estas informações ao usuário; Nós podemos também por meio do controller, receber informações da camada de
visão e passa-las à camada de modelo. Eu costumo dizer que esta camada trabalha como uma espécie de atravessador.

Não é minha intenção e nem pretensão falar tudo sobre MVC aqui e sim somente aquilo que é necessário para que você possa
implementar uma aplicação utilizando este pattern em conjunto com o Zend Framework e mostrar como este framework o
implementa.

Caso você queira saber mais sobre MVC siga os links abaixo:

http://ootips.org/mvc-pattern.html
http://pt.wikipedia.org/wiki/MVC

**O MVC com Zend Framework**

Eu prefiro mostrar como este padrão é implementado no Zend Framework na prática pois este é meu jeito e é isso que
pretendo fazer neste tutorial, então, neste capítulo, sempre que eu for trabalhar com uma das camadas eu vou deixar isso
bem explícito.

Será implementado algum projeto neste Tutorial?

Sim e como já existem vários tutoriais por aí que implementam Blog, Agenda, etc, nós implementaremos um sistema básico
de contas a pagar utilizando o SQLite como SGBD.

O que será mostrado neste capítulo?

Neste capítulo eu mostrarei como implementar os controllers e as views dentro da estrutura do Zend Framework.

**Após este capítulo você irá**

- Entender o conceito de MVC aplicado ao Zend Framework.
- Criar Controllers, Actions e Views usando Zend Framework.
- Estrutura de uma aplicação

No Zend Framework o fluxo de uma aplicação é determinado pelo controller, qualquer tipo de request, desde um request
para mostrar um formulário na tela até um request AJAX é definido em nosso controller e isso se dá por meio das Actions.

Imagine uma aplicação padrão PHP (daquelas antigas, macarrônicas), onde o fluxo da aplicação é determinado por arquivos
PHP distintos.

**Por exemplo**

`form_incluir_usuario.php` -> Form de inclusão de usuários
`incluir_usuario.php` -> Incluir usuário
`form_alterar_usuario.php` -> Form de alteração de usuários
`alterar_usuario.php` -> Alterar usuário
`excluir_usuario.php` -> Excluir usuário
`listar_usuarios.php` -> Listar usuários

Com Zend Framework as coisas não são mais feitas assim pois ele é um framework orientado a objetos e este fluxo é
definido nas classes de controller, ou seja, seguindo a mesma idéia do exemplo acima de cadastro de usuários, um
controller do Zend Framework poderia ser mais ou menos assim:

`formAction` -> Tela com formulário para inclusão e alteração de dados de usuário
`saveAction` -> Realiza os procedimentos necessários para salvar um usuário
`deleteAction` -> Exclui usuário
`indexAction` -> Tela padrão que neste caso mostrará a listagem de usuários cadastrados.

Além de organizarmos melhor o código utilizando Actions Controllers, nós também podemos manter nossas URLs mais
organizadas e de fácil leitura pois o Zend Framework implementa o conceito de URLs amigáveis então com o ZF é raro (digo
raro porque já vi isso ocorrer) de se ver URLs como por exemplo: http://meusite.com/users.php?operacao=Alterar&id=10.

Com o Zend Framework, esta URL seria mais ou menos assim: http://meusite.com/users/alterar/id/10 e ela indica que: Será
feita uma requisição HTTP para o controller users (`UsersController`) mais especificamente para a action `alterarAction`
e
serão passados parâmetros via method GET, neste caso o parâmetro chama-se id e seu valor é 10.

Depois de se acostumar com esse padrão você provavelmente nunca mais irá desejar usar a forma de Query String antiga
novamente.

**Revendo a estrutura da aplicação**

Quando nós criamos a estrutura do nosso projeto no capítulo 1, o `Zend_Tool` criou dentro do diretório
application/controllers um arquivo PHP chamado `IndexController.php`.

Este arquivo é criado automaticamente pois ele funciona como o controller de entrada da aplicação; Se fizermos uma
comparação novamente com aquela estrutura de
desenvolvimento mais antiga, o `IndexController` funcionaria como o index.php de uma aplicação ou seja, sempre que a URL
do sistema/site for chamada sem informar uma tela específica, o sistemá apontará para a tela padrão do sistema.

No Controller nós também podemos ter uma ação padrão, ou seja, sempre que o controller for chamado sem especificar qual
ação deve ser executada, a ação padrão será chamada.

Esta ação é chamada de indexAction.

Segue abaixo o conteúdo do arquivo `IndexController.php` que foi gerado pelo `Zend_Tool`:

    <?php
    
    class IndexController extends Zend_Controller_Action
    {
    
        public function init()
        {
            /* Initialize action controller here */
        }
    
        public function indexAction()
        {
            // action body
        }
    }

A primeira coisa que observamos é que o nome da classe é exatamente igual ao nome do arquivo (excluíndo o sufixo .php) e
isso é uma regra.

Outro ponto importante no nome do arquivo e consequentemente da classe é que ele segue a convenção que o nome inicia com
a primeira letra maiúscula e as demais minúsculas, se houver nomes compostos o segundo nome inicia com a letra maiúscula
e as demais seguem minúsculas.

Nesta classe nós também podemos observar que ela vem com dois métodos: init e indexAction; O método init funciona como
um método construtor que nesta classe não é utilizado pois ele é implementado na superclasse e recebe parâmetros
diversos que seriam bem complicados de serem passados por nós na subclasse, então quando for necessário executar algum
procedimento no ato da criação da instância do controller, este procedimento deverá encontrar-se no método init.

O método indexAction por sua vez é a ação padrão deste controller e será executado sempre que o `IndexController` for
solicitado sem explicitar nenhuma action.

Outra coisa que também fica bem clara no código é que todo método que for uma action deve ter Action logo após o nome do
action ou seja, se você em algum controller quisesse ter uma action chamada farofa, o nome dela na classe seria
farofaAction.

Nas actions nós também devemos seguir a convenção camel case da mesma forma que o nome da classe só que o nome do método
sempre inicia com letra minúscula.

Para conhecer mais os padrões e convenções do Zend Framework, siga este
link: http://framework.zend.com/manual/en/coding-standard.html

**View Templates**

Como vimos anteriormente, actions podem (e são na maioria dos casos) se relacionar a telas do nosso projeto, para isso
nós temos que ter uma view template correspondente para que possa ser renderizada e apresentada na tela para o usuário.

Estas templates encontram-se no diretório applications/views/scripts e as templates são agrupadas de acordo com o
controller ao qual se relacionam então, dentro do diretório scripts haverão diretórios com os nomes dos controllers, por
exemplo, index e dentro deste serão armazenados os arquivos de template.

Cada arquivo possui o nome do action em questão, então o nosso indexAction está representado lá como index.phtml e se
tivéssemos criado o farofaAction, o
arquivo seria farofa.phtml.

Outro ponto importante é que todos os templates possuem o sufixo phtml. Isso pode ser modificado mas a princípio nós
deixaremos assim.

**Criando o UsersController**

Da mesma forma que nós usamos o `Zend_Tool` para criarmos o projeto nós o usaremos para criar o nosso primeiro
controller.

Para isso basta digitar em seu terminal/prompt do DOS:

    zf create controller users

Após executar este comando, o resultado será parecido com o trecho abaixo:

    Creating a controller at /usr/local/zend/apache2/htdocs/zf-series/application/controllers/UsersController.php
    Creating an index action method in controller Users
    Creating a view script for the index action method at
    /usr/local/zend/apache2/htdocs/zf-series/application/views/scripts/users/index.phtml
    Creating a controller test file at
    /usr/local/zend/apache2/htdocs/zf-series/tests/application/controllers/UsersControllerTest.php
    Updating project profile '/usr/local/zend/apache2/htdocs/zf-series/.zfproject.xml'

Pronto! Nosso novo controller está criado, o nome dele é `UsersController.php` e ele também implementou para nós o
indexAction e seu template. Dê uma olhada nos diretórios para você ver a mágica.

Execute em seu browser: http://zf-series/users e veja o resultado.

Bacana né?

Se você visualizar o código deste controller você verá que ele tem a estrutura idêntica à do `IndexController`.

Como exercício, edite o arquivo de template index.phtml que está em application/views/scripts/users e coloque uma frase
que te agrade lá.

Agora, vamos fazer mais uma alteração no nosso action. Altere ele para ficar assim (Coloquei todo o código do controller
para facilitar):

    <?php
    
    class UsersController extends Zend_Controller_Action
    {
    
        public function init()
        {
            /* Initialize action controller here */
        }
    
        public function indexAction()
        {
            // action body
            $this->view->minhaFrase = "Minha frase favorita";
        }
    }

No Controller nós temos acesso ao objeto Zend_View que é responsável pela camada de visão no Zend Framework e no
objeto `Zend_View`
nós adicionamos um atributo chamado minhaFrase que recebeu a frase que eu tinha colocado manualmente no template
anteriormente.

Como nós estamos atribuindo este valor a uma propriedade do objeto de visão, nós poderemos utilizar este objeto na
camada de visão e daí nós substituiremos o valor fixo pelo valor informado pelo controller. Vamos editar então o
template index.phtml do controller `UsersController`:

    <br /><br /><center><?php echo $this->minhaFrase ?></center>

Pronto. Como nós estamos acessando o objeto diretamente da view, então basta manipularmos o atributo minhaFrase que
criamos quando estávamos no controller diretamente usando `$this`.

Simples demais não é?

Como exercício, crie mais alguns desses atributos na action em seu controller e mostre os valores em sua view. Beleza?

**Criando um Layout com Zend_Layout**

Quando nós desenvolvemos sites/sistemas web com PHP nós costumamos usar código que se repete por meio de includes não é
mesmo? Dessa forma se um dia essas informações precisarem ser modificadas nós modificamos em apenas um local.

O Zend Framework nos provê um componente para facilitar este trabalho e eu digo facilitar porque ele vai nos poupar até
mesmo o trabalho de ter de realizar o include dos arquivos que devem ser reaproveitados.

Um caso bem comum é criarmos um arquivo chamado header.php (ou cabecalho.php) e outro chamado footer.php (ou rodape.php)
e inclui-los em todas as páginas, certo? Bom, nós criaremos um layout com estas informações e todas as nossas telas
serão mescladas com este layout e em seguida apresentado na tela para o usuário.

Vamos lá? Adivinha o que iremos usar agora? Acertou, o `Zend_Tool`.

Execute o seguinte comando em seu terminal/prompt do DOS:

    zf enable layout

O resultado é o seguinte:

    Layouts have been enabled, and a default layout created at
    /usr/local/zend/apache2/htdocs/zf-series/application/layouts/scripts/layout.phtml
    A layout entry has been added to the application config file.

Isso tudo é muito lindo :D

Bom, vamos editar o arquivo que foi gerado em application/layouts/scripts/layout.phtml para deixa-lo mais ou menos
assim:

    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN"
       "http://www.w3.org/TR/html4/strict.dtd">
    <html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>Zend Framework Tutorial Series</title>
        <meta name="generator" content="TextMate http://macromates.com/">
        <meta name="author" content="Adler  Medrado">
        <!-- Date: 2010-02-15 -->
    </head>
    <body>
        <div id="header">
            <h1>Zend Framework Tutorial Series</h1>
        </div>
        <div id="content">
            <p>Este é o layout do nosso sistema. Em breve nós iremos modifica-lo.</p>
            <?php echo $this->layout()->content; ?>
        </div>
        <div id="footer">
            <p>&copy; 2010 - Adler Medrado - http://adlermedrado.com.br</p>
        </div>
    </body>
    </html>

No nosso layout nós definimos uma mensagem de título que está no header e uma mensagem de copyright no footer.
Se você analisar bem este código, você verá que é feita uma chamada a um método chamado `layout()`.

Este método é na verdade um `Zend_View_Helper` que faz a mesclagem do template do action que é executado no momento do request com o restante do layout. 

Não se preocupe com o `Zend_View_Helper` pois em outros capítulos nós abordaremos justamente este recurso.

Simples o uso do layout né? Como exercício, execute novamente http://zf-series/users e veja o resultado.

**Considerações Finais**

Neste capítulo nós abordamos um pouco do C e do V (Controllers e Views) do MVC.

No próximo capítulo nós trabalharemos com formulários, filtraremos input, trataremos saídas e algumas cositas mas.

Espero que você tenha aproveitado este capítulo e espero também revê-lo no próximo.

A propósito, eu criei um grupo de discussão no Google Groups para que aqueles que estão seguindo a série de tutoriais
possam discutir os exercícios. 
Caso você deseje participar deste grupo basta inscrever-se  em: http://groups.google.com/group/zend-framework-series-br

Os fontes do tutorial encontram-se no github, acesse em: http://github.com/adlermedrado/Zend-Framework-Tutorial-Series
