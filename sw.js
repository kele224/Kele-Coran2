const APP_CACHE = "kele-app-core-v1";

// Les fichiers de base à sauvegarder pour afficher la page sans internet
const coreFiles = [
    './',
    './index.html'
];

// 1. Installation : On télécharge la page web elle-même
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(APP_CACHE).then(cache => {
            return cache.addAll(coreFiles);
        })
    );
    self.skipWaiting();
});

// 2. Activation : On nettoie les anciens caches si besoin
self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

// 3. Interception : Si pas d'internet, on affiche la page depuis le téléphone !
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            // Si le fichier (HTML, ou Audio) est dans le téléphone, on le donne !
            if (cachedResponse) {
                return cachedResponse;
            }
            // Sinon, on essaie d'aller sur internet
            return fetch(event.request).catch(() => {
                // Si internet est coupé, on ne fait rien pour ne pas planter
            });
        })
    );
});
