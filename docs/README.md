# Pacote de implementação do redesign

Revisão 2 · 17/11/2026

Extrair na raiz de ~/projects/adlermedrado.com.br. O ZIP contém docs/ com documentos e referências. Mesclar com o diretório existente, preservando arquivos alheios ao pacote. Se estes documentos já tiverem sido alterados no projeto, comparar antes de substituir.

| Arquivo | Uso |
| --- | --- |
| [execution-prompt.md](execution-prompt.md) | Prompt pronto para iniciar o trabalho |
| [spec.md](spec.md) | Requisitos, comportamento e integração Hugo |
| [design.md](design.md) | Referências visuais, medidas e temas |
| [analysis.md](analysis.md) | Evidências e decisões sobre inconsistências |
| [roadmap.md](roadmap.md) | Etapas verificáveis de execução |
| [acceptance.md](acceptance.md) | Cenários e resultados esperados |
| [stitch/](stitch/) | Seis pares HTML/PNG, dois DESIGN.md e captura textual |

A análise foi refeita sobre todas as telas. A referência clara desktop correta é home_light_parchment_adler_medrado_1. A variante _2, escolhida anteriormente por seu nome, mostra uma tela escura.

O checkout WSL não foi acessado com sucesso nesta preparação. A primeira etapa mapeia o Hugo real antes de implementar. O pacote está preparado para um modelo executor com menor capacidade de planejamento, com decisões explícitas e critérios por etapa.
