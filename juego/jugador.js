//D57
//Definimos la clase Jugador que se extiende la clase Sprite
//Sprite pertenece al core de Quintu
//nombre de la clase y objeto de configuración de la clase

Q.Sprite.extend("Jugador",{
	init: function(p){
		this._super(p,{
			sheet: "jugador",
			frame: 1,
			jumpSpeed: -800,
			speed:150
		});
		this.add("2d, platformerControls");
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
	}
});
