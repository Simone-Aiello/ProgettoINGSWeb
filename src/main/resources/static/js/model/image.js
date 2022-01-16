class Image{
	static #key = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

	// Private serializer 
	#serializer = {} ;
	
	#addProperty = (property,value) => {
		this.#serializer[property] = value ;
	} 

	toJSON() { return this.#serializer ; }

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
			checkType(id,"Number");
			this.#product.#addProperty("id",id);
		}
		withValue = function(value){
			if(value != null){
				checkType(value,"String");				
			}
			this.#product.#addProperty("value",value);
		}
		build = function() {
			if (this.built) throw new Error("This builder has already been used");
			this.built = true;
			return this.#product;
		}
	}
}