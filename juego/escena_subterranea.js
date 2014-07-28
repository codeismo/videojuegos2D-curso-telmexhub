//D63
//indicar el nombre de la escena y el callback
//se carga el mapa

Q.scene("mundo1Subterraneo", function(stage){
	//confugurar escena (stage)
	//cargar el archivo TMX
	Q.stageTMX("mundo1_subway.tmx",stage);

	Q.audio.play("subterraneo.mp3", {
		loop: true
	});

} );
