/* Mythras Tools offline app shell. Character saves stay in localStorage. */
const BUILD = {"version":"443d64b0dbd7459835cf","files":["136.1b9e4a787b434fe4.js","244.3032ecc99dd00120.js","254.f6dd8f527c915cc3.js","284.dd9430a3b92c2620.js","303.79053a957129dba6.js","3rdpartylicenses.txt","525.c88d3ba686b1df2c.js","790.3343939ee8667def.js","833.ffe25b7600145d88.js","859.6f38352f3c1e7c5b.js","901.0db1cd33ef30ced4.js","983.eac707ef500e7518.js","BaskervilleMTStd-Bold_m.bd8d33e0dcfbf3f8.woff","BaskervilleMTStd-Regular_o.0129f46778ee482c.woff","BaskervilleMTStd-Regular_o_1.5aa7cb0b1b476ba6.woff","Behistun_w.facac3b9d1b36d25.woff","MinionPro-Cn_u.90a6c1d6e57e2828.woff","MinionPro-Regular_s.29ccab3da6d759ad.woff","SavaPro-Medium_q.dd5b448617045b11.woff","assets/1/1.svg","assets/1/img/1.jpg","assets/2/2.svg","assets/2/img/1.png","assets/2/img/2.png","assets/2/img/3.png","assets/2/img/4.png","assets/2/img/5.png","assets/2/img/6.png","assets/2/img/7.png","assets/2/img/8.png","assets/2/img/9.png","assets/fonts/BaskervilleMTStd-Bold_m.woff","assets/fonts/BaskervilleMTStd-Regular_o.woff","assets/fonts/BaskervilleMTStd-Regular_o_1.woff","assets/fonts/Behistun_w.woff","assets/fonts/MinionPro-Cn_u.woff","assets/fonts/MinionPro-Regular_s.woff","assets/fonts/SavaPro-Medium_q.woff","assets/icons/adventure.svg","assets/icons/apple-touch-icon.png","assets/icons/favicon-32.png","assets/icons/icon-192.png","assets/icons/icon-512.png","assets/icons/icon-maskable-512.png","assets/vendor/bootstrap-LICENSE.txt","assets/vendor/bootstrap.min.css","assets/vendor/bootstrap.min.js","assets/vendor/material-icons-LICENSE.txt","assets/vendor/material-icons-c22ca6e4738d.ttf","assets/vendor/material-icons.css","assets/vendor/roboto-5639371f108f.ttf","assets/vendor/roboto-LICENSE.txt","assets/vendor/roboto-c14c6f78e26d.ttf","assets/vendor/roboto-d8dc5a5f3c90.ttf","assets/vendor/roboto.css","common.2d0d8d3c218f1ed0.js","favicon.ico","index.html","main.4fa135c171b0acdb.js","manifest.webmanifest","polyfills.ff3c59554badef75.js","runtime.91206871db541988.js","styles.0b101368d86d81ec.css"]};
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
