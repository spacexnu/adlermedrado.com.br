---
title: "Combatendo fraudes online com FraudTalon"
date: 2025-06-20T17:58:55-03:00
draft: false
tags: [ai, seguranca, fraude]
---

Depois de receber tantas mensagens dos meus pais, esposa, irmã e amigos perguntando se certos e-mails ou anúncios que viram nas redes sociais eram legítimos, decidi criar uma ferramenta para ajudar a identificar fraudes, golpes e tentativas de phishing.

Foi assim que nasceu o **FraudTalon**.

Atualmente ele está na versão MVP 0.0.1 — funcionalidades básicas, heurísticas simples (comecei com NLP mas deixei de lado — por enquanto, não é necessário) e um único LLM baseado em nuvem. O objetivo neste estágio é validar a ideia.

Construí usando ferramentas que conheço bem: Python, Django, PostgreSQL, Celery e OpenAI. Mas quero que isso evolua para uma plataforma multi-LLM. Não me interessa depender de serviços caros, fechados e opacos, hospedados na nuvem de terceiros. Escrevi mais sobre essa mentalidade no meu projeto [SovereignRAG](https://adlermedrado.com.br/posts/rag_soberano/).

Sem no-code/low-code, sem fluxos estilo n8n. Não precisei disso. E sim, tenho um certo preconceito com no-code — sou um dev das antigas — do mesmo jeito que eu tinha preconceito com IA um ano atrás. As coisas mudam.

### Roteiro (Roadmap):

- Upload e análise de arquivos `.eml`
- Validação de URLs com fontes externas como o SpamHaus
- Verificação de números de telefone
- Inspeção de QR codes

Por enquanto, você pode colar o corpo bruto de um e-mail e obter uma análise de risco instantânea. Mas isso é só o começo.

Essa é uma ferramenta para devs, profissionais de segurança, mentes curiosas — e qualquer um que já viu alguém cair num golpe.

Vamos tornar a internet um pouco menos perigosa.
Uma análise por vez.


[Assista ao vídeo no YouTube](https://youtu.be/U_8blKG9iCU).
