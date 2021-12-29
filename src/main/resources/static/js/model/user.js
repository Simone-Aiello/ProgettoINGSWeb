
function getAge(match) {
	let day_user = parseInt(match[1]);
	let month_user = parseInt(match[2]);
	let year_user = parseInt(match[3]);

	let today = new Date();

	let today_day = today.getDate();
	let today_month = today.getMonth() + 1;
	let today_year = today.getFullYear();


	let age = today_year - year_user;

	if (age != 16)
		return age;

	if (today_month < month_user)
		return age - 1;

	else if (today_month == month_user) {
		if (today_day < day_user)
			return age - 1;

	}

	return age;
}

class User {

	static #key = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

	constructor(key) {
		if (key != User.#key)
			throw new Error("This constructor is private");
	}

	static Builder = class {

		#product = new User(User.#key);

		constructor() {
			this.built = false;
		}


		withName = function(name) {
			//var _regex = /^[a-z ]+$/i serve? alla fine non mi importa molto del nome/cognome;
			/*if (_regex.test(name)) {
				this.#product.name = name;
			}*/
			this.#product.name = name;
		}


		withSurname = function(surname) {
			//var _regex = /^[a-z ]+$/i;
			/*if (_regex.test(surname)) {
				this.#product.surname = surname;
			}*/
			this.#product.surname = surname;
		}

		withDateOfBirth = function(dateOfBirth) {
			var _regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
			if (_regex.test(dateOfBirth)) {
				var match = dateOfBirth.match(_regex);
				let age = getAge(match);
				if (age < 0) throw new Error("La data inserita è successiva a quella odierna");
				if (age < 16) throw new Error("Devi aver almeno compiuto 16 anni d'età");
				this.#product.dateOfBirth = dateOfBirth;
			}
			else
				throw new Error("La data inserita non è valida'");
		}
		withAddress = function(address){
			this.#product.address = address;
		}
		build = function() {
			if (this.built)
				throw new Error("This builder has already been used");

			this.built = true;
			return this.#product;
		}

	}

}




