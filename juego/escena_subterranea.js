//D63
//indicar el nombre de la escena y el callback
//se carga el mapa

Q.scene("mundo1Subterraneo", function(stage){
	//Pausar y ocultar las escenas de score y de mundo1
	//obtener a Mario
	var mario = Q("Jugador",0).first();
	//obtener la escena previa
	var escenaPrevia = mario.stage;
	//pegar a mario un atributo que haga referefencia a la escena del mundo 1
	mario.p.escena_previa = escenaPrevia;
	//pausar y ocultar la escena previa
	escenaPrevia.stop();
	
	
	//cargar el archivo TMX
	Q.stageTMX("mundo1_subway.tmx",stage);

	//insertar a Mario
	mario.p.x = 100;
	mario.p.y = 40;
	
	stage.insert(mario);
	
	//obtener mi capa de fondo
	var capaFondo = Q("TileLayer").first();
	
	//La camara siga a Mario
	stage.add("viewport").follow( mario,{
		x: true,
		y: true
	},{
		minX:32,
		//ancho de la capa de cielo 
		//es el mismo que el ancho del canvas
		maxX: capaFondo.p.w - 32,
		minY: 32,
		maxY: capaFondo.p.h
	} );
	
	Q.audio.play("subterraneo.mp3", {
		loop: true
	});

} );
