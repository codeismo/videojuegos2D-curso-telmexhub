//definir la escena score
Q.scene("score", function(stage){
	
	//creando un elemento texto que diga "Goombas"
	var textoPuntaje = new Q.UI.Text({
		label: "Goombas ",
		color: "brown",
		y: 20,
		x: 500,
		size: 20
	});
	//insertar el texto en el stage
	stage.insert(textoPuntaje);
	
});
