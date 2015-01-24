objPhaser = null;
Main = function()
{
	objPhaser = new Phaser.Game(800, 600, Phaser.CANVAS, "example", { preload: this.preload, create: this.create, update: this.update } );
}

Main.prototype.preload = function()
{
	
}

Main.prototype.create = function()
{
	objPhaser.state.add(Constants.STATE_MENU, Menu);
	objPhaser.state.add(Constants.STATE_GAME, Game);
	objPhaser.state.add(Constants.STATE_GAME_OVER, GameOver);

	objPhaser.state.start(Constants.STATE_MENU);
}

Main.prototype.update = function()
{
	
}
