
class Offer{

    static #key = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
	static #max_length_title = 35 ;	
	
	// Private serializer 
	#serializer = {} ;
	
	#addProperty = (property,value) => {
		this.#serializer[property] = value ;
	} 

	toJSON() { return this.#serializer ; }
	
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
			this.#product.#addProperty("title",title);
		}

        withDescription = (description) => {
			checkType(description,"String");
			 this.#product.#addProperty("description",description);
        }   

		withQuote = (quote) => {
			try{
				checkType(quote,"Number");
			}catch(e){
				throw new Error("Il valore inserito non è un numero");
			}
			if(quote < 0 ){
				throw new Error("Inserisci un preventivo maggiore o uguale a zero");
			}
			this.#product.#addProperty("quote",quote);
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
			try{
				checkType(hoursOfWork,"Number");
			}catch(e){
				throw new Error("Il valore inserito non è un numero");
			}
			if(hoursOfWork <= 0 ){
				throw new Error("Inserisci una durata del lavoro maggiore di zero");
			}
			this.#product.#addProperty("hoursOfWork",hoursOfWork);
		}
	
		withAdvertise = (advertise) => {
			checkType(advertise,"Advertise");
			this.#product.#addProperty("advertise",advertise);
		}
		
		withAvailabilities = (availabilities) => {
			checkType(availabilities,"Array");
			for(let availability of availabilities)
				this.withAvailability(availability);
		}

		withAvailability = (availability) => {
			isDate(availability);
			if(!isAfterNowOrToday(availability))
				throw new Error("La data deve essere una data futura");
			if(this.#product.#serializer.availabilities == null)
				this.#product.#serializer.availabilities = [];
			this.#product.#serializer.availabilities.push(availability); 
		}
	
		removeAvailability = (availability) => {
			if(this.#product.#serializer.availabilities == null)
				return ;
			let index = this.#product.#serializer.availabilities.indexOf(availability) ; 
			if( index > -1)
				this.#product.#serializer.availabilities.splice(index,1);
		}

		build = function() {
			return this.#product;
		}
    }
}







