AbstractEntity = ring.create([], {

	sprite: null,

	constructor: function()
	{

	},

	update: function(gamespeed)
	{
	},

	remove: function()
	{
		if (this.sprite)
		{
			this.sprite.parent.remove(this.sprite);
		}
	},
	
	toString: function()
	{
		return "AbstractEntity";
	}

});