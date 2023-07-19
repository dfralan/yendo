self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-site-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/src/public/css/style.css',
        '/src/public/js/app.js',
        '/src/public/img/icon-192x192.png',
        '/offline.html' // Add the offline HTML page to cache
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        return caches.match('/offline.html'); // Serve the offline HTML page
      });
    })
  );
});
