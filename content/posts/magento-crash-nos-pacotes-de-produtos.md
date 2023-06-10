---
title: "Magento: Crash nos pacotes de produtos"
date: "2015-08-12"
tags:
  - "magento"
  - "php"
---

Esta é a primeira dica sobre [Magento](http://magento.com "Magento Official Website") publicada por mim, acredito que
isso se tornará algo recorrente daqui para a frente.

Recentemente eu tive problemas com um pacote de produtos que possui bastante produtos virtuais associados, sempre na
hora de incluir ou remover algum produto virtual do pacote, o Magento realizava todo o processo corretamente, no entanto
as mudanças não eram de fato aplicadas, mesmo com o Magento informando que sim, tudo tinha sido feito de acordo.

Depois de gastar um tempinho debugando o problema (read the freaking logs), percebi que isso se dava pelo fato de a tela
onde os produtos virtuais são associados ao pacote possuir muitos campos de formulário (por produto) e somando uma
quantidade grande de produtos, ocorria um erro causado pela limitação padrão determinada pela
diretiva [max\_input\_vars](http://php.net/manual/en/info.configuration.php#ini.max-input-vars "Diretiva max_input_vars")
do [PHP](http://www.php.net "PHP Oficial Website").

Para resolver o problema, bastou aumentar o valor desta diretiva e _voilá_, tudo voltou a funcionar como esperado.
