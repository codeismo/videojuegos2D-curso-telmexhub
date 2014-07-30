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
			enemigo:true,
			z:1
		});
		this.add("2d, aiBounce, animation");
		//Ejecuta la animacion caminar siempre
		this.play("caminar");
		//escuchar las colisiones por arriba
		this.on("bump.top", this, "aplasta");
		//trigger
		this.on("destruir", function() {
			this.destroy();
			//incrementa el numero de Goombas muertos
			Q.state.inc("goombasMuertos", 10);
		});
	},
	aplasta : function(colision) {
		//revisar si colisione con Mario
		if (colision.obj.isA("Jugador")) {
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