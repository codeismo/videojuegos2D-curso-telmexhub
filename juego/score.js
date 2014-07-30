//crear un texto que corresponde al numero de Goombas muertos
//esta Clase se extendera de la clase UI.Text
//El objeto texto puede escuchar eventos
Q.UI.Text.extend("PuntosGoomba", {
	init : function(p) {

		this._super(p, {
			label : "0",
			color : "white",
			size : 14,
			family : 'Press Start'
		});
		//escuchar el evento change.goombasMuertos
		Q.state.on("change.goombasMuertos", this, "actualizaPuntaje");
		//escuchar el evento change.goombasMuertos
	},

	actualizaPuntaje : function(puntajeGoombas) {
		//actualiza el label
		this.p.label = "" + puntajeGoombas;
	},
	
});

//crear un texto que corresponde al numero de Goombas muertos
//esta Clase se extendera de la clase UI.Text
//El objeto texto puede escuchar eventos
Q.UI.Text.extend("Monedas", {
	init : function(p) {

		this._super(p, {
			label : "x0",
			color : "white",
			size : 14,
			family : 'Press Start'
		});
		//escuchar el evento change.goombasMuertos
		Q.state.on("change.monedas", this, "actualizaMonedas");
	},

	actualizaMonedas : function(monedas) {
		//actualiza el label
		this.p.label = "x" + monedas;
	}
});

//definir la escena score
Q.scene("score", function(stage) {
	//obtenemos el ancho del canvas
	var anchoCanvas = Q.width;

	//creamos las variables del Game State
	Q.state.set("goombasMuertos", 0);
	Q.state.set("monedas", 0);

	//declaramos otra variable de estado
	//las variables de estado estan asociadas con el juego
	//su juego esta representado con el objeto Q
	//utilizamos este metodo POR QUE LAS VARIABLES GLOBALES
	//DE JAVASCRIPT SON INHERENTEMENTE MALVADAS
	Q.state.set("tiempo", 300);

	//creamos un objeto de tipo PuntosGoomba y lo insertamos en la escena
	var valorPuntaje = new Q.PuntosGoomba({
		x : anchoCanvas / 8,
		y : 40
	});

	//creando un elemento texto que diga "Puntaje"
	var textoPuntaje = new Q.UI.Text({
		label : "Mario",
		color : "white",
		y : 20,
		x : anchoCanvas / 8,
		size : 14,
		family : 'Press Start'
	});
	//insertar el texto y el valor del puntaje en el stage
	stage.insert(textoPuntaje);
	stage.insert(valorPuntaje);

	//insertamos el timer del juego
	//ESTAMOS INSTANCIANDO LA CLASE ContadorTiempo
	var contadorTiempo = new Q.ContadorTiempo({
		y : 40,
		x : 7 * anchoCanvas / 8,
	});

	//creando un elemento texto que diga "Tiempo"
	var textoTiempo = new Q.UI.Text({
		label : "Tiempo",
		color : "white",
		y : 20,
		x : 7 * anchoCanvas / 8,
		size : 14,
		family : 'Press Start'
	});

	//insertamos el contador en el stage
	stage.insert(contadorTiempo);
	stage.insert(textoTiempo);

	//VAMOS A DEFINIR UN SETINTERVAL PARA QUE DECREMENTE CADA
	//SEGUNDO EL CONTADOR DEL TIEMPO
	// primer argumento: ES LA FUNCION QUE SE EJECUTA EN UN PERIODO DE TIEMPO
	// segundo argumento: ES EL PERIODO EN EL QUE EJECUT LA FUNCION
	var idIntervalo = setInterval(function() {

		//obtiene el valor de la variable tiempo asociada al estado
		var tiempo = Q.state.get("tiempo");

		//si el tiempo del juego es mayor que 0
		// Y  SI EL JUEGO NO ESTA PAUSADO DECREMENTAMOS EL TIMER
		if (tiempo > 0 && Q.pausado === false) {
			//toma la variable tiempo y la decrementa en una unidad
			Q.state.dec("tiempo", 1);
		} else if (tiempo === 0 && Q.pausado === false) {
			//si ya se acabo el tiempo y el juego no esta pausado

			//detenemos el timer del juego
			clearInterval(idIntervalo);

			// matamos al mario
			Q("Jugador").first().morir();

		}

	}, 1000);

	//creando un elemento texto que diga "Mundo"
	var textoMundo = new Q.UI.Text({
		label : "Mundo",
		color : "white",
		y : 20,
		x : 5 * anchoCanvas / 8,
		size : 14,
		family : 'Press Start'
	});

	var mundo = Q("Jugador",0).first().stage.scene.name;
	var nombreMundo = new Q.UI.Text({
		label : mundo,
		color : "white",
		y : 40,
		x : 5 * anchoCanvas / 8,
		size : 14,
		family : 'Press Start'
	});

	stage.insert(textoMundo);
	stage.insert(nombreMundo);
	
	var monedaImagen = new Q.UI.Button({
		asset: "moneda_menu.png",
		x : 3 * anchoCanvas / 8 - 16,
		y : 46
	});
	
	var contadorMonedas = new Q.Monedas({
		label: "x0",
		x : (3 * anchoCanvas / 8) + 13,
		y : 40
	});

	stage.insert(monedaImagen);
	stage.insert(contadorMonedas);

});

// -------------- LOGICA DEL TIMER DEL JUEGO -------------

Q.UI.Text.extend("ContadorTiempo", {
	init : function(p) {
		this._super(p, {
			label : "300",
			color : "white",
			size : 14,
			family : 'Press Start'
		});

		//EN GENERAL EN QUINTUS, el metodo on
		//les permite escuchar eventos
		//el evento change.tiempo se produce cuando alquien
		//invoca Q.state.dec o Q.state.inc
		Q.state.on("change.tiempo", this, "actualizarTiempo");
	},
	//-- esta funcion se ejecuta cuando alguien cambia la variable
	//de estado tiempo, y ademas a la funcion se le pasa como argumento
	//el valor nuevo de esa variable de estado
	actualizarTiempo : function(tiempo) {
		console.log("tiempo");
		//actualizamos el texto del timer
		this.p.label = "" + tiempo;
	}
});

