//D63
//indicar el nombre de la escena y el callback
//se carga el mapa

Q.scene("mundo1", function(stage) {
	var vieneDeTuberia = false;
	//confugurar escena (stage)
	//cargar el archivo TMX
	Q.stageTMX("mundo1.tmx", stage);
	var mario = Q("Jugador").first();

	if (stage.options.propiedadesMario) {

		//si nos pasan propiedades para el mario, creamos un mario con esas propiedades
		mario = new Q.Jugador(stage.options.propiedadesMario);

		vieneDeTuberia = true;
	} else {
		mario = new Q.Jugador({
			x:64,
			y:0
		});
	}
	
	stage.insert(mario);
	//obtener mi capa de fondo
	var capaFondo = Q("TileLayer").first();

	//La camara siga a Mario
	stage.add("viewport").follow(mario, {
		x : true,
		y : true
	}, {
		minX : 32,
		//ancho de la capa de cielo
		//es el mismo que el ancho del canvas
		maxX : capaFondo.p.w - 32,
		minY : 0,
		maxY : capaFondo.p.h
	});
	Q.audio.play("tema_superficie.mp3", {
		loop : true
	});

	if (vieneDeTuberia === true) {

		//asignar coordenadas de acuerdo a la tuberia de regreso
		var tuberia = Q("TuberiaRegreso", 0).first();

		mario.p.x = tuberia.p.x;
		mario.p.y = tuberia.p.y;

		mario.p.sensor = true;
		mario.del("2d");
		//UNA VEZ QUE INSERTAMOS A MARIO, HACEMOS UNA ANIMACION TWEEN
		
		Q.audio.play("tuberia.mp3");
		mario.animate({
			//anima a mario en la cordenada y de la tuberia
			y : mario.p.y - mario.p.h - tuberia.p.h
		}, 0.5, {
			//ejecutamos esta funcion una vez que el hongo salio por completo
			//de su caja
			callback : function() {
				//regresamos al hongo el modulo 2d para detectar colisones
				//deshabilitamos la propiedad sensor
				mario.p.sensor = false;
				mario.add("2d");				
			}
		});

	}

});
