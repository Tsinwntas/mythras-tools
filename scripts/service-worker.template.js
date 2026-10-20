/* Mythras Tools offline app shell. Character saves stay in localStorage. */
const BUILD = /* BUILD_MANIFEST */;
const SCOPE = new URL(self.registration.scope);
const PREFIX = 'mythras-shell-' + encodeURIComponent(SCOPE.pathname) + '-';
const CACHE = PREFIX + BUILD.version;
const SHELL = new URL('index.html', SCOPE).href;
const FILES = new Set(BUILD.files.map(file => new URL(file, SCOPE).href));

self.addEventListener('install', event => {
  // Do not activate an update in the middle of a character-editing session.
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll([...FILES].map(url => new Request(url,{cache:'reload'})))));
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    // Retain the preceding shell for another tab still running its older bundles.
    const previous=(await caches.keys()).filter(key => key.startsWith(PREFIX) && key !== CACHE);
    for (const key of previous.slice(0,-1)) await caches.delete(key);
    await self.clients.claim();
  })());
});
self.addEventListener('message', event => {
  if (event.data?.type === 'ACTIVATE_UPDATE') self.skipWaiting();
});
self.addEventListener('fetch', event => {
  const request=event.request;
  const url=new URL(request.url);
  if (request.method !== 'GET' || url.origin !== SCOPE.origin || !url.pathname.startsWith(SCOPE.pathname)) return;
  if (request.mode === 'navigate') {
    event.respondWith(caches.open(CACHE).then(cache => cache.match(SHELL)).then(response => response || fetch(request)));
  } else if (FILES.has(url.href)) {
    event.respondWith(caches.open(CACHE).then(cache => cache.match(request)).then(response => response || fetch(request)));
  } else if (/\.(js|css|woff2?|ttf|png|svg)$/.test(url.pathname)) {
    event.respondWith((async () => {
      for (const key of await caches.keys()) if (key.startsWith(PREFIX)) {
        const response=await (await caches.open(key)).match(request);
        if (response) return response;
      }
      return fetch(request);
    })());
  }
});
