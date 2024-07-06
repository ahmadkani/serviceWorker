const CACHE_NAME = 'my-cache2';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/worker.js',
  '/main.js',
  '/hunter.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache:', CACHE_NAME);
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
        console.log('cacheNames', cacheNames)
      return Promise.all(
        cacheNames.map((cacheName) => {
            console.log('cacheName', cacheName)
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        console.log('Serving from cache:', event.request.url);
        return cachedResponse;
      }

      console.log('Fetching from network:', event.request.url);
      return fetch(event.request);
    })
  );
});

// service-worker.js
self.addEventListener('sync', (event) => {
    if (event.tag === 'my-sync') {
      console.log('Performing background sync');
      event.waitUntil(syncData());
    }
  });
  
  async function syncData() {
    console.log('syncing ...')
    return "synced"
    // Perform the data synchronization here
  }