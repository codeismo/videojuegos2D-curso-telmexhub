//D57
//Definimos la clase Jugador que se extiende la clase Sprite
//Sprite pertenece al core de Quintu
//nombre de la clase y objeto de configuración de la clase

Q.Sprite.extend("Jugador",{
	init: function(p){
		this._super(p,{
			sheet: "jugador",
			frame: 1,
			jumpSpeed: -380,
			speed:120
		});
		this.add("2d, platformerControls");
	}
});
