class Account {

	static #key = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

	// Private serializer 
	#serializer = {} ;
	
	#addProperty = (property,value) => {
		this.#serializer[property] = value ;
		this.#addGetter(property);
	} 

	#addGetter = (property) =>{
		this[property] = () =>{
			return JSON.parse(JSON.stringify(this.#serializer[property]));
		}
	}

	toJSON() { return this.#serializer ; }

	constructor(key) {
		if (key != Account.#key)
			throw new Error("This constructor is private");
	}

	static Builder = class {

		#product = new Account(Account.#key);

		constructor() {
			this.built = false;
			this.areasList = [];
		}

		withUsername = function(username) {
			checkType(username, "String");
			var _regex = /^[\w-]+$/g;
			if (_regex.test(username)) {
				this.#product.#addProperty("username", username);
			}
			else throw new Error("L'username inserito non è valido");
		}

		withPassword = function(password) {
			checkType(password, "String");
			var _regex = /^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,16}$/;
			if (_regex.test(password)) {
				this.#product.#addProperty("password", password);
			}
			else
				throw new Error("La password non rispetta i requisti di sicurezza");
		}

		withEmail = function(email) {
			checkType(email, "String");
			var _regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
			if (_regex.test(email))
				this.#product.#addProperty("email", email);
			else throw new Error("L' email inserita non è valida");
		}

		withNumber = function(number) {
			checkType(number, "Number");
			var _regex = /^([0-9]{10}|0[0-9]{8})$/
			if (_regex.test(number) || number == "")
				this.#product.#addProperty("number", number);
			else
				throw new Error("Il numero inserito non è valido");
		}

		withProvinceOfWork = function(provinceOfWork) {
			checkType(provinceOfWork, "String");
			this.#product.#addProperty("provinceOfWork", provinceOfWork);
			return this;
		}

		withAccountType = function(accountType) {
			checkType(accountType, "String");
			var _regex = /^[awu]$/;
			if (_regex.test(accountType))
				this.#product.#addProperty("accountType", accountType);
			else throw new Error("The account type is not valid");
		}

		withUser = function(user) {
			checkType(user, "User");
			this.#product.#addProperty("personalInfo", user);
			return this;
		}
		withProfilePic = function(profilePic) {
			//CHE CHECK TYPE VA MESSO QUA? STRING FALLISCE
			this.#product.#addProperty("profilePic", profilePic);
		}
		withArea = function(area) {
			checkType(area, "Area");
			this.areasList.push(area);
		}
		removeArea = function(area) {
			checkType(area, "Number");
			this.areasList = this.areasList.filter((elem) => {
				console.log(elem);
				return elem["id"] != area;
			});
		}
		build = function() {
			if (this.built) throw new Error("This builder has already been used");
			this.built = true;
			this.#product.#addProperty("areasOfWord", this.areasList);
			return this.#product;
		}
	}
}
