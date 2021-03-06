Help = ring.create([], {

	preload: function()
	{

	},

	create: function()
	{
		var title = objPhaser.add.sprite(objPhaser.world.centerX + 20, 150, Constants.ASSET_TITLE);
		title.anchor.set(0.5);
		title.scale = new PIXI.Point(0.4,0.4);
		this.btnHelp = objPhaser.add.button(objPhaser.world.centerX + 10, objPhaser.world.centerY + 100, Constants.ASSET_HELP, this.onMenuClick, this);
		this.btnHelp.anchor.set(0.5,0.5);
	},

	update: function()
	{

	},

	onMenuClick: function()
	{
		objPhaser.state.start(Constants.STATE_MENU);
	},

	toString: function()
	{
		return "Help";
	}

});