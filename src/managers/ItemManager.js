ItemManager = ring.create([], {

	itemsStack: null,
	itemTypes: null,
	lastTime: null,
	currentTime: null,
	nextItemTime: null,

	constructor: function()
	{
		this.itemTypes = new Array(Constants.ASSET_LIFE_ICON, Constants.ASSET_BAD_KARMA, Constants.ASSET_SHIELD, Constants.ASSET_MONSTER_ICON);

		this.itemsStack = new Array();
		this.nextItemTime = this.getRandomTime();
	},

	update: function()
	{
		this.currentTime = new Date().getTime() - this.lastTime;
		
		if(this.currentTime >= this.nextItemTime)
		{
			this.addItemToitemsStack();
			this.nextItemTime = this.getRandomTime();
		}
	},

	getRandomTime: function()
	{
		this.lastTime = new Date().getTime();

		var rndTime = Math.random() * (ItemManager.TIME_MAX - ItemManager.TIME_MIN) + ItemManager.TIME_MIN;

		return parseInt(rndTime);
	},

	addItemToitemsStack: function()
	{
		var cant = Math.random() * (ItemManager.MAX_ITEMS_AT_TIME - ItemManager.MIN_ITEMS_AT_TIME) + ItemManager.MIN_ITEMS_AT_TIME;
		
		var items = new Array();
		var rnd = null;
		var type = null;
		for(var i = 0; i < cant; i++)
		{
			rnd = parseInt(Math.random() * this.itemTypes.length);
			type = this.itemTypes[rnd];

			items.push(type);
		}

		this.itemsStack.push(items);
	},

	getNextItems: function()
	{
		if(this.itemsStack.length == 0)
		{
			return null;
		}

		var selItemTypes = this.itemsStack.shift();
		var positions = new Array(ItemManager.POSITION_TOP, ItemManager.POSITION_MIDDLE, ItemManager.POSITION_BOTTOM)
		var roundItems = new Array();
		var type = null;
		var item = null;
		for(var i = 0; i < selItemTypes.length; i++)
		{
			type = selItemTypes[i];
			switch(type)
			{
				case Constants.ASSET_LIFE_ICON:
					item = new LifeIcon();

					break;
				case Constants.ASSET_SHIELD:
					item = new ShieldIcon();

					break;
				case Constants.ASSET_BAD_KARMA:
					item = new BadKarmaIcon();

					break;
				case Constants.ASSET_MONSTER_ICON:
					item = new MonsterIcon();

					break;
				case Constants.ASSET_MONSTER:
					item = new Monster();

					break;
			}

			var rnd = parseInt(Math.random() * positions.length);
			var pos = positions.splice(rnd, 1)[0];
			item.setPosition(pos);

			roundItems.push(item);
		}
		
		return roundItems;
	},

	forceMonster: function()
	{
		this.itemsStack.unshift( [ Constants.ASSET_MONSTER ] );
		this.nextItemTime = this.getRandomTime();
	},

	toString: function()
	{
		return "ItemManager";
	}

});

ItemManager.POSITION_TOP = "top";
ItemManager.POSITION_MIDDLE = "middle";
ItemManager.POSITION_BOTTOM = "bottom";

ItemManager.TIME_MIN = Phaser.Timer.SECOND;
ItemManager.TIME_MAX = Phaser.Timer.SECOND * 5;

ItemManager.TIME_MIN_SPAWN = Phaser.SECOND;

ItemManager.MAX_ITEMS_AT_TIME = 3;
ItemManager.MIN_ITEMS_AT_TIME = 1;