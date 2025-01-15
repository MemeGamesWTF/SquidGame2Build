const cacheName = "DefaultCompany-SquidGameCookieCutting-1.0";
const contentToCache = [
    "Build/87530b646338713290fb0ab0aed58a63.loader.js",
    "Build/256e637fb7ebc98a7ec75ccad3fb4ed5.framework.js",
    "Build/31d9cafe45ea48952af8b889a6256950.data",
    "Build/9a3394b42784f1165bcc6bbdf86f41f1.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
