class Image{
	static #key = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

	constructor(key) {
		if (key != Image.#key)
			throw new Error("This constructor is private");
	}
	static Builder = class {
		#product = new Image(Image.#key);
		
		constructor() {
			this.built = false;
		}
		
		withId = function (id){
			this.#product.id = id;
		}
		withValue = function(value){
			this.#product.value = value;
		}
		build = function() {
			if (this.built) throw new Error("This builder has already been used");
			this.built = true;
			return this.#product;
		}
	}
}