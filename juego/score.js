//crear un texto que corresponde al numero de Goombas muertos
//esta Clase se extendera de la clase UI.Text
//El objeto texto puede escuchar eventos
Q.UI.Text.extend("PuntosGoomba", {
	init : function(p) {
		this._super(p, {
			label : "0",
			color : "green",
			y : 20,
			x : Q.width - 60,
			size : 30,
			family : 'Share Tech Mono'
		});
		//escuchar el evento change.goombasMuertos
		Q.state.on("change.goombasMuertos", this, "actualizaPuntaje");
	},

	actualizaPuntaje : function(puntajeGoombas) {
		//actualiza el label
		this.p.label = "" + puntajeGoombas;
		alert("cambia variable goombasMuertos");
	}
});

//definir la escena score
Q.scene("score", function(stage) {
	//creamos una variable del Game State
	Q.state.set("goombasMuertos", 0);

	//declaramos otra variable de estado
	//las variables de estado estan asociadas con el juego
	//su juego esta representado con el objeto Q
	//utilizamos este metodo POR QUE LAS VARIABLES GLOBALES
	//DE JAVASCRIPT SON INHERENTEMENTE MALVADAS
	Q.state.set("tiempo", 10);

	//creamos un objeto de tipo PuntosGoomba y lo insertamos en la escena
	var valorPuntaje = new Q.PuntosGoomba();
	
	
	
	//---------------------------------------------
	//-----ESTAMOS EN RECESO DE 10 MIN :) ---------
	//---------------------------------------------
	
	
	
	
	//creando un elemento texto que diga "Goombas"
	var textoPuntaje = new Q.UI.Text({
		label : "Goombas: ",
		color : "brown",
		y : 20,
		x : Q.width - 160,
		size : 30,
		family : 'Share Tech Mono'
	});
	//insertar el texto y el valor del puntaje en el stage
	stage.insert(textoPuntaje);
	stage.insert(valorPuntaje);

	//insertamos el timer del juego
	//ESTAMOS INSTANCIANDO LA CLASE ContadorTiempo
	var contadorTiempo = new Q.ContadorTiempo();
	//insertamos el contador en el stage
	stage.insert(contadorTiempo);

	//VAMOS A DEFINIR UN SETINTERVAL PARA QUE DECREMENTE CADA
	//SEGUNDO EL CONTADOR DEL TIEMPO
	// primer argumento: ES LA FUNCION QUE SE EJECUTA EN UN PERIODO DE TIEMPO
	// segundo argumento: ES EL PERIODO EN EL QUE EJECUT LA FUNCION
	setInterval(function() {
		
		//obtiene el valor de la variable tiempo asociada al estado
		var tiempo = Q.state.get("tiempo");
		
		//si el tiempo del juego es mayor que 0
		// Y  SI EL JUEGO NO ESTA PAUSADO DECREMENTAMOS EL TIMER
		if (tiempo > 0 && Q.pausado === false) {
			//toma la variable tiempo y la decrementa en una unidad
			Q.state.dec("tiempo", 1);
		}

	}, 1000);

});

// -------------- LOGICA DEL TIMER DEL JUEGO -------------

Q.UI.Text.extend("ContadorTiempo", {
	init : function(p) {
		this._super(p, {
			label : "10",
			color : "green",
			y : 20,
			//Q.width les da el ancho del canvas
			x : Q.width / 2, //colocando el timer en medio del juego
			size : 30,
			family : 'Share Tech Mono'
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

