(function(){
  const App = window.PlayVSLPage = window.PlayVSLPage || {};
  App.$ = (id)=>document.getElementById(id);
  App.params = new URLSearchParams(location.search);
  App.LEAD_API = window.PLAYVSL_LEAD_API || 'https://n8n.digi6.com.br/webhook/0811d5ba-ecf7-4a52-9afe-4a93058ceac9';
  App.ENCHARGE_TOKEN = window.PLAYVSL_ENCHARGE_TOKEN || '';
  App.EVENTS_WEBHOOK = window.PLAYVSL_EVENTS_WEBHOOK || 'https://n8n.digi6.com.br/webhook/playvsl-events';
  App.RUNTIME_SCRIPT_URL = window.PLAYVSL_RUNTIME_SCRIPT_URL || 'https://playvsl.com/playvsl.v1.0.1.min.js';
  App.SNIPPET_SCRIPT_URL = window.PLAYVSL_SNIPPET_SCRIPT_URL || 'https://playvsl.com/playvsl.v1.0.1.min.js';
  App.LANG = localStorage.getItem('playvsl_lang') || (((navigator.language||'').toLowerCase().startsWith('pt')) ? 'pt' : 'en');
})();
