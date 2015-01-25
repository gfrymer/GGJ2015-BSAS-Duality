Menu = ring.create([], {

	preload: function()
	{

	},

	create: function()
	{
		this.btnSplash = objPhaser.add.sprite(0, 0, Constants.ASSET_SPLASH);
		var title = objPhaser.add.sprite(objPhaser.world.centerX, 360, Constants.ASSET_TITLE);
		title.anchor.set(0.5);
		this.btnPlay = objPhaser.add.button(objPhaser.world.centerX-10, objPhaser.world.centerY+120, Constants.ASSET_BTN_PLAY, this.onPlayClick, this);
		this.btnPlay.anchor.set(0.5);
		this.btnStory = objPhaser.add.button(objPhaser.world.width - 110, objPhaser.world.centerY+ 50,  Constants.ASSET_BTN_STORY, this.onStoryClick, this);
		this.btnStory.anchor.set(0.5);
		this.btnHelp = objPhaser.add.button(objPhaser.world.width - 110, 90, Constants.ASSET_BTN_HELP, this.onHelpClick, this);
		this.btnHelp.anchor.set(0.5);
		this.btnCredits = objPhaser.add.button(objPhaser.world.width - 110, objPhaser.world.height - 110, Constants.ASSET_BTN_CREDITS, this.onCreditsClick, this);
		this.btnCredits.anchor.set(0.5);

		if (!objPhaser.isplayingmenu)
		{
			objPhaser.isplayingmenu=true;
			this.bgMusic = objPhaser.add.audio(Constants.ASSET_GAME_MUSIC);
			this.bgMusic.play('', 0, 1, true);
		}
	},

	update: function()
	{

	},

	onPlayClick: function()
	{
		objPhaser.isplayingmenu = false;
		this.bgMusic.stop();
		objPhaser.state.start(Constants.STATE_GAME);
	},

	onStoryClick: function()
	{
		objPhaser.state.start(Constants.STATE_STORY);
	},

	onHelpClick: function()
	{
		objPhaser.state.start(Constants.STATE_HELP);
	},

	onCreditsClick: function()
	{
		objPhaser.state.start(Constants.STATE_CREDITS);
	},

	toString: function()
	{
		return "Menu";
	}

});