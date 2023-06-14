---
title: "Profiling de banco de dados com Zend_Db_Profiler e Firebug"
date: 2009-06-17T15:54:18-03:00
draft: false
tags:
  - "zend-framework"
---

Se você usa o Zend Framework já percebeu que não é muito trivial obter as queries executadas no banco de dados e isso é
algo comum no dia-a-dia de um desenvolvedor pois com elas nós podemos corrigir bugs e determinar pontos de lentidão e
etc.

O Zend Framework possui um componente chamado _Zend_Db_Profiler_ que nos permite realizar o profiling dos acessos ao banco
mas na minha opinião ele sozinho é muito chato de usar então eu utilizo ele em conjunto com o componente
_Zend_Db_Profiler_Firebug_ e é isso que vou mostrar a você como se faz.

Primeiramente, você deve ter os complementos do Firefox Firebug e FirePHP instalados, ou seja, só é possível usar este
recurso com o Firefox o que não deve ser um problema pois a maioria dos desenvolvedores utilizam ele não é mesmo?

Beleza, agora vamos dizer à nossa aplicação que iremos usar este recurso. O primeiro passo é abrir a conexão em nosso
bootstrapper mais ou menos como o código abaixo.

A propósito, estou levando em consideração que você já saiba usar o _Zend_Config_Ini_ para guardar configurações do
sistema, entre elas, de acesso ao banco de dados.

Vamos lá:

```php
// Get the configuration
$pathConfig = 'conf' . DIRECTORY_SEPARATOR;
$config = new Zend_Config_Ini($pathConfig . 'config.ini', 'development');

// Opening connection
$db = Zend_Db::factory($config->database->adapter, $_arrDbConnection['database']);
Zend_Registry::set('db', $db);
Zend_Db_Table::setDefaultAdapter($db);
```
Com o código acima nós abrimos o arquivo de configuração, convertemos em objeto (`Zend_Config_Ini`), abrimos a conexão com
o banco de dados e o associamos como adapter padrão às classes derivadas de Zend_Db_Table.

Agora para configurarmos o profiler basta fazer o seguinte:
```php
// Configuring Profiler
$profiler = new Zend_Db_Profiler_Firebug('db-profiling');
$profiler->setEnabled($config->firebug->profiler->enabled);
$db->setProfiler($profiler);
```
Pronto.

Se você observar o código acima, poderá ver que estou determinando a configuração do Profiler no arquivo INI de
configuração também, mas caso você não queira fazer desta forma basta passar true como parâmetro do método `setEnabled()`
do objeto de profiler, por exemplo:

```php
// Configuring Profiler
$profiler = new Zend_Db_Profiler_Firebug('db-profiling');
$profiler->setEnabled(true);
$db->setProfiler($profiler);
```
Agora ao executar qualquer comando no banco de dados as informações serão mostradas no console do firebug. Veja o
screenshot abaixo:

Muito simples, não é? O que você achou? Deixe seu comentário.
