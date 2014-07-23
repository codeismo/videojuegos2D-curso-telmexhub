//accedemos a las funcionalidades del engine
var Q = Quintus();

//el juego se ejecutará en la etiqueta del canvas cuyo id es juego
//opcionalmente se puede dar como segundo parametro un objeto de configuración
Q.setup("juego", {
	maximize: true
});

//modulos a utilizar (6)
Q.include("Sprites, Scenes, 2D, Input, Touch, TMX, Anim");

//activamos los controles del teclado y controles touch
Q.controls();
Q.touch();
//Q.controls().touch();
