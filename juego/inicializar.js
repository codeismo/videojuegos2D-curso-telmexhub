//accedemos a las funcionalidades del engine
var Q = Quintus({
	audioSupport : ["mp3", "ogg"]
});

//el juego se ejecutará en la etiqueta del canvas cuyo id es juego
//opcionalmente se puede dar como segundo parametro un objeto de configuración
Q.setup("juego", {
	maximize : true
});

//modulos a utilizar (6)
Q.include("Sprites, Scenes, 2D, Input, Touch, TMX, Anim, Audio, UI");

//activamos el sonido
Q.enableSound();

//activamos los controles del teclado y controles touch
Q.controls();
Q.touch();
//Q.controls().touch();

/*----- DEFINIMOS UNA FUNCION AUXILIAR GENERICA PARA DETENER A TODOS LOS ENEMIGOS--------*/

Q.pausarEnemigos = function() {

	var enemigosClases = ["Goomba", "TortugaVerde"];

	//iteramos todas las cadenas (nombre de clases de enemigos) del arreglo enemigosClases
	enemigosClases.forEach(function(enemigoClase) {
		//por cada clase de Enemigo buscamos en el juego si hay una instancia de dicha
		//clase
		Q(enemigoClase).items.forEach(function(enemigo) {

			//por cada enemigo deshabilitamos las colisiones
			//enemigo.p.sensor = true;
			//por cada enemigo deshabilitamos sus animaciones
			enemigo.p.animation = null;
			//por cada enemigo deshabilitamos su velocidad y gravedad
			enemigo.del("2d");			
		});
	});	
};
