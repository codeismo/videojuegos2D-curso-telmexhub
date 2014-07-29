Q.Sprite.extend("TuberiaSalida", {
	init : function(p) {
		this._super(p, {
			sheet : "tuberias",
			frame : 6,
			z:1
		});
		this.add("2d");
	}	
});
