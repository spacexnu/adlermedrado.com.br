---
title: "Atualizações no SovereignRAG"
date: 2026-06-01T21:45:09-03:00
languages: ["portuguese"]
draft: false
tags:
  - "zend-framework"
  - "ia"
  - "llm"
  - "rag"
  - "auditoria de codigo"
---

Ontem implementei um conjunto de mudanças no [SovereignRAG](https://adlermedrado.com.br/posts/rag_soberano/) que vinha enrolando faz um tempo: suporte a Markdown na ingestão e citação obrigatória de fontes nos relatórios.

O problema prático era simples. Boa parte da documentação do OWASP não vem em PDF — vem em Markdown. Sem suporte a `.md`, eu estava deixando fora do contexto exatamente os docs que mais importam num scanner de vulnerabilidades. Agora o projeto descobre recursivamente PDFs e arquivos Markdown dentro de qualquer diretório passado via `--docs-dir`, sem precisar especificar os arquivos um a um.

Mas ingerir Markdown cru tem um problema: code fences, headings, links, ênfase em asterisco — tudo isso vira ruído na hora do chunking. Então antes de quebrar o texto em pedaços, o pipeline faz um strip do markup. O conteúdo semântico entra limpo. E cada chunk ainda carrega o metadado de origem (`source: <filename>`), então o sistema sabe de onde veio cada trecho mesmo depois de vetorizado.

Esse metadado virou peça central na outra mudança: citações obrigatórias nos relatórios. Cada vulnerabilidade reportada agora precisa trazer descrição, correção sugerida e o documento de onde veio a informação — com o prefixo `[Source: <documento>]`. Sem fonte, sem relatório. Isso resolve um problema clássico em RAG: a resposta bonita que não te diz de onde saiu.

As fontes também aparecem no relatório HTML, via `html_report.py`. Nada de output invisível num log de terminal — o documento-fonte fica visível pra quem está lendo o relatório.

Por fim, adicionei a flag `--num-ctx` no Ollama para controlar o contexto e o KV cache. Quem roda modelos grandes em GPU com VRAM limitada vai sentir a diferença — dá pra ajustar o `num_ctx` sem ter que mexer nas configs do modelo diretamente.

Eu [postei um vídeo](https://youtu.be/A2DrsCJyQ_Q?si=3lmQ6nvtIW3PVp9A) no [meu canal do Youtube](https://www.youtube.com/@spacexnu_oficial) mostrando o [SovereignRAG](https://github.com/spacexnu/sovereign-rag) em funcionamento.