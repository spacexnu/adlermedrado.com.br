---
title: "Relacionamento entre tabelas com Zend Framework"
date: 2008-03-25T05:37:34-03:00
draft: false
tags:
  - "zend-framework"
---

O Zend Framework possui uma camada de modelo, composta por algumas classes
como `Zend_Db`, `Zend_Db_Table`, `Zend_Db_Table_Rowset`, entre outras, e é muito simples criar uma classe que representa
uma determinada tabela, basta herdar da classe `Zend_Db_Table_Abstract` que você terá todos os métodos principais de
acesso à dados, como insert, update, etc.

Porém as tabelas possuem relacionamentos e uma entidade em uma tabela pode ser ligada a uma ou mais entidades em outra
tabela utilizando integridade referencial, e o Zend Framework permite que você faça isso tudo no nível de objeto através
de métodos específicos da classe `Zend_Db_Table_Row`.

Para demonstrar isso, vou usar como exemplo uma relação bem simples. Supondo que existam as seguintes tabelas:

```
UF
id - INT - PRIMARY KEY
nome - Varchar(100)

CIDADE
id - INT - PRIMARY KEY
nome - Varchar(100)
uf_id - INT - FOREIGN KEY
```

Se criarmos duas classes no Zend Framework para representar essas tabelas, nós faríamos o seguinte:

```
class UF extends Zend_Db_Table_Abstract
{
    protected $_name = "uf";
}

class Cidade extends Zend_Db_Table_Abstract
{
    protected $_name = "cidade";
}
```

Com essas duas classes nós já possuímos os métodos necessários para inserir, alterar, excluir e recuperar os dados
delas, porém, de maneira independente. Para recuperarmos todas as cidades de um determinado estado por exemplo, nós
poderíamos fazer o seguinte:

Primeiro, uma pequena alteração nas classes:

```
class UF extends Zend_Db_Table_Abstract
{
    protected $_name = "uf";
    protected $_dependentTables = array('Cidade');
}

class Cidade extends Zend_Db_Table_Abstract
{
    protected $_name = "cidade";
    protected $_referenceMap = array(
        'UF' => array(
            'columns' => 'uf_id',
            'refTableClass' => 'UF',
            'refColumns' => 'id'
        )
    );
}
```

**Calma, já vou explicar:**

Na propriedade da classe UF `$_dependantTables`, eu defino quais tabelas/classes que são dependentes da tabela UF,
passando simplesmente o nome da classe como um elemento de um array. Pode-se passar quantos nomes de tabelas/classes
forem necessárias, desde que cada um seja um elemento distinto.

Na propriedade da classe Cidade `$_referenceMap`, nós fazemos o mapeamento entre as duas classes, onde a coluna `uf_id`
da tabela Cidade é uma referência ao campo id da tabela UF. Simples demais!

Vamos testar?

Eu vou mostrar duas maneiras diferentes para retornar todas as cidades de uma determinada UF, a primeira segue abaixo:

PS: Eu vou criar um IndexController para executar este exemplo.

```
include_once 'UF.php';
include_once 'Cidade.php';

class IndexController extends Base_Controller_Action
{
    public function indexAction()
    {
        // Cria instância da classe UF
        $tabelaUF = new UF();
        
        // Pesquisa pelo UF 1 (1 é o ID do UF na tabela UF)
        $ufRows = $tabelaUF->find(1);
        
        // Retorna o Zend_Db_Table
        $uf = $ufRows->current();
        
        // Pesquisa pelas cidades referentes ao UF consultado acima
        $cidadesPorUF = $uf->findDependentRowset(’Cidade’);
        
        // Mostra resultado
        echo ‘<pre>’;
        print_r($cidadesPorUF);
        echo ‘</pre>’;
    
    }
}
```

Simples não?

O Outro exemplo terá o mesmo resultado porém a maneira como consultaremos as cidades por dada UF será um pouco
diferente.
Se você está acostumado com PHP 5, você já conhece os chamados 'métodos mágicos' como `__call()`, `__set()`, `__get()`
certo? pois então, agora nós vamos usar um método mágico chamado `FindCidadeByUF()` só que esse método não existe em
nossa classe, então de onde que ele veio? O Zend Framework possui um mecanismo que nos permite consultar tabelas
dependentes utilizando métodos mágicos no seguinte formato: `Find<Tabela>By<Tabela>`, então ele dinamicamente saberá
onde consultar os dados, basta substituirmos a primeira <Tabela> pelo nome da classe Cidade e a segunda tabela pela
classe UF que ele se encarrega do resto.

Veja o exemplo:

```
include_once 'UF.php';
include_once 'Cidade.php';

class IndexController extends Base_Controller_Action
{
    public function indexAction()
    {
        $tabelaUF = new UF();
        $ufRows = $tabelaUF->find(1);
        $uf = $ufRows->current();
        
        $cidadesPorUF = $uf->findCidadeByUF();
        
        echo ‘<pre>’;
        print_r($cidadesPorUF);
    }
}
```

**Considerações finais**

Espero ter conseguido demonstrar este mecanismo interessante do Zend Framework. Espero que da mesma forma com que ele
tem auxiliado o trabalho ele também auxilie o seu.

**O que que você achou? Deixe aqui seu comentário.**

A propósito, nos últimos dias alguns colegas me perguntaram bastante coisa sobre o Zend Framework, muitos queria fazer
um hello world para entender o padrão dele, outros queriam algo mais avançado, então eu pensei: Porque não escrever uma
série de tutoriais no meu blog? Isso pode ser útil para muito mais pessoas. Então gostaria de sua opinião. Deixe seu
comentário.

Eu estou pensando em fazer uma série de artigos simples e diretos ao assunto sobre Zend Framework, abordando desde o
básico até o mais avançado. Então, espero começar na próxima semana.

abraço.
