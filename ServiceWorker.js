const cacheName = "DefaultCompany-SquidGameCookieCutting-1.0";
const contentToCache = [
    "Build/5109749bc6fd8b18521eccafd884ee59.loader.js",
    "Build/256e637fb7ebc98a7ec75ccad3fb4ed5.framework.js",
    "Build/2dcf200ae07ee755e6a3f948a2327e87.data",
    "Build/82d36fb74b95b27c7edf5b42512a57cf.wasm",
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
