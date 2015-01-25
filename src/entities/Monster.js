Monster = ring.create([AbstractIcon], {

	constructor: function()
	{
		this.sprite = objPhaser.add.sprite(0, 0, Constants.ASSET_MONSTER);
		this.sprite.animations.add("fly");
		this.sprite.animations.play("fly", 3, true);

		this.type = Constants.ASSET_MONSTER;
		this.anim = 0;
		this.sinchange = 0;
	},

	update: function(gamespeed)
	{
		this.$super(gamespeed);
		
		/*this.anim++;
		if (this.anim % Constants.MONSTER_LEVITATE_SPEED == 0)
		{
			this.sinchange++;
			this.sprite.y += Math.round(Math.sin(this.sinchange) * Constants.MONSTER_LEVITATE_ACCELERATION);
		}*/
	},

	toString: function()
	{
		return "Monster";
	}

});