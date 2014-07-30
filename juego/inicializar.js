//accedemos a las funcionalidades del engine
var Q = Quintus({
	audioSupport : ["mp3", "ogg"]
});

//el juego se ejecutará en la etiqueta del canvas cuyo id es juego
//opcionalmente se puede dar como segundo parametro un objeto de configuración
Q.setup("juego");

//modulos a utilizar (6)
Q.include("Sprites, Scenes, 2D, Input, Touch, TMX, Anim, Audio, UI");

//activamos el sonido
Q.enableSound();

//activamos los controles del teclado y controles touch
Q.controls();
Q.touch();
//Q.controls().touch();

/*----- DEFINIMOS UNA FUNCION AUXILIAR GENERICA PARA DETENER A TODOS LOS spriteS--------*/

Q.pausarSprites = function() {

	var spritesClases = ["Moneda","Caja","HongoVida","Goomba", "TortugaVerde","TortugaCafe","TortugaVerdeAlada","TortugaCafeAlada"];

	//iteramos todas las cadenas (nombre de clases de sprites) del arreglo spritesClases
	spritesClases.forEach(function(spriteClase) {
		//por cada clase de sprite buscamos en el juego si hay una instancia de dicha
		//clase
		Q(spriteClase).items.forEach(function(sprite) {

			//por cada sprite deshabilitamos las colisiones
			sprite.p.sensor = true;
			//por cada sprite deshabilitamos sus animaciones
			sprite.p.animation = null;
			//por cada sprite deshabilitamos su velocidad y gravedad
			sprite.del("2d");			
		});
	});	
};
