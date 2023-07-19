const offlinePage = '/offline.html'; // Specify the path to your offline.html file

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-site-cache').then((cache) => {
      return cache.addAll([
        '/', // Add the URLs of your static assets to cache
        '/index.html',
        'src/public/css/style.css',
        'src/public/js/app.js',
        'src/public/img/icon-192x192.png',
        // Add more URLs here
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        return caches.match(offlinePage);
      });
    })
  );
});
