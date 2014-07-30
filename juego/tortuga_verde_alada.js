//crear el grupo de animaciones para la tortuga verde
Q.animations("animacionesTortugaVerdeAlada",{
	caminar: {
		frames:[5, 6],
		rate: 1 / 2,
		loop: true
	},
	enConchar: {
		frames: [2, 4],
		rate: 1 / 4,
		loop: false
	}
});


//Podemos extender una clase existente 
//observe que aqui estamos extendiendo la clase TortugaVerde
// extender = heredar caracteristicas de otra clase 
Q.TortugaVerde.extend("TortugaVerdeAlada",{
	init: function(p){
		//extendemos las propiedades de la clase TortugaVerde con las propiedades que necesita
		//esta clase TortugaCafe para ser la tortuga Cafe
		this._super(Q._extend(p,{
			sprite: "animacionesTortugaVerdeAlada",
			sheet: "tortugas"		
		}));	
	}
});



