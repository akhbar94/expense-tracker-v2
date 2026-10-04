const CACHE_NAME = 'expense-tracker-v2-shell-v1';

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  // Keep the Apps Script iframe network-driven.
  // The GitHub shell itself can still be installed as a standalone app.
  if (new URL(event.request.url).origin === self.location.origin) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
  }
});
