//tuberia del mundo1 para entrar al subterraneo

Q.Sprite.extend("Tuberia", {
	init : function(p) {
		this._super(p, {
			sheet : "tuberias",
			frame : 2,
			z:1
		});
		this.add("2d");
	}	
});
