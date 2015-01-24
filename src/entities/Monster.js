Monster = ring.create([AbstractEntity], {

	constructor: function()
	{
		this.sprite = objPhaser.add.sprite(0, 0, Constants.ASSET_MONSTER);
	},

	toString: function()
	{
		return "Monster";
	}

});