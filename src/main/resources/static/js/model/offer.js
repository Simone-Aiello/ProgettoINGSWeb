
function checkType(value,type){
	if(value.constructor.name != type)
		throw new Error("The value: "+value+" is not a "+type);
}

class Offer{

    static #key = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
	static #max_length_title = 35 ;	
	
	// Private serializer 
	#serializer = {} ;
	
	#addProperty = (property,value) => {
		this.#serializer[property] = value ;
	} 

	toJSON() {
		 return JSON.stringify(this.#serializer) ; 
	}
	
	
	constructor(key) {
	
		if (key != Offer.#key)
			throw new Error("This constructor is private");
		
	}

    static Builder = class {

		#product = new Offer(Offer.#key);
		#built = false ;

		constructor() {
			this.#product.done = false ;
		}
		
		withTitle = (title) => {
			checkType(title,"String");
			if(title.length <= Offer.#max_length_title)
				this.#product.#addProperty("title",title);
			else
				throw new Error("Il titolo può avere massimo "+Offer.#max_length_title+" caratteri");
		}

        withDescription = (description) => {
			checkType(description,"String");
			 this.#product.#addProperty("description",description);
        }   

		withQuote = (quote) => {
			let _regex = /^[0-9]+(\.[0-9]+)?$/ 
			if(_regex.test(quote))
				this.#product.#addProperty("quote",quote);
			else
				throw new Error("Il preventivo inserito non è valido") ;
		}	
		
		isDone = (done) => {
			checkType(done,"Boolean");
			this.#product.#addProperty("done",done);
		}
		
		withWorker = (worker) => {
			checkType(worker,"Account");
			this.#product.#addProperty("worker",worker);
		}
		
		withHoursOfWork = (hoursOfWork) => {
			checkType(hoursOfWork,"Number");
			this.#product.#addProperty("hoursOfWork",hoursOfWork);
		}
	
		withAdvertise = (advertise) => {
			checkType(advertise,"Advertise");
			this.#product.#addProperty("advertise",advertise);
		}
		
		build = function() {
			if (this.#built) throw new Error("This builder has already been used");
			this.#built = true;
			return this.#product;
		}		        
    }
}




