Temple = ring.create([AbstractIcon], {

	constructor: function()
	{
		this.sprite = objPhaser.add.sprite(0, 0, Constants.ASSET_TEMPLE);
		this.type = Constants.ASSET_TEMPLE;
	},

	toString: function()
	{
		return "Temple";
	}

});