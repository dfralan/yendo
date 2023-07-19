// Asigna un nombre único al caché
var CACHE_NAME = 'my-site-cache-v1';

// Archivos para cachear
var urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html',
  '/src/public/js/app.js',
  '/src/public/css/style.css',
  '/src/public/img/icon-192x192.png'
];

// Instalación del Service Worker
self.addEventListener('install', function(event) {
  // Realiza la instalación
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Caché abierta');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Elimina cachés antiguas si existen
          return cacheName !== CACHE_NAME;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// Intercepción de las solicitudes
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Si la solicitud está en caché, devuelve la respuesta en caché
        if (response) {
          return response;
        }

        // Si la solicitud no está en caché, realiza la solicitud a la red
        return fetch(event.request)
          .then(function(response) {
            // Si la respuesta es exitosa y es una solicitud GET, almacena la respuesta en caché
            if (response && response.status === 200 && event.request.method === 'GET') {
              var responseToCache = response.clone();

              caches.open(CACHE_NAME)
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });
            }

            return response;
          })
          .catch(function() {
            // Si la solicitud falla, muestra la vista offline.html
            return caches.match('/offline.html');
          });
      })
  );
});
