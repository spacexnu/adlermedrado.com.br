---
title: "Shortificator - Meu gerador de vídeos verticais"
date: 2026-06-06T21:52:09-03:00
languages: ["portuguese"]
draft: false
tags:
  - "videosk"
  - "ia"
  - "llm"
---

# Como eu fiz uma fábrica de Shorts que roda 100% na minha máquina

Todo mundo que mexe com vídeo no YouTube já ouviu falar de Opus Clip, Klap,
SubMagic e a turma. Você joga um vídeo longo, a ferramenta corta os melhores
momentos, coloca legenda animada e te devolve uns Shorts prontos. Funciona. O
problema é o de sempre: é SaaS, você paga por mês, e seu vídeo sobe pro servidor
de alguém.

Eu queria a mesma coisa rodando na minha RTX 5070, sem mandar nada pra lugar
nenhum e sem pagar API. Daí saiu o **shortificator**.

Esse post é sobre como ele funciona por dentro — as decisões técnicas, o que
deu errado no caminho e por que algumas coisas estão do jeito que estão.

## A ideia em uma frase

Pega um vídeo longo, transcreve, deixa um LLM local escolher os melhores cortes,
recorta pra vertical seguindo o rosto, queima legenda e renderiza. Tudo offline.

O pipeline são quatro passos:

```
input.mp4
   ├─ 1. Transcreve       faster-whisper (large-v3, CUDA, timestamp por palavra)
   ├─ 2. Analisa cortes   Ollama → JSON (start, end, hook, score)
   ├─ 3. Reframe + legenda YuNet (crop no rosto) + OpenCV
   └─ 4. Renderiza        FFmpeg (CRF 18, AAC 192k) → output/*_short_NN.mp4
```

Nenhuma dessas peças é exótica. A graça está em como elas se encaixam — e nos
detalhes chatos que ninguém conta.

## Passo 1: transcrição com word-level timestamps

Uso `faster-whisper` com o `large-v3` na GPU. Não é só pra ter o texto — eu
preciso do **timestamp de cada palavra**. Sem isso, esquece legenda no estilo
CapCut, onde a palavra atual fica destacada enquanto a pessoa fala. É o word
timestamp que sincroniza o highlight com o áudio.

Esse passo é o mais lento e o que eu menos quero repetir. Por isso o transcript
é salvo em JSON e dá pra reusar com `--transcript`, pulando o Whisper inteiro nas
próximas rodadas. Quando você tá iterando em prompt ou em estilo de legenda, isso
é a diferença entre esperar 5 segundos ou 5 minutos a cada teste.

## Passo 2: deixar um LLM local escolher os cortes (a parte chata)

Aqui mora a maior dor de cabeça do projeto.

A ideia: mandar o transcript pro Ollama e pedir os melhores momentos em JSON
(`start`, `end`, `hook`, `reason`, `score`). Parece trivial. Não é, quando o
modelo é pequeno.

Três coisas que aprendi na marra:

**1. Sem structured output, o modelo inventa.** Pedindo "responde em JSON" sem
schema, o `qwen2.5:7b` me devolvia um JSON lindo com `video_title`, `key_points`
e um `candidates` vazio. Ele inventava a própria estrutura. A solução foi usar os
*structured outputs* do Ollama: gero um JSON Schema na mão e passo em
`format=`. Aí o modelo é **obrigado** a preencher os campos que eu quero. Com
schema, até modelo de 7B se comporta.

**2. Modelo pequeno amontoa tudo no começo.** Se eu mandasse o vídeo inteiro e
pedisse 5 cortes, ele jogava os 5 nos primeiros minutos e ignorava o resto. A
correção foi fatiar o vídeo em N janelas temporais (`--max-shorts` janelas) e
fazer **uma chamada por janela**, pedindo 2 candidatos em cada. Cada chamada só
vê o trecho dela. No fim eu junto tudo, ordeno por score, removo sobreposição e
corto na quantidade pedida. Bônus: cada chamada fica mais barata porque vê menos
texto, e a quantidade de cortes para de variar entre execuções.

**3. O modelo ignora os limites de duração.** Eu peço "entre 30 e 60 segundos" e
ele me devolve um corte de 12s e outro de 2 minutos numa boa. Em vez de descartar
e perder o candidato, eu **ajusto**: `fit_clip_window` expande os curtos e apara
os longos em torno do centro do corte, com clamp nas bordas do vídeo. Resultado:
qualquer modelo, por pior que respeite instrução, gera candidato válido.

