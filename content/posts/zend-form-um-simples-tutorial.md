---
title: "Zend_Form: Um simples tutorial"
date: 2008-09-14T19:55:18-03:00
draft: false
tags:
  - "zend-framework"
---

Introdução

Depois de algum tempo sem escrever algo sobre o Zend Framework, venho hoje mostrar rapidamente um exemplo de como usar
o `Zend_Form` e de quebra vou mostrar o `Zend_Translator`, que pode ser usado em internacionalização.

O `Zend_Form` é um componente que permite que formulários sejam criados e mantido em um objeto, aumentando produtividade
e mantendo um padrão de desenvolvimento. É possível também com o `Zend_Form`, a implementação de formulários com
herança, ou seja, você tem um formulário genérico (ex: `UsuarioForm`) que pode ser utilizado para criação de outros (ex:
`UsuarioAdminForm`) que possuiriam apenas alguns campos adicionais além do form padrão.

Ele também possui componentes que permitem a utilização de todos os Filters e Validators do Zend, bem como a
implementação de Componentes personalizados.

**Mãos à obra**

Vamos criar um formulário de contato com o Zend_Form para ser o exemplo deste tutorial.
Este formulário terá os campos Nome, Email, Assunto e Mensagem.

Se fôssemos criar um formulário da maneira convencional, serial algo assim:

    <html>
        <head>
            <title>Exemplo de form</title>
        </head>
        <body>
            <form>
                Nome: <input type="text" id="nome" name="nome">
                Email: <input type="text" id="email" name="email">
                Assunto: <input type="text" id="assunto" name="email">
                Mensagem: <textarea rows="5" cols="5" id="mensagem" name="mensagem"></textarea>
                <button id="enviar">Enviar</button>
            </form>
        </body>
    </html>

E se fôssemos usar os `Zend_View_Helpers` para criar os campos, ficaria mais ou menos assim:

    <html>
        <head>
            <title>Exemplo de form</title>
        </head>
        <body>
            <form>
                Nome: <?php echo $this->formText('nome') ?>
                Email: <?php echo $this->formText('email') ?>
                Assunto: <?php echo $this->formText('assunto') ?>
                Mensagem: <?php echo $this->formTextare('nome', null, array('rows' => 5, 'cols' => 5)) ?>
                <?php echo $this->formButton('salvar', 'Salvar') ?>
            </form>
        </body>
    </html>

**Agora vem o Zend_Form**

A diferença principal entre estas duas maneiras e a maneira utilizando Zend_Form é que nós podemos definir regras de
validação no servidor diretamente no objeto do form.

Antes de usar o form, nós devemos criar uma classe que deriva da classe Zend_Form.
Antes de criarmos o código PHP do formulário, devemos criar um diretório para guardar estas classes.
Eu normalmente crio um diretório forms dentro do diretório da minha aplicação e o incluo no meu include_path.
Eu já vi algumas pessoas colocando os forms dentro do diretório de models. Enfim, o Zend Framework te dá uma
flexibilidade para
definir o que é melhor para você.

Vejamos o código do formulário, que se chama `ContatoForm.php` e está no meu diretório forms conforme citado acima:

    <?php
    class ContatoForm extends Zend_Form
    {
    
        public function __construct($options = null)
        {
            parent::__construct($options);
            $this->generate();
        }

        private function generate()
        {
            $this->setName('contato'); 
            $nome = new Zend_Form_Element_Text('nome');
            $nome->setLabel('Nome')->setRequired(true)
            ->addFilter('StripTags')
            ->addValidator('NotEmpty');

            $email = new Zend_Form_Element_Text('email');
            $email->setLabel('email')->setRequired(true)
            ->addFilter('StripTags')
            ->addValidator('NotEmpty');

            $assunto = new Zend_Form_Element_Select('assunto');
            $assunto->setLabel('Etapa')
            ->setRegisterInArrayValidator(false)
            ->setRequired(true)
            ->addFilter('StripTags')
            ->addValidator('NotEmpty');

            $arrOpcoes = array('Selecione',
            'criticas'    => 'Críticas',
            'sugestoes'   => 'Sugestões',
            'informacoes' => 'Informações' );
            $assunto->addMultiOptions($arrOpcoes);

            $mensagem = new Zend_Form_Element_Textarea('mensagem');
            $mensagem->setAttrib('rows', '5');
            $mensagem->setAttrib('cols', '5');
            $mensagem->setLabel('mensagem')->setRequired(true)
            ->addFilter('StripTags')
            ->addValidator('NotEmpty');
            
            $submit = new Zend_Form_Element_Submit('submit');
            $submit->setAttrib('id', 'salvar');
            $submit->setAttrib('class', 'verde buttonBar');
            $this->addElements(array($nome, $email, $assunto, $mensagem,  $submit));
        }
    }

Analisando o código acima, é possível ver que utilizamos os plugins do Zend_Form para criar os campos e botão do nosso
formulário, e em cada elemento do form nós definimos o filtro StripTags e o Validator NotEmpty, que acredito devem ter
ficado claros para que que servem. :D

