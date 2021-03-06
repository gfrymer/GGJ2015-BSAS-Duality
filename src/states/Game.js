Game = ring.create([], {

	isplayingmenu:false,
	
	preload: function()
	{

	},

	create: function()
	{
		this.btnMenu = null;

		this.gameover = null;
		this.finalscore = null;
    this.totalkarmaup = null;
    this.totallivesup = null;
    this.totalscoresup = null;
    this.totalkarmadown = null;
    this.totallivesdown = null;
    this.totalscoredown = null;

    this.totalkarmascore = null;
    this.totallivesupscore = null;
    this.totalscoresupscore = null;
    this.totalkarmadownscore = null;
    this.totallivesdownscore = null;
    this.totalscoredownscore = null;

    this.totalkarmascorecount = null;
    this.totallivesupscorecount = null;
    this.totalscoresupscorecount = null;
    this.totalkarmadownscorecount = null;
    this.totallivesdownscorecount = null;
    this.totalscoredownscorecount = null;
    
		this.gametime = 0;
		this.gamespeed = Constants.GAME_SPEED;
		this.itemsup = [];
		this.itemsdown = [];
		this.scup = new Scroll(Constants.ASSET_BACKGROUND_UP,0,this.gamespeed);
		this.scdown = new Scroll(Constants.ASSET_BACKGROUND_DOWN,Constants.DOWN_Y_OFFSET,this.gamespeed);

    this.scrollbar = objPhaser.add.sprite(Constants.STATE_SCREEN_WIDTH / 2, 0, Constants.ASSET_SCROLL_BAR);
    this.scrollbar.anchor.set(0.5,0);
		this.smallheroes = objPhaser.add.sprite(0, 0, Constants.ASSET_SMALL_HEROES);

		this.groupItems = objPhaser.add.group();
		this.groupHud = objPhaser.add.group();

		this.heroup = new Hero(true, Constants.ASSET_HERO_UP, Constants.HERO_Y_OFFSET, this.groupHud);
		this.herodown = new Hero(false, Constants.ASSET_HERO_DOWN, Constants.HERO_Y_OFFSET + Constants.DOWN_Y_OFFSET, this.groupHud);
		this.templeup = null,
		this.templedown = null,

		this.itemManagerUp = new ItemManager(this.groupItems);
		this.itemManagerDown = new ItemManager(this.groupItems);

		this.bgMusic = objPhaser.add.audio(Constants.ASSET_BG_MUSIC);
		this.bgMusic.play('', 0, 1, true);
		this.prevDoScroll = false;
	},

	updateScrollBar:function()
	{
		var tot = this.scrollbar.width - this.smallheroes.width * 2;
		if (this.gametime<Constants.GAME_TIME_TEMPLE)
		{
			this.smallheroes.x = (this.scrollbar.x - this.scrollbar.width / 2) + (this.gametime * tot / Constants.GAME_TIME_TEMPLE);
		}
		this.smallheroes.bringToTop();
		this.scrollbar.bringToTop();
	},
	
	positionItems:function(isup,items)
	{
		for(var i=0;i<items.length;i++)
		{
			items[i].sprite.x=Constants.STATE_SCREEN_WIDTH;
			if (items[i].position==ItemManager.POSITION_TOP)
			{
				items[i].sprite.y=Constants.ITEM_Y_UP;
			}
			else if (items[i].position==ItemManager.POSITION_MIDDLE)
			{
				items[i].sprite.y=(Constants.MINI_SCREEN_HEIGHT - items[i].sprite.height) / 2;
			}
			else
			{
				items[i].sprite.y=Constants.MINI_SCREEN_HEIGHT - items[i].sprite.height - Constants.ITEM_Y_UP;
			}
			if (!isup)
			{
				items[i].sprite.y += Constants.DOWN_Y_OFFSET;
			}
		}
	},
	
	updateItems: function(items,gamespeed)
	{
		var i=0;
		while (i<items.length)
		{
			var remove=false;
			for (j=0;j<items[i].length;j++)
			{
				if (items[i][j].sprite.x<-Constants.ITEM_WIDTH)
				{
					remove=true;
					items[i][j].remove();
				}
				else
				{
					items[i][j].update(gamespeed);
				}
			}
			if (remove)
			{
				items.splice(i,1);
				continue;
			}
			i++;
		}
	},

	fadeItemAndOut: function(item,andout)
	{
		var objTween = objPhaser.add.tween(item.sprite).to({alpha: 0},200,Phaser.Easing.Default,true);
		if (andout)
		{
			objPhaser.add.tween(item.sprite).to({x: 0},350,Phaser.Easing.Default,true);
		}
		objTween.onComplete.addOnce(this.removeItemNow, this);
	},
	
	animateItem: function(todown,item,quick)
	{
		var wheretoy = (todown) ? this.herodown.sprite.y : this.heroup.sprite.y;
		var wheretox = (todown) ? this.herodown.sprite.x : this.heroup.sprite.x;
		var dify = item.sprite.y - wheretoy;
		var difx = item.sprite.x - wheretox;
		item.sprite.todown = todown;
		item.sprite.item = item;
		var objTween = objPhaser.add.tween(item.sprite).to({y: ((dify > 0) ? '-' : '+') + Math.abs(dify),x: ((difx > 0) ? '-' : '+') + Math.abs(difx), alpha: 0.8},quick ? 100 : 500,Phaser.Easing.Circular.In,true);
		objTween.onComplete.addOnce(this.removeItem, this);
	},

	animateMonster: function(todown,item)
	{
		item.sprite.todown = todown;
		item.sprite.item = item;
		var objTween = objPhaser.add.tween(item.sprite).to({y: Constants.MINI_SCREEN_HEIGHT / 2 + (todown ? Constants.DOWN_Y_OFFSET : 0),x: Constants.STATE_SCREEN_WIDTH},750,Phaser.Easing.Default,true);
		objTween.onComplete.addOnce(this.removeItem, this);
	},

	removeItemNow: function(sprite)
	{
		this.groupItems.remove(sprite);
	},

	removeItem: function(sprite)
	{
		var redo=false;
		if (sprite.item.type!=Constants.ASSET_MONSTER_ICON)
		{
			if (sprite.todown)
			{
				if (Math.abs(sprite.y-this.herodown.sprite.y)>sprite.height)
				{
					redo=true;
				}
				if (Math.abs(sprite.x-this.herodown.sprite.x)>sprite.width)
				{
					redo=true;
				}
			}
			else
			{
				if (Math.abs(sprite.y-this.heroup.sprite.y)>sprite.height)
				{
					redo=true;
				}
				if (Math.abs(sprite.x-this.heroup.sprite.x)>sprite.width)
				{
					redo=true;
				}
			}
		}
		if (redo)
		{
			this.animateItem(sprite.todown,sprite.item,true);
		}
		else
		{
			this.doItemAction(sprite.todown,sprite.item.type);
			this.groupItems.remove(sprite);
		}
	},

	doItemAction: function(isup,type)
	{
		var hero = (isup) ? this.herodown : this.heroup;
		var heromonster = (isup) ? this.heroup : this.herodown;
		if (type==Constants.ASSET_LIFE_ICON)
		{
			hero.moreLife();
			hero.addLifeParticles();

			heromonster.moreKarma();
		}
		if (type==Constants.ASSET_MONSTER_ICON)
		{
			if (isup)
			{
				this.itemManagerDown.forceMonster();
			}
			else
			{
				this.itemManagerUp.forceMonster();
			}

			heromonster.substractKarma();
		}
		if (type==Constants.ASSET_SHIELD_ICON)
		{
			hero.setShield(true);
			hero.addShieldParticles();

			heromonster.moreKarma();
		}
		if (type==Constants.ASSET_BAD_KARMA_ICON)
		{
			hero.substractKarma();
			hero.addBadKarmaParticles();
		}
	},
	
	collisionItem: function(isup,items,rmv)
	{
		var colitem = items[rmv[0]][rmv[1]];
		var hero = (isup) ? this.herodown : this.heroup;
		var heromonster = (isup) ? this.heroup : this.herodown;
		if (colitem.type==Constants.ASSET_MONSTER_ICON)
		{
			this.animateMonster(isup,colitem);
			
			fx = objPhaser.add.audio(Constants.ASSET_FX_MONSTER);
			fx.play('', 0, 1, false);
		}
		if (colitem.type==Constants.ASSET_MONSTER)
		{
			if (heromonster.hasShield())
			{
				heromonster.useShield();
			}
			else
			{
				fx = objPhaser.add.audio(Constants.ASSET_FX_HIT);
				fx.play('', 0, 1, false);

				if (heromonster.loseLife())
				{
					this.gameover = objPhaser.add.sprite(Constants.STATE_SCREEN_WIDTH / 2, Constants.STATE_SCREEN_HEIGHT / 2, Constants.ASSET_GAME_OVER);
					this.gameover.scale = new PIXI.Point(0,0);
					this.gameover.anchor.setTo(0.5, 0.5);
					objPhaser.add.tween(this.gameover).to( { angle: 359 }, 250, Phaser.Easing.Linear.None, true, 0, 2);
	    		var objTween = objPhaser.add.tween(this.gameover.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Linear.None, true);
	    		objTween.onComplete.addOnce(this.finishGameOverAnimation, this);
				}
			}
			rmv[1] = -1;
		}
		if (colitem.type==Constants.ASSET_SHIELD_ICON)
		{
			this.animateItem(isup,colitem,false);

			fx = objPhaser.add.audio(Constants.ASSET_FX_SHIELD);
			fx.play('', 0, 1, false);
		}
		if (colitem.type==Constants.ASSET_BAD_KARMA_ICON)
		{
			this.animateItem(isup,colitem,false);

			fx = objPhaser.add.audio(Constants.ASSET_FX_KARMA);
			fx.play('', 0, 1, false);
		}
		if (colitem.type==Constants.ASSET_LIFE_ICON)
		{
			this.animateItem(isup,colitem,false);

			fx = objPhaser.add.audio(Constants.ASSET_FX_LIFE);
			fx.play('', 0, 1, false);
		}
		for (i=0;i<items[rmv[0]].length;i++)
		{
			if (i!=rmv[1])
			{
				this.fadeItemAndOut(items[rmv[0]][i],true);
			}
		}
		items.splice(rmv[0],1);
	},

	finishScoreAnimation: function(score)
	{
		var text = "0";
    var styleup = { font: "bold 30px Arial", fill: "#dd5e00", align: "right" };
    var styledown = { font: "bold 30px Arial", fill: "#0c5cf5", align: "right" };
    var styleupbig = { font: "bold 34px Arial", fill: "#dd5e00", align: "right" };
    var styledownbig = { font: "bold 34px Arial", fill: "#0c5cf5", align: "right" };
    this.totalkarmaup = objPhaser.add.text(objPhaser.world.centerX+200, 160, text, styleup);
    this.totallivesup = objPhaser.add.text(objPhaser.world.centerX+200, 210, text, styleup);
    this.totalscoresup = objPhaser.add.text(objPhaser.world.centerX+200, 270, text, styleupbig);
    this.totalkarmadown = objPhaser.add.text(objPhaser.world.centerX+200, 400, text, styledown);
    this.totallivesdown = objPhaser.add.text(objPhaser.world.centerX+200, 450, text, styledown);
    this.totalscoredown = objPhaser.add.text(objPhaser.world.centerX+200, 510, text, styledownbig);

    this.totalkarmascore = this.heroup.karma * Constants.POINTS_PER_KARMA;
    this.totallivesupscore = this.heroup.lives * Constants.POINTS_PER_LIFE;
    this.totalscoresupscore = this.totalkarmascore + this.totallivesupscore;
    this.totalkarmadownscore = this.herodown.karma * Constants.POINTS_PER_KARMA;
    this.totallivesdownscore = this.herodown.lives * Constants.POINTS_PER_LIFE;
    this.totalscoredownscore = this.totallivesdownscore + this.totalkarmadownscore;

    this.totalkarmascorecount = 0;
    this.totallivesupscorecount = 0;
    this.totalscoresupscorecount = 0;
    this.totalkarmadownscorecount = 0;
    this.totallivesdownscorecount = 0;
    this.totalscoredownscorecount = 0;

		this.fxScore = objPhaser.add.audio(Constants.ASSET_FX_SCORE);
		this.fxScore.play('', 0, 1, true);

	},

	finishGameOverAnimation: function(gameover)
	{
		this.btnMenu = objPhaser.add.button(objPhaser.world.centerX, objPhaser.world.centerY + this.gameover.height / 2 + 50, Constants.ASSET_BTN_MENU, this.onMenuClick, this);
		this.btnMenu.anchor.set(0.5);
	},

	update: function()
	{
		if (this.btnMenu)
		{
			return;
		}
		if (this.gameover)
		{
			return;
		}
		if (this.finalscore)
		{
			if (this.totalkarmascore)
			{
				var updated = false;
				if (this.totalkarmascorecount<this.totalkarmascore)
				{
					updated = true;
					this.totalkarmascorecount+=Constants.POINTS_SPEED;
					if (this.totalkarmascorecount>this.totalkarmascore)
					{
						this.totalkarmascorecount = this.totalkarmascore;
					}
				}
				if (this.totallivesupscorecount<this.totallivesupscore)
				{
					updated = true;
					this.totallivesupscorecount+=Constants.POINTS_SPEED;
					if (this.totallivesupscorecount>this.totallivesupscore)
					{
						this.totallivesupscorecount = this.totallivesupscore;
					}
				}
				if (this.totalscoresupscorecount<this.totalscoresupscore)
				{
					updated = true;
					this.totalscoresupscorecount+=Constants.POINTS_SPEED;
					if (this.totalscoresupscorecount>this.totalscoresupscore)
					{
						this.totalscoresupscorecount = this.totalscoresupscore;
					}
				}
				if (this.totalkarmadownscorecount<this.totalkarmadownscore)
				{
					updated = true;
					this.totalkarmadownscorecount+=Constants.POINTS_SPEED;
					if (this.totalkarmadownscorecount>this.totalkarmadownscore)
					{
						this.totalkarmadownscorecount = this.totalkarmadownscore;
					}
				}
				if (this.totallivesdownscorecount<this.totallivesdownscore)
				{
					updated = true;
					this.totallivesdownscorecount+=Constants.POINTS_SPEED;
					if (this.totallivesdownscorecount>this.totallivesdownscore)
					{
						this.totallivesdownscorecount = this.totallivesdownscore;
					}
				}
				if (this.totalscoredownscorecount<this.totalscoredownscore)
				{
					updated = true;
					this.totalscoredownscorecount+=Constants.POINTS_SPEED;
					if (this.totalscoredownscorecount>this.totalscoredownscore)
					{
						this.totalscoredownscorecount = this.totalscoredownscore;
					}
				}
		    this.totalkarmaup.text = this.totalkarmascorecount;
		    this.totallivesup.text =  this.totallivesupscorecount;
		    this.totalscoresup.text = this.totalscoresupscorecount;
		    this.totalkarmadown.text = this.totalkarmadownscorecount;
		    this.totallivesdown.text = this.totallivesdownscorecount;
		    this.totalscoredown.text = this.totalscoredownscorecount;
		    if (!updated)
		    {
		    	this.fxScore.stop();
		    	var stylebig = null;
		    	var posy = 0;
		    	if (this.totalscoredownscorecount>this.totalscoresupscorecount)
		    	{
	    			stylebig = { font: "bold 34px Arial", fill: "#dd5e00", align: "left" };
	    			posy = 540;
		    	}
		    	else
	    		{
				    stylebig = { font: "bold 34px Arial", fill: "#0c5cf5", align: "left" };
				    posy = 300;
	    		}
			    this.winner = objPhaser.add.text(objPhaser.world.centerX-330, posy, "WINNER!", stylebig);
			    objPhaser.add.tween(this.winner).to( { alpha: 0}, 250, Phaser.Easing.Linear.None, true, 0, 3, true);
					this.btnMenu = objPhaser.add.button(objPhaser.world.centerX, objPhaser.world.centerY + this.finalscore.height / 2 + 50, Constants.ASSET_BTN_MENU, this.onMenuClick, this);
					this.btnMenu.anchor.set(0.5);
		    }
		  }
			return;
		}
		this.gametime++;
		this.updateScrollBar();
		if (this.itemManagerDown != null)
		{
			this.itemManagerDown.update();
		}
		if (this.itemManagerUp != null)
		{
			this.itemManagerUp.update();
		}

		if (this.gametime==Constants.GAME_TIME_TEMPLE + 200)
		{
			this.templeup.openDoors();
			this.templedown.openDoors();
		}
		if (this.gametime==Constants.GAME_TIME_TEMPLE)
		{
			this.templeup = new Temple();
			this.templeup.sprite.x = Constants.STATE_SCREEN_WIDTH;
			this.templeup.sprite.y = Constants.MINI_SCREEN_HEIGHT - this.templeup.sprite.height + 30;
			this.templedown = new Temple();
			this.templedown.sprite.x = Constants.STATE_SCREEN_WIDTH;
			this.templedown.sprite.y = Constants.MINI_SCREEN_HEIGHT - this.templeup.sprite.height + Constants.DOWN_Y_OFFSET + 30;
			this.heroup.sprite.bringToTop();
			this.herodown.sprite.bringToTop();
		}
		var doscroll = true;
		if (this.templeup)
		{
			if (this.templeup.sprite.x < Constants.STATE_SCREEN_WIDTH - (this.templeup.sprite.width * 1.5))
			{
				doscroll = false;
			}
			this.templeup.update((doscroll) ? this.gamespeed : 0);
			this.templedown.update((doscroll) ? this.gamespeed : 0);
			if (this.heroup.sprite.x>this.templeup.sprite.x + this.templeup.sprite.width / 3)
			{
				this.finalscore = objPhaser.add.sprite(Constants.STATE_SCREEN_WIDTH / 2, Constants.STATE_SCREEN_HEIGHT / 2, Constants.ASSET_FINAL_SCORE);
				this.finalscore.scale = new PIXI.Point(0,0);
				this.finalscore.anchor.setTo(0.5, 0.5);
				objPhaser.add.tween(this.finalscore).to( { angle: 359 }, 250, Phaser.Easing.Linear.None, true, 0, 2);
    		var objTween = objPhaser.add.tween(this.finalscore.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Linear.None, true);
    		objTween.onComplete.addOnce(this.finishScoreAnimation, this);
			}
		}
		if (doscroll)
		{
			var items = this.itemManagerUp.getNextItems();
			if (items)
			{
				this.positionItems(true,items);
				this.itemsup.push(items);
			}
			items = this.itemManagerDown.getNextItems();
			if (items)
			{
				this.positionItems(false,items);
				this.itemsdown.push(items);
			}
			this.scup.update();
			this.scdown.update();
			this.prevDoScroll = true;
		}
		else
		{
			if (this.prevDoScroll)
			{
				this.prevDoScroll = false;
				for (i=0;i<this.itemsup.length;i++)
				{
					for (j=0;j<this.itemsup[i].length;j++)
					{
						this.fadeItemAndOut(this.itemsup[i][j],false);
					}
				}
				for (i=0;i<this.itemsdown.length;i++)
				{
					for (j=0;j<this.itemsdown[i].length;j++)
					{
						this.fadeItemAndOut(this.itemsdown[i][j],false);
					}
				}
			}
		}
		this.updateItems(this.itemsup,(doscroll) ? this.gamespeed : 0);
		this.updateItems(this.itemsdown,(doscroll) ? this.gamespeed : 0);

		var itemcollision = this.heroup.update(this.itemsup,(doscroll) ? 0 : this.gamespeed);
		if (itemcollision)
		{
			if (doscroll)
			{
				this.collisionItem(true,this.itemsup,itemcollision);
			}
		}
		var itemcollision = this.herodown.update(this.itemsdown,(doscroll) ? 0 : this.gamespeed);
		if (itemcollision)
		{
			if (doscroll)
			{
				this.collisionItem(false,this.itemsdown,itemcollision);
			}
		}
	},

	onMenuClick: function()
	{
		this.bgMusic.stop();
		objPhaser.state.start(Constants.STATE_MENU);
	},

	toString: function()
	{
		return "Game";
	}

});