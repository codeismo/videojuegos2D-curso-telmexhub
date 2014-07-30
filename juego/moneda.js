Q.animations("animacionMoneda", {
	brillar : {
		frames : [1, 2, 3],
		rate : 1 / 3,
		loop : true
	}
});

Q.Sprite.extend("Moneda", {
	init : function(p) {
		this._super(p, {
			sprite : "animacionMoneda",
			sheet : "moneda",
			frame : 1,
			//DESHABILITAMOS LA GRAVEDAD
			gravity : 0,
			sensor: true,
			z: 1
		});
		this.add("2d,animation");

		this.play("brillar");

		this.on("hit", this, function(colision) {

			if (colision.obj.isA("Jugador")) {
				Q.audio.play("moneda.mp3");
				this.destroy();
				//incrementa el numero de Goombas muertos
				Q.state.inc("monedas", 1);
			}
		});
	}
});
