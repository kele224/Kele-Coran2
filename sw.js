const APP_CACHE_NAME = 'kele-app-interface-v1';

// Fichiers à sauvegarder pour que l'interface s'affiche hors-ligne
const urlsToCache =[
  './',
  './index.html',
  'https://fonts.googleapis.com/css2?family=Amiri&family=Poppins:wght@400;600&display=swap'
];

// Installation du Service Worker et mise en cache de l'interface
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(APP_CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Interception des requêtes pour les fournir depuis le cache si on est hors-ligne
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
