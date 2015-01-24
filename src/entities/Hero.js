Hero = ring.create([AbstractEntity], {

	constructor: function(isup,heroImage,ypos)
	{
		if (isup)
		{
			this.upKey = objPhaser.input.keyboard.addKey(Phaser.Keyboard.UP);
			this.flyingpower = new FlyingPower(Constants.ASSET_FLYING_POWER,Constants.ASSET_FLYING_POWER_DYNAMIC,Constants.FLYING_Y_OFFSET,Constants.HERO_FLYING_POWER);
		}
		else
		{
		  this.upKey = objPhaser.input.keyboard.addKey(Phaser.Keyboard.W);
			this.flyingpower = new FlyingPower(Constants.ASSET_FLYING_POWER,Constants.ASSET_FLYING_POWER_DYNAMIC,Constants.FLYING_Y_OFFSET + Constants.DOWN_Y_OFFSET,Constants.HERO_FLYING_POWER);
		}
		this.isup=isup;
		this.sprite = objPhaser.add.sprite(Constants.HERO_X_OFFSET,ypos,heroImage);
		this.width = PIXI.TextureCache[heroImage].width * Constants.HERO_SCALE;
		this.height = PIXI.TextureCache[heroImage].height * Constants.HERO_SCALE;
		this.sprite.scale.setTo(Constants.HERO_SCALE, Constants.HERO_SCALE);
		this.anim = Math.floor(Math.random() * Constants.HERO_LEVITATE_SPEED);
		this.sinchange = 0;
		this.ofsy = 0;
		this.lives = 3;
		
		var lifewidth = PIXI.TextureCache[Constants.ASSET_LIFE].width;
		var lifeheight = PIXI.TextureCache[Constants.ASSET_LIFE].height;
		this.life = [];
		for (i=0;i<this.lives;i++)
		{
			this.life[i] = objPhaser.add.sprite(((i+1) * (lifewidth * 1.3)) + this.flyingpower.getWidth() + Constants.FLYING_X_OFFSET,Constants.FLYING_Y_OFFSET + ((isup) ? 0 : Constants.DOWN_Y_OFFSET),Constants.ASSET_LIFE);
		}
	},

	update: function(items)
	{
		this.flyingpower.update();
		if (this.upKey.isDown)
		{
			if (this.ofsy<Constants.HERO_TOP_JUMP)
			{
				if (this.flyingpower.decrement())
				{
					if (this.ofsy<Constants.HERO_TOP_JUMP-Constants.HERO_JUMP_SPEED)
					{
						this.ofsy+=Constants.HERO_JUMP_SPEED;
						this.sprite.y-=Constants.HERO_JUMP_SPEED;
					}
					else
					{
						var dif = Constants.HERO_TOP_JUMP - this.ofsy;
						this.ofsy+=dif;
						this.sprite.y-=dif;
					}
				}
			}
		}
		if (this.ofsy>0)
		{
				this.ofsy--;
				this.sprite.y++;
		}
		this.anim++;
		if (this.anim % Constants.HERO_LEVITATE_SPEED == 0)
		{
			this.sinchange++;
			this.sprite.y += Math.round(Math.sin(this.sinchange) * Constants.HERO_LEVITATE_ACCELERATION);
		}
/*		if (!this.isup)
		{
			return;
		}*/
		var check = items.length>0;
		var i=0;
		while (check)
		{
			if (items[i][0].sprite.x>this.sprite.x+this.width)
			{
				check=false;
			}
			if (check)
			{
				for (j=0;j<items[i].length;j++)
				{
					if (((items[i][j].sprite.x<=this.sprite.x+this.width) &&
							(items[i][j].sprite.x+Constants.ITEM_WIDTH>=this.sprite.x)) &&
							((items[i][j].sprite.y<=this.sprite.y+this.height) &&
							(items[i][j].sprite.y+Constants.ITEM_WIDTH>=this.sprite.y)))
					{
						return [i,j];
					}
				}
				i++;
				check=i<items.length;
			}
		}
		return null;
	},

	toString: function()
	{
		return "Hero";
	}

});