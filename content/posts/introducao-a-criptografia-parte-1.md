---
title: "Introdução a Criptografia — Parte 1"
date: "2014-12-28"
---

Eu gosto muito de chuva —_apenas quando estou tranquila e confortavelmente em casa_— e agora no momento em que escrevo
este, está caindo uma chuva muito boa aqui em [Guarapuava/PR](http://pt.wikipedia.org/wiki/Guarapuava), além disso está
ventando bastante a ponto das janelas da minha casa ficarem vibrando, isso é muito bom para relaxar…

Eu não sei porque escrevi isso, mas tudo bem, agora vamos ao que interessa.

### Introdução

O objetivo deste post é tentar mostrar o conceito básico de criptografia de uma maneira bem simples para que todos
possam entender, pois o que eu desejo é que _usuários comuns_ aka não-técnicos, saibam o que é criptografia e como fazer
uso dela em seu dia-a-dia.

Nos próximos dias eu mostrarei em uma série de posts sobre como configurar e usar tudo o que for necessário para
criptografar arquivos e e-mails, creio que assim eu estarei fazendo ao menos um pouquinho para ajudar aqueles que se
interessam em proteger a sua privacidade mas não sabem por onde começar.

### O que é criptografia?

O nome tem origem no grego Kryptós (escondido) e gráphein (escrita). É uma ciência que estuda meios que transformem uma
informação de seu estado original para outro completamente ilegível, normalmente utilizando técnicas que permita que uma
informação fique escondida dentro de outra.

Obviamente a criptografia atual não é algo o simples pois envolve cálculos matemáticos complexos para atingirem seu
objetivo.

### Personalidades históricas que eram entusiastas da criptografia

- [Sun Tzu](http://pt.wikipedia.org/wiki/Sun_Tzu)
- [Hitler](http://pt.wikipedia.org/wiki/Adolf_Hitler)
- [Carl Von Clausewitz](http://pt.wikipedia.org/wiki/Carl_von_Clausewitz)

Como o principal objetivo da criptografia é esconder a informação de atores não autorizados a terem acesso a ela,
obviamente estrategistas militares infames ou não, tinham um profundo interesse nela.

### Uso na segunda guerra mundial

No final da primeira guerra mundial foi desenvolvida uma máquina criptográfica chamada [**Enygma
**](http://pt.wikipedia.org/wiki/Enigma_%28m%C3%A1quina%29), que foi amplamente usada pelos nazistas e deu bastante
trabalho para os aliados que só conseguiram compreender as mensagens trocadas entre os alemães após conseguirem quebrar
o código criptográfico dela.

Uma outra forma mais rústica, mas que não deixa de ser criptografia e que também foi usada na segunda guerra mundial,
foi a “[Navajo Code Talkers](http://navajocodetalkers.org/story-of-the-navajo-code-talkers/)” que consistia basicamente
no uso de indígenas norte-americanos como operadores de rádio que enviavam mensagens em código no idioma deles. Esta
história é apresentada no filme [Códigos de Guerra](http://www.adorocinema.com/filmes/filme-26823/).

### Uso atualmente

Atualmente a criptografia é utilizada para proteger qualquer informação considerada importante como:

- Transações bancárias;
- Privacidade;
- Garantia de autenticidade;
- Certificação Digital;
- Navegação segura na internet;

Emfim, são vários os exemplos, como: Quando você acessa um site e ele conta com criptografia para garantir a comunicação
segura entre seu navegador e o servidor onde este site está rodando, o navegador mostra um cadeado que é o sinal que a
conexão está criptografada.

### Exemplo rústico de cifra

Supondo que você queira mandar a seguinte mensagem para alguém, mas deseja que somente o destinatário possa
interpreta-la:

**EU VOU PRA CASA**

**5 20 21 14 20 15 17 1 3 18 1**

Acho que deu pra compreender que cada letra foi substituída pelo seu respectivo número na ordem do alfabeto, supondo que
o código para cifrar/decifrar a mensagem fosse 10, ela ficaria conforme abaixo, pois seria somado o valor original com
10:

**15 30 31 24 30 25 27 11 13 11 28 11**

Para decifrar a mensagem, bastaria conforme previamente combinado com o destinatário, subtrair 10 de cada número da
mensagem para então poder converte-la em letra novamente e ficar ciente que a mensagem era “EU VOU PRA CASA”.

**Obviamente, isso é só um exemplo, não use isso de maneira nenhuma.**

Outra técnica interessante para ser estudada é a [Cifra de Cesar](http://pt.wikipedia.org/wiki/Cifra_de_C%C3%A9sar).

Mas ficou bem claro que uma das vulnerabilidades deste tipo de método é que o mesmo código que criptografa é usado para
descriptografar, certo?

No próximo post eu mostrarei os meios utilizados hoje em dia que garantem uma segurança maior em todos os sentidos.

Quer ler a parte 2 agora? [Vamos lá](http://blog.adlermedrado.com.br/2014/12/introducao-a-criptografia-parte-2).
