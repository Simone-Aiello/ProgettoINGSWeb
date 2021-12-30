
export class Address {
	static #key = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
	constructor(key) {
		if (key != Address.#key) {
			throw new Error("This constructor is private");
		}
	}

	static Builder = class {
		#product = new Address(Address.#key);

		constructor() {
			this.built = null;
		}
		
		checkOnlyLetters = function (value) {
			var _regex = /^((\p{L}+-)*(\p{L}+')*(\p{L}+\s)*)*\p{L}+$/uig;
			return _regex.test(value);
		}
		
		checkOnlyNumbers = (value) => {
			var _regex = /^[0-9]+$/;
			return _regex.test(value);
		}
		
		withVia = (via) => {
			if (this.checkOnlyLetters(via)) {
				this.#product.via = via;
			}
			else throw new Error("Sono presenti caratteri non validi");
		}

		withZipCode = (zipCode) => {
			if (this.checkOnlyNumbers(zipCode)) {
				this.#product.zipCode = zipCode;
			}
			else throw new Error("Sono presenti caratteri non validi");
		}

		withHouseNumber = (houseNumber) => {
			if (this.checkOnlyNumbers(houseNumber)) {
				this.#product.houseNumber = houseNumber;
			}
			else throw new Error("Sono presenti caratteri non validi");
		}

		withProvince = (province) => {
			if (this.checkOnlyLetters(province)) {
				this.#product.province = province;
			}
			else throw new Error("Sono presenti caratteri non validi");
		}

		withTown = (town) => {
			if (this.checkOnlyLetters(town)) {
				this.#product.town = town;
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