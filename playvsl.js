(function(){
  const SMARTPLAYER_CSS = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Lato:wght@400;700&family=Montserrat:wght@400;700&family=Open+Sans:wght@400;700&family=Poppins:wght@400;700&family=Roboto:wght@400;500;700&display=swap');
.sp-wrap{max-width:980px;margin:24px auto;padding:0 16px;font-family:Inter,Arial,sans-serif;color:#e8edf2}
.sp-shell{position:relative;background:#000;border-radius:0;overflow:hidden;box-shadow:none;border:1px solid #d1d5db;box-sizing:border-box}
.sp-ratio{position:relative;padding-top:56.25%}
.sp-player{position:absolute;inset:0;background:#000;overflow:hidden}
.sp-player::after{display:none}
.sp-player iframe{transition:opacity .78s ease}
.sp-player.sp-ended iframe,.sp-player.sp-paused iframe{opacity:0;pointer-events:none}
#sp-player-target{position:absolute;inset:0}
#sp-click-shield{position:absolute;inset:0;z-index:4;background:transparent;cursor:pointer}
.sp-player iframe{position:absolute;inset:0;width:100%;height:100%;border:0;max-width:100%;max-height:100%}
.sp-overlay-top,.sp-overlay-bottom{display:none}
.sp-poster{position:absolute;inset:0;background:#000 center/cover no-repeat;display:grid;place-items:center;cursor:pointer;z-index:5}
.sp-play{width:90px;height:90px;border-radius:999px;border:0;background:rgba(255,255,255,.9);font-size:30px;cursor:pointer}
.sp-first-audio{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:7;display:none;width:80%;max-width:400px;background:var(--sp-primary-66,rgba(196,23,12,.66));color:var(--sp-contrast,#fff);border:2px solid var(--sp-contrast,#fff);border-radius:10px;padding:.5em;cursor:pointer;font-family:Arial,Helvetica,sans-serif}
.sp-first-audio .t1,.sp-first-audio .t2{font-weight:700;font-size:24px;line-height:1.1;text-align:center;margin:0;padding:.5em 0}
.sp-first-audio .ico{display:flex;justify-content:center;margin:0;padding:0;color:var(--sp-contrast,#fff)}
.sp-first-audio .ico svg{width:36%;max-width:140px;height:auto;display:block}
.sp-svg-base{fill:var(--sp-contrast,#fff)!important}
@keyframes spBLINK{0%{opacity:0}33%{opacity:1}66%{opacity:1}100%{opacity:0}}
.sp-blink-1{animation:spBLINK 2s infinite;opacity:0}
.sp-blink-2{animation:spBLINK 2s infinite .3s;opacity:0}
.sp-blink-3{animation:spBLINK 2s infinite .6s;opacity:0}
@media (max-width:991px){.sp-first-audio .ico svg{width:30%}}
@media (max-width:500px){.sp-first-audio .t1,.sp-first-audio .t2{font-size:20px}}
.sp-pause-play{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:7;display:none;width:160px;height:160px;border-radius:50%;border:0;background:var(--sp-primary,#c62116);color:#fff;cursor:pointer;place-items:center;box-shadow:0 12px 28px rgba(0,0,0,.35)}
.sp-pause-play svg{width:74%;height:74%;display:block}
.sp-play-triangle path{fill:var(--sp-contrast,#fff);stroke:var(--sp-contrast,#fff);stroke-width:3;stroke-linejoin:round}
@media (max-width:900px){.sp-pause-play{width:120px;height:120px}.sp-pause-play svg{width:70%;height:70%}}
.sp-bar-wrap{position:relative;z-index:6;height:6px;margin-top:0;background:#fff;overflow:hidden}
.sp-bar{position:relative;height:6px;margin-top:0;background:var(--sp-progress-track,rgba(255,255,255,.2))}
.sp-bar-fill{height:100%;width:0;background:var(--sp-primary,#c62116);transition:width .35s linear}
.sp-time{display:none!important}
.sp-prestart .sp-bar-wrap,.sp-prestart .sp-time,.sp-prestart .sp-pause-play{display:none}
.sp-cta{display:none;margin:22px auto 0 auto;padding:var(--sp-cta-pad-y,14px) var(--sp-cta-pad-x,28px);background:var(--sp-cta-bg,#1a73e8);color:var(--sp-cta-text,#fff);text-decoration:none;border:0;outline:none;box-shadow:none;border-radius:var(--sp-cta-radius,999px);font-weight:var(--sp-cta-weight,700);font-family:var(--sp-cta-font,Inter,Arial,sans-serif);font-size:var(--sp-cta-size,20px);line-height:1.1;text-align:center;min-width:220px;width:fit-content;-webkit-appearance:none;appearance:none;transition:filter .18s ease,transform .18s ease,opacity .28s ease}
.sp-cta:hover,.sp-cta:focus-visible{color:var(--sp-cta-text,#fff);text-decoration:none;filter:brightness(.93);transform:translateY(-1px)}
.sp-cta:active{color:var(--sp-cta-text,#fff);filter:brightness(.88);transform:translateY(0)}
.sp-cta:visited{color:var(--sp-cta-text,#fff)}
.sp-cta.sp-cta-fade{animation:spCtaAppearCenter .38s ease-out both}
.sp-cta.sp-cta-pulse{animation:spCtaPulseBurst 3s ease-out 1 both}
@keyframes spCtaAppearCenter{from{opacity:0;transform:scale(.94)}to{opacity:1;transform:scale(1)}}
@keyframes spCtaPulseBurst{0%{transform:scale(1)}15%{transform:scale(1.04)}30%{transform:scale(1)}45%{transform:scale(1.035)}60%{transform:scale(1)}75%{transform:scale(1.025)}100%{transform:scale(1)}}
.sp-modal{position:absolute;inset:0;background:var(--sp-primary,#c62116);display:none;align-items:center;justify-content:center;z-index:8}
.sp-modal-card{background:transparent;color:var(--sp-contrast,#fff);padding:18px;border-radius:2px;max-width:760px;width:92%;text-align:center;font-family:Arial,Helvetica,sans-serif}
.sp-resume-title{font-size:30px;font-weight:700;line-height:1.1;margin:0;padding:.5em 0;color:var(--sp-contrast,#fff)}
.sp-modal-actions{display:flex;gap:22px;margin-top:10px;justify-content:center;flex-wrap:wrap}
.sp-btn{background:transparent;color:var(--sp-contrast,#fff);border:0;padding:8px 10px;border-radius:8px;cursor:pointer;font-size:30px;display:flex;align-items:center;gap:10px}
.sp-btn .option-text{font-size:24px;font-weight:700;line-height:1.1;white-space:nowrap}
.sp-icon{width:42px;height:42px;border:3px solid var(--sp-contrast,#fff);border-radius:50%;display:inline-grid;place-items:center;font-size:20px;font-weight:700}
.sp-icon svg{width:60%;height:60%;display:block;overflow:visible}
.sp-icon svg path{fill:var(--sp-contrast,#fff)}
.sp-resume-icon{transform:none;transform-origin:50% 50%;width:78%!important;height:78%!important}
.sp-restart-icon{transform:none;transform-origin:50% 50%}
.sp-restart-icon path{fill:var(--sp-contrast,#fff);stroke:var(--sp-contrast,#fff);stroke-width:120;stroke-linecap:round;stroke-linejoin:round;paint-order:stroke fill}
@media (max-width: 900px){
.sp-modal-card{padding:22px}
.sp-resume-title{font-size:24px;text-align:center;padding:0 6px 10px}
.sp-modal-actions{flex-direction:column;align-items:center;gap:10px;margin-top:6px}
.sp-btn{padding:4px 6px;gap:10px;justify-content:center}
.sp-icon{width:34px;height:34px;border-width:2px}
.sp-btn .option-text{font-size:18px;white-space:normal;text-align:center}
}`;

  function ensureSmartPlayerCss(){
    if(document.getElementById('smartplayer-inline-css')) return;
    const st=document.createElement('style');
    st.id='smartplayer-inline-css';
    st.textContent=SMARTPLAYER_CSS;
    document.head.appendChild(st);
  }
  function ytid(input){
    try{const u=new URL(input);if(u.hostname.includes('youtu.be'))return u.pathname.slice(1);if(u.searchParams.get('v'))return u.searchParams.get('v');const m=u.pathname.match(/\/embed\/([^/?#]+)/);if(m)return m[1];}catch(e){}
    return input;
  }
  function fmt(s){s=Math.max(0,Math.floor(s||0));const m=String(Math.floor(s/60)).padStart(2,'0');const ss=String(s%60).padStart(2,'0');return `${m}:${ss}`}
  function hexToRgba(hex, a){
    const h = String(hex||'').replace('#','').trim();
    if(!/^[0-9a-fA-F]{6}$/.test(h)) return `rgba(198,33,22,${a})`;
    const r=parseInt(h.slice(0,2),16), g=parseInt(h.slice(2,4),16), b=parseInt(h.slice(4,6),16);
    return `rgba(${r},${g},${b},${a})`;
  }
  function contrastText(hex){
    const h=String(hex||'').replace('#','').trim();
    if(!/^[0-9a-fA-F]{6}$/.test(h)) return '#fff';
    const r=parseInt(h.slice(0,2),16), g=parseInt(h.slice(2,4),16), b=parseInt(h.slice(4,6),16);
    const yiq=((r*299)+(g*587)+(b*114))/1000;
    return yiq >= 150 ? '#111' : '#fff';
  }

  function ensureYouTubeAPI(){
    if(window.YT && window.YT.Player) return Promise.resolve();
    if(window.__playvslYtReadyPromise) return window.__playvslYtReadyPromise;

    window.__playvslYtReadyPromise = new Promise((resolve)=>{
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function(){
        try{ if(typeof prev === 'function') prev(); }catch(e){}
        resolve();
      };
      if(!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')){
        const s=document.createElement('script');
        s.src='https://www.youtube.com/iframe_api';
        document.head.appendChild(s);
      }
    });

    return window.__playvslYtReadyPromise;
  }

  window.PlayVSL = {
    init(opts){
      ensureSmartPlayerCss();
      const cfg = Object.assign({
        container:'#smart-vsl',
        youtubeUrl:'https://youtu.be/wqGiHRWeTR0',
        buttonUrl:'#',
        buttonText:'Quero avançar',
        buttonShowAtSeconds:120, // segundo real do vídeo para liberar botão
        buttonBg:null,
        buttonRounded:true,
        buttonNewTab:false,
        buttonRevealEffect:'fade', // none | fade | pulse
        buttonFontFamily:'arial', // arial | roboto | poppins | inter | montserrat | open_sans | lato
        buttonFontSize:20, // 16 | 20 | 24
        buttonBold:true,
        teaserProgressDurationSeconds:240, // menor = barra anda mais rápido
        teaserProgressCurve:0.58, // <1 acelera mais o começo
        teaserPlaybackRate:2,
        playbackRate:1.25,
        rememberDays:15,
        askResume:true,
        onPlay:null,
        onPause:null,
        onEvent:null,
        onReady:null,
        onFirstPlay:null,
        onResume:null,
        onRestart:null,
        onProgress:null,
        onCTAView:null,
        onCTAClick:null,
        onComplete:null,
        onError:null,
        primaryColor:'#c62116',
        progressTrackColor:'rgba(255,255,255,.2)',
        aspect:'16:9'
      }, opts||{});

      // Compatibilidade com nomes antigos
      if (cfg.ctaUrl) cfg.buttonUrl = cfg.ctaUrl;
      if (cfg.ctaText) cfg.buttonText = cfg.ctaText;
      if (typeof cfg.ctaAfterSeconds !== 'undefined') cfg.buttonShowAtSeconds = cfg.ctaAfterSeconds;
      if (cfg.ctaBg) cfg.buttonBg = cfg.ctaBg;
      if (typeof cfg.ctaRounded !== 'undefined') cfg.buttonRounded = cfg.ctaRounded;
      if (typeof cfg.ctaNewTab !== 'undefined') cfg.buttonNewTab = cfg.ctaNewTab;
      if (cfg.ctaEffect) cfg.buttonRevealEffect = cfg.ctaEffect;
      if (cfg.ctaFontFamily) cfg.buttonFontFamily = cfg.ctaFontFamily;
      if (typeof cfg.ctaFontSize !== 'undefined') cfg.buttonFontSize = cfg.ctaFontSize;
      if (typeof cfg.ctaBold !== 'undefined') cfg.buttonBold = cfg.ctaBold;
      if (typeof cfg.fakeDurationSeconds !== 'undefined') cfg.teaserProgressDurationSeconds = cfg.fakeDurationSeconds;
      if (typeof cfg.fakeCurve !== 'undefined') cfg.teaserProgressCurve = cfg.fakeCurve;
      if (typeof cfg.fakePlaybackRate !== 'undefined') cfg.teaserPlaybackRate = cfg.fakePlaybackRate;
      if (typeof cfg.realPlaybackRate !== 'undefined') cfg.playbackRate = cfg.realPlaybackRate;

      const lang = String(cfg.lang || document.documentElement.lang || navigator.language || 'pt').toLowerCase().startsWith('en') ? 'en' : 'pt';
      const i18n = {
        pt: {
          audioStarted: 'Seu vídeo já começou',
          clickToHear: 'Clique para ouvir',
          resumeAria: 'Continuar vídeo',
          resumeTitle: 'Você já começou a assistir esse vídeo',
          resumeWatch: 'Continuar assistindo?',
          resumeFromStart: 'Assistir do início?'
        },
        en: {
          audioStarted: 'Your video has already started',
          clickToHear: 'Click to hear',
          resumeAria: 'Continue video',
          resumeTitle: 'You already started watching this video',
          resumeWatch: 'Continue watching?',
          resumeFromStart: 'Start over?'
        }
      };
      const t = i18n[lang];

      const host = document.querySelector(cfg.container);
      if(!host) throw new Error('container não encontrado');
      // cleanup de instância anterior no mesmo container (evita erros/repetições no console)
      if(typeof host.__playvslDestroy === 'function'){
        try{ host.__playvslDestroy(); }catch(e){}
      }
      const vid = ytid(cfg.youtubeUrl);
      const key = `playvsl_${vid}`;
      const visitorKey = 'playvsl_visitor_id';
      const sessionKey = 'playvsl_session_id';
      function uuid(){
        if(window.crypto && typeof window.crypto.randomUUID === 'function') return window.crypto.randomUUID();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,(c)=>{ const r=Math.random()*16|0; const v=c==='x'?r:(r&0x3|0x8); return v.toString(16); });
      }
      const visitorId = localStorage.getItem(visitorKey) || (localStorage.setItem(visitorKey, uuid()), localStorage.getItem(visitorKey));
      const sessionId = sessionStorage.getItem(sessionKey) || (sessionStorage.setItem(sessionKey, uuid()), sessionStorage.getItem(sessionKey));
      const now = Date.now();
      const state = JSON.parse(localStorage.getItem(key) || '{"max":0,"cta":false,"ts":0,"started":false,"humanStart":false,"engaged":0,"anchorSec":null}');
      // saneamento de tipos (evita lixo de versões antigas)
      state.max = Number(state.max || 0);
      state.engaged = Number(state.engaged || 0);
      state.ts = Number(state.ts || 0);
      state.started = state.started === true;
      state.humanStart = state.humanStart === true;
      state.cta = state.cta === true;
      state.anchorSec = (state.anchorSec === null || typeof state.anchorSec === 'undefined') ? null : Number(state.anchorSec);

      if(state.ts && (now - state.ts) > cfg.rememberDays*86400000){ state.max=0; state.cta=false; state.started=false; state.humanStart=false; state.engaged=0; state.anchorSec=null; }
      if(state.started && state.anchorSec === null){
        // migração de versões antigas: começa do zero de forma conservadora
        state.anchorSec = 0;
      }

      const ratio = String(cfg.aspect||'16:9').split(':');
      const rw = Number(ratio[0]||16), rh = Number(ratio[1]||9);
      const pad = (rh/rw)*100;

      host.style.setProperty('--sp-primary', cfg.primaryColor);
      host.style.setProperty('--sp-contrast', contrastText(cfg.primaryColor));
      host.style.setProperty('--sp-primary-66', hexToRgba(cfg.primaryColor, .66));
      host.style.setProperty('--sp-primary-72', hexToRgba(cfg.primaryColor, .72));
      host.style.setProperty('--sp-primary-86', hexToRgba(cfg.primaryColor, .86));
      host.style.setProperty('--sp-progress-color', cfg.primaryColor);
      host.style.setProperty('--sp-progress-track', hexToRgba(cfg.primaryColor, .28));
      const btnBg = cfg.buttonBg || cfg.primaryColor;
      host.style.setProperty('--sp-cta-bg', btnBg);
      host.style.setProperty('--sp-cta-text', contrastText(btnBg));
      host.style.setProperty('--sp-cta-radius', cfg.buttonRounded ? '999px' : '10px');
      const ff = String(cfg.buttonFontFamily || 'arial').toLowerCase();
      const fontMap = {
        arial: 'Arial, Helvetica, sans-serif',
        roboto: 'Roboto, Arial, sans-serif',
        poppins: 'Poppins, Arial, sans-serif',
        inter: 'Inter, Arial, sans-serif',
        montserrat: 'Montserrat, Arial, sans-serif',
        open_sans: '"Open Sans", Arial, sans-serif',
        lato: 'Lato, Arial, sans-serif',
        // compat legado
        sans: 'Inter, Arial, sans-serif',
        serif: 'Georgia, "Times New Roman", serif',
        mono: '"Roboto Mono", "Courier New", monospace'
      };
      host.style.setProperty('--sp-cta-font', fontMap[ff] || fontMap.arial);
      host.style.setProperty('--sp-cta-weight', cfg.buttonBold === false ? '400' : '700');
      const fs = Number(cfg.buttonFontSize || 20);
      const ctaSize = fs <= 17 ? 16 : fs >= 23 ? 24 : 20;
      host.style.setProperty('--sp-cta-size', `${ctaSize}px`);
      const padMap = {16:['12px','22px'],20:['14px','28px'],24:['16px','34px']};
      const pads = padMap[ctaSize] || padMap[20];
      host.style.setProperty('--sp-cta-pad-y', pads[0]);
      host.style.setProperty('--sp-cta-pad-x', pads[1]);

      host.innerHTML = `
        <div class="sp-shell"><div class="sp-ratio" style="padding-top:${pad}%">
          <div class="sp-player" id="sp-player-host"><div id="sp-player-target"></div><div id="sp-click-shield" aria-hidden="true"></div></div>
          <div class="sp-overlay-top"></div><div class="sp-overlay-bottom"></div>
          <div class="sp-poster" id="sp-poster" style="background-image:url('https://img.youtube.com/vi/${vid}/maxresdefault.jpg')"></div>
          <button class="sp-first-audio" id="sp-first-audio">
            <div class="t1">${t.audioStarted}</div>
            <div class="ico" aria-hidden="true">
              <svg class="sp-mute-svg" viewBox="7.999 9.062 46.75 32.563" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path class="sp-svg-base" d="M53.249,39.616c-0.186,0-0.371-0.051-0.537-0.157l-43.5-27.75c-0.466-0.297-0.603-0.916-0.306-1.381c0.298-0.466,0.917-0.601,1.381-0.306l43.5,27.75c0.467,0.297,0.604,0.916,0.307,1.381C53.901,39.453,53.579,39.616,53.249,39.616z"></path>
                  <path class="sp-svg-base sp-blink-3" d="M48.896,33.467l1.699,1.085c3.497-7.791,2.073-17.271-4.313-23.659c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414C50.581,18.019,51.913,26.463,48.896,33.467z"></path>
                  <path class="sp-svg-base sp-blink-3" d="M46.926,36.956c-0.612,0.863-1.286,1.695-2.059,2.469c-0.392,0.391-0.392,1.023,0,1.414c0.194,0.195,0.45,0.293,0.707,0.293c0.256,0,0.512-0.098,0.706-0.293c0.878-0.878,1.642-1.824,2.333-2.807L46.926,36.956z"></path>
                  <path class="sp-svg-base sp-blink-2" d="M42.543,29.415l1.777,1.135c1.545-5.315,0.229-11.293-3.953-15.476c-0.392-0.391-1.023-0.391-1.414,0c-0.392,0.391-0.392,1.023,0,1.414C42.454,19.987,43.639,24.925,42.543,29.415z"></path>
                  <path class="sp-svg-base sp-blink-2" d="M41,33.174c-0.563,0.94-1.235,1.837-2.047,2.646c-0.391,0.392-0.391,1.023,0,1.414c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293c0.916-0.914,1.676-1.924,2.317-2.984L41,33.174z"></path>
                  <path class="sp-svg-base sp-blink-1" d="M35.771,25.094l2.003,1.277c0.012-0.203,0.029-0.404,0.029-0.609c0-3.079-1.2-5.974-3.381-8.153c-0.391-0.391-1.022-0.391-1.414,0c-0.391,0.391-0.391,1.023,0,1.414C34.652,20.666,35.613,22.802,35.771,25.094z"></path>
                  <path class="sp-svg-base sp-blink-1" d="M35.084,29.401c-0.474,1.145-1.172,2.197-2.076,3.1c-0.391,0.391-0.391,1.023,0,1.414c0.195,0.195,0.451,0.293,0.707,0.293c0.257,0,0.513-0.098,0.707-0.293c1.008-1.006,1.795-2.17,2.361-3.43L35.084,29.401z"></path>
                  <polygon class="sp-svg-base" points="28.124,20.215 28.124,14.991 24.635,17.99"></polygon>
                  <path class="sp-svg-base" d="M20.921,20.366h-6.423c-0.553,0-1,0.508-1,1.135v8.229c0,0.627,0.447,1.135,1,1.135h7.375l6.25,5.875V24.96L20.921,20.366z"></path>
                </g>
              </svg>
            </div>
            <div class="t2">${t.clickToHear}</div>
          </button>
          <button class="sp-pause-play" id="sp-pause-play" aria-label="${t.resumeAria}">
            <svg viewBox="0 0 100 100" aria-hidden="true" class="sp-play-triangle">
              <path d="M34 24 L76 50 L34 76 Z" />
            </svg>
          </button>
          <div class="sp-modal" id="sp-modal"><div class="sp-modal-card">
            <div class="sp-resume-title">${t.resumeTitle}</div>
            <div class="sp-modal-actions">
              <button class="sp-btn" id="sp-resume"><span class="sp-icon" aria-hidden="true"><svg class="sp-resume-icon" viewBox="0 0 24 24"><path d="M8 6l10 6-10 6z"/></svg></span><span class="option-text">${t.resumeWatch}</span></button>
              <button class="sp-btn" id="sp-restart"><span class="sp-icon" aria-hidden="true"><svg class="sp-restart-icon" viewBox="0 0 5120 5120"><g transform="translate(0,5120) scale(1,-1)"><path d="M2675 4854 c-602 -56 -1065 -264 -1464 -657 -319 -315 -531 -694 -631 -1129 -16 -71 -37 -139 -45 -152 -27 -40 -64 -46 -295 -46 -180 0 -220 -3 -230 -15 -7 -8 -10 -22 -6 -30 7 -18 673 -835 696 -852 8 -7 29 -13 47 -13 31 0 52 24 378 422 190 233 348 434 352 447 3 14 1 26 -8 32 -8 5 -101 9 -207 9 -273 0 -279 5 -228 188 186 660 719 1164 1386 1312 141 31 237 41 405 41 493 0 950 -189 1298 -536 359 -357 548 -812 548 -1315 0 -503 -189 -958 -548 -1315 -332 -331 -758 -515 -1249 -539 -122 -6 -172 -24 -219 -79 -44 -51 -58 -96 -53 -163 7 -77 48 -140 118 -177 l55 -29 140 6 c1105 47 2010 863 2181 1966 25 160 25 500 0 660 -156 1010 -933 1790 -1936 1945 -100 15 -401 27 -485 19z"/></g></svg></span><span class="option-text">${t.resumeFromStart}</span></button>
            </div>
          </div></div>
          <div class="sp-time" id="sp-time">00:00</div>
        </div></div>
        <div class="sp-bar-wrap"><div class="sp-bar"><div class="sp-bar-fill" id="sp-fill"></div></div></div>
        <a class="sp-cta" id="sp-cta" href="${cfg.buttonUrl}">${cfg.buttonText}</a>`;

      const cta = host.querySelector('#sp-cta');
      if(cfg.buttonNewTab){
        cta.setAttribute('target','_blank');
        cta.setAttribute('rel','noopener');
      } else {
        cta.removeAttribute('target');
        cta.removeAttribute('rel');
      }
      cta.addEventListener('click', ()=> emit('ctaClick', {}));

      // Hardening básico contra cópia casual (não é proteção absoluta)
      host.addEventListener('contextmenu', (e)=>e.preventDefault());
      host.addEventListener('dragstart', (e)=>e.preventDefault());
      host.addEventListener('copy', (e)=>e.preventDefault());
      host.addEventListener('cut', (e)=>e.preventDefault());
      host.addEventListener('keydown', (e)=>{
        const k = (e.key||'').toLowerCase();
        if ((e.ctrlKey || e.metaKey) && ['c','u','s','p'].includes(k)) e.preventDefault();
      });
      const fill = host.querySelector('#sp-fill');
      const timeEl = host.querySelector('#sp-time');
      if(!state.started) host.classList.add('sp-prestart');
      const poster = host.querySelector('#sp-poster');
      const firstAudio = host.querySelector('#sp-first-audio');
      if(!state.started && firstAudio) firstAudio.style.display = 'block';
      const pausePlay = host.querySelector('#sp-pause-play');
      const playerHost = host.querySelector('#sp-player-host');
      const clickShield = host.querySelector('#sp-click-shield');
      const modal = host.querySelector('#sp-modal');
      const progressMarks = {25:false,50:false,75:false,100:false};
      let lastProgressEmitSec = -1;

      function eventPayload(extra={}){
        const currentTime = player && player.getCurrentTime ? Number(player.getCurrentTime()||0) : 0;
        const duration = player && player.getDuration ? Number(player.getDuration()||0) : 0;
        return Object.assign({
          event: extra.event || null,
          videoId: vid,
          sessionId,
          visitorId,
          pageUrl: location.href,
          pageOrigin: location.origin,
          pageHost: location.host,
          pageDomain: location.hostname,
          pagePath: location.pathname,
          referrer: document.referrer || null,
          lang: lang,
          userAgent: navigator.userAgent,
          platform: navigator.platform || null,
          isMobile: /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent || ''),
          currentTime,
          duration,
          engagedTime: Number(state.engaged||0),
          started: state.started === true,
          ctaShown: state.cta === true,
          ts: Date.now()
        }, extra);
      }
      function emit(name, extra={}){
        const payload = eventPayload(Object.assign({event:name}, extra));
        const map = {
          ready:'onReady', play:'onPlay', firstPlay:'onFirstPlay', resume:'onResume', restart:'onRestart',
          pause:'onPause', progress:'onProgress', ctaView:'onCTAView', ctaClick:'onCTAClick', complete:'onComplete', error:'onError'
        };
        const cb = cfg[map[name]];
        if(typeof cb === 'function'){ try{ cb(payload); }catch(e){} }
        if(typeof cfg.onEvent === 'function'){ try{ cfg.onEvent(payload); }catch(e){} }
      }

      function save(){ state.ts=Date.now(); localStorage.setItem(key, JSON.stringify(state)); }
      function animateCTA(){
        const fx = String(cfg.buttonRevealEffect || 'none').toLowerCase();
        cta.classList.remove('sp-cta-fade','sp-cta-pulse');
        if(fx === 'none') return;
        const cls = fx === 'pulse' ? 'sp-cta-pulse' : 'sp-cta-fade';
        void cta.offsetWidth;
        cta.classList.add(cls);
      }
      function showCTA(force=false){
        const alwaysShow = Number(cfg.buttonShowAtSeconds) <= 0;
        if(!state.started && !force && !alwaysShow) return;

        const wasVisible = cta.style.display === 'block';
        if(state.cta) {
          if(!wasVisible){
            cta.style.display='block';
            animateCTA();
          }
          return;
        }

        cta.style.display='block';
        animateCTA();
        state.cta=true;
        save();
        emit('ctaView', {});
      }
      function teaserProgress(realSec, realDurationSec){
        const d = Number(realDurationSec || 0);
        if(!d || d <= 0){
          // enquanto o YouTube ainda não informou duração, evita chegar em 100%
          const p0 = Math.min(1, Math.max(0, realSec / Math.max(120, cfg.teaserProgressDurationSeconds)));
          return Math.min(95, Math.max(0, Math.pow(p0, 0.7) * 90));
        }

        // regra dura: 100% SOMENTE no último segundo real
        const p = Math.min(1, Math.max(0, realSec / d));

        // curva em duas metades:
        // - 1ª metade: aparenta mais rápida
        // - 2ª metade: desacelera, mas converge exatamente em 100% ao final
        let eased;
        if(p <= 0.5){
          eased = 0.66 * Math.pow(p / 0.5, 0.72); // ~66% quando tempo real está em 50%
        } else {
          eased = 0.66 + 0.34 * Math.pow((p - 0.5) / 0.5, 1.38);
        }

        if(p >= 0.999) eased = 1;
        return Math.min(100, Math.max(0, eased * 100));
      }

      let player, timer, fitTimer;
      let playerReady = false;
      let pendingStart = null;
      let destroyed = false;
      let hadTrustedInteraction = false;
      function update(){
        if(destroyed) return;
        if(!player || typeof player.getCurrentTime!=='function') return;
        const cur = player.getCurrentTime() || 0;
        const dur = player.getDuration() || 0;

        // antes do primeiro clique real: não conta progresso, não mostra barra/tempo e não libera botão
        if(!state.started){
          fill.style.width = '0%';
          timeEl.textContent = '00:00';
          return;
        }

        // tempo engajado baseado no relógio REAL do player, a partir do 1º clique para ouvir
        const anchor = (state.anchorSec ?? 0);
        const engagedNow = Math.max(0, cur - anchor);
        const prevEngaged = Number(state.engaged || 0);
        const nextEngaged = Math.max(prevEngaged, engagedNow);
        let changed = false;

        if(nextEngaged > (prevEngaged + 0.05)){
          state.engaged = nextEngaged;
          changed = true;
        }

        if(Math.floor(state.engaged || 0) >= Number(cfg.buttonShowAtSeconds) || state.cta) showCTA();

        if(cur > (Number(state.max || 0) + 0.05)) { state.max = cur; changed = true; }
        if(changed) save();
        fill.style.width = teaserProgress(state.engaged || 0, dur) + '%';
        timeEl.textContent = `${fmt(cur)} / ${fmt(dur)}`;

        const engagedFloor = Math.floor(state.engaged || 0);
        if(engagedFloor >= 0 && engagedFloor % 5 === 0 && engagedFloor !== lastProgressEmitSec){
          lastProgressEmitSec = engagedFloor;
          emit('progress', { intervalSec: engagedFloor });
        }
        if(dur > 0){
          const pct = (cur / dur) * 100;
          [25,50,75,100].forEach((m)=>{
            if(!progressMarks[m] && pct >= m){
              progressMarks[m] = true;
              emit('progress', { milestone: m });
            }
          });
        }
      }

      function fitIframe16x9(){
        const box = host.querySelector('#sp-player-host');
        const ifr = box && box.querySelector('iframe');
        if(!box || !ifr) return false;
        // força o iframe interno a acompanhar exatamente o container responsivo
        ifr.style.setProperty('position','absolute','important');
        ifr.style.setProperty('inset','0','important');
        ifr.style.setProperty('width','100%','important');
        ifr.style.setProperty('height','100%','important');
        ifr.style.setProperty('transform','none','important');
        ifr.style.setProperty('maxWidth','100%','important');
        ifr.style.setProperty('maxHeight','100%','important');
        return true;
      }

      function can(method){ return !!(player && typeof player[method] === 'function'); }
      function currentSec(){
        try{ return can('getCurrentTime') ? Math.max(0, Number(player.getCurrentTime() || 0)) : 0; }catch(e){ return 0; }
      }

      function startAt(sec, unmute=true){
        if(unmute && !hadTrustedInteraction) return;
        if(!playerReady || !can('playVideo')){
          pendingStart = { sec:Number(sec||0), unmute: !!unmute };
          return;
        }
        poster.style.display='none';
        if(playerHost){
          playerHost.classList.remove('sp-ended');
          playerHost.classList.remove('sp-paused');
        }
        if(firstAudio) firstAudio.style.display = unmute ? 'none' : 'block';
        if(pausePlay) pausePlay.style.display='none';

        if(unmute){
          const firstRealPlay = !state.started;
          if(firstRealPlay){
            // primeiro play real SEMPRE começa do zero
            state.engaged = 0;
            state.anchorSec = 0;
          }
          state.started = true;
          // qualquer play com áudio após interação deve marcar início humano
          state.humanStart = true;
          save();
          host.classList.remove('sp-prestart');
          emit('play', { firstPlay:firstRealPlay });
          emit(firstRealPlay ? 'firstPlay' : 'resume', {});
          if(can('unMute')) player.unMute();
          try { if(can('setPlaybackRate')) player.setPlaybackRate(Number(cfg.playbackRate) || 1); } catch(e) {}

          if(firstRealPlay){
            try { if(can('seekTo')) player.seekTo(0, true); } catch(e) {}
          } else if(sec > 0){
            try { if(can('seekTo')) player.seekTo(sec, true); } catch(e) {}
          }
        } else {
          host.classList.add('sp-prestart');
          if(can('mute')) player.mute();
          try { if(can('setPlaybackRate')) player.setPlaybackRate(Number(cfg.teaserPlaybackRate) || 2); } catch(e) {}
          if(sec>0){ try { if(can('seekTo')) player.seekTo(sec,true); } catch(e) {} }
        }

        if(can('playVideo')) player.playVideo();
      }

      function bindResumeButtons(){
        host.querySelector('#sp-restart').onclick = ()=>{ modal.style.display='none'; state.max=0; state.engaged=0; state.anchorSec=0; save(); emit('restart',{}); startAt(0,true); };
        host.querySelector('#sp-resume').onclick = ()=>{ modal.style.display='none'; startAt(Math.max(0,state.max-2), true); };
      }

      function startFirstMutedOverlay(){
        poster.style.display='none';
        firstAudio.style.display='block';
        startAt(0, false); // autoplay mudo
      }

      function destroy(){
        destroyed = true;
        playerReady = false;
        try{ if(timer) clearInterval(timer); }catch(e){}
        try{ if(fitTimer) clearInterval(fitTimer); }catch(e){}
        try{ window.removeEventListener('resize', fitIframe16x9); }catch(e){}
        try{ if(player && typeof player.destroy==='function') player.destroy(); }catch(e){}
      }

      function showResumeOnLoadIfNeeded(){
        const watched = Math.max(Number(state.max||0), Number(state.engaged||0));
        if(cfg.askResume && state.started === true && state.humanStart === true && watched > 1){
          modal.style.display='flex';
          bindResumeButtons();
          return true;
        }
        return false;
      }

      function askResumeAndPlay(){
        if(cfg.askResume && state.max>10){
          modal.style.display='flex';
          bindResumeButtons();
        } else startAt(0,true);
      }

      function createPlayer(){
        player = new YT.Player(host.querySelector('#sp-player-target'), {
          videoId: vid,
          playerVars: {autoplay:0,controls:0,rel:0,modestbranding:1,iv_load_policy:3,playsinline:1},
          events: {
            onReady: ()=>{
              if(destroyed) return;
              playerReady = true;
              timer=setInterval(update,500);
              emit('ready', {});
              if(state.cta) showCTA();
              if(Number(cfg.buttonShowAtSeconds) <= 0) showCTA(true);
              fitIframe16x9();
              setTimeout(fitIframe16x9, 150);
              setTimeout(fitIframe16x9, 500);
              setTimeout(fitIframe16x9, 1200);
              let tries = 0;
              fitTimer = setInterval(()=>{ tries++; const ok = fitIframe16x9(); if(ok && tries>8) clearInterval(fitTimer); if(tries>20) clearInterval(fitTimer); }, 200);
              window.addEventListener('resize', fitIframe16x9);

              if(pendingStart){
                const ps = pendingStart;
                pendingStart = null;
                startAt(ps.sec, ps.unmute);
                return;
              }

              const resumed = showResumeOnLoadIfNeeded();
              if(!resumed) startFirstMutedOverlay();
            },
            onStateChange: (ev)=>{
              if(destroyed) return;
              const st = ev.data;
              if(st===1){
                host.dataset.spEnded = '0';
                if(playerHost){
                  playerHost.classList.remove('sp-ended');
                  playerHost.classList.remove('sp-paused');
                }
                if(poster) poster.style.display='none';
                if(pausePlay) pausePlay.style.display='none';
              } else if(st===2){
                if(firstAudio && firstAudio.style.display==='block') return;
                if(modal && modal.style.display==='flex') return;
                if(playerHost) playerHost.classList.add('sp-paused');
                if(poster) poster.style.display='block';
                if(pausePlay) pausePlay.style.display='grid';
                emit('pause', {});
              } else if(st===0){
                try{ state.engaged = Math.max(Number(state.engaged||0), Number(player.getDuration ? player.getDuration() : 0)); save(); }catch(e){}
                try{ if(fill) fill.style.width = '100%'; }catch(e){}
                emit('complete', {});
                if(!state.started){
                  try { player.seekTo(0, true); } catch(e) {}
                  try { player.mute(); } catch(e) {}
                  try { player.setPlaybackRate(Number(cfg.teaserPlaybackRate) || 2); } catch(e) {}
                  try { player.playVideo(); } catch(e) {}
                } else {
                  host.dataset.spEnded = '1';
                  if(playerHost){
                    playerHost.classList.add('sp-ended');
                    playerHost.classList.remove('sp-paused');
                  }
                  if(poster) poster.style.display='none';
                  if(pausePlay) pausePlay.style.display='grid';
                }
              }
            },
            onError: (e)=>{ timeEl.textContent=`Erro YouTube ${e.data}`; emit('error', { code:e.data }); }
          }
        });
      }

      host.__playvslDestroy = destroy;
      ensureYouTubeAPI().then(()=>{ if(!destroyed) createPlayer(); });

      poster.addEventListener('click', ()=>{
        hadTrustedInteraction = true;
        if(playerHost && playerHost.classList.contains('sp-paused')){
          startAt(currentSec(), true);
          return;
        }
        askResumeAndPlay();
      });
      firstAudio.addEventListener('click', ()=>{
        hadTrustedInteraction = true;
        firstAudio.style.display='none';
        // no primeiro play real, começa do zero (evita "pulinho" do teaser)
        if(!state.started) startAt(0, true);
        else startAt(currentSec(), true);
      });
      pausePlay.addEventListener('click', ()=>{
        hadTrustedInteraction = true;
        const ended = host.dataset.spEnded === '1';
        if(ended){
          state.max = 0;
          state.engaged = 0;
          state.anchorSec = 0;
          save();
          host.dataset.spEnded = '0';
          startAt(0, true);
          return;
        }
        startAt(currentSec(), true);
      });

      // Intercepta cliques para impedir menu nativo do YouTube
      if(clickShield){
        clickShield.addEventListener('contextmenu', (e)=>e.preventDefault());
        clickShield.addEventListener('mousedown', (e)=>{ if(e.button===2) e.preventDefault(); });
        clickShield.addEventListener('auxclick', (e)=>e.preventDefault());
        clickShield.addEventListener('click', ()=>{
          hadTrustedInteraction = true;
          if(!player || !player.getPlayerState) return;
          if(firstAudio && firstAudio.style.display==='block') return; // mantém fluxo do primeiro clique
          const st = player.getPlayerState();
          if(st===1) player.pauseVideo();
          else startAt(currentSec(), true);
        });
      }
    }
  };
  // alias antigo removido
})();
