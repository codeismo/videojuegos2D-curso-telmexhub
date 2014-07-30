//Grupo de animaciones de Goomba
Q.animations("animacionesGoomba", {
	caminar : {
		frames : [0, 1],
		rate : 1 / 2,
		loop : true
	},
	aplastar : {
		frames : [3],
		rate : 1 / 4,
		loop : false,
		trigger : "destruir"
	}
});

Q.Sprite.extend("Goomba", {
	init : function(p) {
		this._super(p, {
			sprite : "animacionesGoomba",
			sheet : "enemigosBajos",
			frame : 0,
			vx : 130,
			// DEFINIMOS NUESTRAS PROPIEDADES
			enemigo : true,
			z : 1
		});
		this.add("2d, aiBounce, animation");
		//Ejecuta la animacion caminar siempre
		this.play("caminar");
		//escuchar las colisiones por arriba
		this.on("bump.top", this, "aplasta");
		//trigger
		this.on("destruir", function() {
			this.morir(false);
			//incrementa el numero de Goombas muertos
			Q.state.inc("goombasMuertos", 10);
		});

		//escucha el evento hit
		this.on("hit", this, function(colision) {

			//si el objeto que golpeo a esta entidad es una tortuga
			//en forma de concha QUE LLEVA VELOCIDAD
			if (colision.obj.p.esConcha === true && colision.obj.p.vx != 0) {
				//hacemos que muera este sprite
				this.morir(true);
			}
		});
	},
	morir:function(animar){
		//si no se pasa la bandera de animar,su valor por default es true
		var animar = (typeof animar === "undefined")?true:animar;
		
		this.destroy();
	},
	aplasta : function(colision) {
		//revisar si colisione con Mario
		if (colision.obj.isA("Jugador")) {
			
			//le quitamos la velocidad en x a este enemigo
			this.p.vx = 0;
			
			//suene bump
			Q.audio.play("bump.ogg");
			//hacemos que mario rebote
			colision.obj.p.vy = -500;
			//Goomba muere
			this.play("aplastar");
			//this.destroy();
		}
	}
});
