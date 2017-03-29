var cacheVer = 'v1';
var cacheFiles = [
    './style.css',
    './build.js',
    'index.html'
];

self.addEventListener('install' , function(event){
    console.log("[serviceWorker] installed")
});

self.addEventListener('activate' , function(event){
    console.log("[serviceWorker] activated")
});

self.addEventListener('fetch', function(event) {
    // event.respondWith( new Response('hijacked biatch'));
    // event.respondWith(
    //     fetch.event.request)
    //     .catch(err => fetchOfflinePage()
    // )
});
