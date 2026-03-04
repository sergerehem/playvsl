# PlayVSL

O player que transforma seu vídeo do YouTube em VSL de alta conversão.

## Estrutura do projeto
- `playvsl.js` — script principal (fonte, legível)
- `playvsl.min.js` — build minificado (latest)
- `playvsl.v1.0.4.min.js` — build versionado estável
- `index.html` — landing + fluxo de unlock + builder embutido
- `faq.html` — documentação pública
- `assets/css/index.css` — estilos da landing
- `assets/js/*` — scripts da landing (`app-core`, `i18n`, `player-page`, `lead`, `index-main`)
- `archive/legacy/*` — arquivos antigos de referência (não usados em produção)

## Rodar localmente
```bash
cd playvsl-project
python3 -m http.server 8080
```
Abra `http://localhost:8080`.

## Ambientes (prod x testes)
- **Produção:** `index.html` + snippets apontando para `playvsl.v1.0.4.min.js`.
- **Testes:** `index-dev.html` + snippets apontando para `playvsl.dev.js`.

Fluxo recomendado:
1. Testar mudanças em `playvsl.dev.js` via `index-dev.html`.
2. Após aprovação, gerar release minificada versionada (`playvsl.vX.Y.Z.min.js`).
3. Atualizar `App.RUNTIME_SCRIPT_URL` / `App.SNIPPET_SCRIPT_URL` de produção somente no momento da release.

## Embed básico
```html
<div id="playvsl"></div>
<script src="./playvsl.js"></script>
<script>
  PlayVSL.init({
    container:'#playvsl',
    youtubeUrl:'https://youtu.be/wqGiHRWeTR0',
    primaryColor:'#FFBE01',
    buttonUrl:'https://example.com',
    buttonText:'PRÓXIMO PASSO',
    buttonShowAtSeconds:10,
    buttonBg:'#2f7df6'
  });
</script>
```