No campo assunto, todos os elementos do select são definidos no array $arrOpcoes, sendo o índice o value e o valor o
texto. Sendo assim, é muito fácil colocar dados que estão em banco de dados no select.

No campo da mensagem, no TextArea, nós definimos os atributos rows e cols utilizando o método setAttrib. Isso vale para
qualquer componente.

No final, associamos estes campos no form e o form está pronto.

**Criação do Controller**

Agora, vamos fazer um controller para receber estes dados:

    <?php
    class ExemploGridController extends Zend_Controller_Action
    {
        public function indexAction()
        {
            $this->view->titulo = 'Contato!';
            
            $form = new ContatoForm();
            $form->submit->setLabel('Enviar');
            $this->view->form = $form;
        
            if ($this->_request->isPost()) {
                $formData = $this->_request->getPost();
            
                if ($form->isValid($formData)) {
                    // Implementa a rotina para envio de email
                } else {
                    // Mostra os erros e popula o form com os dados enviados
                    $form->populate($formData);
                }
            }
        }
    }

No Controller, nós obtemos o objeto do formulário e associamos ao objeto Zend_View, depois verificamos se a requisição é do tipo POST (se for, o form foi submetido) e então verificamos se os dados enviados são válidos (os filters e validators que colocamos no form). Se forem válidos, enviaria o email (este exemplo simula um form de contatos, lembra ? :D ) senão, popula o form e mostra as mensagens de erro. Se a requisição não for do tipo POST, o form é renderizado na tela.

No arquivo de template (`index.phtml`) nós apenas damos um echo no form (`echo $this->form`).

Abaixo teremos um screenshot do form antes de ser submetido e outra do form após ser submetido com dados incorretos para mostrar os erros retornados pelo objeto.

Se você viu a segunda screenshot, percebeu que as mensagens de erro estão em inglês, certo? Isso ocorre porque o idioma padrão para o ZF é o inglês e é aí que vai entrar o Zend_Translate, que usaremos para traduzir estas mensagens de erro.

**Traduzindo as mensagens de erro**

Conforme a documentação do Zend Framework, o `Zend_Translate` é a solução para aplicações multilinguisticas.

Existem diversas formas de se criar um objeto `Zend_Translate` e você pode obter maiores detalhes na documentação. Eu irei usar neste tutorial o meio que julgo ser o mais simples, que é criando o dicionário em um array e depois associar ele com o objeto `Zend_Translate`.

**Vejamos:**

Eu criei um diretório em minha aplicação chamado i18n e da mesma maneira coloquei-o no include_path. Dentro dele, o arquivo pt_Br.php foi criado e nele contém o array com as traduções.

Eu vou colocar o array aqui de maneira reduzida para não ficar muito extenso:

    <?php
    // Traducao para o Portugues
    $portugues = array();
    $portugues['isEmpty']= 'Este campo não pode ser vazio';
    
    // Email
    $portugues['emailAddressInvalid'] = 'não é um email válido no formato nome@servidor';

Como podemos ver, `isEmpty` e `emailAddressInvalid` são palavras-reservadas dos filtros usados no `Zend_Form`. 
Eu senti uma dificuldade para encontrar estas informações na documentação, até onde pesquisei esta parte ainda não havia sido documentada, então para encontrar as palavras reservadas eu tive que abrir as classes, uma a uma para traduzi-las.

Agora nós devemos associar este array com o objeto `Zend_Translator` para então informar ao Form que ele deve ser traduzido. Vamos lá:

    // Carregando arquivo de internacionalização
    
    include_once 'i18n.php';
    $translate = new Zend_Translate('array', $portugues, 'pt_BR');
    $registry->set('translate', $translate);

Eu crio o objeto `Zend_Translate`, passando o array `$portugues` que criei no arquivo `i18n.php` e guardo este objeto na Registry para poder ser usado posteriormente. Existem outras formas de persistir este objeto, mas eu prefiro desta maneira, então sinta-se a vontade para mudar se achar uma maneira mais conveniente para você.

No `Zend_Form` eu digo para ele usar este arquivo, adicionando o código abaixo no metodo `init()` do `ContatoForm`:

    $translate = Zend_Registry::get('translate');
    $this->setTranslator($translate);

Pronto! Agora seus erros serão traduzidos, conforme screenshot abaixo:

Simples não? Uma vez criado o objeto `Zend_Translate`, você pode tornar esse processo de tradução dinâmico, daí o trabalho será feito apenas uma única vez.

**Considerações Finais**

Espero que eu tenha conseguido ser claro neste tutorial e que ele seja proveitoso para você. Aproveito para lembrar que este foi um tutorial básico, apenas uma introdução ao Zend_Form, que possui diversos recursos que não abordamos hoje. Espero em breve poder mostrá-los para vocês.

Eu estou usando o `Zend_Form` no meu dia-a-dia no trabalho e nossa equipe teve um aumento na produtividade muito grande.

Bem, tentem implementar um exemplo como esse e qualquer dúvida poste aqui no blog que a gente tenta se ajudar. Se tiver alguma dica adicional, deixa-e aqui também.

Vamos lá, o que está esperando para testar? :D

Abraços.
