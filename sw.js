const CACHE='dcs-v4';
const ASSETS=['./','DCS_Engineer_Tool_PH.html','manifest.json','IMG_4645.jpeg'];

self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.map(n=>n!==CACHE?caches.delete(n):null))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).catch(()=>{
    if(e.request.mode==='navigate') return caches.match('DCS_Engineer_Tool_PH.html');
    return new Response('',{status:503,statusText:'Offline'});
  })));
});