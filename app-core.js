(function(){
  const App = window.PlayVSLPage = window.PlayVSLPage || {};
  App.$ = (id)=>document.getElementById(id);
  App.params = new URLSearchParams(location.search);
  App.LEAD_API = window.PLAYVSL_LEAD_API || 'https://n8n.digi6.com.br/webhook/0811d5ba-ecf7-4a52-9afe-4a93058ceac9';
  App.ENCHARGE_TOKEN = window.PLAYVSL_ENCHARGE_TOKEN || '';
  App.LANG = localStorage.getItem('playvsl_lang') || (((navigator.language||'').toLowerCase().startsWith('pt')) ? 'pt' : 'en');
})();
