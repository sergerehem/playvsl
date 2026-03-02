(function(){
  const App = window.PlayVSLPage;
  const $ = App.$;

  App.I18N = {
    pt: {
      title: 'O player que transforma seu vídeo do YouTube em <span class="accent">VSL de alta conversão</span>',
      subtitle: 'Assista à demonstração e, quando o botão aparecer, desbloqueie seu snippet em segundos.',
      gateTitle: 'Desbloqueio', gateSub: 'O configurador será liberado após você interagir com a VSL e clicar no botão quando aparecer.',
      leadTitle: 'Quase lá 👇', leadSub: 'Preencha para liberar o snippet.', name: 'Nome', email: 'Email', leadBtn: 'Liberar snippet',
      builderTitle: 'Configure e copie seu snippet', youtube:'YouTube URL', primary:'Cor primária', buttonUrl:'URL do botão', buttonText:'Texto do botão',
      showSeconds:'Mostrar botão em (s)', buttonColor:'Cor do botão', newTab:'Abrir em nova aba', apply:'Ver prévia', copy:'Copiar snippet',
      gateNeed: 'Para liberar o configurador, assista à VSL e clique no botão quando ele aparecer.', alertFill: 'Preencha nome e email.',
      alertFail: 'Não foi possível enviar seu cadastro agora. Tente novamente em instantes.', rights: '© 2026 PlayVSL. Todos os direitos reservados.',
      defaultButton: 'QUERO MEU SNIPPET AGORA - É GRÁTIS', seoTitle: 'PlayVSL | Player para VSL com YouTube e alta conversão',
      seoDesc: 'PlayVSL é o player que transforma seu vídeo do YouTube em VSL de alta conversão, com teaser inteligente, botão no tempo certo e setup em minutos.',
      seoOgDesc: 'Transforme seu vídeo do YouTube em VSL de alta conversão com teaser inteligente e botão no tempo certo.',
      seoLdDesc: 'Player para transformar vídeos do YouTube em VSLs de alta conversão.'
    },
    en: {
      title: 'The player that turns your YouTube video into a <span class="accent">high-converting VSL</span>',
      subtitle: 'Watch the demo and, when the button appears, unlock your snippet in seconds.',
      gateTitle: 'Unlock', gateSub: 'The builder unlocks after you engage with the VSL and click the button when it appears.',
      leadTitle: 'Almost there 👇', leadSub: 'Fill this form to unlock your snippet.', name: 'Name', email: 'Email', leadBtn: 'Unlock snippet',
      builderTitle: 'Configure and copy your snippet', youtube:'YouTube URL', primary:'Primary color', buttonUrl:'Button URL', buttonText:'Button text',
      showSeconds:'Show button at (s)', buttonColor:'Button color', newTab:'Open in new tab', apply:'Preview', copy:'Copy snippet',
      gateNeed: 'To unlock the builder, watch the VSL and click the button when it appears.', alertFill: 'Please enter name and email.',
      alertFail: 'Could not submit your signup right now. Please try again shortly.', rights: '© 2026 PlayVSL. All rights reserved.',
      defaultButton: 'GET MY SNIPPET NOW - IT\'S FREE', seoTitle: 'PlayVSL | YouTube VSL Player for higher conversions',
      seoDesc: 'PlayVSL turns your YouTube video into a high-converting VSL with smart teaser, timed CTA, and setup in minutes.',
      seoOgDesc: 'Turn your YouTube video into a high-converting VSL with smart teaser and timed CTA.', seoLdDesc: 'Player to turn YouTube videos into high-converting VSLs.'
    }
  };

  App.t = (k)=> (App.I18N[App.LANG] && App.I18N[App.LANG][k]) || App.I18N.pt[k] || k;
  App.applyLang = function(){
    document.documentElement.lang = App.LANG === 'pt' ? 'pt-BR' : 'en';
    const set = (id,val,html=false)=>{ const el=$(id); if(!el) return; html ? el.innerHTML=val : el.textContent=val; };
    set('t_title', App.t('title'), true); set('t_subtitle', App.t('subtitle')); set('t_gate_title', App.t('gateTitle')); set('t_gate_sub', App.t('gateSub'));
    set('t_lead_title', App.t('leadTitle')); set('t_lead_sub', App.t('leadSub')); set('t_name', App.t('name')); set('t_email', App.t('email'));
    set('leadSubmit', App.t('leadBtn')); set('t_builder_title', App.t('builderTitle')); set('t_youtube', App.t('youtube')); set('t_primary', App.t('primary'));
    set('t_button_url', App.t('buttonUrl')); set('t_button_text', App.t('buttonText')); set('t_show_seconds', App.t('showSeconds')); set('t_button_color', App.t('buttonColor'));
    set('t_new_tab', App.t('newTab')); set('apply', App.t('apply')); set('copy', App.t('copy')); set('t_footer_rights', App.t('rights'));
    if($('buttonText') && !$('buttonText').dataset.touched) $('buttonText').value = App.t('defaultButton');

    document.title = App.t('seoTitle');
    $('seo_desc')?.setAttribute('content', App.t('seoDesc'));
    $('seo_og_title')?.setAttribute('content', App.t('seoTitle'));
    $('seo_og_desc')?.setAttribute('content', App.t('seoOgDesc'));
    $('seo_tw_title')?.setAttribute('content', App.t('seoTitle'));
    $('seo_tw_desc')?.setAttribute('content', App.t('seoOgDesc'));
    const ld=$('seo_ldjson');
    if(ld){
      ld.textContent = JSON.stringify({
        '@context':'https://schema.org','@type':'SoftwareApplication',name:'PlayVSL',applicationCategory:'BusinessApplication',
        operatingSystem:'Web',url:'https://playvsl.digi6.com.br/',description:App.t('seoLdDesc'),offers:{'@type':'Offer',price:'0',priceCurrency:'USD'}
      });
    }
  };

  App.setLang = function(lang){
    App.LANG = lang;
    localStorage.setItem('playvsl_lang', App.LANG);
    App.applyLang();
  };
})();
