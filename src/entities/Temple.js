Temple = ring.create([AbstractIcon], {

	constructor: function()
	{
		this.sprite = objPhaser.add.spritesheet(0, 0, Constants.ASSET_TEMPLE, 292, 356);
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