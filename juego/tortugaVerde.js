
//PODRIAN HACER UN COMPONETNE QUE USE EL ALGORITMO A*
// PARA SEGUIR A UN PERSONAJE

//--------------- DECLARACION DE UN COMPONENTE -------------
//primer argumento = nombre del componente
//segundo argumento = opciones de inicializacion
Q.component("saltarin",{
	added:function(){
		//SE EJECUTA CUANDO ESTE COMPONENTE SE AGREGA A UN SPRITE
		
		//NORMALMENTE UN COMPONENTE MODIFICA EL GAME LOOP DEL SPRITE y sus propiedad
		//this.entity = ES EL SPRITE EN EL CUAL ESTE COMPONENTE SE APLICO
		this.entity.on("step",this,"saltar");
	},
	//saltar es la funcion que vamos a ejecutar adiciolmente al game loop
	saltar:function(){
		
		//checamos si su velocidad en el eje y es 0 == esta quieta		 
		if(this.entity.p.vy === 0){
			//AGREGAMOS UNA VELOCIDAD EN EL EJE Y para que salte la tortuga
			this.entity.p.vy = -400;
		}
		
	}
});


//crear el grupo de animaciones para la tortuga verde
Q.animations("animacionesTortugaVerde",{
	caminar: {
		frames:[0, 1],
		rate: 1 / 2,
		loop: true
	},
	enConchar: {
		frames: [2, 4],
		rate: 1 / 4,
		loop: false
	}
});

Q.Sprite.extend("TortugaVerde",{
	init: function(p){
		this._super(p,{
			sprite: "animacionesTortugaVerde",
			sheet: "tortugaVerde",
			frame: 0,
			vx:120,
			//DEFINIMOS NUESTRAS PROPIEDADES
			esConcha: false,
			enemigo:true
		});
		
		//agregamos nuestro componente saltarin
		this.add("2d, aiBounce, animation,saltarin");
		
		this.play("caminar");
		//escucha el evento bump.top
		this.on("bump.top", this, "aConcha");
	},
	aConcha:function(colision){
		//Detectar si es mario el que le cayó encima
		if( colision.obj.isA("Jugador") ){
			//mario rebota
			colision.obj.p.vy = -500;
			//suena patada.mp3
			Q.audio.play("patada.mp3");
			
			//si la tortuga no es concha
			if( !this.p.esConcha ){
				//cambiar el sheet por el de enemigos bajos
				this.sheet("enemigosBajos", true);
				//activa la bandera esConcha
				this.p.esConcha = true;
			}
			
			//hacer que la tortuga se quede quieta cuando se esta moviendo
			if(this.p.vx != 0){
				this.p.vx = 0;
			}else{
			//hacer que la tortuga se mueva cuando esta quieta
				this.p.vx = 500;
			}
			
			
			//ejecutar la animacion enconchar
			this.play("enConchar");
		}
	},
	step: function(){
		//voltear cuando va a la derecha, vx+
		if(this.p.vx > 0){
			this.p.flip = "x";
		}
		
		//no voltear cuando va a la izquierda vx-
		if(this.p.vx < 0){
			this.p.flip = false;
		}
	}
});