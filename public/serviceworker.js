const CACHE_NAME = "vesion-1";
const urlsToCache = ['index.html', 'offline.html'];

const self = this;

// Insatll SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    )
})


// // Listen for requests
// self.addEventListener('fetch', (event) => {
//     event.respondWith(
//         fetch(event.request)
//             .then((response) => {
//                 // Check if the response is valid (status 200)
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 } else {
//                     // Clone the response as it can be consumed only once
//                     const responseClone = response.clone();
//                     caches.open(CACHE_NAME)
//                         .then((cache) => {
//                             // Cache the fetched response
//                             cache.put(event.request, responseClone);
//                         });
//                     return response;
//                 }

//             })
//             .catch(() => {
//                 // If fetching fails, serve the offline page from cache
//                 return caches.match('offline.html');
//             })
//     );
// });

// Activate the SW
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))

    )
});