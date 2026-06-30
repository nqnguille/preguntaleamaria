/* ══════════════════════════════════════════════════════════
   preguntaleamaria — Access Gate server-side (Cloudflare Pages Function)
   El sitio NO se sirve sin cookie válida: solo la pantalla de acceso.
   La validación la hace la consola central gates-analytics (/verify).
   Para administrar las llaves: https://gates-analytics.nqnguille.workers.dev/keys
   ══════════════════════════════════════════════════════════ */

const PROJECT = 'preguntaleamaria';
const GATE = 'sitio';
const GATE_PASSWORD_FALLBACK = 'iloveyoumari';     // respaldo si el central no responde
const COOKIE = 'maria_gate';
const TOKEN = 'maria-acceso-ok-v1';
const VISITOR_COOKIE = 'maria_vid';
const SESSION_COOKIE = 'maria_sid';
const MAX_AGE = 60 * 60 * 24 * 30;                 // 30 días

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  const cookies = parseCookies(request.headers.get('Cookie') || '');
  const visitorId = cookies[VISITOR_COOKIE] || `visitor-${crypto.randomUUID()}`;
  const sessionId = cookies[SESSION_COOKIE] || `session-${crypto.randomUUID()}`;

  // ¿ya tiene la cookie válida? → servir el sitio.
  if (cookies[COOKIE] === TOKEN) {
    return next();
  }

  // intento de login (POST del formulario)
  if (request.method === 'POST') {
    const form = await request.formData();
    const entered = String(form.get('password') || '');

    let ok = await verifyCentral(context, entered, url.pathname, visitorId, sessionId);
    if (ok === null) {            // central no disponible → respaldo local
      ok = entered === GATE_PASSWORD_FALLBACK;
      if (ok) gateEvent(context, 'unlock', url.pathname, visitorId, sessionId);
    }

    if (ok) {
      const headers = new Headers({ Location: '/' });
      headers.append('Set-Cookie', `${COOKIE}=${TOKEN}; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=${MAX_AGE}`);
      headers.append('Set-Cookie', `${VISITOR_COOKIE}=${visitorId}; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=${MAX_AGE}`);
      headers.append('Set-Cookie', `${SESSION_COOKIE}=${sessionId}; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 2}`);
      return new Response(null, { status: 302, headers });
    }
    return loginResponse(true, visitorId, sessionId);
  }

  // Cualquier otra cosa → pantalla de acceso. Registrar "view" solo en navegaciones HTML.
  if (isDocumentRequest(request, url)) {
    gateEvent(context, 'view', url.pathname, visitorId, sessionId);
  }
  return loginResponse(false, visitorId, sessionId);
}

// Valida la clave contra la consola central. true=ok, false=rechazada, null=central caído.
async function verifyCentral(context, key, path, visitorId, sessionId) {
  try {
    const res = await fetch('https://gates-analytics.nqnguille.workers.dev/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CF-IPCountry': context.request.headers.get('cf-ipcountry') || '',
      },
      body: JSON.stringify({ project: PROJECT, gate: GATE, key, visitor_id: visitorId, session_id: sessionId, path }),
    });
    if (!res.ok) return null;
    const data = await res.json().catch(() => null);
    if (!data) return null;
    return !!data.ok;
  } catch (e) {
    return null;
  }
}

function gateEvent(context, event, path, visitorId, sessionId) {
  try {
    context.waitUntil(
      fetch('https://gates-analytics.nqnguille.workers.dev/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'CF-IPCountry': context.request.headers.get('cf-ipcountry') || '',
        },
        body: JSON.stringify({ project: PROJECT, gate: GATE, event, visitor_id: visitorId, session_id: sessionId, key: event === 'unlock' ? 'ok' : '', path }),
      }).catch(() => {})
    );
  } catch (e) { /* noop */ }
}

function parseCookies(header) {
  const out = {};
  header.split(';').forEach((part) => {
    const i = part.indexOf('=');
    if (i > -1) out[part.slice(0, i).trim()] = part.slice(i + 1).trim();
  });
  return out;
}

