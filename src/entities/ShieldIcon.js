ShieldIcon = ring.create([AbstractIcon], {

	constructor: function()
	{
		this.sprite = objPhaser.add.sprite(0, 0, Constants.ASSET_SHIELD_ICON);
		this.type = Constants.ASSET_SHIELD_ICON;
	},

	toString: function()
	{
		return "ShieldIcon";
	}

});