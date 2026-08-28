const CACHE_NAME = 'regret-box-v2';
const ASSETS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)));
});

self.addEventListener('fetch', e=>{
  e.respondWith(caches.match(e.request).then(r=> r || fetch(e.request)));
});

self.addEventListener('push', e=>{
  const data = e.data ? e.data.text() : 'Your locked message is ready to review. Still angry?';
  e.waitUntil(
    self.registration.showNotification('📦 Regret Box', {
      body: data,
      icon: './icon-512.png',
      badge: './icon-192.png',
      vibrate: [200,100,200]
    })
  );
});