FlyingPower = ring.create([AbstractEntity], {

	constructor: function(flyingImage,ypos,flyingTotal)
	{
		this.sprite = objPhaser.add.sprite(Constants.FLYING_X_OFFSET,ypos,flyingImage);
		this.flyingTotal = flyingTotal;
	},

	update: function()
	{
	},

	toString: function()
	{
		return "FlyingPower";
	}

});