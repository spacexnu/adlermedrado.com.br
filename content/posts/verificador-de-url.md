---
title: "Vou construir meu próprio verificador de URLs"
date: 2025-07-20T18:05:08-03:00
draft: false
tags: ["fraude", "cyberseguranca", "verificacao de URL", "projeto", "FraudTalon"]
description: "Após testar várias APIs e serviços de verificação de URLs, decidi criar meu próprio motor exclusivo para o FraudTalon — rápido, independente e afinado com a realidade dos golpes digitais."

---

Nos últimos dias, mergulhei fundo numa questão que há tempos me incomodava: a validação de URLs suspeitas no contexto de fraudes digitais.

O [FraudTalon](https://fraudtalon.com) já consegue lidar com textos, imagens, e e-mails. A ideia é simples: extrair qualquer URL contida nesses conteúdos e verificar se ela tem indícios de ser maliciosa. Parece simples, mas quando você começa a testar serviços disponíveis no mercado, o buraco é mais embaixo.

Experimentei várias opções: Google Safe Browsing, URLScan, PhishTank, OpenPhish… e o resultado foi frustrante. Muitos têm limitações severas — uso restrito, pouca cobertura, APIs que bloqueiam projetos fechados, preços impraticáveis (alguns começando em 500 dólares por mês!). E mesmo os gratuitos falham feio em detecções básicas. O próprio Safe Browsing, por exemplo, só detecta o que já é amplamente conhecido. Se a URL do golpe é nova, ele vai te dizer que está tudo certo. Inútil.

Diante disso, decidi algo importante: **vou desenvolver meu próprio motor de análise de URLs**, feito sob medida para o FraudTalon.

Esse novo motor será capaz de identificar sinais clássicos de golpe:

* Páginas falsas de login
* Domínios disfarçados (tipo g00gle.com)
* Ofuscação no código
* Scripts maliciosos embutidos
* Padrões de phishing e scam conhecidos na área de segurança

A ideia é tornar essa análise **rápida, eficiente e sem dependência de terceiros**. Um projeto fechado, mantido por mim, com foco em **performance** e **autonomia total**. Se no futuro for viável, posso até explorar algum modelo de machine learning para reforçar a detecção, treinando com dados públicos.

Vale reforçar: **FraudTalon não é open source**. Pelo menos por enquanto. Não porque eu não acredite em software livre, mas porque esse projeto **precisa se sustentar**. O custo pra manter rodando é alto - envolve inteligência artificial, servidores, infraestrutura. Se eu abrir totalmente e a galera começar a usar em massa, simplesmente não vou ter como bancar. E desligar o projeto por falta de grana seria pior.

Tudo isso nasceu de uma dor pessoal. Sempre que alguém me mandava um e-mail ou anúncio suspeito, perguntando “isso aqui é fraude?”, eu pensava: cara, por que ninguém ainda fez uma ferramenta que responda isso de forma confiável? Agora eu tô construindo essa ferramenta.

Comecei para ajudar meus amigos e familiares, mas estou vendo que isso pode virar algo maior. Um produto que gere valor real, tanto para pessoas comuns quanto para empresas. E se virar um produto de verdade, que se sustenta, melhor ainda — consigo continuar desenvolvendo, mantendo a qualidade e a independência.

Por isso, estou separando esse módulo de verificação de URL como um novo projeto interno, que será usado pelo FraudTalon, mas poderá crescer de forma mais especializada. Ainda tô definindo as prioridades, mas já comecei o esqueleto.

Vou tocar os dois projetos em paralelo. Mesmo com pouco tempo livre — trabalho, família, a vida não para — o progresso tá acontecendo. Semana que vem devo ter mais novidades. E sim, prometi liberar o acesso pra mais gente testar, mas confesso: fico adiando porque quero que esteja redondo antes. Preciso quebrar esse perfeccionismo. Melhor soltar logo e iterar.

Se quiser acompanhar a evolução, segue o canal no YouTube e deixa um comentário por lá. Isso ajuda demais a dar visibilidade pro projeto — e quem sabe até viabilizar financeiramente esse troço todo.

Valeu por acompanhar.

**Libertas Invicta**.