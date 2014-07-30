//D63
//indicar el nombre de la escena y el callback
//se carga el mapa

Q.scene("mundo1", function(stage){
	//confugurar escena (stage)
	//cargar el archivo TMX
	Q.stageTMX("mundo1.tmx",stage);
	
	//obtener mi capa de fondo
	var capaFondo = Q("TileLayer").first();

	//La camara siga a Mario
	stage.add("viewport").follow( Q("Jugador").first(),{
		x: true,
		y: true
	},{
		minX:32,
		//ancho de la capa de cielo 
		//es el mismo que el ancho del canvas
		maxX: capaFondo.p.w - 32,
		minY: 0,
		maxY: capaFondo.p.h
	} );
	Q.audio.play("tema_superficie.mp3", {
		loop: true
	});

} );
