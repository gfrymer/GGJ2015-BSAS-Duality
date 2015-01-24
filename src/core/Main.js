objPhaser = null;
cursors = null;

Main = function()
{
	objPhaser = new Phaser.Game(Constants.STATE_SCREEN_WIDTH, Constants.STATE_SCREEN_HEIGHT, Phaser.CANVAS, "example", { preload: this.preload, create: this.create, update: this.update } );
}

Main.prototype.preload = function()
{
	objPhaser.load.image(Constants.ASSET_HERO_UP, "assets/hero.png");
	objPhaser.load.image(Constants.ASSET_HERO_DOWN, "assets/hero.png");
	objPhaser.load.image(Constants.ASSET_BTN_PLAY, "assets/btnPLay.png");
	objPhaser.load.image(Constants.ASSET_BACKGROUND_UP, "assets/bg.jpg");
	objPhaser.load.image(Constants.ASSET_BACKGROUND_DOWN, "assets/bg2.jpg");
	objPhaser.load.image(Constants.ASSET_FLYING_POWER, "assets/flyingpower.png");

	objPhaser.load.image(Constants.ASSET_MONSTER, "assets/monster.png");
	objPhaser.load.image(Constants.ASSET_BAD_KARMA_ICON, "assets/karmaIcon.png");
	objPhaser.load.image(Constants.ASSET_LIFE_ICON, "assets/lifeIcon.png");
	objPhaser.load.image(Constants.ASSET_MONSTER_ICON, "assets/monsterIcon.png");
	objPhaser.load.image(Constants.ASSET_SHIELD_ICON, "assets/shieldIcon.png");
}

Main.prototype.create = function()
{
	cursors = objPhaser.input.keyboard.createCursorKeys();
	objPhaser.scale.pageAlignHorizontally = true;
	objPhaser.scale.pageAlignVeritcally = true;
	objPhaser.scale.refresh();

	objPhaser.state.add(Constants.STATE_MENU, Menu);
	objPhaser.state.add(Constants.STATE_GAME, Game);
	objPhaser.state.add(Constants.STATE_GAME_OVER, GameOver);

	objPhaser.state.start(Constants.STATE_MENU);
}

Main.prototype.update = function()
{
	
}
