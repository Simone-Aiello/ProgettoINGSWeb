class User {

	static #key = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

	constructor(key) {
		if (key != User.#key)
			throw new Error("This constructor is private");
	}
	
	
	#getAge = function (match) {
		let day_user = parseInt(match[3]);
		let month_user = parseInt(match[2]);
		let year_user = parseInt(match[1]);

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

	static Builder = class {

		#product = new User(User.#key);

		constructor() {
			this.built = false;
		}


		withName = function(name) {
			let _regex = /^[a-zA-Z'-\s]+$/;
			if(_regex.test(name)){			
				this.#product.name = name;
			}
			else{
				throw new Error("Il campo presenta caratteri non validi");
			}
		}


		withSurname = function(surname) {
			let _regex = /^[a-zA-Z'-\s]+$/;
			if(_regex.test(surname)){			
				this.#product.surname = surname;
			}
			else{
				throw new Error("Il campo presenta caratteri non validi");
			}
		}

		withDateOfBirth = function(dateOfBirth) {
			var _regex = /^(\d{4})-(\d{2})-(\d{2})$/;
			if (_regex.test(dateOfBirth)) {
				var match = dateOfBirth.match(_regex);
				let age = this.#product.#getAge(match);
				if (age <= 0) throw new Error("La data inserita è successiva a quella odierna");
				if (age < 16) throw new Error("Devi aver almeno compiuto 16 anni d'età");
				this.#product.dateOfBirth = dateOfBirth;
			}
			else
				throw new Error("La data inserita non è valida");
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




