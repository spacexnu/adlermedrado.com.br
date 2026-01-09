---
title: "Pinga: minha pequena ferramenta para requisições http"
date: 2026-01-09T18:34:00-03:00
draft: false
tags:
  - cli
  - tools
  - opensource
---

Faz um tempinho que eu não me sentia tão bem usando uma ferramenta quanto agora.
No trabalho, a galera usa o Postman pra quase tudo, e eu também acabava usando, mesmo achando exagerado demais pra algo tão simples quanto testes de integração com chamadas de API.

Eu sei que o Postman tem um monte de recursos. O problema é que eu nunca precisei da maioria deles. Pra mim, era como usar um canhão pra matar um mosquito.

## Motivação

Um dia, enquanto trabalhava em algumas integrações, resolvi dar um tempo no Postman e ir direto ao ponto: scripts bash chamando `curl`. Funcionou de imediato. Mas não demorou muito pra ficar claro que eu estava repetindo código demais, sem organização, e que aquilo não ia escalar. Estava funcional, mas longe de ser elegante ou sustentável.

Foi aí que me bateu a ideia:

**“Por que não criar uma ferramenta pequena e objetiva, do jeito que eu realmente preciso?”**

Escolhi escrever em **C** porque fazia anos que eu não tocava nessa linguagem. Estava enferrujado. E aquilo parecia a oportunidade perfeita de resolver um problema real e, de quebra, tirar a ferrugem de uma linguagem fundamental, daquelas que te obrigam a pensar, não a empilhar abstrações.

A ideia sempre foi clara: nada de reinventar o Postman.
Sem interface gráfica, sem coleções, sem workspaces, sem sync em nuvem, sem conta, sem login, sem frescura. Eu só queria uma ferramenta simples, rápida e previsível pra disparar requisições HTTP, usando arquivos JSON pra definir os requests.

E foi assim que nasceu o [pinga](https://github.com/spacexnu/pinga).

Um utilitário de linha de comando, escrito em C, que lê um arquivo JSON, executa a requisição HTTP definida ali e entrega a resposta de forma direta. Perfeito pra usar em scripts, pipelines, testes de integração ou simplesmente no terminal, combinado com ferramentas como `jq`.

## Por que o nome pinga?

Porque eu prefiro tomar litros de cachaça e lidar com uma ressaca desgraçada no dia seguinte do que ter que abrir uma ferramenta grande e pesada só pra fazer uma requisição HTTP.

Esse projeto não nasceu pra competir com ferramentas gigantescas. Ele nasceu pra me devolver controle, simplicidade e foco. Se mais alguém achar útil no caminho, ótimo. Mas a motivação original sempre foi a mesma: resolver um incômodo real, com o mínimo possível de camadas entre mim e a solução.

A quem interessar, o repositório é [https://github.com/spacexnu/pinga](https://github.com/spacexnu/pinga), lá tem um provável roadmap e exemplos de uso.
