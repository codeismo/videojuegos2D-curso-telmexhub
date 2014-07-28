Q.animations("animacionCaja",{
	brillar:{
		frames:[2,3,4],
		rate:1/3,
		loop:true
	},
	apagado:{
		frames:[5],
		rate:1/2,
		loop:false
	}
});

Q.Sprite.extend("Caja", {
	init : function(p) {
		this._super(p, {
			sprite:"animacionCaja",
			sheet : "objetos",
			frame : 3,
			//DESHABILITAMOS LA GRAVEDAD			
			gravity:0
		});
		this.add("2d,animation");
		
		this.play("brillar");
		
		this.on("bump.bottom",function(colision){
			
			if(colision.obj.isA("Jugador")){
				this.play("apagado");
			}
			
		});
		
	}	
});
