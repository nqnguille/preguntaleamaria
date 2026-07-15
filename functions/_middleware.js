/* ══════════════════════════════════════════════════════════
   preguntaleamaria — Sitio PÚBLICO (gate retirado el 15/07/2026)
   El middleware ya no bloquea: solo registra visitas en la
   consola central gates-analytics para el dashboard de stats.
   Historial del gate con contraseña: ver git (commit 5f9416c y anteriores).
   ══════════════════════════════════════════════════════════ */

const PROJECT = 'preguntaleamaria';
const GATE = 'sitio';
const VISITOR_COOKIE = 'maria_vid';
const SESSION_COOKIE = 'maria_sid';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 días

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  const cookies = parseCookies(request.headers.get('Cookie') || '');
  const visitorId = cookies[VISITOR_COOKIE] || `visitor-${crypto.randomUUID()}`;
  const sessionId = cookies[SESSION_COOKIE] || `session-${crypto.randomUUID()}`;

  const isNewVisit = !cookies[VISITOR_COOKIE] || !cookies[SESSION_COOKIE];

  if (isDocumentRequest(request, url)) {
    gateEvent(context, 'view', url.pathname, visitorId, sessionId);
  }

  const response = await next();

  if (isNewVisit) {
    const withCookies = new Response(response.body, response);
    withCookies.headers.append('Set-Cookie', `${VISITOR_COOKIE}=${visitorId}; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=${MAX_AGE}`);
    withCookies.headers.append('Set-Cookie', `${SESSION_COOKIE}=${sessionId}; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 2}`);
    return withCookies;
  }
  return response;
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
        body: JSON.stringify({ project: PROJECT, gate: GATE, event, visitor_id: visitorId, session_id: sessionId, key: '', path, ua: context.request.headers.get('user-agent') || '' }),
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
