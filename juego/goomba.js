Q.Sprite.extend("Goomba",{
	init: function(p){
		this._super(p,{
			sheet: "goomba",
			frame: 0,
			vx:170
		});
		this.add("2d, aiBounce");
	}
});