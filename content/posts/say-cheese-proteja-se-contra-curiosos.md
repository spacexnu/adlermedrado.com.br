---
title: "Say Cheese: Proteja Seu Mac de Curiosos com Uma Foto na Hora do Acesso"
date: 2025-07-14T09:32:00-03:00
tags: ["segurança", "macos", "open source", "apple", "scripts"]
draft: false
---

Já pensou alguém abrindo seu MacBook quando você não tá por perto?

Na sexta-feira criei uma solução simples, eficaz e de código aberto pra lidar com isso — e batizei de **Say Cheese**.

A ideia é a seguinte: se alguém abrir a tampa do seu Mac sem autenticar com Touch ID, uma foto é tirada na hora e enviada direto pro seu iPhone, via iMessage. Você recebe a cara do curioso em tempo real. Simples assim.

## Como Funciona?

Por baixo dos panos, o Say Cheese se integra com o app [**Do Not Disturb**](https://objective-see.org/products/dnd.html), uma ferramenta da Objective-See que monitora o sensor da tampa do Mac.

Quando alguém abre o notebook e não desbloqueia com Touch ID, o Do Not Disturb cria um arquivo temporário. Eu aproveitei esse gatilho e fiz um script que roda automaticamente nesse cenário.

O script dispara o **ImageSnap**, que tira a foto usando a câmera frontal, e em seguida dispara um **AppleScript** que manda essa imagem direto pro seu iMessage.

Ou seja:

- 👀 Tentaram abrir seu Mac?
- 📸 Foto tirada.
- 📱 Você recebe a foto no celular em segundos.

## Código Aberto e Fácil de Usar

O **Say Cheese** está disponível no meu GitHub:  
🔗 [github.com/spacexnu/say_cheese](https://github.com/spacexnu/say_cheese)

É só seguir o passo a passo e deixar rodando em background. Leve, eficiente e discreto.

## Mais Ferramentas da Objective-See

Se curtiu essa abordagem, recomendo explorar os outros projetos da [**Objective-See**](https://objective-see.org). Eles têm ferramentas poderosas e gratuitas pra macOS, como:

- 🔥 LuLu (firewall)
- 🎙️ OverSight (monitoramento de microfone e câmera)
- 💽 BlockBlock (persistência de malware)

Tudo código aberto. Tudo pensado pra proteger você sem depender de soluções pesadas ou invasivas.

---

**Say Cheese** é mais uma camada de defesa. Um jeito prático de flagrar tentativas de acesso não autorizadas ao seu Mac, especialmente útil se você trabalha em cafés, coworkings ou divide o ambiente com outras pessoas.

Privacidade se conquista com atitude.  
E, às vezes, com uma foto bem tirada.