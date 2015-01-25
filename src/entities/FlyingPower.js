FlyingPower = ring.create([AbstractEntity], {

	constructor: function(ypos, flyingTotal, hudContainer)
	{
		this.ypos = ypos;
		this.hudContainer = hudContainer;

		//hud base
		this.hudBase = objPhaser.add.sprite(Constants.HUD_X_OFFSET, ypos, Constants.ASSET_HUD);
		this.hudContainer.add(this.hudBase);

		//flying power bar
		this.barFlying = objPhaser.add.sprite(this.hudBase.x + Constants.FLYING_BAR_X_OFFSET, this.hudBase.y + Constants.FLYING_BAR_Y_OFFSET , Constants.ASSET_HUD_BAR_FLYING);
		this.hudContainer.add(this.barFlying);
		
		this.maskFlying = objPhaser.add.graphics(Constants.HUD_X_OFFSET,this.ypos);
		this.maskFlyingwidth = this.barFlying.width;
		this.maskFlyingheight = this.barFlying.height;
		this.maskFlying.beginFill(0xffffff);
    	this.maskFlying.drawRect(Constants.FLYING_BAR_X_OFFSET, Constants.FLYING_BAR_Y_OFFSET, this.maskFlyingwidth, this.maskFlyingheight);
		this.maskFlying.endFill();
		this.hudContainer.add(this.maskFlying);
		
		this.barFlying.mask = this.maskFlying;

		//flying power bar
		this.barKarma = objPhaser.add.sprite(this.hudBase.x + Constants.KARMA_BAR_X_OFFSET, this.hudBase.y + Constants.KARMA_BAR_Y_OFFSET , Constants.ASSET_HUD_BAR_KARMA);
		this.hudContainer.add(this.barKarma);
		
		this.maskKarma = objPhaser.add.graphics(Constants.HUD_X_OFFSET,this.ypos);
		this.maskKarmawidth = this.barKarma.width;
		this.maskKarmaheight = this.barKarma.height;
		this.maskKarma.beginFill(0xffffff);
    	this.maskKarma.drawRect(Constants.KARMA_BAR_X_OFFSET, Constants.KARMA_BAR_Y_OFFSET, this.maskKarmawidth, this.maskKarmaheight);
		this.maskKarma.endFill();
		this.hudContainer.add(this.maskKarma);
		
		this.barKarma.mask = this.maskKarma;
		
		//
		this.width = PIXI.TextureCache[Constants.ASSET_HUD_BAR_FLYING].width;
		this.height = PIXI.TextureCache[Constants.ASSET_HUD].height;
		
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
		this.flyingTotal -= 2.5;
		if (this.flyingTotal < 0)
		{
			this.flyingTotal = 0;
			return false;
		}
		return true;
	},

	hasFlyingPower:function()
	{
		return (this.flyingTotal > 0);
	},

	updateKarma: function(currentKarma)
	{
		var percent = currentKarma * 100 / Constants.TOTAL_KARMA;
		this.maskKarma.scale.x = percent / 100;
	},
	
	update: function()
	{
		if (this.flyingTotal < Constants.HERO_FLYING_POWER)
		{
			this.flyingTotal += .75;
		}
		
		if (this.previousflyingTotal!=this.flyingTotal)
		{
			this.barFlying.mask = null;
			this.hudContainer.remove(this.maskFlying);
			this.maskFlying = objPhaser.add.graphics(Constants.HUD_X_OFFSET,this.ypos);
			this.maskFlying.beginFill(0xffffff);
	    	this.maskFlying.drawRect(Constants.FLYING_BAR_X_OFFSET,Constants.FLYING_BAR_Y_OFFSET,Math.round(this.flyingTotal * this.maskFlyingwidth / Constants.HERO_FLYING_POWER),this.maskFlyingheight);
			this.maskFlying.endFill();
			this.hudContainer.add(this.maskFlying);
			this.barFlying.mask = this.maskFlying;
			this.previousflyingTotal=this.flyingTotal;
		}
	},

	toString: function()
	{
		return "FlyingPower";
	}

});