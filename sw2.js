
const CACHE ='cache-1';
const CACHE_DINAMICO = 'dinamico-1';
const CACHE_ESTATICO = 'estatico-1';
const CACHE_INMUTABLE = 'inmutable-1';


self.addEventListener('install',evento=>{
    const promesa=caches.open(CACHE)
        .then(cache=>{
            return cache.addAll([
                '/',
                '/index.html',
                '/categorias.html',
                '/carpinteria.html',
                '/nosotros.html',
                '/plomeria.html',
                '/construcción.html',
                '/jardineria.html',
                '/registro.html',
                '/secion.html',
                '/mecanica.html',
                '/offline.html'
            ]);
        });
        const cacheInmutable = caches.open(CACHE_INMUTABLE)
        .then(cache=>{
            cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css');
        });
        evento.waitUntil(Promise.all([promesa, cacheInmutable]));

   /* Usamos la estrategia 2 ya que si no encuentra los archivos en el cache, va y busca en el seridor y biseversa */

    });
    self.addEventListener('fetch',evento=>{
        const respuesta=caches.open(CACHE)
        .then(cache=>{
            fetch(evento.request)
            .then(resp=>{
                cache.put(evento.request, resp);
            });
            return cache.match(evento.request);
        });
        evento.respondWith(respuesta);
        if(evento.request.url.includes('bootstrap')){
            evento.respondWith(caches.match(evento.request));
        }
    });
function limpiarCache(nombreCache, numeroItems){
    caches.open(nombreCache)
        .then(cache=>{
            return cache.keys()
                .then(keys=>{
                    if(keys.length>numeroItems){
                        cache.delete(keys(0))
                            .then(limpiarCache(nombreCache, numeroItems));
                    }
                });
        });
}

