(function(){
  const App = window.PlayVSLPage;
  const $ = App.$;

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
    $('copy').textContent='Copiado!';
    setTimeout(()=>$('copy').textContent=App.t('copy'),1200);
  });
})();
