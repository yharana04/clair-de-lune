// Service Worker minimal pour Clair de Lune
// Permet à l'app d'être installable (condition requise par les navigateurs)
const CACHE_NAME = 'clair-de-lune-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// Pas de mise en cache agressive pour l'instant : on laisse le navigateur
// gérer le réseau normalement. On pourra ajouter le mode hors-ligne plus tard.
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
