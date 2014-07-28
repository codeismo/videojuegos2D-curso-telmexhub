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


Q.Sprite.extend("HongoVida", {
	init : function(p) {
		this._super(p, {			
			sheet : "objetos",
			frame : 1,
			vx:150,
			//deshabilitamos temporalmente las colisiones
			sensor:true
		});
		this.add("animation,tween,aiBounce");
		
		//hit es para escuchar cualquier colision
		this.on("hit",function(colision){
			
			//si el objeto que le pego al hongo es el jugador
			if(colision.obj.isA("Jugador")){
				//destruir a este hongo
				this.destroy();			
			}			
		});		
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
				
				//insertamos al hongo de vida EN EL ESCENARIO
				var hongo = new Q.HongoVida({
					//this.p.x = es la cordenada en x de la caja
					x:this.p.x,
					y:this.p.y
				});
				
				//this.stage == AL ESCENARIO EN QUE VIVE ESTE OBJETO
				this.stage.insert(hongo);
				
				//UNA VEZ QUE INSERTAMOS AL HONGO, HACEMOS UNA ANIMACION TWEEN						
				hongo.animate({
					//anima este hongo en la cordenada y de la caja
					y:this.p.y - 35
				},0.5,{
					//ejecutamos esta funcion una vez que el hongo salio por completo
					//de su caja
					callback:function(){
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
