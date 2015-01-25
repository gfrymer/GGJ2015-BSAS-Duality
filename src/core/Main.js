objPhaser = null;

Main = function()
{
	objPhaser = new Phaser.Game(Constants.STATE_SCREEN_WIDTH, Constants.STATE_SCREEN_HEIGHT, Phaser.CANVAS, "example", { preload: this.preload, create: this.create, update: this.update } );
}

Main.prototype.preload = function()
{
	objPhaser.load.image(Constants.ASSET_TITLE, "assets/title.png");
	objPhaser.load.image(Constants.ASSET_HERO_UP, "assets/hero1.png");
	objPhaser.load.image(Constants.ASSET_HERO_DOWN, "assets/hero2.png");
	objPhaser.load.image(Constants.ASSET_BTN_PLAY, "assets/btnPLay.png");
	objPhaser.load.image(Constants.ASSET_BTN_MENU, "assets/btnmenu.png");
	objPhaser.load.image(Constants.ASSET_BTN_CREDITS, "assets/btncredits.png");
	objPhaser.load.image(Constants.ASSET_BTN_HELP, "assets/btnhelp.png");
	objPhaser.load.image(Constants.ASSET_BTN_STORY, "assets/btnstory.png");
	objPhaser.load.image(Constants.ASSET_BACKGROUND_UP, "assets/bg.jpg");
	objPhaser.load.image(Constants.ASSET_BACKGROUND_DOWN, "assets/bg2.jpg");
	objPhaser.load.image(Constants.ASSET_CREDITS, "assets/credits.png");
	objPhaser.load.image(Constants.ASSET_HELP, "assets/help.png");
	objPhaser.load.image(Constants.ASSET_GAME_OVER, "assets/gameover.png");

	objPhaser.load.image(Constants.ASSET_HUD, "assets/hud.png");
	objPhaser.load.image(Constants.ASSET_HUD_BAR_FLYING, "assets/bar_flying.png");
	objPhaser.load.image(Constants.ASSET_HUD_BAR_KARMA, "assets/bar_karma.png");
	objPhaser.load.image(Constants.ASSET_LIFE, "assets/life.png");
	objPhaser.load.image(Constants.ASSET_TEMPLE, "assets/temple.png");

	objPhaser.load.spritesheet(Constants.ASSET_MONSTER, "assets/monster.png", 100, 100);
	objPhaser.load.image(Constants.ASSET_BAD_KARMA_ICON, "assets/karmaIcon.png");
	objPhaser.load.image(Constants.ASSET_LIFE_ICON, "assets/lifeIcon.png");
	objPhaser.load.image(Constants.ASSET_MONSTER_ICON, "assets/monsterIcon.png");
	objPhaser.load.image(Constants.ASSET_SHIELD_ICON, "assets/shieldIcon.png");

	objPhaser.load.image(Constants.ASSET_WHITE_PARTICLE, "assets/white_particle.png");
	objPhaser.load.image(Constants.ASSET_RED_PARTICLE, "assets/red_particle.png");
	objPhaser.load.image(Constants.ASSET_GREEN_PARTICLE, "assets/green_particle.png");
	objPhaser.load.image(Constants.ASSET_BLUE_PARTICLE, "assets/blue_particle.png");

	objPhaser.load.image(Constants.ASSET_LIFE_PARTICLE, "assets/life_particle.png");
	objPhaser.load.image(Constants.ASSET_SHIELD_PARTICLE, "assets/shield_particle.png");
	objPhaser.load.image(Constants.ASSET_KARMA_PARTICLE, "assets/karma_particle.png");

	objPhaser.load.spritesheet(Constants.ASSET_BOOSTER_FX, "assets/booster_fx.png", 150, 150);

	objPhaser.load.audio(Constants.ASSET_BG_MUSIC, ["assets/bgMusic.mp3"]);

	objPhaser.load.image(Constants.ASSET_FINAL_SCORE, "assets/finalscore.png");
}

Main.prototype.create = function()
{
	objPhaser.scale.pageAlignHorizontally = true;
	objPhaser.scale.pageAlignVeritcally = true;
	objPhaser.scale.refresh();

	objPhaser.state.add(Constants.STATE_MENU, Menu);
	objPhaser.state.add(Constants.STATE_GAME, Game);
	objPhaser.state.add(Constants.STATE_GAME_OVER, GameOver);
	objPhaser.state.add(Constants.STATE_CREDITS, Credits);
	objPhaser.state.add(Constants.STATE_HELP, Help);
	objPhaser.state.add(Constants.STATE_STORY, Story);

	objPhaser.state.start(Constants.STATE_MENU);
}

Main.prototype.update = function()
{
	
}
