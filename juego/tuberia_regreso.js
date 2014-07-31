//tuberia del mundo1 para regresar del subterraneo

Q.Tuberia.extend("TuberiaRegreso", {
	init : function(p) {
		this._super(Q._extend(p, {
			sheet : "tuberias",
			frame : 1,
			z:2
		}));
		this.add("2d");

	}	
});
