AbstractIcon = ring.create([AbstractEntity], {

	type: null,
	position:null,

	constructor: function()
	{
		
	},

	setPosition: function(pos)
	{
		this.position = pos;
	},

	toString: function()
	{
		return "AbstractIcon";
	}

});