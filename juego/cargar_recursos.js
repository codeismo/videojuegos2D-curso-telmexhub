//D66
//indicar en una cadena los recursos: audios, imagenes, tmx, json
//callback para configurar los sprites
var recursos = "jugador.json, mundo1_terminado.tmx, mosaicos_escenario_32x32.png, mosaicos_mario_enano_30x30.png";

Q.loadTMX(recursos, function(){
	//se ejecuta hasta que los recursos estén listos
	//compilar el spritesheet del jugador
	Q.compileSheets("mosaicos_mario_enano_30x30.png", "jugador.json");
	//ejecutamos la escena
	Q.stageScene("mundo1");
});
