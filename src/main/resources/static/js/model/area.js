class Area{
	static #key = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

	constructor(key) {
		if (key != Area.#key)
			throw new Error("This constructor is private");
	}
	static Builder = class {
		#product = new Area(Area.#key);
		
		constructor() {
			this.built = false;
		}
		
		withId = function (id){
			this.#product.id = id;
		}
		
		withName = function(name){
			this.#product.name = name;
		}
		withIcon = function(icon){
			this.#product.icon = icon;
		}
		build = function() {
			if (this.built) throw new Error("This builder has already been used");
			this.built = true;
			return this.#product;
		}
	}
}