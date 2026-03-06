(function(){
  const App = window.PlayVSLPage;
  const $ = App.$;

  function ensurePlayVSL(){
    if(window.PlayVSL && typeof window.PlayVSL.init === 'function') return Promise.resolve();
    return new Promise((resolve, reject)=>{
      const existing = document.querySelector('script[data-playvsl-lp="1"]');
      if(existing){
        existing.addEventListener('load', ()=>resolve(), { once:true });
        existing.addEventListener('error', reject, { once:true });
        return;
      }
      const q = new URLSearchParams(location.search);
      const pv = q.get('pv');
      const baseUrl = App.RUNTIME_SCRIPT_URL || 'https://playvsl.com/playvsl.v1.1.0.min.js';
      const sep = baseUrl.includes('?') ? '&' : '?';
      const src = pv ? `${baseUrl}${sep}pv=${encodeURIComponent(pv)}` : baseUrl;
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.setAttribute('data-playvsl-lp', '1');
      s.onload = ()=>resolve();
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function boot(){
    Coloris({
      el: '[data-coloris]', themeMode: 'light', alpha: false, format: 'hex',
      swatches: ['#FFBE01','#C62116','#2F7DF6','#22C55E','#111827','#7C3AED','#16A34A','#DC2626','#F59E0B']
    });

    if($('buttonText')) $('buttonText').addEventListener('input', ()=> $('buttonText').dataset.touched='1');
    App.loadBuilderPrefs();
    if($('langPt')) $('langPt').addEventListener('click', ()=>{ App.setLang('pt'); App.renderPreview(App.builderCfg()); App.quickUpdate(); });
    if($('langEn')) $('langEn').addEventListener('click', ()=>{ App.setLang('en'); App.renderPreview(App.builderCfg()); App.quickUpdate(); });

    App.applyLang();
    App.renderPreview(App.builderCfg());
    App.quickUpdate();

    const formSavedOnLoad = localStorage.getItem('playvsl_lead_sent') === '1';
    if(formSavedOnLoad || App.params.get('unlock') === '1') App.unlockFlow();

    ['youtubeUrl','primaryColor','buttonUrl','buttonText','buttonShowAtSeconds','buttonBg','buttonRevealEffect','buttonFontFamily','buttonFontSize'].forEach((id)=>{
      const el=$(id); if(!el) return;
      el.addEventListener('input', App.quickUpdate);
      el.addEventListener('change', App.quickUpdate);
    });
    if($('buttonNewTab')) $('buttonNewTab').addEventListener('change', App.quickUpdate);
    if($('buttonRounded')) $('buttonRounded').addEventListener('change', App.quickUpdate);
    if($('buttonBoldBtn')) $('buttonBoldBtn').addEventListener('click', ()=>{
      const b = $('buttonBoldBtn');
      const on = !b.classList.contains('active');
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      App.quickUpdate();
    });

    if($('leadSubmit')) $('leadSubmit').addEventListener('click', App.submitLead);

    if($('apply')) $('apply').addEventListener('click', ()=>{
      const c = App.builderCfg();
      App.saveBuilderPrefs();
      $('out').textContent = App.snippet(c);
      App.resetPreviewState(c);
      App.renderPreview(c);
    });

    if($('copy')) $('copy').addEventListener('click', async()=>{
      await navigator.clipboard.writeText($('out').textContent);
      try{ App.sendLandingMetric('copySnippet', { source:'landing_builder' }); }catch(e){}
      $('copy').textContent='Copiado!';
      setTimeout(()=>$('copy').textContent=App.t('copy'),1200);
    });
  }

  ensurePlayVSL().then(boot).catch(()=>{
    const out = $('out');
    if(out) out.textContent = 'Erro ao carregar playvsl.js';
  });
})();
