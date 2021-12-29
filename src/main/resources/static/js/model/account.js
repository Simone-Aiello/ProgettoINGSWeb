
import { User } from "./user.js" ;

class Username{

    constructor(username) {

        var _regex = /^\w+$/g ;

        if(_regex.test(username))
            this.value = username ;
        else
            throw new Error("L'username inserito non è valido");
    }

}


class Password{
	
	constructor(password){
		
		var _regex = /^[a-zA-Z0-9!@#$%^_&*]{6,16}.(?=[!@#$%^_&*]).$/g
		
		 if(_regex.test(password)){	
			this.value = password ;
		}  
        else
            throw new Error("La password non rispetta i requisti di sicurezza");
	}
	
}

class Email{
	
	constructor(email){
		
		var _regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
		
		 if(_regex.test(email))
			 this.value = email ;
         else
            throw new Error("L' email inserita non è valida");
	}
	
}


class Telephone{
	
	constructor(number){
		
		var _regex = /^([0-9]{10}|0[0-9]{8})$/
		
		 if(_regex.test(number))
			 this.value = number ;
         else
            throw new Error("Il numero inserito non è valido");
	}
	
}

class AccountType{
	
	constructor(account_type){
		
		var _regex = /^[awu]$/
		
		 if(_regex.test(account_type))
			 this.value = account_type ;
         else
            throw new Error("The account type is not valid");
	}
	
}




export class Account{
	
	static #key  =  Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) ;
	
	

	constructor(key){
		if(key != Account.#key)
			throw new Error("This constructor is private");	
	}
	
	
	
	static build_json = function(account){
		
		var json = {
			username : account.username.value ,
			password : account.password.value ,
			email : account.email.value ,
			number : account.number.value ,
			provinceOfWork : account.provinceOfWork ,
			accountType : account.accountType.value ,
			personalInfo : User.build_json(account.user) ,
		};
		
		
		return json ;
	}
		
	static Builder = class {
		
		#product = new Account(Account.#key);
		
		constructor(){
			this.built = false ;
			this.#product.username = null ;
			this.#product.password = null ;
			this.#product.email = null ;
			this.#product.number = null ;
			this.#product.provinceOfWork = null ;
			this.#product.accountType = null ;
		}
		
		withUsername = function(username){
			this.#product.username = new Username(username) ;
			return this ;
		}
		
		withPassword = function(password){
			this.#product.password = new Password(password) ;
			return this ;
		}
		
		withEmail = function(email){
			this.#product.email = new Email(email) ;
			return this ;
		}
		
		withNumber = function(number){
			this.#product.number = new Telephone(number) ;
			return this ;
		}
		
		
		withProvinceOfWork = function(provinceOfWork){
			this.#product.provinceOfWork = provinceOfWork;
			return this ;
		}
		
		withAccountType = function(accountType){
			this.#product.accountType = new AccountType(accountType);
			return this ;
		}
		
		withUser = function(user){
			this.#product.user = user ;
			return this ;
		}
		
		build = function(){
			if(this.built) 
				throw new Error("This builder has already been used");
			this.built = true ;
			return this.#product ;
		}
	
	}
	
}
