Hero = ring.create([AbstractEntity], {

	constructor: function(isup, heroImage, ypos, hudContainer)
	{
		this.hudContainer = hudContainer;

		if (isup)
		{
			this.upKey = objPhaser.input.keyboard.addKey(Phaser.Keyboard.UP);
			this.flyingpower = new FlyingPower(Constants.HUD_Y_OFFSET,Constants.HERO_FLYING_POWER, this.hudContainer);
		}
		else
		{
		  this.upKey = objPhaser.input.keyboard.addKey(Phaser.Keyboard.W);
			this.flyingpower = new FlyingPower(Constants.HUD_Y_OFFSET + Constants.DOWN_Y_OFFSET, Constants.HERO_FLYING_POWER, this.hudContainer);
		}

		this.isup=isup;
		this.sprite = objPhaser.add.sprite(Constants.HERO_X_OFFSET, ypos, heroImage);
		this.width = PIXI.TextureCache[heroImage].width * Constants.HERO_SCALE - Constants.HERO_RECTANGLE_COLLISION_SHRINK;
		this.height = PIXI.TextureCache[heroImage].height * Constants.HERO_SCALE - Constants.HERO_RECTANGLE_COLLISION_SHRINK;
		this.sprite.scale.setTo(Constants.HERO_SCALE, Constants.HERO_SCALE);
		this.anim = Math.floor(Math.random() * Constants.HERO_LEVITATE_SPEED);
		this.sinchange = 0;
		this.ofsy = 0;
		this.shield = false;
		this.shieldtime = 0;
		
		this.lives = Constants.TOTAL_LIVES;
		this.karma = Constants.TOTAL_KARMA / 2;

		this.flyingpower.updateKarma(this.karma);

		this.lifewidth = PIXI.TextureCache[Constants.ASSET_LIFE].width;
		this.lifeheight = PIXI.TextureCache[Constants.ASSET_LIFE].height;
		this.life = [];
		for (i=0;i<this.lives;i++)
		{
			this.life[i] = objPhaser.add.sprite(((i+1) * (this.lifewidth * 1.1)),Constants.HUD_Y_OFFSET + ((isup) ? 0 : Constants.DOWN_Y_OFFSET),Constants.ASSET_LIFE);
		}

		if(this.isup)
		{
			var particlesX = this.sprite.x + this.sprite.width / 2;
			var particlesY = this.sprite.y + this.sprite.height;
			var particlesWidth = this.sprite.width / 2;
			var particlesGravity = -200;
		}
		else
		{
			var particlesX = this.sprite.x + this.sprite.width / 2;
			var particlesY = this.sprite.y;
			var particlesWidth = this.sprite.width / 2;
			var particlesGravity = 200;
		}

		this.emitterLife = objPhaser.add.emitter(particlesX, particlesY, particlesWidth);
		this.emitterLife.makeParticles(Constants.ASSET_LIFE_PARTICLE);
		this.emitterLife.gravity = particlesGravity;
		this.emitterLife.setAlpha(0.3, 0.5);

		this.emitterShield = objPhaser.add.emitter(particlesX, particlesY, particlesWidth);
		this.emitterShield.makeParticles(Constants.ASSET_SHIELD_PARTICLE);
		this.emitterShield.gravity = particlesGravity;
		this.emitterShield.setAlpha(0.3, 0.5);

		this.emitterBadKarma = objPhaser.add.emitter(particlesX, particlesY, particlesWidth);
		this.emitterBadKarma.makeParticles(Constants.ASSET_KARMA_PARTICLE);
		this.emitterBadKarma.gravity = particlesGravity;
		this.emitterBadKarma.setAlpha(0.1, 0.5);

		this.boosterFx = objPhaser.add.sprite(0, 0, Constants.ASSET_BOOSTER_FX);
		this.boosterFx.anchor.set(0.25);
		this.boosterFx.animations.add("fx");
		//this.boosterFx.animations.play("fx", 30, true);
		this.sprite.addChild(this.boosterFx);
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
			this.lives--;
			objPhaser.world.remove(this.life[this.lives]);
			this.life.splice(this.lives,1);
			return true;
		}
		return false;
	},
	
	moreLife: function()
	{
		if(this.lives == Constants.TOTAL_LIVES)
		{
			return;
		}

		this.lives++;
		this.life.push(objPhaser.add.sprite(((this.lives) * (this.lifewidth * 1.1)),Constants.HUD_Y_OFFSET + ((this.isup) ? 0 : Constants.DOWN_Y_OFFSET),Constants.ASSET_LIFE));
	},
	
	substractKarma: function()
	{
		this.karma -= 2;
		if(this.karma <= 0)
		{
			this.karma = 0.01;
		}

		this.flyingpower.updateKarma(this.karma);
	},
	
	moreKarma: function()
	{
		this.karma += 1.5;
		if(this.karma > Constants.TOTAL_KARMA)
		{
			this.karma = Constants.TOTAL_KARMA;
		}

		this.flyingpower.updateKarma(this.karma);
	},
	
	addLifeParticles: function()
	{
		this.boosterFx.animations.play("fx", 30, false);

		if(this.isup){ var particlesY = this.sprite.y + this.sprite.height; }
		else{ var particlesY = this.sprite.y; }

		this.emitterLife.y = particlesY;
		//this.emitterLife.explode(2000, 500);
	},

	addShieldParticles: function()
	{
		this.boosterFx.animations.play("fx", 30, false);

		if(this.isup){ var particlesY = this.sprite.y + this.sprite.height; }
		else{ var particlesY = this.sprite.y; }
		
		this.emitterShield.y = particlesY;
		//this.emitterShield.explode(2000, 500);
	},

	addBadKarmaParticles: function()
	{
		this.boosterFx.animations.play("fx", 30, false);

		if(this.isup){ var particlesY = this.sprite.y + this.sprite.height; }
		else{ var particlesY = this.sprite.y; }
		
		this.emitterBadKarma.y = particlesY;
		//this.emitterBadKarma.explode(2000, 500);
	},

	update: function(items,gamespeed)
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

		var speeddown = 1;
		if ((!this.upKey.isDown) || (!this.flyingpower.hasFlyingPower()))
		{
				speeddown = 2;
		}

		for (i=0;i<speeddown;i++)
		{
			if (this.ofsy>0)
			{
				this.ofsy--;
				this.sprite.y++;
			}
		}
		
		this.anim++;
		if (this.anim % Constants.HERO_LEVITATE_SPEED == 0)
		{
			this.sinchange++;
			this.sprite.y += Math.round(Math.sin(this.sinchange) * Constants.HERO_LEVITATE_ACCELERATION);
		}
		this.sprite.x += gamespeed;
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
							(items[i][j].sprite.x+items[i][j].sprite.width>=this.sprite.x+Constants.HERO_RECTANGLE_COLLISION_SHRINK)) &&
							((items[i][j].sprite.y<=this.sprite.y+this.height) &&
							(items[i][j].sprite.y+items[i][j].sprite.height>=this.sprite.y+Constants.HERO_RECTANGLE_COLLISION_SHRINK)))
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