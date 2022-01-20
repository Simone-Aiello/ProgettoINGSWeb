
class Address {
	static #key = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
	constructor(key) {
		if (key != Address.#key) {
			throw new Error("This constructor is private");
		}
	}

	// Private serializer 
	#serializer = {} ;
	
	#addProperty = (property,value) => {
		this.#serializer[property] = value ;
		this.#addGetter(property);
	} 
	#addGetter = (property) => {
		this[property] = () => {
			return JSON.parse(JSON.stringify(this.#serializer[property]));
		}
	}
	toJSON() { return this.#serializer ; }

	static Builder = class {
		#product = new Address(Address.#key);

		constructor() {
			this.built = null;
		}
		
		checkOnlyLetters = function (value) {
			var _regex = /^((\p{L}+\/)*(\p{L}+-)*(\p{L}+')*(\p{L}+\s)*)*\p{L}+$/uig;
			return _regex.test(value);
		}
		
		checkOnlyNumbers = (value) => {
			var _regex = /^[0-9]+$/;
			return _regex.test(value);
		}
		
		withVia = (via) => {
			checkType(via,"String");
			if (this.checkOnlyLetters(via)) {
				this.#product.#addProperty("via",via);
			}
			else throw new Error("Sono presenti caratteri non validi");
		}

		withZipCode = (zipCode) => {
			checkType(zipCode,"String");
			if (this.checkOnlyNumbers(zipCode)) {
				this.#product.#addProperty("zipCode",zipCode);
			}
			else throw new Error("Sono presenti caratteri non validi");
		}

		withHouseNumber = (houseNumber) => {
			checkType(houseNumber,"String");
			if (this.checkOnlyNumbers(houseNumber)) {
				this.#product.#addProperty("houseNumber",houseNumber);
			}
			else throw new Error("Sono presenti caratteri non validi");
		}

		withProvince = (province) => {
			checkType(province,"String");
			if (this.checkOnlyLetters(province)) {
				this.#product.#addProperty("province",province);
			}
			else throw new Error("Sono presenti caratteri non validi");
		}

		withTown = (town) => {
			checkType(town,"String");
			if (this.checkOnlyLetters(town)) {
				this.#product.#addProperty("town",town);
			}
			else throw new Error("Sono presenti caratteri non validi");
		}

		build = function() {
			if (this.built)
				throw new Error("This builder has already been used");
			this.built = true;
			return this.#product;
		}
	}

}