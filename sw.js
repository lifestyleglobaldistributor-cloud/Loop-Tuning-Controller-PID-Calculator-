const CACHE = "dcs-tool-ph-v4.3";
const SCOPE = self.registration.scope;
const ASSETS = ["","index.html","manifest.json","icon-192.png","icon-512.png"].map(p => new URL(p, SCOPE).toString());

self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(k => Promise.all(k.map(n => n!==CACHE ? caches.delete(n) : null)))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.mode==="navigate") { e.respondWith(fetch(r).catch(()=>caches.match(new URL("index.html",SCOPE)))); return; }
  e.respondWith(caches.match(r).then(res=>res||fetch(r)));
});