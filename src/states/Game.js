Game = ring.create([], {

	preload: function()
	{

	},

	create: function()
	{
		this.gamespeed = 3;
		this.itemsup = [];
		this.itemsdown = [];
		this.scup = new Scroll(Constants.ASSET_BACKGROUND_UP,0,this.gamespeed);
		this.scdown = new Scroll(Constants.ASSET_BACKGROUND_DOWN,Constants.DOWN_Y_OFFSET,this.gamespeed);
		this.heroup = new Hero(true, Constants.ASSET_HERO_UP, Constants.HERO_Y_OFFSET);
		this.herodown = new Hero(false, Constants.ASSET_HERO_DOWN, Constants.HERO_Y_OFFSET + Constants.DOWN_Y_OFFSET);

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
	
	updateItems: function(items)
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
					items[i][j].update(this.gamespeed);
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

	collisionItem: function(isup,items,rmv)
	{
		var colitem = items[rmv[0]][rmv[1]];
		var hero = (isup) ? this.herodown : this.heroup;
		var heromonster = (isup) ? this.heroup : this.herodown;
		if (colitem.type==Constants.ASSET_MONSTER_ICON)
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
		}
		if (colitem.type==Constants.ASSET_SHIELD_ICON)
		{
			hero.setShield(true);
			heromonster.moreKarma();
		}
		if (colitem.type==Constants.ASSET_BAD_KARMA_ICON)
		{
			hero.substractKarma();
		}
		if (colitem.type==Constants.ASSET_LIFE_ICON)
		{
			hero.moreLife();
			heromonster.moreKarma();
		}
		for (i=0;i<items[rmv[0]].length;i++)
		{
			items[rmv[0]][i].remove();
		}
		items.splice(rmv[0],1);
	},

	update: function()
	{
		if (this.itemManagerDown != null)
		{
			this.itemManagerDown.update();
		}
		if (this.itemManagerUp != null)
		{
			this.itemManagerUp.update();
		}

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
		this.updateItems(this.itemsup);
		this.updateItems(this.itemsdown);

		this.scup.update();
		this.scdown.update();
		var itemcollision = this.heroup.update(this.itemsup);
		if (itemcollision)
		{
			this.collisionItem(true,this.itemsup,itemcollision);
		}
		var itemcollision = this.herodown.update(this.itemsdown);
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