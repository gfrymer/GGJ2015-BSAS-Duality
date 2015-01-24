AbstractEntity = ring.create([], {

	sprite: null,

	constructor: function()
	{

	},

	remove: function()
	{
		if (this.sprite)
		{
			objPhaser.world.remove(this.sprite);
		}
	},
	
	toString: function()
	{
		return "AbstractEntity";
	}

});