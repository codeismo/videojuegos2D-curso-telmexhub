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
			this.entity.p.vy = -200;
		}
		
	}
});
