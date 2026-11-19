var C="gym-planner-v2";
var A=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(A)}));self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==C}).map(function(n){return caches.delete(n)}))}));self.clients.claim()});
self.addEventListener("fetch",function(e){
if(e.request.method!=="GET")return;
e.respondWith(caches.match(e.request).then(function(hit){
var net=fetch(e.request).then(function(r){if(r&&(r.status===200||r.type==="opaque")){var cp=r.clone();caches.open(C).then(function(c){c.put(e.request,cp)})}return r}).catch(function(){return hit});
return hit||net}))});
