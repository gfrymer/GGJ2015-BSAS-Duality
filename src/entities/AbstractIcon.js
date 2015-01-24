AbstractIcon = ring.create([AbstractEntity], {

	type: null,
	position:null,

	constructor: function()
	{
		
	},

	update: function(gamespeed)
	{
		if (this.sprite)
		{
			this.sprite.x-=gamespeed;
		}
	},

	setPosition: function(pos)
	{
		this.position = pos;
	},

	toString: function()
	{
		return "AbstractIcon";
	}

});