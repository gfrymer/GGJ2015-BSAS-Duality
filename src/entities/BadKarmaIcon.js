BadKarmaIcon = ring.create([AbstractIcon], {

	constructor: function()
	{
		this.sprite = objPhaser.add.sprite(0, 0, Constants.ASSET_BAD_KARMA_ICON);
		this.type = ItemManager.TYPE_BAD_KARMA_ICON;
	},

	toString: function()
	{
		return "BadKarmaIcon";
	}
	
});