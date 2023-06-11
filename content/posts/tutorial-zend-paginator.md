---
title: "Tutorial Zend Paginator"
date: 2009-03-28T17:52:51-03:00
draft: false
tags:
  - "zend-framework"
---

O Zend Framework é muito interessante mesmo nos componentes mais simples, desta vez eu irei falar sobre o componente
Zend_Paginator, que é um componente que se propõe a fazer a paginação de qualquer coleção de dados de uma maneira bem
simples e mostrar os dados paginados para o usuário.

**ADAPTERS**

Este componente não exige que os dados a serem paginados sejam especificamente dados provenientes de bancos de dados,
ele faz a paginação de arrays, de dados relacionados a objetos Zend_Db_Select e Zend_Db_Table_Select e Iterators. Hoje
iremos nos ater ao uso dos Adapters Array e DbTableSelect.

**Os Adapters disponíveis são:**

`Array` - Manipula qualquer Array criado em PHP
`DbSelect` - Utiliza um objeto Zend_Db_Select que retornará um Array
`DbTableSelect` - Utiliza um objeto Zend_Db_Table_Select, que retornará uma instância de Zend_Db_Rowset_Abstract.
`Iterator` - Utiliza uma instância de Iterator
`Null` - Não utiliza o mecanismo de paginação do componente permitindo que o programador possa implementar seu próprio
mecanismo.

**ME MOSTRE O CÓDIGO**

Quem está acostumado a ler meus artigos e tutoriais sabem que gosto de ir direto ao assunto e evito colocar textos
enfadonhos, então eu irei mostrar logo algum código aqui pra acordar quem já estiver babando em cima do teclado.

O primeiro exemplo será de uma paginação com um simples array.

`ExemploController.php`

    $tabela = new Tabela();
    $res = $tabela->fetchAll();
    
    $paginator = Zend_Paginator::factory($res);
    $paginator->setItemCountPerPage(10);
    $paginator->setCurrentPageNumber($this->_request->getParam('page'));
    
    $this->view->paginator = $paginator;
    ?>

O código acima representa as definições de um paginator em uma action do seu controller. Primeiro é criada a instância
do objeto `Zend_Db_Table` que será usado para buscar um array com os dados a serem paginados, depois criamos o objeto do
Zend_Paginator passando este array como parâmetro, informamos qual a quantidade de ítens por página e qual a página
atual que é informada por meio de parâmetro via method GET.

O array poderia ser um simples array ‘criado na mão’ que funcionaria direitinho também.

Agora vamos dar uma olhada no template da view.

`arquivo.phtml`

    <?php if (count($this->paginator)): ?>
    <?php foreach ($this->paginator as $exemplo): ?>
    <h5><?php echo $exemplo['titulo']?></h5>
    <br />
    <p><?php echo $exemplo['info']?></p>
    <?php endforeach; ?>
    <?echo $this->paginationControl($this->paginator,
    'All',
    'paginator_item.phtml'); ?>
    <?php endif; ?>

Muito simples. Nós iteramos o objeto paginator que passamos para a view e então manipulamos os ítens do array que passamos como parâmetro no controller.

O bloco de paginação com First, Last, Next, Last nós colocamos em um arquivo de template (phtml) separado e o passamos
como parâmetro no `Zend_View_Helper` `paginationControl` que é quem lida com o controle de paginação.

Na documentação do `Zend_Paginator` pode-se encontrar alguns exemplos de template de controle que podemos pegar e usar.

Vamos ver como isso funciona utilizando-se um objeto `Zend_Db_Table_Select`:

    $tabela = new Tabela();
    $tabelaSelect = $tabela->select();
    
    $paginator = Zend_Paginator::factory($tabelaSelect);
    $paginator->setItemCountPerPage(10);
    $paginator->setCurrentPageNumber($this->_request->getParam('page'));
    $this->view->paginator = $paginator;

A diferença foi apenas o parâmetro que passamos, ao invés de um array, um objeto.

Vejamos como ficou o template com a iteração do resultado disso:

    <?php if (count($this->paginator)): ?>
    <?php foreach ($this->paginator as $exemplo): ?>
    <h5><?php echo $exemplo->titulo?></h5>
    <br />
    <p><?php echo $exemplo->info?></p>
    <?php endforeach; ?>
    <?echo $this->paginationControl($this->paginator,
    'All',
    'paginator_item.phtml'); ?>
    <?php endif; ?>

A única diferença em relação ao exemplo com array, é que pelo fato de o retorno ser um objeto `Zend_Db_Table_Rowset`, nós podemos acessar cada coluna do retorno do banco de dados como uma propriedade de um objeto, dessa forma nós tratamos tudo como um objeto.

Uma outra diferença que também é importante, é que o `Zend_Paginator` ao ver que a coleção de dados a ser paginada será o
resultado gerado por um objeto `Zend_Db_Table_Select` ele vai saber como realizar aquela query de paginação com limit e
etc, evitando que todo o conjunto de dados seja retornado de uma única vez. Quando passamos um array por exemplo, nós
enviamos ao `Zend_Paginator` uma coleção completa e a paginação é feita nele, já com o objeto não, pois ele saberá fazer o
limit implicitamente.

Bacana não é?

Vou colocar o código do template do controle de paginação que usei nesses exemplos, que é idêntico ao que está na
documentação do ZF:


    <?php if ($this->pageCount): ?>
    <div class="paginationControl">
    <?= $this->firstItemNumber; ?> - <?= $this->lastItemNumber; ?> of <?= $this->totalItemCount; ?>
    
    <?php if (isset($this->previous)): ?>
    <a href="<?= $this->url(array('page' => $this->first)); ?>">
    First
    </a> |
    <?php else: ?>
    <span class="disabled">First</span> |
    <?php endif; ?>
    
    <?php if (isset($this->previous)): ?>
    <a href="<?= $this->url(array('page' => $this->previous)); ?>">
    &amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;lt; Previous
    </a> |
    <?php else: ?>
    <span class="disabled">&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;lt; Previous</span> |
    <?php endif; ?>
    
    <?php if (isset($this->next)): ?>
    <a href="<?= $this->url(array('page' => $this->next)); ?>">
    Next &amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;gt;
    </a> |
    <?php else: ?>
    <span class="disabled">Next &amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;gt;</span> |
    <?php endif; ?>
    <?php if (isset($this->next)): ?>
    <a href="<?= $this->url(array('page' => $this->last)); ?>">
    Last
    </a>
    <?php else: ?>
    <span class="disabled">Last</span>
    <?php endif; ?>
    
    </div>
    <?php endif; ?>
    <p style="text-align: center;">

**CONSIDERAÇÕES FINAIS**

Este componente torna simples o trabalho chato de fazer um paginador na mão nos dando ainda a flexibilidade de não
precisar utilizar somente coleções de dados provenientes de um banco de dados.

Existem outros macetes que podem ser vistos na documentação do componente, eu coloquei aqui de maneira bem simples
apenas duas formas de se implementar paginação com o componente `Zend_Paginator` utilizando duas coleções de dados
diferentes.

Para quem já implementou isso antes sabe que não é um bicho de sete cabeças mas de vez em quando pode se tornar uma
coisa chata e se já temos um componente pronto nós podemos utilizar nossa criatividade e conhecimento diretamente no
negócio da aplicação e não em estrutura.

Deixe seu comentário sobre este artigo.

Até o próximo.
