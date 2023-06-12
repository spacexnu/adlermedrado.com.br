---
title: "Zend Framework tutorial series capítulo 3"
date: 2010-05-22T10:08:21-03:00
draft: false
tags:
  - "zend-framework"
---

Depois de muito tempo eu consegui voltar a este tutorial e a partir deste capítulo eu vou mudar um pouco a estratégia,
vocês irão perceber que este capítulo será menor do que os anteriores porque eu vou buscar escrever capítulos menores em
uma frequência maior. Espero que dê certo.

**Introdução**

Neste capítulo eu mostrarei um pouco do Zend_Form e algumas coisas que são possíveis de implementar usando ele.

O `Zend_Form` é um componente que nos permite tratar formulários HTML como objetos PHP, simplificando o uso quando
precisamos filtrar e validar dados provenientes de formulários.

Eu sempre fui contra criar objetos PHP que simplesmente cuspissem código HTML sem trazer nenhum benefício como
filtragem, validações, etc., isso pra mim não fazia nenhum sentido e por isso que eu demorei para me interessar pelo
Zend_Form, até que vi que a proposta era diferente, e eles nos traz diversos benefícios como além das já mencionadas
funcionalidades de filtro e validação, nos permite trabalhar com Subforms de maneira bem simples, agrupar elementos de
formulários e também fazer herança de formulários, depois de ver isso eu não deixei de usa-lo e sempre incentivo quem
usa Zend Framework a experimenta-lo.

Uma das premissas de segurança em desenvolvimento web é: Filter Input, Escape Output (Filtrar Entradas, Tratar Saídas)
porque nós não devemos confiar nos usuários pois como iremos saber que as informações que estão sendo enviadas à
aplicação são corretas ou mal-intencionadas? 

Se você não ouviu falar sobre SQL Injection, XSS, CSRF, etc., é bom buscar
maiores informações a respeito e aí você vai entender o motivo que leva muitos desenvolvedores a serem paranóicos. :-)

Pretendo escrever um capítulo deste tutorial que aborde apenas aspectos de segurança com Zend Framework, até lá vou
mostrar apenas como filtrar dados usando `Zend_Form`.

**Bom, vamos lá.**

Nosso primeiro form será o de cadastro de usuário e o trabalho sujo quem vai fazer para nós será o `Zend_Tool` então, de
dentro do diretório raíz de sua app, digite o comando:

    zf create form User

Este comando criará um diretório chamado forms dentro do diretório application e se você analisar o conteúdo deste
diretório, verá um arquivo chamado User.php com o seguinte conteúdo:

    <?php
    class Application_Form_User extends Zend_Form
    {
        public function init()
        {
            /* Form Elements & Other Definitions Here ... */
        }
    }

Pronto. Agora, dentro do método `init()` nós podemos configurar o nosso formulário. 

Este formulário terá os seguintes campos:

username: Nome do usuário do sistema, login de acesso.
fullName: Nome completo do usuário
email: Endereço de e-mail do sujeito
password: Senha de acesso ao sistema
submit: Botão de submit :-)

Se eu fosse criar esse formulário na mão, eu teria de validar no script PHP que recebesse estes dados para garantir 
que as informações estão de acordo com o que deve ser submetido e esse trabalho se torna chato depois de algum 
tempo trabalhando com desenvolvimento e é aí que o `Zend_Form` começa a nos dar uma força.

Para este formulário eu determinei tais filtros e validações:

username
- O campo é obrigatório
- Qualquer tag deverá ser removida
- Espaços em branco das extremidades serão removidos
- Não pode ser submetido em branco/vazio
- Deverá contér entre 5 e 30 caracteres.
- 

fullName
- O campo é obrigatório
- Qualquer tag deverá ser removida
- Espaços em branco das extremidades serão removidos
- Não pode ser submetido em branco/vazio
- Deverá contér entre 5 e 90 caracteres. 
 
email
- O campo é obrigatório
- Qualquer tag deverá ser removida
- Espaços em branco das extremidades serão removidos
- Deverá validar se o valor informado é compatível com um endereço de e-mail válido

password
- O campo é obrigatório
- Qualquer tag deverá ser removida
- Espaços em branco das extremidades serão removidos
- Não pode ser submetido em branco/vazio
- Deverá contér entre 5 e 30 caracteres.

Vamos configurar nossa classe para atender a estes requisitos:
 
    class Application_Form_User extends Zend_Form
    {
        public function init()
        {
            $username = new Zend_Form_Element_Text('username');
            $username->setLabel('Usuário')
              ->setRequired(true)
              ->addFilter('StripTags')
              ->addFilter('StringTrim')
              ->addValidator('NotEmpty')
              ->addValidator('StringLength', false, array(5,30));
            $fullName = new Zend_Form_Element_Text('fullName');
            $fullName->setLabel('Nome Completo')
              ->setRequired(true)
              ->addFilter('StripTags')
              ->addFilter('StringTrim')
              ->addValidator('NotEmpty')
              ->addValidator('StringLength', false, array(5,90));
            $email = new Zend_Form_Element_Text('email');
            $email->setLabel('E-mail')
              ->setRequired(true)
              ->addFilter('StripTags')
              ->addFilter('StringTrim')
              ->addValidator('EmailAddress');
            $password = new Zend_Form_Element_Password('password');
            $password->setLabel('Senha')
              ->setRequired(true)
              ->addFilter('StripTags')
              ->addFilter('StringTrim')
              ->addValidator('NotEmpty')
              ->addValidator('StringLength', false, array(5,30));
            $submit = new Zend_Form_Element_Submit('Salvar');
            $this->addElements( array($username, $fullName, $email, $password, $submit) );
        }
    }

