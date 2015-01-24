Hero = ring.create([AbstractEntity], {

	constructor: function(heroImage,ypos)
	{
		this.sprite = objPhaser.add.sprite(Constants.HERO_X_OFFSET,ypos,heroImage);
		this.anim = Math.floor(Math.random() * Constants.HERO_LEVITATE_SPEED);
		this.sinchange = 0;
	},

	update: function(heroImage,ypos)
	{
		this.anim++;
		if (this.anim % Constants.HERO_LEVITATE_SPEED == 0)
		{
			this.sinchange++;
			this.sprite.y += Math.round(Math.sin(this.sinchange) * Constants.HERO_LEVITATE_ACCELERATION);
		}
	},

	toString: function()
	{
		return "Hero";
	}

});