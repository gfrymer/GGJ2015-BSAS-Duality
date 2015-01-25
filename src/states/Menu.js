Menu = ring.create([], {

	preload: function()
	{

	},

	create: function()
	{
		var title = objPhaser.add.sprite(objPhaser.world.centerX, 100, Constants.ASSET_TITLE);
		title.anchor.set(0.5);
		this.btnPlay = objPhaser.add.button(objPhaser.world.centerX, objPhaser.world.centerY-80, Constants.ASSET_BTN_PLAY, this.onPlayClick, this);
		this.btnPlay.anchor.set(0.5);
		this.btnStory = objPhaser.add.button(objPhaser.world.centerX - 20, objPhaser.world.centerY+60, Constants.ASSET_BTN_STORY, this.onStoryClick, this);
		this.btnStory.anchor.set(0.5);
		this.btnHelp = objPhaser.add.button(objPhaser.world.centerX - 5, objPhaser.world.centerY+190, Constants.ASSET_BTN_HELP, this.onHelpClick, this);
		this.btnHelp.anchor.set(0.5);
		this.btnCredits = objPhaser.add.button(objPhaser.world.centerX, objPhaser.world.centerY+310, Constants.ASSET_BTN_CREDITS, this.onCreditsClick, this);
		this.btnCredits.anchor.set(0.5);

		this.bgMusic = objPhaser.add.audio(Constants.ASSET_GAME_MUSIC);
		this.bgMusic.play('', 0, 1, true);
	},

	update: function()
	{

	},

	onPlayClick: function()
	{
		this.bgMusic.stop();
		objPhaser.state.start(Constants.STATE_GAME);
	},

	onStoryClick: function()
	{
		this.bgMusic.stop();
		objPhaser.state.start(Constants.STATE_STORY);
	},

	onHelpClick: function()
	{
		this.bgMusic.stop();
		objPhaser.state.start(Constants.STATE_HELP);
	},

	onCreditsClick: function()
	{
		this.bgMusic.stop();
		objPhaser.state.start(Constants.STATE_CREDITS);
	},

	toString: function()
	{
		return "Menu";
	}

});