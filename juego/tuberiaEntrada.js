Q.Sprite.extend("TuberiaEntrada", {
	init : function(p) {
		this._super(p, {
			sheet : "tuberias",
			frame : 2,
			z:1
		});
		this.add("2d");
	}	
});
