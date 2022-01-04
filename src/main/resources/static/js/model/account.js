export class Account {

	static #key = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

	constructor(key) {
		if (key != Account.#key)
			throw new Error("This constructor is private");
	}

	static Builder = class {

		#product = new Account(Account.#key);

		constructor() {
			this.built = false;
		}

		withUsername = function(username) {
			var _regex = /^[\w-]+$/g;
			if (_regex.test(username)) {
				this.#product.username = username;
			}
			else throw new Error("L'username inserito non è valido");
		}

		withPassword = function(password) {
			var _regex = /^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,16}$/;
			if (_regex.test(password)) {
				this.#product.password = password;
			}
			else
				throw new Error("La password non rispetta i requisti di sicurezza");
		}

		withEmail = function(email) {
			var _regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
			if (_regex.test(email))
				this.#product.email = email;
			else throw new Error("L' email inserita non è valida");
		}

		withNumber = function(number) {
			var _regex = /^([0-9]{10}|0[0-9]{8})$/
			if (_regex.test(number))
				this.#product.number = number;
			else
				throw new Error("Il numero inserito non è valido");
		}

		withProvinceOfWork = function(provinceOfWork) {

			this.#product.provinceOfWork = provinceOfWork;
			return this;
		}

		withAccountType = function(accountType) {
			var _regex = /^[awu]$/;
			if  (_regex.test(accountType))
				this.#product.accountType = accountType;
			else throw new Error("The account type is not valid");
		}

		withUser = function(user) {
			this.#product.user = user;
			return this;
		}


		build = function() {
			if (this.built) throw new Error("This builder has already been used");
			this.built = true;
			return this.#product;

		}

	}

}
