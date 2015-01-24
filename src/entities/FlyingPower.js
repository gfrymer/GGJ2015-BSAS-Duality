FlyingPower = ring.create([AbstractEntity], {

	constructor: function(flyingImage,flyingImageDynamic,ypos,flyingTotal)
	{
		this.ypos = ypos;
		this.sprite = objPhaser.add.sprite(Constants.FLYING_X_OFFSET,ypos,flyingImage);
		this.spritedyn = objPhaser.add.sprite(Constants.FLYING_X_OFFSET+Constants.FLYING_DYNAMIC_X_OFFSET,ypos+Constants.FLYING_DYNAMIC_Y_OFFSET,flyingImageDynamic);
		this.mask = objPhaser.add.graphics(Constants.FLYING_X_OFFSET,this.ypos);
		this.maskwidth = PIXI.TextureCache[flyingImageDynamic].width;
		this.maskheight = PIXI.TextureCache[flyingImageDynamic].height;
		this.mask.beginFill(0xffffff);
    this.mask.drawRect(Constants.FLYING_DYNAMIC_X_OFFSET,Constants.FLYING_DYNAMIC_Y_OFFSET,this.maskwidth,this.maskheight);
		this.mask.endFill();
		this.spritedyn.mask = this.mask;
		this.width = PIXI.TextureCache[flyingImage].width;
		this.height = PIXI.TextureCache[flyingImage].height;
		this.flyingTotal = flyingTotal;
		this.previousflyingTotal = flyingTotal;
	},

	getWidth:function()
	{
		return this.width;
	},

	getHeight:function()
	{
		return this.height;
	},

	decrement:function()
	{
		this.flyingTotal-=3;
		if (this.flyingTotal<0)
		{
			this.flyingTotal=0;
			return false;
		}
		return true;
	},
	
	update: function()
	{
		if (this.flyingTotal<Constants.HERO_FLYING_POWER)
		{
			this.flyingTotal++;
		}
		if (this.previousflyingTotal!=this.flyingTotal)
		{
			this.spritedyn.mask = null;
			objPhaser.world.remove(this.mask);
			this.mask = objPhaser.add.graphics(Constants.FLYING_X_OFFSET,this.ypos);
			this.mask.beginFill(0xffffff);
	    this.mask.drawRect(Constants.FLYING_DYNAMIC_X_OFFSET,Constants.FLYING_DYNAMIC_Y_OFFSET,Math.round(this.flyingTotal * this.maskwidth / Constants.HERO_FLYING_POWER),this.maskheight);
			this.mask.endFill();
			this.spritedyn.mask = this.mask;
			this.previousflyingTotal=this.flyingTotal;
		}
	},

	toString: function()
	{
		return "FlyingPower";
	}

});