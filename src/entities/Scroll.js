Scroll = ring.create([], {

	constructor: function(backgroundImage,ypos,speed)
	{
		this.bSprite = objPhaser.add.sprite(0,ypos,backgroundImage);
		this.bSprite2 = objPhaser.add.sprite(Constants.STATE_SCREEN_WIDTH,ypos,backgroundImage);
		this.bpos = 0;
		this.speed = speed;
	},

	update: function()
	{
		this.bpos+=this.speed;
		var posx = -this.bpos % Constants.STATE_SCREEN_WIDTH;
		this.bSprite.x = posx;
		this.bSprite2.x = Constants.STATE_SCREEN_WIDTH + posx;
	},

	toString: function()
	{
		return "Scroll";
	}

});