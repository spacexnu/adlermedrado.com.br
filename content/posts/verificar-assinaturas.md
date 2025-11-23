---
title: "Como verificar as assinaturas do meu site"
date: 2025-11-23T12:00:00-03:00
draft: false
tags:
  - gpg
  - seguranca
  - site
---

# Mudança na assinatura GPG do meu website

Não me lembro exatamente mas acredito que a pelo menos dois anos eu assino as páginas HTML do meu site com GPG, faço isso para praticar soberania, autenticidade até mesmo promover ferramentas que auxiliam na privacidade.

Inicialmente eu deixava a assinatura GPG embutida no próprio conteúdo HTML, por exemplo:

```html
<!--
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

- -->
<!doctype html>
<html lang=en>
<head>
    <meta charset=utf-8>
    <meta http-equiv=X-UA-Compatible content="IE=edge">
    <meta name=viewport content="width=device-width,initial-scale=1">
    <meta property="og:title" content="What I’d Tell My 23-Year-Old Self">
    <meta property="og:description" content="If I could whisper to my 23-year-old self, I’d tell him this:

    Stop wasting time worrying about what people think.
    Pour your energy into building, into creating, into making something that’s yours.
    And never forget: everything is impermanent — every victory, every failure, every storm.

    That truth alone is enough to keep you moving forward.">
    <meta property="og:url" content="https://adlermedrado.com.br/missives/what-id-tell-my-23-year-old-self/">
    <meta property="og:site_name" content="Adler Medrado's corner of the web">
    <meta property="og:type" content="article">
    <meta property="og:image" content="/images/default-og-image.png">
    <meta name=twitter:card content="summary_large_image">
    <meta name=twitter:title content="What I’d Tell My 23-Year-Old Self">
    <meta name=twitter:description content="If I could whisper to my 23-year-old self, I’d tell him this:

    Stop wasting time worrying about what people think.
    Pour your energy into building, into creating, into making something that’s yours.
    And never forget: everything is impermanent — every victory, every failure, every storm.

    That truth alone is enough to keep you moving forward.">
    <meta name=twitter:image content="/images/default-og-image.png">
    <title>What I’d Tell My 23-Year-Old Self</title>
    <meta name=description content="If I could whisper to my 23-year-old self, I’d tell him this:

    Stop wasting time worrying about what people think.
    Pour your energy into building, into creating, into making something that’s yours.
    And never forget: everything is impermanent — every victory, every failure, every storm.

    That truth alone is enough to keep you moving forward.">
    <link rel=author href=/humans.txt>
    <link rel=icon type=image/png href=/images/favicon.png>
    <link rel=canonical href=https://adlermedrado.com.br/missives/what-id-tell-my-23-year-old-self/>
    <link href=/css/styles.css rel=stylesheet>
</head>
<body>
    <header class=glitch-zone>
        <nav class=navbar role=navigation aria-label="Main Navigation">
            <div class=navbar_left>
                <a href=/ class=h-card rel=me>
                    <strong>
                        Adler Medrado
                        <span class=cursor-blink>|</span>
                    </strong>
                </a>
            </div>
            <div class="navbar_right navbar_right_animated">
                <a href=/posts>posts</a>
                <a href=/missives>missives</a>
                <a href=/now>what am i doing now</a>
                <a href=/uses>what am i using</a>
            </div>
        </nav>
    </header>
    <main>
        <article class=missive>
            <h1 class="text-4xl font-bold mb-4">What I’d Tell My 23-Year-Old Self</h1>
            <p class="text-sm text-gray-500 mb-6">26 Sep 2025</p>
            <div class=prose>
                <p>If I could whisper to my 23-year-old self, I’d tell him this:</p>
                <ul>
                    <li>Stop wasting time worrying about what people think.</li>
                    <li>Pour your energy into building, into creating, into making something that’s yours.</li>
                    <li>And never forget: everything is impermanent — every victory, every failure, every storm.</li>
                </ul>
                <p>That truth alone is enough to keep you moving forward.</p>
            </div>
        </article>
        <div class=post-tags>
            <p>
                <strong>Tags:</strong>
                <a href=/tags/thoughts>thoughts</a>
            </p>
        </div>
    </main>
    <footer class=glitch-zone role=contentinfo>
        <div class=footer-content>
            <div class=copyright>
                <p>
                    <small>&copy; 1996-2025 Adler Medrado</small>
                </p>
            </div>
            <div class=gpg_signed_info>
                <p>
                    All pages on this website are PGP signed.
                    Import my 
                    <a href=/pub-key.asc aria-label="Download my PGP public key">public key</a>
                     and check with 
                    <em>curl https://adlermedrado.com.br/missives/what-id-tell-my-23-year-old-self/ | gpg --verify</em>
                </p>
                <p>
                    <em>Privacy policy: this website employs no tracking.</em>
                </p>
                <p>
                    <span class=badge-a-plus>
                        <a href="https://developer.mozilla.org/en-US/observatory/analyze?host=adlermedrado.com.br" aria-label="Mozilla Observatory Security Rating: A+">A+</a>
                    </span>
                    <span class=badge-description>Mozilla Observatory Security Rating</span>
                </p>
            </div>
        </div>
    </footer>
    <script>
    (function() {
        function c() {
            var b = a.contentDocument || a.contentWindow.document;
            if (b) {
                var d = b.createElement('script');
                d.innerHTML = "window.__CF$cv$params={r:'9a31943f6eaad8cb',t:'MTc2MzkxMDQ3Ng=='};var a=document.createElement('script');a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
                b.getElementsByTagName('head')[0].appendChild(d)
            }
        }
        if (document.body) {
            var a = document.createElement('iframe');
            a.height = 1;
            a.width = 1;
            a.style.position = 'absolute';
            a.style.top = 0;
            a.style.left = 0;
            a.style.border = 'none';
            a.style.visibility = 'hidden';
            document.body.appendChild(a);
            if ('loading' !== document.readyState)
                c();
            else if (window.addEventListener)
                document.addEventListener('DOMContentLoaded', c);
            else {
                var e = document.onreadystatechange || function() {};
                document.onreadystatechange = function(b) {
                    e(b);
                    'loading' !== document.readyState && (document.onreadystatechange = e, c())
                }
            }
        }
    })();
    </script>
</body>
</html>
<!--
-----BEGIN PGP SIGNATURE-----

iQIzBAEBCAAdFiEEB9cP28xEbBnKQwLObV8aePHcNh0FAmjpMJEACgkQbV8aePHc
Nh114BAAlkjwHZgFP7b7xUr++nhvxslYyb4SEzpWOzWaf1pd1UnwK9g3dBgImdoq
hrBC0yUuGqyCu8ZflghIF2mEVex5uHBCB5SFeQyPqfLA9erFEAPoWQ3b6gcKNiKM
wHwPDNEbgNxjKfoxfHcL6qrzpBjm//EtzXBtgC0IV1HTXOv0CG2s2AiEtmFj2kHO
LlrlMnT0IiwfUfDpL1Va1/AAc3bLsAQJgQVNKkOueoE08OtvnJ2lsz7PhqsgREnF
eorexF2SsHRhueXtet892ICVJuWrZtdN401YhqhLWu8oL6ORrMuQv4ecHRPuk08k
lrZA5atOssG02ghKLd0ITC65R6rEe/Jk3u6oRXYinRKUHvtpFgSQcgVqzU0kbnFF
0a4v6uGkZN5fFTkQO7Ua0483Iv2B+w7B1soFUN034S8ASfOBZXxDdNpyq8vtfk2y
N2bYf5+u/HXn/lNqZsBrS1vY40HoogEch+oO4Im4nsar8znXw3HxiYUM0Th+oiTR
TTWa4NHITlvBOcnmH49mxHSc99vYu0/bSKm8qY8PiZiGXq+u+36X4/1W/A+oXACn
Ao9G0Ljt9bXN7/QGcrb8BYiC+1rgmcMOrGmx+dtbwzfJhkITn6QjykcKFRg+PEIO
Kkv3c6C17+Pz6LIPQe6I//V3LYSvUiMY8lGLuM/C/nvD5QPfMlQ=
=1D7N
-----END PGP SIGNATURE-----
-->
```

