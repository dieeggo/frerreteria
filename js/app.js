//Se define que el sw.js se encuentra
//en el repositorio.
var ubicacionSw='/frerreteria/sw2.js';

if ( navigator.serviceWorker ) {
    if(url.includes('localhost')){
        ubicacionSw='/sw.js';
    }

    navigator.serviceWorker.register(ubicacionSw);

}