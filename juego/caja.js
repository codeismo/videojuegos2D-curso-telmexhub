Q.animations("animacionCaja", {
	brillar : {
		frames : [2, 3, 4],
		rate : 1 / 3,
		loop : true
	},
	apagado : {
		frames : [5],
		rate : 1 / 2,
		loop : false
	}
});

Q.Sprite.extend("HongoVida", {
	init : function(p) {
		this._super(p, {
			sheet : "objetos",
			frame : 1,
			vx : 150,
			//deshabilitamos temporalmente las colisiones
			sensor : true,
			z : 1,
			//-----nuestras propiedades---
			//esta propiedad la usamos para reproducir el audio al comer el hongo
			audioComer:"ganar_vida.mp3"
		});
		this.add("animation,tween,aiBounce");

		//hit es para escuchar cualquier colision
		this.on("hit", function(colision) {

			//si el objeto que le pego al hongo es el jugador
			if (colision.obj.isA("Jugador")) {
				this.p.sensor = true;

				Q.audio.play(this.p.audioComer);

				//destruir a este hongo
				this.destroy();
			}
		});
	}
});

//extendemos el hongo vida para que sea un hongo crecer
Q.HongoVida.extend("HongoCrece", {
	init : function(p) {
		this._super(Q._extend(p, {
			frame : 0,
			//------------ NUESTRAS PROPIEDADES ----------
			audioComer:"mario_crece.mp3"
		}));
	}
});

Q.Sprite.extend("Caja", {
	init : function(p) {
		//si no especifican el regalo que va entregar esta caja sorpresa, entonces el default es un hongo de vida
		if ( typeof p.claseRegalo === "undefined") {
			p.claseRegalo = "HongoVida";
		}
		
		this._super(p, {
			sprite : "animacionCaja",
			sheet : "objetos",
			frame : 3,
			//DESHABILITAMOS LA GRAVEDAD
			gravity : 0,
			// z es mayor se pone encima de los objetos que tienen un valor de z menor
			z : 10,
			//------------ NUESTRAS PROPIEDADES ----------
			encendida : true //mientras no entrege el regalo esta caja, su estado es de encendida=true
		});

		this.add("2d,animation");

		this.play("brillar");

		this.on("bump.bottom", function(colision) {

			//si a la caja le pego un jugador y todavia esta encendida esta caja
			if (colision.obj.isA("Jugador") && this.p.encendida === true) {
				//la caja ya no tiene mas regalos que entregar
				this.p.encendida = false;
				Q.audio.play("regalo_arriba.mp3");
				//iniciamos la animacion de apagado
				this.play("apagado");

				//insertamos al regalo EN EL ESCENARIO
				var regalo = new Q[this.p.claseRegalo]({
					//this.p.x = es la cordenada en x de la caja
					x : this.p.x,
					y : this.p.y
				});

				//this.stage == AL ESCENARIO EN QUE VIVE ESTE OBJETO
				this.stage.insert(regalo);

				//UNA VEZ QUE INSERTAMOS AL HONGO, HACEMOS UNA ANIMACION TWEEN
				regalo.animate({
					//anima este hongo en la cordenada y de la caja
					y : this.p.y - 35
				}, 0.5, {
					//ejecutamos esta funcion una vez que el hongo salio por completo
					//de su caja
					callback : function() {
						//regresamos al hongo el modulo 2d para detectar colisones
						//deshabilitamos la propiedad sensor
						this.p.sensor = false;
						this.add("2d");
					}
				});

			}

		});

	}
});
