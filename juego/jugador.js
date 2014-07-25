//Definir animaciones: caminar, saltar
//frames, velocidad de frame,
Q.animations("animacionesMario", {
	//caminar
	caminar : {
		frames : [4, 5, 8],
		//animacion de 6 frames por segundo
		rate : 1 / 6,
		loop : false
	},
	saltar : {
		frames : [2],
		rate : 1 / 2,
		loop : false
	},
	quieto : {
		frames : [1],
		rate : 1 / 2,
		loop : false
	},
	muere : {
		frames : [12],
		rate : 1 / 2,
		loop : false,
		trigger:"casiMuerto"
	}
});

//D57
//Definimos la clase Jugador que se extiende la clase Sprite
//Sprite pertenece al core de Quintu
//nombre de la clase y objeto de configuración de la clase

Q.Sprite.extend("Jugador", {
	init : function(p) {
		this._super(p, {
			sprite : "animacionesMario",
			sheet : "jugador",
			frame : 1,
			jumpSpeed : -800,
			speed : 150,
			//DECLARAMOS NUESTRAS PROPIEDADES
			estaVivo : true
		});
		this.add("2d, platformerControls, animation, tween");
		
		//-- ESCUCHAMOS EL EVENTO casiMuerto, que detona el trigger
		// de la animacion morir
		this.on("casiMuerto",this,function(){
			
			//DESHABILITAMOS LA GRAVEDAD PARA ESTE SPRITE
			this.del("2d");			
			
			//EJECTUAMOS ANIMACION TWEEN
			
			this.animate({
				//mueve el sprite a la posicion y indicada
				y:this.p.y - 100
			},0.5,{
				//esta funcion se ejecuta cuando ya haya 
				//terminado la animacion tween que lleva al mario
				//hacia arriba
				callback:function(){
					
					//EJECUTAMOS OTRA ANIMACION TWEEN
					//PARA SACAR A MARIO DEL ESCENARIO
					this.animate({
						//obtenemos la altura del juego(escenario)
						//y animamos a  mario para que se vaya hasta el fondo
						y:Q("TileLayer").first().p.h 
					}, 0.5,{
						//se ejecuta cuando ya terminamos de sacar a mario
						//del escenario
						callback:function(){
							
							//DESTRUIMOS AL JUGADOR
							this.destroy();
						}
					});
					
				}
			});
			
		});

		//escuchamos si al mario le pegan por los costados
		//o por la cabeza
		this.on("bump.left, bump.right, bump.top", function(colision) {
			//esta funcion se ejecuta cuando se produce la colision

			//si el objeto con el que choco mario es un enemigo
			//entonces mario debe morir!!
			if (colision.obj.p.enemigo === true) {

				//deshabilita los controles de este jugador
				this.p.ignoreControls = true;
				
				//indicamos que mario ya esta muerto
				this.p.estaVivo = false;
				
				//---- QUE TENDRIAN QUE CAMBIAR PARA QUE SOLO
				//CON UNA FUNCION AUXILIAR Y USANDO UN BLOQUE forEach
				//--- DESHABILITEN A TODOS LOS ENEMIGOS-----
				
				//DETENEMOS A TODOS LOS ENEMIGOS
				//Q(NOMBRE) les regresa un arreglo javascript
				//con todos los sprites que son de esa clase
				//items son todos los goombas
				Q("Goomba").items.forEach(function(enemigo){
					//por cada goomba (enemigo)
					//le quitamos su velocidad
					enemigo.p.vx = 0;
					//deshabilita las animaciones del sprite(enemigo)
					enemigo.p.animation = null;					
				});
				
				Q("TortugaVerde").items.forEach(function(enemigo){
					//por cada goomba (enemigo)
					//le quitamos su velocidad
					enemigo.p.vx = 0;
					//deshabilita las animaciones del sprite(enemigo)
					enemigo.p.animation = null;					
				});

				//ejecutamos la animacion de que muere
				this.play("muere");
				
				//DETENEMOS TODOS LOS AUDIOS DEL JUEGO
				Q.audio.stop();
				Q.audio.play("mario_muere.mp3");

			}
		});

	},
	//esta funcion se repite continuamente (Game Loop)
	step : function() {

		//si mario esta vivo
		if (this.p.estaVivo === true) {

			//Si el jugador va a la izquierda y tecleo derecha
			if (this.p.direction === "left" && Q.inputs["right"]) {
				this.p.flip = false;
			}
			//si el jugador va a la derecha y tecleo izquierda
			if (this.p.direction == "right" && Q.inputs["left"]) {
				this.p.flip = "x";
			}
			//ejecutar animacion de caminar
			if (this.p.vx != 0) {
				this.play("caminar");
			}
			//ejecutar la animacion saltar
			if (this.p.vy < 0) {
				Q.audio.play("salto_enano.mp3", {
					debounce : 1000
				});
				this.play("saltar");
			}
			//ejecutar animacion quieto
			if (this.p.vy === 0 && this.p.vx === 0) {
				this.play("quieto");
			}
		}

	}
});
