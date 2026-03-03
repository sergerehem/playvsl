export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: cors() });
    }
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405, headers: cors() });
    }

    try {
      const { email, name, tag } = await request.json();
      if (!email || !name) {
        return json({ error: 'email and name required' }, 400);
      }

      const resp = await fetch('https://api.encharge.io/v1/people', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Encharge-Token': env.ENCHARGE_TOKEN,
        },
        body: JSON.stringify({
          email,
          name,
          tags: tag || 'playvsl-lp'
        })
      });

      const txt = await resp.text();
      return new Response(txt || '{"ok":true}', {
        status: resp.status,
        headers: { ...cors(), 'Content-Type': 'application/json' }
      });
    } catch (e) {
      return json({ error: 'invalid request' }, 400);
    }
  }
}

function cors() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...cors(), 'Content-Type': 'application/json' }
  });
}
