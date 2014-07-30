//tuberia del subterraneo para regresar al mundo1

Q.Tuberia.extend("TuberiaSalida", {
	init : function(p) {
		this._super(Q._extend(p, {
			frame : 6,
			z: 2
		}));
	}
});
