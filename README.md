# PlayVSL

O player que transforma seu vídeo do YouTube em VSL de alta conversão.

## Arquivos
- `playvsl.js` — script único do player (injeta CSS automaticamente)
- `index.html` — landing + fluxo de unlock + builder embutido
- `playvsl-builder.html` — builder dedicado para gerar snippet
- `smart-player-youtube.html` — página demo

## Rodar localmente
```bash
cd playvsl-project
python3 -m http.server 8080
```
Abra `http://localhost:8080`.

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
