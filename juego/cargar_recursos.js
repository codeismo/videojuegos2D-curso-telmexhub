//D66
//indicar en una cadena los recursos: audios, imagenes, tmx, json
//callback para configurar los sprites
var recursos = "tuberia.mp3, regalo_arriba.mp3, ganar_vida.mp3, moneda.mp3, mosaicos_objetos.png, subterraneo.mp3, mario_muere.mp3,pausa.mp3,bump.ogg, patada.mp3, salto_enano.mp3, tema_superficie.mp3, mundo1.tmx, mosaicos_escenario_32x32.png, mosaicos_mario_enano_30x30.png, mosaicos_enemigos_32x32.png, mosaicos_enemigos_32x46.png, mosaicos_subway.png, tuberias.png, moneda.png, mundo1_subway.tmx";

Q.load(recursos, function() {
	//se ejecuta hasta que los recursos estén listos
	//compilar el spritesheets
	Q.sheet("jugador", "mosaicos_mario_enano_30x30.png", {
		tileh:30,
		tilew:30
	});
	Q.sheet("enemigosBajos", "mosaicos_enemigos_32x32.png", {
		tileh:32,
		tilew:32
	});
	Q.sheet("tortugas","mosaicos_enemigos_32x46.png", {
		tileh:46,
		tilew:32
	});
	//compilar Sprites para las tuberias
	Q.sheet("tuberias", "tuberias.png", {
		tileh:64,
		tilew:64
	});	
	Q.sheet("objetos","mosaicos_objetos.png",{
		tileh:32,
		tilew:32
	});
	Q.sheet("moneda","moneda.png",{
		tileh:30,
		tilew:20
	});
	
	//ejecutamos la escena
	//cada invocan este metodo insertan una escena en su juego
	//el primer que inserta es la escena 0
	Q.stageScene("mundo1",{
		//sort = HABILITA EL ORDENAMIENTO CON LA PROPIEDAD Z
		sort:true
	});
	//inserta la segunda escena y le asigna el numero 0
	Q.stageScene("score", 1);
	
}, {
	progressCallback : function(leidos, totales) {

		var porcentaje = Math.floor((leidos / totales) * 100);

		//con jquery estoy cambiando la propiedad css
		//del ancho (width) con el valor del porcentaje que calculamos
		$("#barra").css("width", porcentaje + "%");

		if (leidos === totales) {
			//obtenemos el objeto asociado a la etiqueta
			//cuyo id es #contenedor-barra y los destruimos
			$("#contenedor-barra").remove();
			
			//OBTENEMOS EL BOTON DE PAUSA CON jQuery
			//show es un metodo de jquery que permite mostrar
			//items ocultos
			$("#contenedor-boton").show();
			
		}

	}
});

//le pegamos una bandera (pausado) al objeto
//que represetna todo nuestro juego
Q.pausado = false;

//-- con el metodo click escuchamos cuando alguien
//selecciona al boton cuyo id  es #boton-pausa (jquery)
$("#boton-pausa").click(function() {
	//aqui va el codigo que queremos que se ejecute
	//cuando alguien le da click al boton
	
	//SOLUCION BREVE EJERCICIO
	Q.audio.play("pausa.mp3");
	
	//this en este caso se refiere al boton que genero click
	var esteBoton = $(this);
	

	//SI EL JUEGO ESTA PAUSADO y el usuario presiona el boton
	//REANUDAMOS EL JUEGO
	if (Q.pausado === true) {
		
		// unpause reanuda el juego
		//con stage(0) es obtener la escena cuyo indice es 0
		//que corresponde a la escena de los enemigos
		Q.stage(0).unpause();
		
		//REANUDAMOS EL AUDIO
		//EN  ESTE MOMENTO ES MUY DIFICIL
		//EN QUINTUS hacer que una cancion siga desde el mmomento
		//en que la pasaron
		Q.audio.play("tema_superficie.mp3");
		
		Q.pausado = false;
		esteBoton.html("Pausar");

	} else {
		//ESTE ELSE, se ejecuta cuando el juego esta corriendo
		//y el usuario selecciona el boton de pausar
		
		//pause, pausa el juego
		Q.stage(0).pause();
		
		// A CONTINUCACION DETEMOS EL AUDIO
		//SI QUIEREN TODO EL AUDIO
		Q.audio.stop("tema_superficie.mp3");
		
		Q.pausado = true;
		//el metodo html, cambia el contenido de una etiqueta
		//por el texto que el texto que le indiquen
		esteBoton.html("Reanudar");
	}

});

