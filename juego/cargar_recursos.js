//D66
//indicar en una cadena los recursos: audios, imagenes, tmx, json
//callback para configurar los sprites
var recursos = "bump.ogg, patada.mp3, salto_enano.mp3, tema_superficie.mp3, jugador.json, mundo1_terminado.tmx, mosaicos_escenario_32x32.png, mosaicos_mario_enano_30x30.png, enemigosBajos.json, mosaicos_enemigos_32x32.png, tortugaVerde.json, mosaicos_enemigos_32x46.png";

Q.loadTMX(recursos, function(){
	//se ejecuta hasta que los recursos estén listos
	//compilar el spritesheet del jugador
	Q.compileSheets("mosaicos_mario_enano_30x30.png", "jugador.json");
	//Los Sprites de las imagenes de Goomba se compilan con  goomba.json
	Q.compileSheets("mosaicos_enemigos_32x32.png", "enemigosBajos.json");
	Q.compileSheets("mosaicos_enemigos_32x46.png", "tortugaVerde.json");
	
	//ejecutamos la escena
	Q.stageScene("mundo1");
});
