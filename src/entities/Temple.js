Temple = ring.create([AbstractIcon], {

	constructor: function()
	{
		this.sprite = objPhaser.add.sprite(0, 0, Constants.ASSET_TEMPLE);
		this.sprite.scale.x = 0.7;
		this.sprite.scale.y = 0.7;
		this.sprite.animations.add("open");
		this.type = Constants.ASSET_TEMPLE;
	},

	openDoors: function()
	{
		this.sprite.animations.play("open", 30, false);
	},

	toString: function()
	{
		return "Temple";
	}

});