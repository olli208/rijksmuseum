var cacheVer = 'v1';
var cacheFiles = [
    '/style.css',
    '/'
];

self.addEventListener('install' , function(event){
    console.log("[serviceWorker] installed");

    event.waitUntil(
        caches.open(cacheVer).then(function(cache) {
            console.log("[serviceWorker] caching chacheFiles");
            return cache.addAll(cacheFiles);
        })
    )
});

self.addEventListener('activate' , function(event){
    console.log("[serviceWorker] activated");
});

self.addEventListener('fetch', function(event) {
    // event.respondWith( new Response('hijacked biatch'));
    // event.respondWith(
    //     fetch.event.request)
    //     .catch(err => fetchOfflinePage()
    // )
});
