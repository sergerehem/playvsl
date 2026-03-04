(function(){
  const App = window.PlayVSLPage = window.PlayVSLPage || {};
  App.$ = (id)=>document.getElementById(id);
  App.params = new URLSearchParams(location.search);
  App.LEAD_API = window.PLAYVSL_LEAD_API || 'https://n8n.digi6.com.br/webhook/0811d5ba-ecf7-4a52-9afe-4a93058ceac9';
  App.ENCHARGE_TOKEN = window.PLAYVSL_ENCHARGE_TOKEN || '';
  App.EVENTS_WEBHOOK = window.PLAYVSL_EVENTS_WEBHOOK || 'https://n8n.digi6.com.br/webhook/playvsl-events';
  App.RUNTIME_SCRIPT_URL = window.PLAYVSL_RUNTIME_SCRIPT_URL || 'https://playvsl.com/playvsl.v1.0.3.min.js';
  App.SNIPPET_SCRIPT_URL = window.PLAYVSL_SNIPPET_SCRIPT_URL || 'https://playvsl.com/playvsl.v1.0.3.min.js';
  App.GADS_CONVERSION_ID = window.PLAYVSL_GOOGLE_ADS_ID || '';
  App.GADS_CONVERSION_LABEL = window.PLAYVSL_GOOGLE_ADS_LABEL || '';
  App.LANG = localStorage.getItem('playvsl_lang') || (((navigator.language||'').toLowerCase().startsWith('pt')) ? 'pt' : 'en');

  App.ensureGoogleAdsTag = function(){
    return new Promise((resolve)=>{
      if(!App.GADS_CONVERSION_ID){ resolve(false); return; }

      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function(){ dataLayer.push(arguments); };

      if(!window.__playvsl_gads_inited){
        window.gtag('js', new Date());
        window.gtag('config', App.GADS_CONVERSION_ID);
        window.__playvsl_gads_inited = true;
      }

      if(!document.querySelector('script[data-playvsl-gads="1"]')){
        const s = document.createElement('script');
        s.async = true;
        s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(App.GADS_CONVERSION_ID)}`;
        s.setAttribute('data-playvsl-gads', '1');
        s.onload = ()=>resolve(true);
        s.onerror = ()=>resolve(false);
        document.head.appendChild(s);
      } else {
        resolve(true);
      }
    });
  };

  App.trackLeadConversion = async function(payload = {}){
    if(!App.GADS_CONVERSION_ID || !App.GADS_CONVERSION_LABEL) return false;

    await App.ensureGoogleAdsTag();
    if(typeof window.gtag !== 'function') return false;

    const sendTo = `${App.GADS_CONVERSION_ID}/${App.GADS_CONVERSION_LABEL}`;
    const email = (payload.email || '').trim();
    const firstName = (payload.name || '').trim().split(' ')[0] || '';

    try{
      window.gtag('event', 'conversion', {
        send_to: sendTo,
        value: Number(payload.value || 1),
        currency: payload.currency || 'BRL',
        user_data: {
          email_address: email || undefined,
          address: { first_name: firstName || undefined }
        }
      });
      return true;
    }catch(_e){
      return false;
    }
  };
})();
