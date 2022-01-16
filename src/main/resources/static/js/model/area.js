function checkType(value, type){
	if(value.constructor.name  != type){
		throw new Error("The value: "+value+" is not of type "+type);
	}
}

class Area{
	static #key = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
	#serializer = {};
	
	#addProperty = (property, value)=>{
		this.#serializer[property] = value;
		this.#addGetter(property);
	}
	#addGetter = (property) => {
		this[property] = () => {
			return JSON.parse(JSON.stringify(this.#serializer[property]));
		}
	}
	toJSON(){
		return this.#serializer;
	}
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
			checkType(id, "Number");
			this.#product.#addProperty("id", id);
		}
		
		withName = function(name){
			checkType(name, "String");
			this.#product.#addProperty("name", name);
		}
		withIcon = function(icon){
			checkType(icon, "String");
			this.#product.#addProperty("icon", icon);
		}
		build = function() {
			if (this.built) throw new Error("This builder has already been used");
			this.built = true;
			return this.#product;
		}
	}
}