Pra qualidade editorial uso `mistral-small`. É mais lento, mas o resultado também
vai pro disco (`--candidates`), então só pago esse custo uma vez. Quando é só pra
iterar, `qwen2.5:7b` resolve.

## Passo 3: recorte vertical seguindo o rosto

Vídeo horizontal pra 9:16 sem perder o que importa é mais difícil do que parece.
Crop central burro corta a cara da pessoa pela metade na hora que ela anda pro
lado.

Pra detectar rosto eu usava YOLOv11l-face. Funcionava muito bem, mas é **AGPL** e
arrastava o `torch` inteiro junto. Pra um projeto que eu quero open source e leve
de instalar, isso é veneno duplo: licença contaminante e mais uns gigas de
dependência. Troquei pelo **YuNet** (`cv2.FaceDetectorYN`), que já vem no OpenCV,
é Apache-2.0, roda em CPU e o modelo tem 230 KB — baixado automático na primeira
execução. Perdi um pouco de robustez em rosto minúsculo (PiP), mas ganhei licença
permissiva e instalação sem PyTorch. Pro caso de uso, troca justa.

Detalhes que importam na prática:

- Rodar o detector em todo frame de um vídeo 4K mata a performance. Então detecto
  num frame reduzido (até 960px de largura) e só a cada 3 frames, reusando a caixa
  nos demais.
- Box do rosto pula de frame em frame e dá tremor. Suavizo numa janela de 15
  frames pra câmera acompanhar suave em vez de ficar nervosa.
- Quando tem mais de um rosto, uso sempre a **maior** caixa. Isso de quebra
  descarta os falsos-positivos pequenos que o YuNet às vezes cospe.

Também tem modo `gameplay`: aí não carrego detector nenhum e faço crop central
estável, pra preservar mira, HUD e contexto. Detectar "rosto" no meio de um DayZ
não faz sentido.

## Passo 4: legenda que não parece legenda automática

Primeiro tropeço: `cv2.putText` só fala ASCII. Qualquer "ação", "você", "está"
virava `aç?o`, `voc?`, `est?`. Inaceitável em português. A build local do OpenCV
também não tinha `cv2.freetype`. Solução: renderizar a legenda com **Pillow**
(fonte TrueType, UTF-8 de verdade) e compor por cima do frame via OpenCV.

A parte legal é a legenda dinâmica estilo CapCut. A primeira versão usava uma
janela deslizante centrada na palavra atual — o texto andava a cada palavra
falada. Ficou cansativo de ler, parecia teleprompter nervoso. Joguei fora e fui
pra **blocos fixos**: particiono as palavras em grupos de tamanho fixo, o bloco
fica parado e só o highlight (palavra atual) se move dentro dele. O bloco só troca
quando a fala cruza pro próximo grupo. Durante micro-pausas eu seguro o último
bloco em vez de apagar, senão pisca. É exatamente o comportamento que você vê nos
Shorts que dão certo.

E tudo isso é configurável por flag: fonte, tamanho, cor, cor do highlight,
contorno, posição vertical, palavras por bloco. Default reproduz o estilo
hardcoded antigo, então quem não quer mexer não precisa.

## Renderização

FFmpeg, sempre via `subprocess.run`, nunca `os.system`. CRF 18 pra qualidade
visual alta, AAC 192k no áudio. O render é frame a frame, então tem uma barra de
progresso de uma linha com porcentagem, frames processados, ETA e tempo decorrido
— porque ficar olhando pra um terminal mudo por minutos é tortura.

## Por que local, e por que isso importa

O algoritmo não é o segredo — qualquer um junta Whisper + LLM + FFmpeg. O valor
real está em **rodar tudo offline**: sem mensalidade, sem subir seu material pro
servidor de ninguém, sem depender de API que muda de preço ou some.

A ironia é que a parte difícil de transformar isso em produto não é o código — é
a **fricção de instalação**. CUDA, driver, WSL, Ollama, baixar pesos de vários
gigas. Foi por isso que fiz questão de manter o projeto leve: licença MIT,
detector de 230 KB, sem torch, dependências via Poetry. Quanto menos monstro entre
o `git clone` e o primeiro Short, melhor.

## Onde está

O shortificator é open source (MIT) no [GitHub](https://github.com/spacexnu/shortificator).
Se você curte IA local e automação de vídeo, dá uma olhada — e se travar na
instalação, me conta, porque é exatamente esse atrito que eu quero matar.

Eu também postei um [vídeo](https://www.youtube.com/watch?v=yZJjrjzBsB8) no meu [canal do Youtube](https://www.youtube.com/@spacexnu_oficial) falando sobre o projeto.