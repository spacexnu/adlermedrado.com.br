---
title: "Tema claro no site. Vinte linhas de JavaScript."
date: "2026-05-22"
languages: ["portuguese"]
tags:
  - "site"
  - "css"
  - "javascript"
---

Adicionei um toggle de tema no site. Agora você pode escolher entre o tema escuro, que é o padrão desde sempre, e um tema claro com estética vaporwave: fundo creme, acentos em teal escuro, azul legível em cima de papel.

Antes de você imaginar que eu saí enchendo isso de dependência: não. Não tem React, não tem Alpine.js, não tem nada que precisasse de `npm install`. São literalmente menos de vinte linhas de JavaScript puro, divididas em duas partes.

A primeira parte fica no `<head>` da página, um script inline que roda antes de qualquer coisa renderizar. Ele lê o `localStorage`, verifica se você já escolheu um tema antes e aplica o atributo `data-theme` no elemento `<html>` imediatamente. Sem esse script no `<head>`, a página abre no tema errado por uma fração de segundo e depois pisca para o certo. É um detalhe chato, mas resolvível com dez linhas.

A segunda parte é a função de toggle em si, que alterna o atributo e salva a escolha. Pronto.

O resto é puro CSS. Variáveis custom properties redefinindo a paleta inteira dependendo do valor de `data-theme`. Nenhum JavaScript fica gerenciando estado, observando mudança, calculando nada. O CSS faz o trabalho pesado.

---

Eu gosto de manter o site assim. Simples, funcional, sem frescura. Desde que reformulei o visual pra esse estilo dark synthwave, a ideia sempre foi a mesma: o mínimo de dependências possível, nenhum rastreio, nenhum cookie de marketing, nenhum script de terceiro carregando coisa que você não pediu.

Aqui não tem Google Analytics. Não tem pixel de anúncio. Não tem Hotjar registrando onde você passa o mouse. Se você me visitar daqui a um mês, não vou saber. E tá bom assim.

O tema claro foi uma sugestão que fazia sentido. Mas a implementação tinha que ser honesta com o que esse site representa. Ia ser inconsistente colocar um toggle bonito e, por baixo dos panos, chamar cinco scripts externos pra "melhorar a experiência do usuário".

Agora tem dois temas. Sua escolha fica salva localmente no seu navegador. Nenhum servidor fica sabendo qual você escolheu.

Acho que é assim que as coisas deveriam funcionar.
