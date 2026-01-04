---
title: "Evoluindo o HADES"
date: 2026-01-04T11:52:13-03:00
draft: false
tags: ["security", "fraud", "detection"]
---

Este post descreve a evolução do **HADES** na detecção de URLs fraudulentas **sem depender de serviços pagos**.  
O foco foi fortalecer a detecção com **código próprio**, **heurísticas locais (PT/BR)** e **fontes públicas abertas**, mantendo controle total do pipeline.

> **Nota:** o CNPJ presente nos exemplos foi alterado para `11917932300169`.  
> O objetivo é **ilustrar o caso**, não expor pessoas físicas ou jurídicas reais.

---

## 1) Problema inicial: heurística simples falha com golpes locais

O HADES usava regras simples: palavras suspeitas em inglês (`login/verify`), HTTP sem TLS, IP na URL, subdomínios excessivos e domínio recém-registrado.  
Essas regras funcionam para exemplos didáticos, mas falham com golpes brasileiros.

**Exemplo real que passou com score 0:**

```text
https://pagmei.regularizareimediato.com/11917932300169
```

**Motivos:**

- Sem palavras “login/verify” em inglês.
- HTML não ativou heurísticas.
- Nenhuma regra capturou CNPJ/CPF no path.

O sistema estava **cego** para o cenário brasileiro.

---

## 2) Heurísticas locais (PT/BR) + padrões de golpe recorrentes

### Melhorias

- Dicionários PT e EN separados (ex.: `pagamento`, `boleto`, `pix`, `cnpj`, `cpf`, `regulariza`).
- Detecção de **path numérico longo** (ex.: `/11917932300169`).
- Penalização de **domínios longos**, comuns em phishing (branding falso, várias palavras, etc.).

### Benefícios

- Golpes nacionais não usam “verify/login” em inglês.
- CNPJ/CPF no path é padrão em golpes de cobrança.
- Domínios longos aumentam o risco (tentativa de parecer “oficial” via texto).

### Exemplo (antes)

```bash
POST /analyze
Content-Type: application/json

{
  "urls": ["https://pagmei.regularizareimediato.com/11917932300169"]
}
```

Resposta:

```json
[
  {
    "url": "https://pagmei.regularizareimediato.com/11917932300169",
    "score": 0,
    "url_details": {
      "domain_length": 31,
      "url_length": 54,
      "has_suspicious_words": false,
      "num_subdomains": 1,
      "uses_ip_address": false,
      "uses_insecure_protocol": false,
      "domain_age_days": -1
    },
    "html_details": {
      "content_fetched": true,
      "has_suspicious_title": false,
      "has_phishing_keywords": false,
      "has_suspicious_forms": false,
      "has_external_redirects": false,
      "has_obfuscated_code": false,
      "missing_ssl_indicators": false,
      "html_score": 0
    },
    "final_score": 0
  }
]
```

### Exemplo (depois, só com heurísticas locais)

Resposta (exemplo real):

```json
[
  {
    "url": "https://pagmei.regularizareimediato.com/11917932300169",
    "score": 50,
    "url_details": {
      "domain_length": 31,
      "url_length": 54,
      "has_suspicious_words": true,
      "has_long_numeric_path": true,
      "in_feed_blocklist": false,
      "feed_match_type": "",
      "num_subdomains": 1,
      "uses_ip_address": false,
      "uses_insecure_protocol": false,
      "domain_age_days": -1
    },
    "html_details": {
      "content_fetched": true,
      "has_suspicious_title": false,
      "has_phishing_keywords": false,
      "has_suspicious_forms": false,
      "has_external_redirects": false,
      "has_obfuscated_code": false,
      "missing_ssl_indicators": false,
      "html_score": 0
    },
    "final_score": 20
  }
]
```

---

## 3) Dicionário no banco + moderação (o sistema aprende sem redeploy)

### O que foi feito (dicionário no banco)

- Criação da tabela `suspicious_dictionary`.
- Cada termo tem `status` (ex.: `approved`, `awaiting_moderation`).
- O código busca as palavras no banco.
- Termos novos de URLs suspeitas são salvos como **candidatos** (`awaiting_moderation`).

### Por que isso ajuda (dicionário no banco)

- Sem necessidade de reescrever código para ajustar o dicionário.
- O sistema sugere termos novos de golpes.
- O time decide o que aprovar, evitando ruído e falsos positivos.

**Exemplo prático:**

- O domínio `regularizareimediato.com` gera tokens como `regulariza`, `imediato`.
- Eles vão para revisão e podem virar regras oficiais.

---

## 4) Reputação local com blocklists abertas (sem custo, sem cadastro)

Heurísticas não detectam URLs maliciosas conhecidas. Precisamos de reputação sem serviços pagos.

### O que foi feito (blocklists abertas)

- Criação das tabelas `feed_sources` e `feed_entries`.
- Pipeline de ingestão para baixar listas públicas abertas (sem cadastro):
  - Phishing.Database (ACTIVE + NEW — “today”)
  - OpenPhish public feed (via GitHub)
  - Spam404
  - KADhosts
- Normalização e salvamento em lote.

### Por que isso ajuda (blocklists abertas)

- URLs ou domínios maliciosos conhecidos recebem **risco alto imediato**.
- As listas cobrem campanhas reais e são atualizadas diariamente.
- Sem custo.

---

## 5) Integração no score (blocklist vira sinal forte)

### O que foi feito (integração no score)

- Na análise, o sistema consulta o banco:
  - URL completa (match direto)
  - Domínio e subdomínios
- Match marca:
  - `in_feed_blocklist = true`
  - `feed_match_type = url | domain`
- Adiciona **+200** no score: risco alto.

### Exemplo (URL em blocklist)

```text
in_feed_blocklist: true
feed_match_type: url (ou domain)
score >= 200
final_score alto
```

### Por que isso ajuda (integração no score)

- Score reflete fraude imediatamente.
- Evita “falso negativo” em URLs já conhecidas como golpe.

---

## Pipeline operacional: produção sem dor

### O que foi feito (pipeline operacional)

- Binário `cmd/ingest` (roda uma vez ou em loop).
- Serviço `ingest` no Docker Compose (`INGEST_INTERVAL`).
- Makefile:
  - `make ingest`
  - `make ingest-loop`

### Exemplo (ingestão local)

```bash
make migrate-up
make ingest
```

### Exemplo (ingestão contínua via Docker)

```bash
docker compose up -d ingest
```

### Por que isso ajuda (pipeline operacional)

- Pipeline automático.
- Independente de instalações externas.
- Controle do intervalo de atualização.

---

## Antes e depois

**Antes** (URL fraudulenta passava):

```text
score: 0
has_suspicious_words: false
html_score: 0
```

**Depois** (heurísticas locais + blocklist):

```text
score > 0
has_suspicious_words: true
has_long_numeric_path: true
in_feed_blocklist: true (se o feed tiver a URL/domínio)
```

---

## Próximos passos

- **Benign lists (top‑1M):** reduzir falsos positivos.
- **Modelo ML leve:** logistic regression / random forest.
- **Normalização avançada:** punycode, homoglyphs.

---

O HADES evoluiu de um modelo simples para um detector realista, com dicionário dinâmico moderado, heurísticas locais (PT/BR), reputação baseada em feeds públicos e pipeline de ingestão automatizado, e ainda sem depender de serviços pagos.

Caso tenha interesse, o código encontra-se atualizado no [Github](https://github.com/spacexnu/hades).
