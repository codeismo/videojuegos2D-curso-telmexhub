Q.Sprite.extend("TortugaVerde",{
	init: function(p){
		this._super(p,{
			sheet: "tortugaVerde",
			frame: 0,
			vx:170
		});
		this.add("2d, aiBounce");
	}
});