objPhaser = null;
Main = function()
{
	objPhaser = new Phaser.Game(1280, 720, Phaser.CANVAS, "example", { preload: this.preload, create: this.create, update: this.update } );
}

Main.prototype.preload = function()
{
	objPhaser.load.image(Constants.ASSET_HERO, "assets/hero.png");
	objPhaser.load.image(Constants.ASSET_BTN_PLAY, "assets/btnPLay.png");
}

Main.prototype.create = function()
{
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
