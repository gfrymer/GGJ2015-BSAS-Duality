ItemManager = ring.create([], {

	stack: null,
	nextItemTime: null,

	constuctor: function()
	{
		this.itemTypes = new Array(ItemManager.TYPE_LIFE, ItemManager.TYPE_KARMA, ItemManager.TYPE_SHIELD, ItemManager.TYPE_MONSTER_ICON);

		this.stack = new Array();
		this.nextItemTime = this.getRandomTime();
	},

	update: function()
	{
		this.nextItemTime--;
		if(this.nextItemTime == 0)
		{
			this.addItemToStack();
			this.nextItemTime = this.getRandomTime();
		}
	},

	getRandomTime: function()
	{
		var rndTime = Math.random() * (ItemManager.TIME_MAX - ItemManager.TIME_MIN) + ItemManager.TIME_MIN;

		return rndTime;
	},

	addItemToStack: function()
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

		this.stack.push(items);
	},

	getNextItems: function()
	{
		if(this.stack.length == 0)
		{
			return null;
		}

		var items = this.stack.shift();
		return items;
	},

	forceMonster: function()
	{
		this.stack.push(ItemManager.TYPE_MONSTER);
	},

	toString: function()
	{
		return "ItemManager";
	}

});

ItemManager.TYPE_LIFE = "life";
ItemManager.TYPE_BAD_KARMA = "bad_karma";
ItemManager.TYPE_SHIELD = "shield";
ItemManager.TYPE_MONSTER = "monster";
ItemManager.TYPE_MONSTER_ICON = "monster_icon";

ItemManager.POSITION_TOP = "top";
ItemManager.POSITION_BOTTOM = "bottom";

ItemManager.TIME_MIN = Phaser.SECOND * 1;
ItemManager.TIME_MAX = Phaser.SECOND * 5;

ItemManager.TIME_MIN_SPAWN = Phaser.SECOND;

ItemManager.MAX_ITEMS_AT_TIME = 2;
ItemManager.MIN_ITEMS_AT_TIME = 1;