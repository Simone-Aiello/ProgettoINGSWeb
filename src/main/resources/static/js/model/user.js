
class JustLetters{
	
    constructor(justLetters) {

        var _regex = /^[a-z ]+$/i ;

        if(_regex.test(justLetters))
            this.value = justLetters ;
        else
            throw new Error("Sono presenti caratteri non validi");
    }
	
}

class DateOfBirth{

 	constructor(dateOfBirth) {

        var _regex = /^(\d{2})\/(\d{2})\/(\d{4})$/ ;

        if(_regex.test(dateOfBirth)){
	
	 		this.value = dateOfBirth ;
		
			var match = dateOfBirth.match(_regex);
	
			let age = this.#getAge(match) ;
				
			if( age < 0) 
				throw new Error("La data inserita è successiva a quella odierna")
			
			if( age < 16) 
				throw new Error("Devi aver almeno compiuto 16 anni d'età")
			
		}
        else
            throw new Error("La data inserita non è valida'");
    }

	#getAge = function(match){
		
		let day_user = parseInt(match[1]); 
		let month_user = parseInt(match[2]);
		let year_user = parseInt(match[3]);
		
		let today = new Date();

		let today_day = today.getDate();
		let today_month = today.getMonth() + 1 ;
		let today_year = today.getFullYear();
		
		
		let age = today_year - year_user ; 
		
		if(age != 16 )
			return age ;
			
		if(today_month < month_user )
			return age - 1 ;
			
		else if(today_month == month_user){
			if(today_day < day_user )
			return age - 1 ; 
		
		}
		
		return age ; 
	}
	
}

export class User{
	
	static #key  =  Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) ;

	constructor(key){
		if(key != User.#key)
			throw new Error("This constructor is private");	
	}
	
	
	
	static build_json = function(user){
		
		var json = {
			name : user.name.value ,
			surname : user.surname.value ,
			dateOfBirth : user.dateOfBirth.value ,
		};
		
		
		return json ; 
	}
	
	
	static Builder = class {
		
		#product = new User(User.#key);
		
		constructor(){
			this.built = false ;
			this.#product.name = null ;
			this.#product.surname = null ;
			this.#product.dateOfBirth = null ;
		}
		
		
		withName = function(name){
			this.#product.name = new JustLetters(name);
			return this;
		}
		
		
		withSurname = function(surname){
			this.#product.surname = new JustLetters(surname);
			return this;
		}
		
		withDateOfBirth = function(dateOfBirth){
			this.#product.dateOfBirth = new DateOfBirth(dateOfBirth);
			return this;
		}
		
		build = function(){
			if(this.built) 
				throw new Error("This builder has already been used");
			
			this.built = true ;
			return this.#product ;
		}
	
	}	
	
}




