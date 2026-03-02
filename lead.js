(function(){
  const App = window.PlayVSLPage;
  const $ = App.$;

  App.getPlayerStateForBaseVideo = function(){
    try{ const raw = localStorage.getItem('smartvsl_wqGiHRWeTR0'); if(!raw) return null; return JSON.parse(raw); }catch(e){ return null; }
  };
  App.canUnlock = function(){ const st = App.getPlayerStateForBaseVideo(); return !!(st && st.started === true && st.cta === true); };

  App.unlockFlow = function(){
    const formSaved = localStorage.getItem('playvsl_lead_sent') === '1';
    if(formSaved){
      $('rightPanel').classList.remove('hidden'); $('heroGrid').classList.remove('locked'); $('gateInfo').classList.add('hidden');
      $('leadStep').classList.add('hidden'); $('builderStep').classList.remove('hidden');
      const c = App.builderCfg();
      $('out').textContent = App.snippet(c);
      App.renderPreview(c);
      return;
    }
    if(!App.canUnlock()){
      $('gateInfo').classList.remove('hidden');
      $('gateInfo').innerHTML = `<h2 id="t_gate_title">${App.t('gateTitle')}</h2><p>${App.t('gateNeed')}</p>`;
      return;
    }
    $('rightPanel').classList.remove('hidden'); $('heroGrid').classList.remove('locked'); document.body.classList.remove('preview-played-locked');
    $('gateInfo').classList.add('hidden'); $('leadStep').classList.remove('hidden');
    App.renderPreview(App.builderCfg());
  };

  App.submitLead = async function(){
    const name = $('leadName').value.trim();
    const email = $('leadEmail').value.trim();
    if(!name || !email){ alert(App.t('alertFill')); return; }

    try{
      let r;
      if(App.LEAD_API){
        r = await fetch(App.LEAD_API,{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email,name,tag:'playvsl-lp'}) });
      } else if (App.ENCHARGE_TOKEN) {
        r = await fetch('https://api.encharge.io/v1/people',{ method:'POST', headers:{'Content-Type':'application/json','X-Encharge-Token': App.ENCHARGE_TOKEN}, body: JSON.stringify({email,name,tags:'playvsl-lp'}) });
      }
      if(r && !r.ok) throw new Error('Falha ao enviar lead');
    }catch(e){
      alert(App.t('alertFail'));
      return;
    }

    localStorage.setItem('playvsl_lead_sent','1');
    localStorage.setItem('playvsl_lead_name',name);
    localStorage.setItem('playvsl_lead_email',email);
    $('leadStep').classList.add('hidden'); $('builderStep').classList.remove('hidden');
    const c = App.builderCfg();
    $('out').textContent = App.snippet(c);
    App.renderPreview(c);
  };
})();
