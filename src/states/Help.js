Help = ring.create([], {

	preload: function()
	{

	},

	create: function()
	{
		var title = objPhaser.add.sprite(objPhaser.world.centerX, 100, Constants.ASSET_TITLE);
		title.anchor.set(0.5);
		this.btnPlay = objPhaser.add.button(objPhaser.world.centerX, objPhaser.world.centerY-80, Constants.ASSET_BTN_PLAY, this.onPlayClick, this);
		this.btnPlay.anchor.set(0.5);
		this.btnStory = objPhaser.add.button(objPhaser.world.centerX - 20, objPhaser.world.centerY+70, Constants.ASSET_BTN_STORY, this.onStoryClick, this);
		this.btnStory.anchor.set(0.5);
		this.btnCredits = objPhaser.add.button(objPhaser.world.centerX, objPhaser.world.centerY+220, Constants.ASSET_BTN_CREDITS, this.onCreditsClick, this);
		this.btnCredits.anchor.set(0.5);
	},

	update: function()
	{

	},

	onPlayClick: function()
	{
		objPhaser.state.start(Constants.STATE_GAME);
	},

	onStoryClick: function()
	{
		objPhaser.state.start(Constants.STATE_GAME);
	},

	onCreditsClick: function()
	{
		objPhaser.state.start(Constants.STATE_GAME);
	},

	toString: function()
	{
		return "Help";
	}

});