(function(){
  const SMARTPLAYER_CSS = `.sp-wrap{max-width:980px;margin:24px auto;padding:0 16px;font-family:Inter,Arial,sans-serif;color:#e8edf2}
.sp-shell{position:relative;background:#000;border-radius:0;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.35)}
.sp-ratio{position:relative;padding-top:56.25%}
.sp-player{position:absolute;inset:0;background:#000;overflow:hidden}
#sp-player-target{position:absolute;inset:0}
#sp-click-shield{position:absolute;inset:0;z-index:4;background:transparent;cursor:pointer}
.sp-player iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
.sp-overlay-top,.sp-overlay-bottom{position:absolute;left:0;right:0;height:54px;pointer-events:none}
.sp-overlay-top{top:0;background:linear-gradient(rgba(0,0,0,.55),transparent)}
.sp-overlay-bottom{display:none}
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
.sp-bar{position:absolute;left:0;right:0;bottom:0;height:6px;background:var(--sp-progress-track,rgba(255,255,255,.2));z-index:6}
.sp-bar-fill{height:100%;width:0;background:var(--sp-primary,#c62116);transition:width .35s linear}
.sp-time{display:none!important}
.sp-prestart .sp-bar,.sp-prestart .sp-time,.sp-prestart .sp-pause-play{display:none}
.sp-cta{display:none;margin:14px auto 0 auto;padding:14px 28px;background:var(--sp-cta-bg,#1a73e8);color:var(--sp-cta-text,#fff);text-decoration:none;border-radius:var(--sp-cta-radius,999px);font-weight:700;text-align:center;min-width:220px;width:fit-content}
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
        teaserProgressDurationSeconds:600, // menor que real para "andar" mais rápido no início
        teaserProgressCurve:0.72, // <1 acelera começo
        teaserPlaybackRate:2,
        playbackRate:1.25,
        rememberDays:15,
        askResume:true,
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
      if (typeof cfg.fakeDurationSeconds !== 'undefined') cfg.teaserProgressDurationSeconds = cfg.fakeDurationSeconds;
      if (typeof cfg.fakeCurve !== 'undefined') cfg.teaserProgressCurve = cfg.fakeCurve;
      if (typeof cfg.fakePlaybackRate !== 'undefined') cfg.teaserPlaybackRate = cfg.fakePlaybackRate;
      if (typeof cfg.realPlaybackRate !== 'undefined') cfg.playbackRate = cfg.realPlaybackRate;

      const host = document.querySelector(cfg.container);
      if(!host) throw new Error('container não encontrado');
      const vid = ytid(cfg.youtubeUrl);
      const key = `smartvsl_${vid}`;
      const now = Date.now();
      const state = JSON.parse(localStorage.getItem(key) || '{"max":0,"cta":false,"ts":0,"started":false,"engaged":0,"anchorSec":null}');
      // saneamento de tipos (evita lixo de versões antigas)
      state.max = Number(state.max || 0);
      state.engaged = Number(state.engaged || 0);
      state.ts = Number(state.ts || 0);
      state.started = state.started === true;
      state.cta = state.cta === true;
      state.anchorSec = (state.anchorSec === null || typeof state.anchorSec === 'undefined') ? null : Number(state.anchorSec);

      if(state.ts && (now - state.ts) > cfg.rememberDays*86400000){ state.max=0; state.cta=false; state.started=false; state.engaged=0; state.anchorSec=null; }
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
      host.style.setProperty('--sp-cta-radius', cfg.buttonRounded ? '999px' : '0px');

      host.innerHTML = `
        <div class="sp-shell"><div class="sp-ratio" style="padding-top:${pad}%">
          <div class="sp-player" id="sp-player-host"><div id="sp-player-target"></div><div id="sp-click-shield" aria-hidden="true"></div></div>
          <div class="sp-overlay-top"></div><div class="sp-overlay-bottom"></div>
          <div class="sp-poster" id="sp-poster" style="background-image:url('https://img.youtube.com/vi/${vid}/maxresdefault.jpg')"></div>
          <button class="sp-first-audio" id="sp-first-audio">
            <div class="t1">Seu v\u00EDdeo j\u00E1 come\u00E7ou</div>
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
            <div class="t2">Clique para ouvir</div>
          </button>
          <button class="sp-pause-play" id="sp-pause-play" aria-label="Continuar v\u00EDdeo">
            <svg viewBox="0 0 100 100" aria-hidden="true" class="sp-play-triangle">
              <path d="M34 24 L76 50 L34 76 Z" />
            </svg>
          </button>
          <div class="sp-modal" id="sp-modal"><div class="sp-modal-card">
            <div class="sp-resume-title">Voc\u00EA j\u00E1 come\u00E7ou a assistir esse v\u00EDdeo</div>
            <div class="sp-modal-actions">
              <button class="sp-btn" id="sp-resume"><span class="sp-icon" aria-hidden="true"><svg class="sp-resume-icon" viewBox="0 0 24 24"><path d="M8 6l10 6-10 6z"/></svg></span><span class="option-text">Continuar assistindo?</span></button>
              <button class="sp-btn" id="sp-restart"><span class="sp-icon" aria-hidden="true"><svg class="sp-restart-icon" viewBox="0 0 5120 5120"><g transform="translate(0,5120) scale(1,-1)"><path d="M2675 4854 c-602 -56 -1065 -264 -1464 -657 -319 -315 -531 -694 -631 -1129 -16 -71 -37 -139 -45 -152 -27 -40 -64 -46 -295 -46 -180 0 -220 -3 -230 -15 -7 -8 -10 -22 -6 -30 7 -18 673 -835 696 -852 8 -7 29 -13 47 -13 31 0 52 24 378 422 190 233 348 434 352 447 3 14 1 26 -8 32 -8 5 -101 9 -207 9 -273 0 -279 5 -228 188 186 660 719 1164 1386 1312 141 31 237 41 405 41 493 0 950 -189 1298 -536 359 -357 548 -812 548 -1315 0 -503 -189 -958 -548 -1315 -332 -331 -758 -515 -1249 -539 -122 -6 -172 -24 -219 -79 -44 -51 -58 -96 -53 -163 7 -77 48 -140 118 -177 l55 -29 140 6 c1105 47 2010 863 2181 1966 25 160 25 500 0 660 -156 1010 -933 1790 -1936 1945 -100 15 -401 27 -485 19z"/></g></svg></span><span class="option-text">Assistir do in\u00EDcio?</span></button>
            </div>
          </div></div>
          <div class="sp-bar"><div class="sp-bar-fill" id="sp-fill"></div></div>
          <div class="sp-time" id="sp-time">00:00</div>
        </div></div>
        <a class="sp-cta" id="sp-cta" href="${cfg.buttonUrl}">${cfg.buttonText}</a>`;

      const cta = host.querySelector('#sp-cta');
      if(cfg.buttonNewTab){
        cta.setAttribute('target','_blank');
        cta.setAttribute('rel','noopener');
      } else {
        cta.removeAttribute('target');
        cta.removeAttribute('rel');
      }

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
      const clickShield = host.querySelector('#sp-click-shield');
      const modal = host.querySelector('#sp-modal');

      function save(){ state.ts=Date.now(); localStorage.setItem(key, JSON.stringify(state)); }
      function showCTA(){
        if(!state.started) return;
        if(state.cta) {
          cta.style.display='block';
          return;
        }
        cta.style.display='block';
        state.cta=true;
        save();
      }
      function teaserProgress(realSec){
        const d = Math.max(60, cfg.teaserProgressDurationSeconds);
        const p = Math.min(1, Math.max(0, realSec / d));
        const curved = Math.pow(p, cfg.teaserProgressCurve);
        return Math.min(100, curved*100);
      }

      let player, timer;
      function update(){
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
        if(!state.cta){
          const anchor = (state.anchorSec ?? 0);
          const engagedNow = Math.max(0, cur - anchor);
          state.engaged = Math.max(state.engaged || 0, engagedNow);
          save();
        }

        if(Math.floor(state.engaged || 0) >= Number(cfg.buttonShowAtSeconds) || state.cta) showCTA();

        if(cur > state.max) { state.max = cur; save(); }
        fill.style.width = teaserProgress(state.engaged || 0) + '%';
        timeEl.textContent = `${fmt(cur)} / ${fmt(dur)}`;
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

      function startAt(sec, unmute=true){
        poster.style.display='none';
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
          save();
          host.classList.remove('sp-prestart');
          player.unMute();
          try { player.setPlaybackRate(Number(cfg.playbackRate) || 1); } catch(e) {}

          if(firstRealPlay){
            try { player.seekTo(0, true); } catch(e) {}
          } else if(sec > 0){
            try { player.seekTo(sec, true); } catch(e) {}
          }
        } else {
          host.classList.add('sp-prestart');
          player.mute();
          try { player.setPlaybackRate(Number(cfg.teaserPlaybackRate) || 2); } catch(e) {}
          if(sec>0){ try { player.seekTo(sec,true); } catch(e) {} }
        }

        player.playVideo();
      }

      function bindResumeButtons(){
        host.querySelector('#sp-restart').onclick = ()=>{ modal.style.display='none'; state.max=0; state.engaged=0; state.anchorSec=0; save(); startAt(0,true); };
        host.querySelector('#sp-resume').onclick = ()=>{ modal.style.display='none'; startAt(Math.max(0,state.max-2), true); };
      }

      function startFirstMutedOverlay(){
        poster.style.display='none';
        firstAudio.style.display='block';
        startAt(0, false); // autoplay mudo
      }

      function showResumeOnLoadIfNeeded(){
        const watched = Math.max(Number(state.max||0), Number(state.engaged||0));
        if(cfg.askResume && state.started === true && watched > 1){
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

      window.onYouTubeIframeAPIReady = function(){
        player = new YT.Player(host.querySelector('#sp-player-target'), {
          videoId: vid,
          playerVars: {autoplay:0,controls:0,rel:0,modestbranding:1,iv_load_policy:3,playsinline:1,origin:location.origin},
          events: {
            onReady: ()=>{
              timer=setInterval(update,500);
              if(state.cta) showCTA();
              fitIframe16x9();
              setTimeout(fitIframe16x9, 150);
              setTimeout(fitIframe16x9, 500);
              setTimeout(fitIframe16x9, 1200);
              let tries = 0;
              const fitTimer = setInterval(()=>{ tries++; const ok = fitIframe16x9(); if(ok && tries>8) clearInterval(fitTimer); if(tries>20) clearInterval(fitTimer); }, 200);
              window.addEventListener('resize', fitIframe16x9);

              const resumed = showResumeOnLoadIfNeeded();
              if(!resumed) startFirstMutedOverlay();
            },
            onStateChange: (ev)=>{
              const st = ev.data;
              // 1=playing, 2=paused, 0=ended
              if(st===1){
                if(pausePlay) pausePlay.style.display='none';
              } else if(st===2){
                if(firstAudio && firstAudio.style.display==='block') return;
                if(modal && modal.style.display==='flex') return;
                if(pausePlay) pausePlay.style.display='grid';
              } else if(st===0){
                // loop automático no modo teaser (antes do clique para ouvir)
                if(!state.started){
                  try { player.seekTo(0, true); } catch(e) {}
                  try { player.mute(); } catch(e) {}
                  try { player.setPlaybackRate(Number(cfg.teaserPlaybackRate) || 2); } catch(e) {}
                  try { player.playVideo(); } catch(e) {}
                }
              }
            },
            onError: (e)=>{ timeEl.textContent=`Erro YouTube ${e.data}`; }
          }
        });
      };

      if(!window.YT || !window.YT.Player){
        const s=document.createElement('script'); s.src='https://www.youtube.com/iframe_api'; document.head.appendChild(s);
      } else window.onYouTubeIframeAPIReady();

      poster.addEventListener('click', askResumeAndPlay);
      firstAudio.addEventListener('click', ()=>{
        firstAudio.style.display='none';
        // no primeiro play real, começa do zero (evita "pulinho" do teaser)
        if(!state.started) startAt(0, true);
        else startAt(Math.max(0, player.getCurrentTime ? player.getCurrentTime() : 0), true);
      });
      pausePlay.addEventListener('click', ()=>{
        startAt(Math.max(0, player.getCurrentTime ? player.getCurrentTime() : 0), true);
      });

      // Intercepta cliques para impedir menu nativo do YouTube
      if(clickShield){
        clickShield.addEventListener('contextmenu', (e)=>e.preventDefault());
        clickShield.addEventListener('mousedown', (e)=>{ if(e.button===2) e.preventDefault(); });
        clickShield.addEventListener('auxclick', (e)=>e.preventDefault());
        clickShield.addEventListener('click', ()=>{
          if(!player || !player.getPlayerState) return;
          if(firstAudio && firstAudio.style.display==='block') return; // mantém fluxo do primeiro clique
          const st = player.getPlayerState();
          if(st===1) player.pauseVideo();
          else startAt(Math.max(0, player.getCurrentTime ? player.getCurrentTime() : 0), true);
        });
      }
    }
  };
  // compatibilidade retroativa
  window.SmartVSL = window.PlayVSL;
})();
