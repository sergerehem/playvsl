(function(){
  const DEFAULTS = {
    webhookUrl: '',
    includeEvents: null, // ex: ['ctaClick','complete']
    excludeEvents: null, // ex: ['progress']
    debug: false
  };

  function shouldSend(evt, cfg){
    if(!evt || !evt.event) return false;
    if(Array.isArray(cfg.includeEvents) && cfg.includeEvents.length){
      if(!cfg.includeEvents.includes(evt.event)) return false;
    }
    if(Array.isArray(cfg.excludeEvents) && cfg.excludeEvents.includes(evt.event)) return false;
    return true;
  }

  function send(webhookUrl, payload, debug){
    if(!webhookUrl) return;
    const body = JSON.stringify(payload);

    try{
      if(navigator.sendBeacon){
        const ok = navigator.sendBeacon(webhookUrl, new Blob([body], {type:'application/json'}));
        if(ok) return;
      }
    }catch(e){ if(debug) console.warn('[PlayVSLStats] sendBeacon failed', e); }

    fetch(webhookUrl, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body,
      keepalive:true,
      mode:'cors'
    }).catch((e)=>{ if(debug) console.warn('[PlayVSLStats] fetch failed', e); });
  }

  function create(config){
    const cfg = Object.assign({}, DEFAULTS, config || {});

    function onEvent(evt){
      if(!shouldSend(evt, cfg)) return;
      send(cfg.webhookUrl, evt, cfg.debug);
    }

    // retorno para uso explícito no init
    return { onEvent };
  }

  function init(config){
    const cfg = Object.assign({}, DEFAULTS, config || {});
    const stats = create(cfg);

    if(!window.PlayVSL || !window.PlayVSL.init){
      if(cfg.debug) console.warn('[PlayVSLStats] PlayVSL.init not found yet');
      return stats;
    }

    const originalInit = window.PlayVSL.init.bind(window.PlayVSL);
    window.PlayVSL.init = function(opts){
      const userOnEvent = opts && opts.onEvent;
      const merged = Object.assign({}, opts, {
        onEvent: function(payload){
          try{ stats.onEvent(payload); }catch(e){}
          if(typeof userOnEvent === 'function'){
            try{ userOnEvent(payload); }catch(e){}
          }
        }
      });
      return originalInit(merged);
    };

    if(cfg.debug) console.log('[PlayVSLStats] hooked into PlayVSL.init');
    return stats;
  }

  window.PlayVSLStats = { create, init };
})();
