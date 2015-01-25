Story = ring.create([], {

	preload: function()
	{

	},

	create: function()
	{
		var title = objPhaser.add.sprite(objPhaser.world.centerX, 100, Constants.ASSET_TITLE);
		title.anchor.set(0.5);
		this.btnStory = objPhaser.add.button(objPhaser.world.centerX + 10, objPhaser.world.centerY + 80, Constants.ASSET_STORY, this.onMenuClick, this);
		this.btnStory.anchor.set(0.5,0.5);
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
		return "Story";
	}

});