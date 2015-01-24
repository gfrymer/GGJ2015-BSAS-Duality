LifeIcon = ring.create([AbstractIcon], {

	constructor: function()
	{
		this.sprite = objPhaser.add.sprite(0, 0, Constants.ASSET_LIFE_ICON);
		this.type = ItemManager.TYPE_LIFE_ICON;
	},

	toString: function()
	{
		return "LifeIcon";
	}

});