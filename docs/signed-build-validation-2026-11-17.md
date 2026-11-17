# Validação do build assinado — 17/11/2026

**Assinaturas: aprovadas. Inventário de saída: contém 46 arquivos residuais.** Esta verificação foi feita após o usuário informar que executou o build e assinou manualmente. Nenhum arquivo de `public/` foi alterado.

## Assinaturas

- 955 arquivos abrangidos pelo script `clearsign_html.sh`, todos com sidecar `.asc` e assinatura válida.
- Nenhuma assinatura inválida, nenhum sidecar obrigatório ausente e nenhum sidecar órfão.
- Fingerprint da chave primária: `07D7 0FDB CC44 6C19 CA43 02CE 6D5F 1A78 F1DC 361D`.
- A chave pública em `public/pub-key.asc` é idêntica a `static/pub-key.asc`.
- Verificação de cada par por `gpgv`, exigindo resultado bem-sucedido e `VALIDSIG` da chave esperada. SHA-256 do arquivo e do sidecar conferidos antes/depois de cada verificação para detectar alteração durante a leitura.
- Keyring isolado em `/tmp/adler-signed-build-verification/`, criado somente a partir da chave pública do projeto. Nenhuma chave privada acessada.

O script atual assina HTML, HTM, CSS, JS, Markdown, XML, TXT, JSON, webmanifest, map, SVG e `api-catalog`. Há 55 outros assets no build, incluindo imagens e fontes, que ficam fora da seleção desse script. Portanto, o resultado confirma a cobertura definida pelo procedimento existente, sem afirmar assinatura de todos os tipos de arquivo publicados.

## Conteúdo e inventário

Um build novo foi gerado em `/tmp/adler-signed-build-comparison/` e comparado com `public/`, excluindo os sidecars gerados e tratando as chaves/arquivos `.asc` originais de `static/` como conteúdo.

- Todos os 966 arquivos do build novo estão presentes e idênticos byte a byte em `public/`.
- Nenhum arquivo atual faltando ou divergindo do código-fonte.
- `public/` contém outros 46 arquivos que não são gerados pelo checkout atual, totalizando 1.012 arquivos de conteúdo além dos sidecars.
- Exemplos de resíduos: `posts/gpg-no-macosx-snow-leopard/index.html`, `languages/portuguese/page/13/index.html`, `tags/pgp/index.html` e antigos outputs Markdown/RSS de tags.
- Os resíduos assináveis também foram verificados e possuem assinaturas válidas; a assinatura comprova integridade, não a inclusão no inventário atual do Hugo.

Antes da publicação, a recomendação é gerar uma saída limpa e assinar essa saída novamente, para evitar publicar páginas antigas. Nenhum resíduo foi removido nesta auditoria. O comando `make build` atual não solicita limpeza de arquivos obsoletos do destino.

## Verificações do diretório efetivamente assinado

```sh
node scripts/verify_site_ui.mjs public
node scripts/verify_agent_discovery.mjs public
```

Ambos passaram; a sintaxe de todos os arquivos `public/js/*.js` também passou. Foi usado o build existente, sem reconstruí-lo nesse diretório.

Ferramentas e verificação reproduzível desta sessão:

```sh
gpg --homedir /tmp/adler-signed-build-verification --batch --no-autostart --yes --dearmor --output /tmp/adler-signed-build-verification/trustedkeys.gpg static/pub-key.asc
HUGO_CACHEDIR=/tmp/adler-audit-cache .tools/bin/hugo --minify --destination /tmp/adler-signed-build-comparison
python3 /tmp/adler-signed-build-verification/verify.py
```

O verificador termina com falha no critério de inventário limpo, apesar de todas as verificações criptográficas passarem. O relatório bruto completo, com hashes individuais, ficou em `/tmp/adler-signed-build-verification/results.json`; o [resumo persistido](validation-evidence/signed-build.json) inclui a lista dos 46 arquivos extras.

D07 passa nesta rodada. A limpeza do inventário de `public/` permanece como ponto identificado antes de publicar; publicação não executada.
