//Grupo de animaciones de Goomba
Q.animations("animacionesGoomba",{
	caminar:{
		frames:[0,1],
		rate: 1 / 2,
		loop: true
	}
});

Q.Sprite.extend("Goomba",{
	init: function(p){
		this._super(p,{
			sprite: "animacionesGoomba",
			sheet: "goomba",
			frame: 0,
			vx:170
		});
		this.add("2d, aiBounce, animation");
		//Ejecuta la animacion caminar siempre
		this.play("caminar");
		//escuchar las colisiones por arriba
		this.on("bump.bottom", function(colision){
			//revisar si colisione con Mario
			if( colision.obj.isA("Jugador") ){
				//Goomba muere
				this.destroy();
			}
		});
	}
});