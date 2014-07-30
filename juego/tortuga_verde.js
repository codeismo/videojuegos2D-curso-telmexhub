//crear el grupo de animaciones para la tortuga verde
Q.animations("animacionesTortugaVerde", {
	caminar : {
		frames : [0, 1],
		rate : 1 / 2,
		loop : true
	},
	enConchar : {
		frames : [2, 4],
		rate : 1 / 4,
		loop : false
	}
});

Q.Sprite.extend("TortugaVerde", {
	init : function(p) {
		this._super(p, {
			sprite : "animacionesTortugaVerde",
			sheet : "tortugas",			
			vx : 120,
			//DEFINIMOS NUESTRAS PROPIEDADES
			frameMorir : 4,//usamos este frame para el componente morirDeCabeza
			mosaicosMorir:"enemigosBajos",//usamos esta prop para el componente morirDeCabeza
			esConcha : false,
			vivo : true,
			enemigo : true,
			z : 1
		});

		this.add("2d, aiBounce, animation,tween,morirDeCabeza");

		this.play("caminar");
		//escucha el evento bump.top
		this.on("bump.top", this, "aConcha");

		//escucha el evento hit
		this.on("hit", this, function(colision) {

			//si el objeto que golpeo a esta entidad es una tortuga
			//en forma de concha QUE LLEVA VELOCIDAD
			if (colision.obj.p.esConcha === true && colision.obj.p.vx != 0) {
				//hacemos que muera este sprite
				this.morir();
			}
		});

		//si le pegan a esta tortuga por el costado izquierdo
		this.on("bump.left", function(colision) {

			//si le pega el jugador
			//Y SI esta tortuga esta en forma de concha SIN VELOCIDAD
			if (colision.obj.isA("Jugador") === true && this.p.esConcha === true && this.p.vx === 0) {
				//incrementamos su velocidad en el eje x (de izq a derecha)
				this.p.vx = 500;
			}
		});

		//si le pegan a esta tortuga por el costado derecho
		this.on("bump.right", function(colision) {

			//si le pega el jugador
			//Y SI esta tortuga esta en forma de concha SIN VELOCIDAD
			if (colision.obj.isA("Jugador") === true && this.p.esConcha === true && this.p.vx === 0) {
				//incrementamos su velocidad en el eje x (de derecha a izq)
				this.p.vx = -500;
			}

		});

	},
	morir : function(animar) {
		//si no se pasa la bandera de animar,su valor por default es true
		var animar = ( typeof animar === "undefined") ? true : animar;

		//ejecutamos la animacion si animar = true
		if (animar) {
			Q.audio.play("patada.mp3");
			this.morirDeCabeza();
		} else {
			//simplemente destruimos a esta entidad
			this.destroy();
		}

	},
	aConcha : function(colision) {
		//Detectar si es mario el que le cayó encima
		if (colision.obj.isA("Jugador")) {
			this.del("saltarin");
			//mario rebota
			colision.obj.p.vy = -500;
			//suena patada.mp3
			Q.audio.play("patada.mp3");

			//si la tortuga no es concha
			if (!this.p.esConcha) {
				//cambiar el sheet por el de enemigos bajos
				this.sheet("enemigosBajos", true);
				//activa la bandera esConcha
				this.p.esConcha = true;
			}

			//hacer que la tortuga se quede quieta cuando se esta moviendo
			if (this.p.vx != 0) {
				this.p.vx = 0;
			} else {
				//hacer que la tortuga se mueva cuando esta quieta
				this.p.vx = 500;
			}

			//ejecutar la animacion enconchar
			this.play("enConchar");
		}
	},
	step : function() {
		
		//mientras este vivo
		if (this.p.vivo === true) {
			//voltear cuando va a la derecha, vx+
			if (this.p.vx > 0) {
				this.p.flip = "x";
			} else if (this.p.vx < 0) {
				//no voltear cuando va a la izquierda vx-
				this.p.flip = false;
			}
		}
	}
});
