Game = ring.create([], {

	preload: function()
	{

	},

	create: function()
	{
		this.gametime = 0;
		this.gamespeed = Constants.GAME_SPEED;
		this.itemsup = [];
		this.itemsdown = [];
		this.scup = new Scroll(Constants.ASSET_BACKGROUND_UP,0,this.gamespeed);
		this.scdown = new Scroll(Constants.ASSET_BACKGROUND_DOWN,Constants.DOWN_Y_OFFSET,this.gamespeed);
		this.heroup = new Hero(true, Constants.ASSET_HERO_UP, Constants.HERO_Y_OFFSET);
		this.herodown = new Hero(false, Constants.ASSET_HERO_DOWN, Constants.HERO_Y_OFFSET + Constants.DOWN_Y_OFFSET);
		this.templeup = null,
		this.templedown = null,

		this.itemManagerUp = new ItemManager();
		this.itemManagerDown = new ItemManager();
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

	fadeItem: function(item)
	{
		var objTween = objPhaser.add.tween(item.sprite).to({alpha: 0},200,Phaser.Easing.Default,true);
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
		var objTween = objPhaser.add.tween(item.sprite).to({y: ((dify > 0) ? '-' : '+') + Math.abs(dify),x: ((difx > 0) ? '-' : '+') + Math.abs(difx)},quick ? 100 : 1000,Phaser.Easing.Circular.In,true);
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
		objPhaser.world.remove(sprite);
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
			objPhaser.world.remove(sprite);
		}
	},

	doItemAction: function(isup,type)
	{
		var hero = (isup) ? this.herodown : this.heroup;
		var heromonster = (isup) ? this.heroup : this.herodown;
		if (type==Constants.ASSET_LIFE_ICON)
		{
			hero.moreLife();
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
		}
		if (type==Constants.ASSET_SHIELD_ICON)
		{
			hero.setShield(true);
		}
		if (type==Constants.ASSET_BAD_KARMA_ICON)
		{
			hero.substractKarma();
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
		}
		if (colitem.type==Constants.ASSET_MONSTER)
		{
			if (heromonster.hasShield())
			{
				heromonster.useShield();
			}
			else
			{
				if (heromonster.loseLife())
				{
					objPhaser.state.start(Constants.STATE_GAME_OVER);
				}
			}
			rmv[1] = -1;
		}
		if (colitem.type==Constants.ASSET_SHIELD_ICON)
		{
			this.animateItem(isup,colitem,false);
		}
		if (colitem.type==Constants.ASSET_BAD_KARMA_ICON)
		{
			this.animateItem(isup,colitem,false);
		}
		if (colitem.type==Constants.ASSET_LIFE_ICON)
		{
			this.animateItem(isup,colitem,false);
		}
		for (i=0;i<items[rmv[0]].length;i++)
		{
			if (i!=rmv[1])
			{
				this.fadeItem(items[rmv[0]][i]);
			}
		}
		items.splice(rmv[0],1);
	},

	update: function()
	{
		this.gametime++;
		if (this.itemManagerDown != null)
		{
			this.itemManagerDown.update();
		}
		if (this.itemManagerUp != null)
		{
			this.itemManagerUp.update();
		}

		if (this.gametime==Constants.GAME_TIME_TEMPLE)
		{
			this.templeup = new Temple();
			this.templeup.sprite.x = Constants.STATE_SCREEN_WIDTH;
			this.templeup.sprite.y = Constants.MINI_SCREEN_HEIGHT - this.templeup.sprite.height;
			this.templedown = new Temple();
			this.templedown.sprite.x = Constants.STATE_SCREEN_WIDTH;
			this.templedown.sprite.y = Constants.MINI_SCREEN_HEIGHT - this.templeup.sprite.height + Constants.DOWN_Y_OFFSET;
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
				//GANASTE
				objPhaser.state.start(Constants.STATE_MENU);
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
		}
		this.updateItems(this.itemsup,(doscroll) ? this.gamespeed : 0);
		this.updateItems(this.itemsdown,(doscroll) ? this.gamespeed : 0);

		var itemcollision = this.heroup.update(this.itemsup,(doscroll) ? 0 : this.gamespeed);
		if (itemcollision)
		{
			this.collisionItem(true,this.itemsup,itemcollision);
		}
		var itemcollision = this.herodown.update(this.itemsdown,(doscroll) ? 0 : this.gamespeed);
		if (itemcollision)
		{
			this.collisionItem(false,this.itemsdown,itemcollision);
		}
	},

	toString: function()
	{
		return "Game";
	}

});