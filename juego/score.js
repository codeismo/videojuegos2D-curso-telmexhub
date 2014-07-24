//crear un texto que corresponde al numero de Goombas muertos
//esta Clase se extendera de la clase UI.Text
//El objeto texto puede escuchar eventos
Q.UI.Text.extend("PuntosGoomba",{
	init: function(p){
		this._super(p,{
			label: "0",
			color: "green",
			y: 20,
			x: Q.width - 60,
			size: 20
		});
	}
});

//definir la escena score
Q.scene("score", function(stage){
	//creamos una variable del Game State
	Q.state.set("goombasMuertos", 0);
	
	//creamos un objeto de tipo PuntosGoomba y lo insertamos en la escena
	var valorPuntaje = new Q.PuntosGoomba();
	
	//creando un elemento texto que diga "Goombas"
	var textoPuntaje = new Q.UI.Text({
		label: "Goombas: ",
		color: "brown",
		y: 20,
		x: Q.width - 160,
		size: 20
	});
	//insertar el texto y el valor del puntaje en el stage
	stage.insert(textoPuntaje);
	stage.insert(valorPuntaje);
	
});
