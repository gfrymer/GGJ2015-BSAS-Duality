Game = ring.create([], {

	preload: function()
	{

	},

	create: function()
	{
		//screen manager
			//scroll
			//hero
			//items manager
			//enemy

		this.itemManager = new ItemManager();
	},

	update: function()
	{
		if(this.itemManager != null)
		{
			this.itemManager.update();
		}
	},

	toString: function()
	{
		return "Game";
	}

});