# Convite para o primeiro date

Site simples em HTML, CSS e JavaScript puro. Não precisa instalar nada.

## Como abrir
Dê dois cliques no `index.html`. Ele abre no navegador.
Para mandar para ela, suba os arquivos em um serviço gratuito como **Netlify Drop** (arraste a pasta em app.netlify.com/drop), **GitHub Pages** ou **Vercel**, e envie o link.

## Arquivos
- `index.html` : todos os textos e a ordem das seções
- `style.css` : cores, fontes, tamanhos e animações visuais
- `script.js` : interações (contagem, local secreto, botões, corações)

## Onde alterar os textos
Tudo está no `index.html`. Cada seção tem um comentário no topo:
`<!-- 1. ABERTURA -->`, `<!-- 2. CONFISSÃO -->`, `<!-- 3. O CONVITE -->`, `<!-- 4. DATA E HORÁRIO -->`, `<!-- 5. LOCAL -->`, `<!-- 6. SOBRE O DATE -->`, `<!-- 7. TERMOS E CONDIÇÕES -->`, `<!-- 8. FINAL -->` e `<!-- TELA DE ACEITE -->`.
É só trocar o texto entre as tags.

## Onde alterar data e horário
1. Texto visível: no `index.html`, seção `4. DATA E HORÁRIO` (`05.10.2026` e `Passo te buscar às 20:10`).
2. Contagem regressiva: no `script.js`, no topo, em `CONFIG.eventDate`:
   `new Date(2026, 9, 5, 20, 10)` = 5 de outubro de 2026, 20:10.
   Atenção: o mês começa em 0 (janeiro = 0, outubro = 9).

## Onde alterar o local
- As frases que aparecem ao tocar na tarja preta ficam em `CONFIG.placeAnswers` no `script.js`.
- Quando decidir o local, troque a palavra `confidencial` dentro do botão `redacted` no `index.html` e, se quiser mostrar direto, mude a frase do parágrafo `place-answer`.

## Onde alterar as cores
No início do `style.css`, dentro de `:root`:
`--wine`, `--wine-deep`, `--red`, `--cream`, `--cream-dark`, `--ink`, `--rose`.
Mude o valor e o site inteiro acompanha.

## Onde alterar as fontes
- As fontes vêm do Google Fonts, pelo `<link>` dentro do `<head>` do `index.html` (Fraunces, Caveat e DM Sans).
- No `style.css`, em `:root`, troque `--font-title`, `--font-body` e `--font-hand`.
- Se trocar a fonte, troque também o link do Google Fonts.

## Onde alterar as mensagens dos botões
- Texto dos botões: seção `8. FINAL` no `index.html`.
- Respostas do "Vou pensar": `CONFIG.maybeAnswers` no `script.js`. Depois da última, o botão vira "Tá bom, topo".
- Mensagem depois de aceitar: bloco `TELA DE ACEITE` no `index.html`.
- Texto que vai pro WhatsApp: `CONFIG.whatsappText`. Para mandar direto pro seu número, troque no `script.js` `https://wa.me/?text=` por `https://wa.me/55DDDNUMERO?text=`.
- Mensagens que digitam e apagam no balão: `CONFIG.draftMessages`.

## Onde alterar as animações
- Entrada suave das seções: classe `.reveal` no final do `style.css` (mude `.9s` para deixar mais rápido ou lento).
- Seta piscando da abertura: `@keyframes bob`.
- Corações depois do aceite: função `hearts()` no `script.js`. `length: 28` é a quantidade, `speed` é a velocidade e `colors` são as cores.
- Quem tem "reduzir movimento" ativado no celular vê o site sem animações (isso é automático).

## Como adicionar uma nova seção
Copie no `index.html`:
```html
<section class="paper">
  <div class="wrap">
    <p class="label reveal">título pequeno</p>
    <h2 class="reveal">Título grande</h2>
    <p class="reveal">Seu texto.</p>
  </div>
</section>
```
Use `class="paper"` para fundo creme. Sem essa classe o fundo fica vinho escuro. Alternar as duas deixa o ritmo bonito.

## Como colocar imagens
O site não usa imagens. Para adicionar uma, coloque o arquivo na mesma pasta (ex: `foto.jpg`) e use:
```html
<img src="foto.jpg" alt="descrição" style="width:100%;border-radius:6px" class="reveal">
```

## Dependências
Só o Google Fonts. Se ficar sem internet, o site usa fontes do sistema e continua funcionando.
