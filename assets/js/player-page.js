(function(){
  const App = window.PlayVSLPage;
  const $ = App.$;

  App.handlePreviewPlay = function(){
    const isClosed = $('rightPanel')?.classList.contains('hidden') || $('heroGrid')?.classList.contains('locked');
    if(isClosed) document.body.classList.add('preview-played-locked');
  };
  App.handlePreviewPause = function(){ document.body.classList.remove('preview-played-locked'); };

  App._ctaClickedWhileClosed = false;

  App.sendLandingMetric = function(eventName, extra={}){
    try{
      if(!App.EVENTS_WEBHOOK) return;
      const payload = Object.assign({
        event: eventName,
        videoId: App.extractYouTubeId(App.builderCfg().youtubeUrl || App.baseCfg().youtubeUrl),
        sessionId: sessionStorage.getItem('playvsl_session_id') || null,
        visitorId: localStorage.getItem('playvsl_visitor_id') || null,
        leadEmail: localStorage.getItem('playvsl_lead_email') || null,
        leadName: localStorage.getItem('playvsl_lead_name') || null,
        pageUrl: location.href,
        pageOrigin: location.origin,
        pageHost: location.host,
        pageDomain: location.hostname,
        pagePath: location.pathname,
        referrer: document.referrer || null,
        lang: App.LANG,
        ts: Date.now()
      }, extra || {});
      const params = new URLSearchParams();
      Object.entries(payload || {}).forEach(([k,v])=>{ if(v!==undefined && v!==null) params.set(k, String(v)); });
      fetch(App.EVENTS_WEBHOOK, {
        method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
        body: params.toString(),
        keepalive:true,
        mode:'cors',
        credentials:'omit'
      }).catch(()=>{});
    }catch(e){}
  };

  App.trackLandingEvent = function(payload){
    try{
      const evt = payload && payload.event;
      if(!['firstPlay','ctaView'].includes(evt)) return;
      if(!App.EVENTS_WEBHOOK) return;

      const closedNow = App.isConfiguratorClosed();
      if(!closedNow) return;

      const params = new URLSearchParams();
      const leadEmail = localStorage.getItem('playvsl_lead_email') || null;
      const leadName = localStorage.getItem('playvsl_lead_name') || null;
      const enriched = Object.assign({}, payload || {}, { leadEmail, leadName });
      Object.entries(enriched).forEach(([k,v])=>{ if(v!==undefined && v!==null) params.set(k, String(v)); });
      fetch(App.EVENTS_WEBHOOK, {
        method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
        body: params.toString(),
        keepalive:true,
        mode:'cors',
        credentials:'omit'
      }).catch(()=>{});
    }catch(e){}
  };

  const BUILDER_KEY = 'playvsl_builder_cfg';

  App.saveBuilderPrefs = function(){
    try{
      const data = {
        youtubeUrl: $('youtubeUrl')?.value?.trim() || '',
        primaryColor: $('primaryColor')?.value || '#C62116',
        buttonUrl: $('buttonUrl')?.value?.trim() || '',
        buttonText: $('buttonText')?.value || '',
        buttonShowAtSeconds: Number($('buttonShowAtSeconds')?.value || 240),
        buttonNewTab: !!$('buttonNewTab')?.checked,
        buttonRounded: !!$('buttonRounded')?.checked,
        buttonBg: $('buttonBg')?.value || '#C62116',
        buttonRevealEffect: $('buttonRevealEffect')?.value || 'fade',
        buttonFontFamily: $('buttonFontFamily')?.value || 'arial',
        buttonFontSize: Number($('buttonFontSize')?.value || 20),
        buttonBold: !!$('buttonBoldBtn')?.classList.contains('active')
      };
      localStorage.setItem(BUILDER_KEY, JSON.stringify(data));
    }catch(e){}
  };

  App.loadBuilderPrefs = function(){
    try{
      // Enquanto a configuração estiver bloqueada, preserva defaults da LP
      // (evita que preferências antigas sobrescrevam o vídeo/tempo padrão inicial).
      const unlocked = localStorage.getItem('playvsl_lead_sent') === '1';
      if(!unlocked) return;

      const raw = localStorage.getItem(BUILDER_KEY);
      if(!raw) return;
      const c = JSON.parse(raw);
      if($('youtubeUrl') && c.youtubeUrl) $('youtubeUrl').value = c.youtubeUrl;
      if($('primaryColor') && c.primaryColor){
        $('primaryColor').value = c.primaryColor;
        $('primaryColor').dispatchEvent(new Event('input', { bubbles:true }));
        $('primaryColor').dispatchEvent(new Event('change', { bubbles:true }));
      }
      if($('buttonUrl') && c.buttonUrl) $('buttonUrl').value = c.buttonUrl;
      if($('buttonText') && c.buttonText){ $('buttonText').value = c.buttonText; $('buttonText').dataset.touched='1'; }
      if($('buttonShowAtSeconds') && typeof c.buttonShowAtSeconds !== 'undefined') $('buttonShowAtSeconds').value = String(c.buttonShowAtSeconds);
      if($('buttonNewTab')) $('buttonNewTab').checked = !!c.buttonNewTab;
      if($('buttonRounded')) $('buttonRounded').checked = !!c.buttonRounded;
      if($('buttonBg') && c.buttonBg){
        $('buttonBg').value = c.buttonBg;
        $('buttonBg').dispatchEvent(new Event('input', { bubbles:true }));
        $('buttonBg').dispatchEvent(new Event('change', { bubbles:true }));
      }
      if($('buttonRevealEffect') && c.buttonRevealEffect) $('buttonRevealEffect').value = c.buttonRevealEffect;
      if($('buttonFontFamily') && c.buttonFontFamily) $('buttonFontFamily').value = c.buttonFontFamily;
      if($('buttonFontSize') && c.buttonFontSize) $('buttonFontSize').value = String(c.buttonFontSize);
      const b=$('buttonBoldBtn'); if(b){ const on = typeof c.buttonBold === 'undefined' ? true : !!c.buttonBold; b.classList.toggle('active', on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); }
    }catch(e){}
  };

  App.baseCfg = function(){
    return {
      container:'#playvsl-preview', youtubeUrl:'https://www.youtube.com/watch?v=MhtN6Zi6l1c', primaryColor:'#C62116',
      buttonUrl:'https://playvsl.com/', buttonText:App.t('defaultButton'),
      buttonShowAtSeconds:240, buttonNewTab:true, buttonRounded:true, buttonBg:'#C62116', buttonRevealEffect:'fade', buttonFontFamily:'arial', buttonFontSize:20, buttonBold:true, lang: App.LANG, onPlay: App.handlePreviewPlay, onPause: App.handlePreviewPause, onEvent: App.trackLandingEvent
    };
  };

  App.builderCfg = function(){
    return {
      container:'#playvsl-preview', youtubeUrl:$('youtubeUrl').value.trim(), primaryColor:$('primaryColor').value,
      buttonUrl:$('buttonUrl').value.trim(), buttonText:$('buttonText').value,
      buttonShowAtSeconds:Number($('buttonShowAtSeconds').value||240), buttonNewTab:$('buttonNewTab').checked,
      buttonRounded:$('buttonRounded').checked, buttonBg:$('buttonBg').value, buttonRevealEffect:$('buttonRevealEffect').value, buttonFontFamily:$('buttonFontFamily').value, buttonFontSize:Number($('buttonFontSize').value||20), buttonBold:$('buttonBoldBtn').classList.contains('active'), lang: App.LANG, onPlay: App.handlePreviewPlay, onPause: App.handlePreviewPause, onEvent: App.trackLandingEvent
    };
  };

  App.snippet = function(c){
    const closeScript = '</scr' + 'ipt>';
    const cfg = {
      container:'#playvsl',
      youtubeUrl:c.youtubeUrl,
      primaryColor:c.primaryColor,
      buttonUrl:c.buttonUrl,
      buttonText:(c.buttonText || '').replace(/'/g,"\\'"),
      buttonShowAtSeconds:Number(c.buttonShowAtSeconds || 0),
      buttonNewTab:!!c.buttonNewTab,
      buttonRounded:!!c.buttonRounded,
      buttonBg:c.buttonBg,
      buttonRevealEffect:c.buttonRevealEffect || 'fade',
      buttonFontFamily:c.buttonFontFamily || 'arial',
      buttonFontSize:Number(c.buttonFontSize || 20),
      buttonBold:typeof c.buttonBold === 'undefined' ? true : !!c.buttonBold,
      lang:c.lang || App.LANG
    };

    const scriptUrl = (App.SNIPPET_SCRIPT_URL || 'https://playvsl.com/playvsl.v1.0.4.min.js');
    const useDeclarative = !!window.PLAYVSL_SNIPPET_DECLARATIVE;

    if(useDeclarative){
      return `<div id="playvsl" data-playvsl data-youtube-url="${cfg.youtubeUrl}" data-primary-color="${cfg.primaryColor}" data-button-url="${cfg.buttonUrl}" data-button-text="${String(c.buttonText || '').replace(/"/g,'&quot;')}" data-button-show-at-seconds="${cfg.buttonShowAtSeconds}" data-button-new-tab="${cfg.buttonNewTab}" data-button-rounded="${cfg.buttonRounded}" data-button-bg="${cfg.buttonBg}" data-button-reveal-effect="${cfg.buttonRevealEffect}" data-button-font-family="${cfg.buttonFontFamily}" data-button-font-size="${cfg.buttonFontSize}" data-button-bold="${cfg.buttonBold}" data-lang="${cfg.lang}"></div>\n<script src="${scriptUrl}">${closeScript}`;
    }

    return `<div id="playvsl"></div>\n<script src="${scriptUrl}" defer>${closeScript}\n<script>\n  window.addEventListener('load', function () {\n    if (!window.PlayVSL || typeof window.PlayVSL.init !== 'function') return;\n    PlayVSL.init({\n      container: '${cfg.container}',\n      youtubeUrl: '${cfg.youtubeUrl}',\n      primaryColor: '${cfg.primaryColor}',\n      buttonUrl: '${cfg.buttonUrl}',\n      buttonText: '${cfg.buttonText}',\n      buttonShowAtSeconds: ${cfg.buttonShowAtSeconds},\n      buttonNewTab: ${cfg.buttonNewTab},\n      buttonRounded: ${cfg.buttonRounded},\n      buttonBg: '${cfg.buttonBg}',\n      buttonRevealEffect: '${cfg.buttonRevealEffect}',\n      buttonFontFamily: '${cfg.buttonFontFamily}',\n      buttonFontSize: ${cfg.buttonFontSize},\n      buttonBold: ${cfg.buttonBold},\n      lang: '${cfg.lang}'\n    });\n  });\n${closeScript}`;
  };

  App.extractYouTubeId = function(input){
    try{ const u=new URL(input); if((u.hostname||'').includes('youtu.be')) return u.pathname.slice(1); if(u.searchParams.get('v')) return u.searchParams.get('v'); const m=u.pathname.match(/\/embed\/([^/?#]+)/); if(m) return m[1]; }catch(e){}
    return String(input||'').trim();
  };

  App.resetPreviewState = function(cfg){ try{ const vid=App.extractYouTubeId(cfg.youtubeUrl); if(vid){ localStorage.removeItem(`playvsl_${vid}`); } }catch(e){} };

  App.applyShowAtBounds = function(durationSec){
    const el = $('buttonShowAtSeconds');
    if(!el) return;
    const d = Number(durationSec || 0);
    if(d > 0){
      const max = Math.max(0, Math.floor(d));
      el.max = String(max);
      if(Number(el.value || 0) > max) el.value = String(max);
    } else {
      el.removeAttribute('max');
    }
  };

  App.isConfiguratorClosed = function(){
    return $('rightPanel')?.classList.contains('hidden') || $('heroGrid')?.classList.contains('locked');
  };

  App.handlePreviewCTAClick = function(){
    if(!App.isConfiguratorClosed()) return;
    App._ctaClickedWhileClosed = true;
    App.sendLandingMetric('ctaClick', { source: 'landing_locked' });
    App.unlockFlow();
    // após desbloquear, re-render para o CTA assumir o link configurado
    App.renderPreview(App.builderCfg());
    App.quickUpdate();
  };

  App.renderPreview = function(cfg){
    const node = $('playvsl-preview');
    node.innerHTML = '';
    const closed = App.isConfiguratorClosed();
    const previewCfg = Object.assign({}, cfg, {
      buttonUrl: closed ? '#' : (cfg.buttonUrl || '#'),
      buttonText: closed ? App.t('defaultButton') : cfg.buttonText,
      buttonNewTab: closed ? false : !!cfg.buttonNewTab,
      onCTAClick: App.handlePreviewCTAClick,
      onReady: (p)=>{ App.applyShowAtBounds(p?.duration); if(typeof cfg.onReady === 'function') cfg.onReady(p); },
      onError: (p)=>{ App.applyShowAtBounds(0); if(typeof cfg.onError === 'function') cfg.onError(p); }
    });
    PlayVSL.init(previewCfg);

    // redundância segura para LP: garante dupla função do CTA quando configurador está fechado
    if(closed){
      const cta = node.querySelector('.sp-cta');
      if(cta){
        cta.setAttribute('href', '#');
        cta.addEventListener('click', (e)=>{ e.preventDefault(); App.handlePreviewCTAClick(); });
      }
    }
  };

  App.quickUpdate = function(){
    App.saveBuilderPrefs();
    if($('out')) $('out').textContent = App.snippet(App.builderCfg());
  };
})();
