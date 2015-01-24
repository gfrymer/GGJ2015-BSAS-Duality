MonsterIcon = ring.create([AbstractIcon], {

	constructor: function()
	{
		this.sprite = objPhaser.add.sprite(0, 0, Constants.ASSET_MONSTER_ICON);
		this.type = Constants.ASSET_MONSTER_ICON;
	},

	toString: function()
	{
		return "MonsterIcon";
	}

});