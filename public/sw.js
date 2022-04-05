const CORE_CACHE_VERSION = 'v15'
const CORE_ASSETS = [
  '/offline',
  '/css/index.css',
  '/css/overview.css',
  '/css/details.css',
  '/css/offline.css',
  '/manifest.json'
]

self.addEventListener('install', event => {
  console.log('Installing service worker')

  event.waitUntil(
    caches.open(CORE_CACHE_VERSION).then(cache => {
      return cache.addAll(CORE_ASSETS).then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  console.log('Activating service worker')
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  if (isCoreGetRequest(event.request)) {
    
    event.respondWith(
      caches.open(CORE_CACHE_VERSION)
        .then(cache => cache.match(event.request.url))
    )
  } else if (isHtmlGetRequest(event.request)) {
    
    event.respondWith(
      caches.open('html-cache')
        .then(cache => cache.match(event.request.url))
        .then(response => response ? response : fetchAndCache(event.request, 'html-cache'))
        .catch(e => {
          return caches.open(CORE_CACHE_VERSION)
            .then(cache => cache.match('/offline'))
        })
    )
  }
});

const fetchAndCache = (request, cacheName) => {
  return fetch(request)
    .then(response => {
      if (!response.ok) {
        throw new TypeError('Bad response status');
      }

      const clone = response.clone()
      caches.open(cacheName).then((cache) => cache.put(request, clone))
      return response
    })
}

const isHtmlGetRequest = (request) => {
  return request.method === 'GET' && (request.headers.get('accept') !== null && request.headers.get('accept').indexOf('text/html') > -1);
}
const isCoreGetRequest = (request) => {
  return request.method === 'GET' && CORE_ASSETS.includes(getPathName(request.url));
}

const getPathName = (requestUrl) => {
  const url = new URL(requestUrl);
  return url.pathname;
}