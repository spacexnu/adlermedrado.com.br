---
title: "Update: Análise de emails (.eml) com FraudTalon"
date: 2025-06-28T15:46:07-03:00
draft: false
tags: [ fraudtalon, ai, seguranca, fraude ]
---

### O FraudTalon deu mais um passo importante.

Mesmo com pouco tempo livre na semana, sigo comprometido em manter o FraudTalon avançando e publicando updates regulares.

A partir de hoje, é possível fazer o upload de arquivos .eml diretamente pela interface, e o sistema realiza uma análise
completa combinando heurísticas de segurança de e-mails com inteligência artificial.

<img alt="fraudtalon-banner" height="50%" src="/posts/images/fraudtalon-banner.png" width="50%"/>

O pipeline está assim:

- Parse automático do .eml, com extração dos headers, remetente, destinatário, assunto e corpo
- Avaliação heurística com sinais como:
    - Mismatch entre From, Reply-To e Return-Path
    - Falhas de autenticação (DKIM, SPF, DMARC)
    - Recebimento por servidores desconhecidos
- Análise por IA (via OpenAI) levando em conta todo o conteúdo textual
- Score consolidado com os sinais suspeitos encontrados

Essa atualização transforma o [FraudTalon](https://fraudtalon.com) em uma ferramenta muito mais útil para análise de
e-mails suspeitos, como golpes de Pix, phishing, ou promessas falsas de investimento.

O foco a partir de agora será:

1. Validação de URLs contra bases públicas de scam
2. Leitura e análise de QR Codes
3. Explicabilidade completa: mostrar por que o sistema marcou um item como fraude

Sigo no compromisso de publicar atualizações sobre a evolução do projeto.

Curtiu essa atualização? Tem mais vindo aí. Me acompanhe pelo site ou
no [LinkedIn](https://linkedin.com/in/adlermedrado).

