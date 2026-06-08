const CACHE_NAME = 'todo-list-v6';
// Lista de archivos locales que la app guardará en el teléfono para funcionar offline
const ASSETS = [
    './',
    './index.html',
    './app.js',
    './css/styles.css'
];

// 1. Evento INSTALACIÓN: Descarga y guarda los archivos en la caché
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
    // ¡LA LÍNEA MÁGICA! 
    // Fuerza al Service Worker nuevo a activarse inmediatamente al instalarse
    self.skipWaiting();
});

// 2. Evento ACTIVACIÓN: Borra cachés viejos si haces actualizaciones en el futuro
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    // Fuerza a todas las pestañas de la web a ponerse bajo el control del nuevo SW de inmediato
    self.clients.claim();
});

// 3. Evento FETCH: Intercepta las peticiones de la app. 
// Si hay internet, busca lo más nuevo. Si no hay, saca los archivos de la caché.
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((cachedResponse) => {
            return cachedResponse || fetch(e.request);
        })
    );
});