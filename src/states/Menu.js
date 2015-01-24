Menu = ring.create([], {

	preload: function()
	{

	},

	create: function()
	{
		this.btnPlay = objPhaser.add.button(objPhaser.world.centerX, objPhaser.world.centerY, Constants.ASSET_BTN_PLAY, this.onButtonClick, this);
		this.btnPlay.anchor.set(0.5);
	},

	update: function()
	{

	},

	onButtonClick: function()
	{
		objPhaser.state.start(Constants.STATE_GAME);
	},

	toString: function()
	{
		return "Menu";
	}

});