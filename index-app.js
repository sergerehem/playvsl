    const $=id=>document.getElementById(id);
    const params = new URLSearchParams(location.search);
    const LEAD_API = window.PLAYVSL_LEAD_API || 'https://n8n.digi6.com.br/webhook/0811d5ba-ecf7-4a52-9afe-4a93058ceac9';
    const ENCHARGE_TOKEN = window.PLAYVSL_ENCHARGE_TOKEN || ''; // fallback MVP (inseguro)

    Coloris({
      el: '[data-coloris]',
      themeMode: 'light',
      alpha: false,
      format: 'hex',
      swatches: [
        '#FFBE01','#C62116','#2F7DF6','#22C55E','#111827','#7C3AED',
        '#16A34A','#DC2626','#F59E0B'
      ]
    });


    const I18N = {
      pt: {
        title: 'O player que transforma seu vídeo do YouTube em <span class="accent">VSL de alta conversão</span>',
        subtitle: 'Assista à demonstração e, quando o botão aparecer, desbloqueie seu snippet em segundos.',
        gateTitle: 'Desbloqueio',
        gateSub: 'O configurador será liberado após você interagir com a VSL e clicar no botão quando aparecer.',
        leadTitle: 'Quase lá 👇',
        leadSub: 'Preencha para liberar o snippet.',
        name: 'Nome', email: 'Email', leadBtn: 'Liberar snippet',
        builderTitle: 'Configure e copie seu snippet',
        youtube:'YouTube URL', primary:'Cor primária', buttonUrl:'URL do botão', buttonText:'Texto do botão',
        showSeconds:'Mostrar botão em (s)', buttonColor:'Cor do botão', newTab:'Abrir em nova aba',
        apply:'Ver prévia', copy:'Copiar snippet', yes:'Sim', no:'Não',
        gateNeed: 'Para liberar o configurador, assista à VSL e clique no botão quando ele aparecer.',
        alertFill: 'Preencha nome e email.',
        alertFail: 'Não foi possível enviar seu cadastro agora. Tente novamente em instantes.',
        rights: '© 2026 PlayVSL. Todos os direitos reservados.',
        defaultButton: 'QUERO MEU SNIPPET AGORA - É GRÁTIS',
        seoTitle: 'PlayVSL | Player para VSL com YouTube e alta conversão',
        seoDesc: 'PlayVSL é o player que transforma seu vídeo do YouTube em VSL de alta conversão, com teaser inteligente, botão no tempo certo e setup em minutos.',
        seoOgDesc: 'Transforme seu vídeo do YouTube em VSL de alta conversão com teaser inteligente e botão no tempo certo.',
        seoLdDesc: 'Player para transformar vídeos do YouTube em VSLs de alta conversão.'
      },
      en: {
        title: 'The player that turns your YouTube video into a <span class="accent">high-converting VSL</span>',
        subtitle: 'Watch the demo and, when the button appears, unlock your snippet in seconds.',
        gateTitle: 'Unlock',
        gateSub: 'The builder unlocks after you engage with the VSL and click the button when it appears.',
        leadTitle: 'Almost there 👇',
        leadSub: 'Fill this form to unlock your snippet.',
        name: 'Name', email: 'Email', leadBtn: 'Unlock snippet',
        builderTitle: 'Configure and copy your snippet',
        youtube:'YouTube URL', primary:'Primary color', buttonUrl:'Button URL', buttonText:'Button text',
        showSeconds:'Show button at (s)', buttonColor:'Button color', newTab:'Open in new tab',
        apply:'Preview', copy:'Copy snippet', yes:'Yes', no:'No',
        gateNeed: 'To unlock the builder, watch the VSL and click the button when it appears.',
        alertFill: 'Please enter name and email.',
        alertFail: 'Could not submit your signup right now. Please try again shortly.',
        rights: '© 2026 PlayVSL. All rights reserved.',
        defaultButton: 'GET MY SNIPPET NOW - IT\'S FREE',
        seoTitle: 'PlayVSL | YouTube VSL Player for higher conversions',
        seoDesc: 'PlayVSL turns your YouTube video into a high-converting VSL with smart teaser, timed CTA, and setup in minutes.',
        seoOgDesc: 'Turn your YouTube video into a high-converting VSL with smart teaser and timed CTA.',
        seoLdDesc: 'Player to turn YouTube videos into high-converting VSLs.'
      }
    };

    let LANG = localStorage.getItem('playvsl_lang') || (((navigator.language||'').toLowerCase().startsWith('pt')) ? 'pt' : 'en');
    function t(k){ return (I18N[LANG] && I18N[LANG][k]) || I18N.pt[k] || k; }
    function applyLang(){
      document.documentElement.lang = LANG === 'pt' ? 'pt-BR' : 'en';
      const set = (id,val,html=false)=>{ const el=$(id); if(!el) return; html ? el.innerHTML=val : el.textContent=val; };
      set('t_title', t('title'), true); set('t_subtitle', t('subtitle')); set('t_gate_title', t('gateTitle')); set('t_gate_sub', t('gateSub'));
      set('t_lead_title', t('leadTitle')); set('t_lead_sub', t('leadSub')); set('t_name', t('name')); set('t_email', t('email'));
      set('leadSubmit', t('leadBtn')); set('t_builder_title', t('builderTitle')); set('t_youtube', t('youtube')); set('t_primary', t('primary'));
      set('t_button_url', t('buttonUrl')); set('t_button_text', t('buttonText')); set('t_show_seconds', t('showSeconds')); set('t_button_color', t('buttonColor'));
      set('t_new_tab', t('newTab')); set('apply', t('apply')); set('copy', t('copy')); set('t_footer_rights', t('rights'));
      // toggle sem texto Yes/No (UX mais limpa)
      if($('buttonText') && !$('buttonText').dataset.touched){ $('buttonText').value = t('defaultButton'); }

      const st=$('seo_title'); if(st) document.title = t('seoTitle');
      const sd=$('seo_desc'); if(sd) sd.setAttribute('content', t('seoDesc'));
      const sot=$('seo_og_title'); if(sot) sot.setAttribute('content', t('seoTitle'));
      const sod=$('seo_og_desc'); if(sod) sod.setAttribute('content', t('seoOgDesc'));
      const stt=$('seo_tw_title'); if(stt) stt.setAttribute('content', t('seoTitle'));
      const std=$('seo_tw_desc'); if(std) std.setAttribute('content', t('seoOgDesc'));
      const ld=$('seo_ldjson');
      if(ld){
        ld.textContent = JSON.stringify({
          '@context':'https://schema.org',
          '@type':'SoftwareApplication',
          name:'PlayVSL',
          applicationCategory:'BusinessApplication',
          operatingSystem:'Web',
          url:'https://playvsl.digi6.com.br/',
          description:t('seoLdDesc'),
          offers:{'@type':'Offer',price:'0',priceCurrency:'USD'}
        });
      }
    }
    function handlePreviewPlay(evt){
      const isClosed = $('rightPanel')?.classList.contains('hidden') || $('heroGrid')?.classList.contains('locked');
      if(isClosed) document.body.classList.add('preview-played-locked');
    }
    function handlePreviewPause(){
      document.body.classList.remove('preview-played-locked');
    }

    function baseCfg(){
      return {
        container:'#playvsl-preview',
        youtubeUrl:'https://youtu.be/wqGiHRWeTR0',
        primaryColor:'#C62116',
        buttonUrl:`${location.origin}${location.pathname}?unlock=1`,
        buttonText:'QUERO MEU SNIPPET AGORA - É GRÁTIS',
        buttonShowAtSeconds:10,
        buttonBg:'#C62116',
        lang: LANG,
        onPlay: handlePreviewPlay,
        onPause: handlePreviewPause
      };
    }

    function builderCfg(){
      return {
        container:'#playvsl-preview',
        youtubeUrl:$('youtubeUrl').value.trim(),
        primaryColor:$('primaryColor').value,
        buttonUrl:$('buttonUrl').value.trim(),
        buttonText:$('buttonText').value,
        buttonShowAtSeconds:Number($('buttonShowAtSeconds').value||10),
        buttonNewTab:$('buttonNewTab').checked,
        buttonBg:$('buttonBg').value,
        lang: LANG,
        onPlay: handlePreviewPlay,
        onPause: handlePreviewPause
      };
    }

    function snippet(c){
      const closeScript = '</scr' + 'ipt>';
      return `<div id="playvsl"></div>\n<script src="https://playvsl.digi6.com.br/playvsl.js">${closeScript}\n<script>\n  PlayVSL.init({\n    container:'#playvsl',\n    youtubeUrl:'${c.youtubeUrl}',\n    primaryColor:'${c.primaryColor}',\n    buttonUrl:'${c.buttonUrl}',\n    buttonText:'${c.buttonText.replace(/'/g,"\\'")}',\n    buttonShowAtSeconds:${c.buttonShowAtSeconds},\n    buttonNewTab:${c.buttonNewTab},\n    buttonBg:'${c.buttonBg}',\n    lang:'${c.lang || LANG}'\n  });\n${closeScript}`;
    }

    function extractYouTubeId(input){
      try{
        const u = new URL(input);
        if((u.hostname||'').includes('youtu.be')) return u.pathname.slice(1);
        if(u.searchParams.get('v')) return u.searchParams.get('v');
        const m = u.pathname.match(/\/embed\/([^/?#]+)/);
        if(m) return m[1];
      }catch(e){}
      return String(input||'').trim();
    }

    function resetPreviewState(cfg){
      try{
        const vid = extractYouTubeId(cfg.youtubeUrl);
        if(vid) localStorage.removeItem(`smartvsl_${vid}`);
      }catch(e){}
    }

    function renderPreview(cfg){
      const node = $('playvsl-preview');
      node.innerHTML = '';
      PlayVSL.init(cfg);
    }

    function getPlayerStateForBaseVideo(){
      try{
        const raw = localStorage.getItem('smartvsl_wqGiHRWeTR0');
        if(!raw) return null;
        return JSON.parse(raw);
      }catch(e){ return null; }
    }

    function canUnlock(){
      const st = getPlayerStateForBaseVideo();
      return !!(st && st.started === true && st.cta === true);
    }

    function unlockFlow(){
      const formSaved = localStorage.getItem('playvsl_lead_sent') === '1';

      // quem já deixou email uma vez fica sempre desbloqueado
      if(formSaved){
        $('rightPanel').classList.remove('hidden');
        $('heroGrid').classList.remove('locked');
        $('gateInfo').classList.add('hidden');
        $('leadStep').classList.add('hidden');
        $('builderStep').classList.remove('hidden');
        const c = builderCfg();
        $('out').textContent = snippet(c);
        return;
      }

      if(!canUnlock()){
        $('gateInfo').classList.remove('hidden');
        $('gateInfo').innerHTML = `<h2 id="t_gate_title">${t('gateTitle')}</h2><p>${t('gateNeed')}</p>`;
        return;
      }

      $('rightPanel').classList.remove('hidden');
      $('heroGrid').classList.remove('locked');
      document.body.classList.remove('preview-played-locked');
      $('gateInfo').classList.add('hidden');
      $('leadStep').classList.remove('hidden');
    }

    // estado inicial
    if($('buttonText')) $('buttonText').addEventListener('input', ()=> $('buttonText').dataset.touched='1');
    if($('langPt')) $('langPt').addEventListener('click', ()=>{ LANG='pt'; localStorage.setItem('playvsl_lang', LANG); applyLang(); renderPreview(builderCfg()); quickUpdate(); });
    if($('langEn')) $('langEn').addEventListener('click', ()=>{ LANG='en'; localStorage.setItem('playvsl_lang', LANG); applyLang(); renderPreview(builderCfg()); quickUpdate(); });
    applyLang();
    renderPreview(baseCfg());
    const formSavedOnLoad = localStorage.getItem('playvsl_lead_sent') === '1';
    if(formSavedOnLoad || params.get('unlock') === '1') unlockFlow();

    const quickUpdate = ()=>{ if($('out')) $('out').textContent = snippet(builderCfg()); };
    ['youtubeUrl','primaryColor','buttonUrl','buttonText','buttonShowAtSeconds','buttonBg'].forEach((id)=>{
      const el=$(id); if(!el) return;
      el.addEventListener('input', quickUpdate);
      el.addEventListener('change', quickUpdate);
    });
    if($('buttonNewTab')) $('buttonNewTab').addEventListener('change', quickUpdate);

    $('leadSubmit').addEventListener('click', async()=>{
      const name = $('leadName').value.trim();
      const email = $('leadEmail').value.trim();
      if(!name || !email){ alert(t('alertFill')); return; }

      // MVP: permite envio direto ao Encharge (token no front) OU via endpoint próprio.
      try{
        let r;
        if(LEAD_API){
          r = await fetch(LEAD_API,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({email,name,tag:'playvsl-lp'})
          });
        } else if (ENCHARGE_TOKEN) {
          r = await fetch('https://api.encharge.io/v1/people',{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
              'X-Encharge-Token': ENCHARGE_TOKEN
            },
            body: JSON.stringify({email,name,tags:'playvsl-lp'})
          });
        }
        if(r && !r.ok) throw new Error('Falha ao enviar lead');
      }catch(e){
        alert(t('alertFail'));
        return;
      }

      localStorage.setItem('playvsl_lead_sent','1');
      localStorage.setItem('playvsl_lead_name',name);
      localStorage.setItem('playvsl_lead_email',email);
      $('leadStep').classList.add('hidden');
      $('builderStep').classList.remove('hidden');
      const c = builderCfg();
      $('out').textContent = snippet(c);
    });

    if($('apply')) $('apply').addEventListener('click', ()=>{
      const c = builderCfg();
      $('out').textContent = snippet(c);
      resetPreviewState(c);
      renderPreview(c);
    });

    if($('copy')) $('copy').addEventListener('click', async()=>{
      await navigator.clipboard.writeText($('out').textContent);
      $('copy').textContent='Copiado!';
      setTimeout(()=>$('copy').textContent='Copiar snippet',1200);
    });
