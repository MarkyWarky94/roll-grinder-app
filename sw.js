const CACHE='roll-grinding-shell-v4';
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','./index.html','./manifest.webmanifest'])).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>c.delete(k)))),self.clients.claim()])));
self.addEventListener('fetch',event=>{const u=new URL(event.request.url);if(u.origin!==self.location.origin)return;event.respondWith(fetch(event.request).then(r=>{if(r.ok){const clone=r.clone();caches.open(CACHE).then(c=>c.put(event.request,clone))}return r}).catch(()=>caches.match(event.request)))});