Depois de ler os requisitos para nosso formulário fica fácil entender o código acima faz, 
mas vamos dar uma analisada rápida:
Para cada elemento do formulário nós criamos um objeto respectivo, por exemplo, para campos de texto nós usamos 
`Zend_Form_Element_Text`, para campo de senha nós usamos `Zend_Form_Element_Password` e individualmente em cada 
elemento nós determinamos quais filtros nós usaríamos por meio do método `addFilter()` e quais validações seriam 
feitas usando o método `addValidator()`.

A diferença entre filters e validators é bem simples: Filtros alteram o valor do elemento e validadores checam se o 
valor do elemento possi certas características de acordo com o validador e retornam se o valor é válido ou não sem 
alterar seu valor.

**Elementos**

Obviamente os elementos de formulário mais comuns já existem no framework, qualquer elemento mais específico pode ser desenvolvimento sem muitas dificuldades. 
- button
- checkbox / multicheckboxes
- hidden
- image
- password
- radio
- reset
- select / multiselect
- submit
- text
- textarea

**Filtros e Validadores**

Os filtros e validadores considerados mais comuns também já fazem parte do pacote do Zend Framework, 
além daqueles que nós usamos no nosso formulário Users, nós temos os seguintes Validadores e Filtros à disposição.

Veja direto na fonte: 

http://framework.zend.com/manual/1.10/en/zend.validate.set.html
http://framework.zend.com/manual/1.10/en/zend.filter.set.html

**Vamos colocar pra funcionar agora**

Agora vamis pra parte mais legal que é ver o nosso formulário funcionando, 
para isso temos que instancia-lo no controller e adiciona-lo à nossa view. 

Controller:
    $this->view->form = new Application_Form_User();
    if ($this->getRequest()->isPost()) {
        if ($this->view->form->isValid($this->_request->getPost())) {
            // Salva no banco de dados ou seja lá o que for fazer com os dados provenientes do form
            var_dump($this->_request->getPost());
        } else {
            $this->view->form->populate($this->_request->getPost());
        }
    }

Primeiramente nós criamos uma instância da nossa classe Application_Form_User 
(sim, este é o nome gerado automaticamente e é um padrão, portanto, não mude) e associamos ao nosso objeto `Zend_View`.

Em seguida obtemos o objeto que mantém as informações do request e verificamos se o request foi do método POST, 
se for post, verificamos se os dados do formulário são válidos e se o resultado for positivo, nós mostramos estes dados 
na tela (no próximo capítulo gravaremos no banco de dados), senão, nós renderizamos a tela novamente com os dados 
preenchidos no form e suas devidas mensagens de erro.

Em princípio as mensagens de erro estão em inglês e nós as alteraremos posteriormente quando trabalharmos com I18N e L10N.

Na camada de visão, basta fazer:

    echo $this->form;

Pronto. Seu form já pode ser usado.

O código-fonte que é gerado não agrada a todos, mas para mudar isso nós podemos usar os Decorators e deixar 
o código gerado da maneira que preferirmos, porém os decorators não são um assunto tão trivial e por isso eu não 
vou aborda-los neste capítulo. 
Se desejar conhecer mais: http://framework.zend.com/manual/1.10/en/zend.form.decorators.html

O código gerado foi esse:
 
    <form enctype="application/x-www-form-urlencoded" action="" method="post"><dl class="zend_form">
    <dt id="username-label"><label for="username" class="required">Usuário</label></dt>
    <dd id="username-element">
    <input type="text" name="username" id="username" value=""></dd>
    <dt id="fullName-label"><label for="fullName" class="required">Nome Completo</label></dt>
    <dd id="fullName-element">
    <input type="text" name="fullName" id="fullName" value=""></dd>
    <dt id="email-label"><label for="email" class="required">E-mail</label></dt>
    <dd id="email-element">
    <input type="text" name="email" id="email" value=""></dd>
    <dt id="password-label"><label for="password" class="required">Senha</label></dt>
    <dd id="password-element">
    <input type="password" name="password" id="password" value=""></dd>
    <dt id="Salvar-label">&nbsp;</dt><dd id="Salvar-element">
    <input type="submit" name="Salvar" id="Salvar" value="Salvar"></dd></dl></form>

**Considerações Finais**

Trabalhar com `Zend_Form` é muito simples e nos proporciona uma produtividade 
maior em nosso dia-a-dia, tenho trabalhado com ele diariamente e posso dizer que tem sido com muito sucesso.

Obviamente, há muito mais coisas para ver e este tutorial é apenas introdutório, durante nosso tutorial espero 
poder encaixar outras funcionalidades como Subform.

Espero que você tenha gostado de mais esse capítulo.
Ah, os fontes encontram-se no github.

Abraço.
