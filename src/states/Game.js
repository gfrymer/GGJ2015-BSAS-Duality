Game = ring.create([], {

	preload: function()
	{

	},

	create: function()
	{
		this.gamespeed = 3;
		this.scup = new Scroll(Constants.ASSET_BACKGROUND_UP,0,this.gamespeed);
		this.scdown = new Scroll(Constants.ASSET_BACKGROUND_DOWN,Constants.DOWN_Y_OFFSET,this.gamespeed);
		this.flyingpowerup = new FlyingPower(Constants.ASSET_FLYINGPOWER,Constants.FLYING_Y_OFFSET,Constants.HERO_FLYING_POWER);
		this.flyingpowerdown = new FlyingPower(Constants.ASSET_FLYINGPOWER,Constants.FLYING_Y_OFFSET + Constants.DOWN_Y_OFFSET,Constants.HERO_FLYING_POWER);
		this.heroup = new Hero(Constants.ASSET_HERO_UP,Constants.HERO_Y_OFFSET,this.flyingpowerup);
		this.herodown = new Hero(Constants.ASSET_HERO_DOWN,Constants.HERO_Y_OFFSET + Constants.DOWN_Y_OFFSET, this.flyingpowerdown);
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
		this.scup.update();
		this.scdown.update();
		this.heroup.update();
		this.herodown.update();
	},

	toString: function()
	{
		return "Game";
	}

});