//PODRIAN HACER UN COMPONETNE QUE USE EL ALGORITMO A*
// PARA SEGUIR A UN PERSONAJE

//--------------- DECLARACION DE UN COMPONENTE -------------
//primer argumento = nombre del componente
//segundo argumento = opciones de inicializacion
Q.component("saltarin", {
	added : function() {
		//SE EJECUTA CUANDO ESTE COMPONENTE SE AGREGA A UN SPRITE

		//NORMALMENTE UN COMPONENTE MODIFICA EL GAME LOOP DEL SPRITE y sus propiedad
		//this.entity = ES EL SPRITE EN EL CUAL ESTE COMPONENTE SE APLICO
		this.entity.on("step", this, "saltar");
	},
	//saltar es la funcion que vamos a ejecutar adiciolmente al game loop
	saltar : function() {

		//checamos si su velocidad en el eje y es 0 == esta quieta
		if (this.entity.p.vy === 0) {
			//AGREGAMOS UNA VELOCIDAD EN EL EJE Y para que salte la tortuga
			this.entity.p.vy = -200;
		}

	}
});

Q.component("morirDeCabeza", {
	added : function() {
		
		this.entity.p.vivo = true;
		//obtenemos la altura del escenario, mas adelante la usamos
		//para la animacion que saca a este sprite del escenario
		this.entity.p.alturaEscenario = Q("TileLayer").first().p.h;
		
		//le pegamos a la entidad la siguiente funcion
		//para morir de cabeza
		this.entity.morirDeCabeza = function() {
			//cambiamos la bandera de vivo
			this.p.vivo = false;

			//quitamos animaciones
			this.p.animation = null;
			//volteamos de cabeza al enemigo
			this.p.flip = "y";
			//cambiamos la hoja de estilos por la que se indique
			if ( typeof this.p.frameMorir !== "undefined") {
				this.p.frame = this.p.frameMorir;
			}

			//cambiamos la hoja de estilos por la que se indique
			if ( typeof this.p.mosaicosMorir !== "undefined") {
				this.sheet(this.p.mosaicosMorir, true);
			}

			//debugger;
			//deshabilitamos colisiones
			this.del("2d");

			//lo animamos sacandolo del escenario ligeramente a la derecha
			this.animate({
				x : this.p.x + 20,
				y : this.p.alturaEscenario + 10
			}, 0.5, {
				callback : function() {
					//finalmente destruimos a esta tortuga
					this.destroy();
				}
			});

		};
	}
});
