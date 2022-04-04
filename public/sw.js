// const CORE_CACHE_NAME = 'core_cache'
// const CORE_ASSETS = [
//     '/offline',
//     '/css/overview.css',
//     '/css/index.css',
//     '/css/detail.css',
//     '/manifest.json'
// ]

// self.addEventListener('install', event => {
//     event.waitUntil(
//         caches.open(CORE_CACHE_NAME).then(cache => {
//             return cache.addAll(CORE_ASSETS).then(() => self.skipWaiting())
//         })
//     )
// })

// self.addEventListener('active', event => {
//     event.waitUntil(clients.claim());
// })

// self.addEventListener('fetch', event => {
//     if (isCoreGetRequest(event.request)) {
//         console.log('Core get request: ', event.request.url)
        
//         event.respondWith(
//             caches.open(CORE_CACHE_NAME)
//             .then(cache => cache.match(event.request.url))
//         )
//     } else if (isHtmlGetRequest(event.request)) {
//         console.log('html get request', event.request.url)

//         event.respondWith(
//             caches.open('html-cache')
//             .then(cache => cache.match(event.request.url))
//             .then(response => response ? response : fetchAndCache(event.request, 'html-cache'))
//             .catch(e => {
//                 return caches.open(CORE_CACHE_NAME)
//                 .then(cache => cache.match('/offline'))
//             })
//         )
//     } else if (isCssGetRequest(event.request)) {
//         console.log('css get request', event.request.url)

//         event.respondWith(
//             caches.open('css-cache')
//             .then(cache => cache.match(event.request.url))
//             .then(response => response ? response : fetchAndCache(event.request, 'css-cache'))
//         )
//     }
    
// })

// const fetchAndCache = (req, cacheName) => {
//     return fetch(req)
//     .then(response => {
//         if (!response.ok) {
//             throw new TypeError('Bad response status')
//         }

//         const clone = response.clone()
//         caches.open(cacheName).then(cache => cache.put(req, clone))
//         return response
//     })
// }

// const isHtmlGetRequest = (req) => {
//     return req.method === 'GET' && (req.headers.get('accept') !== null && req.headers.get('accept').indexOf('text/html') > -1)
// }

// const isCssGetRequest = (req) => {
//     return req.method === 'GET' && (req.headers.get('accept') !== null && req.headers.get('accept').indexOf('text/css') > -1)
// }

// const isCoreGetRequest = (req) => {
//     return req.method === 'GET' && CORE_ASSETS.includes(getPathName(req.url))
// }

// const getPathName = (reqUrl) => {
//     const url = new URL(reqUrl)
//     return url.pathname
// }


   
self.addEventListener('install', function (event) {
    event.waitUntil(
      caches.open('v4').then(function (cache) {
        return cache.addAll([
          '/',
          '/css/overview.css',
          '/css/index.css',
          '/offline'
        ]);
      }),
    );
    self.skipWaiting(); 
  });

  self.addEventListener('activate', event => {
    console.log('Activate v3')
  });


  // caches first then network
  self.addEventListener('fetch', function(event) {
              // console.log('fetch event', event);
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });