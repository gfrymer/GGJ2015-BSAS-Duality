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
		this.lives = Constants.TOTAL_LIVES;
		this.shield = false;
		this.shieldtime = 0;
		this.karma = Constants.HERO_KARMA;
		
		this.lifewidth = PIXI.TextureCache[Constants.ASSET_LIFE].width;
		this.lifeheight = PIXI.TextureCache[Constants.ASSET_LIFE].height;
		this.life = [];
		for (i=0;i<this.lives;i++)
		{
			this.life[i] = objPhaser.add.sprite(((i+1) * (this.lifewidth * 1.3)) + this.flyingpower.getWidth() + Constants.FLYING_X_OFFSET,Constants.FLYING_Y_OFFSET + ((isup) ? 0 : Constants.DOWN_Y_OFFSET),Constants.ASSET_LIFE);
		}
	},

	hasShield: function()
	{
		return this.shield;
	},
	
	useShield: function()
	{
		this.setShield(false);
	},

	setShield: function(hasit)
	{
		if (hasit)
		{
			if (!this.shield)
			{
				this.sprite.alpha = 0.5;
			}
			this.shieldtime = Constants.HERO_SHIELD_TIME;
		}
		else
		{
			if (this.shield)
			{
				this.sprite.alpha = 1;				
			}
		}
		this.shield = hasit;
	},

	loseLife: function()
	{
		if (this.lives>1)
		{
			this.lives--;
			objPhaser.world.remove(this.life[this.lives]);
			this.life.splice(this.lives,1);
		}
		else
		{
			return true;
		}
		return false;
	},
	
	moreLife: function()
	{
		this.lives++;
		this.life.push(objPhaser.add.sprite(((this.lives) * (this.lifewidth * 1.3)) + this.flyingpower.getWidth() + Constants.FLYING_X_OFFSET,Constants.FLYING_Y_OFFSET + ((this.isup) ? 0 : Constants.DOWN_Y_OFFSET),Constants.ASSET_LIFE));
	},
	
	substractKarma: function()
	{
		this.karma--;
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
		if (this.shield)
		{
			if (this.shieldtime>0)
			{
				this.shieldtime--;
			}
			else
			{
				this.useShield();
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
							(items[i][j].sprite.x+items[i][j].sprite.width>=this.sprite.x)) &&
							((items[i][j].sprite.y<=this.sprite.y+this.height) &&
							(items[i][j].sprite.y+items[i][j].sprite.height>=this.sprite.y)))
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