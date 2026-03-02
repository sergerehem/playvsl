(function(){
  const App = window.PlayVSLPage;
  const $ = App.$;

  App.handlePreviewPlay = function(){
    const isClosed = $('rightPanel')?.classList.contains('hidden') || $('heroGrid')?.classList.contains('locked');
    if(isClosed) document.body.classList.add('preview-played-locked');
  };
  App.handlePreviewPause = function(){ document.body.classList.remove('preview-played-locked'); };

  App.baseCfg = function(){
    return {
      container:'#playvsl-preview', youtubeUrl:'https://youtu.be/wqGiHRWeTR0', primaryColor:'#C62116',
      buttonUrl:`${location.origin}${location.pathname}?unlock=1`, buttonText:'QUERO MEU SNIPPET AGORA - É GRÁTIS',
      buttonShowAtSeconds:10, buttonBg:'#C62116', lang: App.LANG, onPlay: App.handlePreviewPlay, onPause: App.handlePreviewPause
    };
  };

  App.builderCfg = function(){
    return {
      container:'#playvsl-preview', youtubeUrl:$('youtubeUrl').value.trim(), primaryColor:$('primaryColor').value,
      buttonUrl:$('buttonUrl').value.trim(), buttonText:$('buttonText').value,
      buttonShowAtSeconds:Number($('buttonShowAtSeconds').value||10), buttonNewTab:$('buttonNewTab').checked,
      buttonBg:$('buttonBg').value, lang: App.LANG, onPlay: App.handlePreviewPlay, onPause: App.handlePreviewPause
    };
  };

  App.snippet = function(c){
    const closeScript = '</scr' + 'ipt>';
    return `<div id="playvsl"></div>\n<script src="https://playvsl.digi6.com.br/playvsl.js">${closeScript}\n<script>\n  PlayVSL.init({\n    container:'#playvsl',\n    youtubeUrl:'${c.youtubeUrl}',\n    primaryColor:'${c.primaryColor}',\n    buttonUrl:'${c.buttonUrl}',\n    buttonText:'${c.buttonText.replace(/'/g,"\\'")}',\n    buttonShowAtSeconds:${c.buttonShowAtSeconds},\n    buttonNewTab:${c.buttonNewTab},\n    buttonBg:'${c.buttonBg}',\n    lang:'${c.lang || App.LANG}'\n  });\n${closeScript}`;
  };

  App.extractYouTubeId = function(input){
    try{ const u=new URL(input); if((u.hostname||'').includes('youtu.be')) return u.pathname.slice(1); if(u.searchParams.get('v')) return u.searchParams.get('v'); const m=u.pathname.match(/\/embed\/([^/?#]+)/); if(m) return m[1]; }catch(e){}
    return String(input||'').trim();
  };

  App.resetPreviewState = function(cfg){ try{ const vid=App.extractYouTubeId(cfg.youtubeUrl); if(vid) localStorage.removeItem(`smartvsl_${vid}`); }catch(e){} };
  App.renderPreview = function(cfg){ const node=$('playvsl-preview'); node.innerHTML=''; PlayVSL.init(cfg); };

  App.quickUpdate = function(){ if($('out')) $('out').textContent = App.snippet(App.builderCfg()); };
})();