function isDocumentRequest(request, url) {
  if (request.method !== 'GET') return false;
  const accept = request.headers.get('Accept') || '';
  if (!accept.includes('text/html')) return false;
  const ext = url.pathname.split('/').pop().includes('.') ? url.pathname.split('.').pop() : '';
  return !ext || ext === 'html';
}

function loginResponse(error, visitorId, sessionId) {
  const headers = new Headers({
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  headers.append('Set-Cookie', `${VISITOR_COOKIE}=${visitorId}; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=${MAX_AGE}`);
  headers.append('Set-Cookie', `${SESSION_COOKIE}=${sessionId}; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 2}`);
  return new Response(loginHTML(error), { status: 401, headers });
}

function loginHTML(error) {
  return `<!doctype html>
<html lang="es-AR">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="noindex, nofollow" />
<title>Preguntale a MarIA — Acceso privado</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Mono&display=swap" rel="stylesheet" />
<style>
  :root{ --black:#050608; --off-white:#F0F2F7; --green:#71CE6A; --gray:#7A8699; --border:rgba(255,255,255,.07); --border-green:rgba(113,206,106,.2); }
  *{box-sizing:border-box;margin:0}
  body{min-height:100svh;display:grid;place-items:center;padding:24px;
    font-family:'Plus Jakarta Sans',system-ui,sans-serif;color:var(--off-white);
    background:var(--black);
    background-image:radial-gradient(rgba(113,206,106,0.06) 1px, transparent 1px);
    background-size:32px 32px;}
  .card{width:100%;max-width:420px;text-align:center}
  .eyebrow{font-family:'Space Mono',monospace;font-size:.72rem;letter-spacing:.22em;text-transform:uppercase;color:var(--gray);margin-bottom:20px}
  .brand{font-weight:400;font-size:clamp(1.6rem,6vw,2rem);letter-spacing:-.01em;line-height:1.1;color:rgba(240,242,247,.85)}
  .brand b{display:block;font-weight:700;font-size:clamp(2.8rem,11vw,3.8rem);letter-spacing:-.03em;color:var(--off-white)}
  .brand b span{color:var(--green);text-shadow:0 0 60px rgba(113,206,106,.5)}
  form{margin-top:36px;display:flex;flex-direction:column;gap:12px}
  input{width:100%;padding:15px 18px;border-radius:14px;border:1px solid var(--border);
    background:rgba(255,255,255,.03);color:var(--off-white);font-size:1rem;outline:none;text-align:center;
    font-family:inherit;transition:border-color .2s,background .2s}
  input::placeholder{color:var(--gray)}
  input:focus{border-color:var(--green);background:rgba(113,206,106,.05)}
  button{width:100%;padding:15px 18px;border-radius:14px;border:0;cursor:pointer;
    background:var(--green);color:var(--black);font-weight:700;font-size:1rem;font-family:inherit;transition:transform .15s,filter .2s}
  button:hover{filter:brightness(1.08);transform:translateY(-1px)}
  .err{margin-top:2px;color:#f0a98a;font-size:.9rem;min-height:1.1em}
  .foot{margin-top:30px;font-size:.74rem;color:var(--gray);font-family:'Space Mono',monospace;letter-spacing:.04em}
</style>
</head>
<body>
  <main class="card">
    <p class="eyebrow">Acceso privado · Ancestra</p>
    <div class="brand">Preguntale a<b>Mar<span>IA</span></b></div>
    <form method="POST" autocomplete="off">
      <input type="password" name="password" placeholder="Contraseña de acceso" autofocus aria-label="Contraseña de acceso" />
      <button type="submit">Ingresar</button>
      <div class="err">${error ? 'Contraseña incorrecta. Probá de nuevo.' : ''}</div>
    </form>
    <p class="foot">acceso restringido</p>
  </main>
</body>
</html>`;
}
