Q.Sprite.extend("TortugaVerde",{
	init: function(p){
		this._super(p,{
			sheet: "tortugaVerde",
			frame: 0,
			vx:170
		});
		this.add("2d, aiBounce");
	},
	step: function(){
		//voltear cuando va a la derecha, vx+
		if(this.p.vx > 0){
			this.p.flip = "x";
		}
		
		//no voltear cuando va a la izquierda vx-
		if(this.p.vx < 0){
			this.p.flip = false;
		}
	}
});