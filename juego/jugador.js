//Definir animaciones: caminar, saltar
//frames, velocidad de frame,
Q.animations("animacionesMario",{
	//caminar
	caminar:{
		frames: [4,5,8],
		//animacion de 6 frames por segundo
		rate: 1 / 6,
		loop: false
	},
	saltar:{
		frames: [2],
		rate: 1 / 2,
		loop:false
	},
	quieto:{
		frames: [1],
		rate: 1 / 2,
		loop: false
	}
});

//D57
//Definimos la clase Jugador que se extiende la clase Sprite
//Sprite pertenece al core de Quintu
//nombre de la clase y objeto de configuración de la clase

Q.Sprite.extend("Jugador",{
	init: function(p){
		this._super(p,{
			sprite: "animacionesMario",
			sheet: "jugador",
			frame: 1,
			jumpSpeed: -800,
			speed:150
		});
		this.add("2d, platformerControls, animation");
		
		//escuchamos si al mario le pegan por los costados
		//o por la cabeza
		this.on("bump.left, bump.right, bump.top",function(colision){
			//esta funcion se ejecuta cuando se produce la colision
			
			//si el objeto con el que choco mario es un enemigo
			//entonces mario debe morir!!
			if(colision.obj.p.enemigo === true){
			   	
			   	Q.audio.play("mario_muere.mp3");
			   	
			}			
		});
		
	},
	//esta funcion se repite continuamente (Game Loop)
	step: function(){
		//Si el jugador va a la izquierda y tecleo derecha
		if(this.p.direction === "left" && Q.inputs["right"]){
			this.p.flip = false;
		}
		//si el jugador va a la derecha y tecleo izquierda
		if(this.p.direction == "right" && Q.inputs["left"]){
			this.p.flip= "x";
		}
		//ejecutar animacion de caminar
		if(this.p.vx != 0){
			this.play("caminar");
		}
		//ejecutar la animacion saltar
		if(this.p.vy < 0){
			Q.audio.play("salto_enano.mp3",{
				debounce: 1000
			});
			this.play("saltar");
		}
		//ejecutar animacion quieto
		if(this.p.vy === 0 && this.p.vx === 0){
			this.play("quieto");
		}
	}
});
