//D63
//indicar el nombre de la escena y el callback
//se carga el mapa

Q.scene("mundo1Subterraneo", function(stage){
	//Pausar y ocultar las escenas de score y de mundo1
	//obtener a Mario
	var mario = Q("Jugador",0).first();
	//obtener la escena previa
	var escenaPrevia = mario.stage;
	//pausar y ocultar la escena previa
	escenaPrevia.stop();
	
	
	//cargar el archivo TMX
	Q.stageTMX("mundo1_subway.tmx",stage);

	//insertar a Mario
	mario.p.x = 70;
	mario.p.y = 0;
	
	stage.insert(mario);
	
	Q.audio.play("subterraneo.mp3", {
		loop: true
	});

} );