Sabe aquela sensação de que algo não está certo? Pois é, ter a assinatura embutida nos meus arquivos HTML sempre me incomodou um pouco.  Apesar de ser super prático validar a assinatura com um comando simples, tipo `curl https://adlermedrado.com.br/missives/what-id-tell-my-23-year-old-self/ | gpg —verify`,  a ideia de ter a assinatura “colada” no arquivo original me incomodava.  Parecia que o arquivo não era mais o original, né?

Então, resolvi mudar isso!  E vou te contar por que manter as assinaturas separadas é uma ideia melhor:

1 - Integridade total:  O arquivo original fica intacto, sem nenhuma “modificação” para incluir a assinatura.  É como se ele estivesse em sua forma mais pura.

2 - Flexibilidade total:  Você pode assinar qualquer tipo de arquivo, seja HTML, CSS, JSON, o que for! E o melhor: dá para automatizar tudo em pipelines, facilitando a vida.

3 - Verificação fácil e limpa:  Sem poluição visual, sem quebrar parseadores, a verificação fica super fácil e universal.  É só executar o comando e pronto!

Por isso, a partir de agora, os arquivos do meu site não terão mais assinatura embutida.  E se você quiser aprender como validar a autenticidade dos documentos HTML, CSS, JSON e outros, do meu site, fique ligado! Vou ensinar tudo direitinho.

## Como validar

Todo arquivo publicado (HTML, CSS, XML, JSON etc.) tem um `.asc` correspondente com a assinatura destacada em ASCII. Baixe o arquivo e o `.asc` juntos e valide com o GPG.

1. Importe minha chave pública (só precisa uma vez):
   ```bash
   curl -O https://adlermedrado.com.br/pub-key.asc
   gpg --import pub-key.asc
   ```
2. Baixe o arquivo desejado e a assinatura (exemplo: página inicial):
   ```bash
   curl -O https://adlermedrado.com.br/index.html
   curl -O https://adlermedrado.com.br/index.html.asc
   ```
3. Verifique:
   ```bash
   gpg --verify index.html.asc index.html
   ```
   A mensagem “Good signature from Adler Medrado” confirma integridade e autoria. Se aparecer BAD signature ou uma chave diferente, considere o arquivo não confiável.

Dica: para qualquer outro arquivo, use o mesmo padrão `arquivo.ext` + `arquivo.ext.asc`.
