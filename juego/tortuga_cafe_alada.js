//crear el grupo de animaciones para la tortuga verde
Q.animations("animacionesTortugaCafeAlada",{
	caminar: {
		frames:[3, 7],
		rate: 1 / 2,
		loop: true
	},
	enConchar: {
		frames: [6, 5],
		rate: 1 / 4,
		loop: false
	}
});


//Podemos extender una clase existente 
//observe que aqui estamos extendiendo la clase TortugaVerde
// extender = heredar caracteristicas de otra clase 
Q.TortugaVerde.extend("TortugaCafeAlada",{
	init: function(p){
		//extendemos las propiedades de la clase TortugaVerde con las propiedades que necesita
		//esta clase TortugaCafe para ser la tortuga Cafe
		this._super(Q._extend(p,{
			sprite: "animacionesTortugaCafeAlada",
			sheet: "tortugas"		
		}));	
	}
});
