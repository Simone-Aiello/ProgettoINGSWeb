//checks that the passed vaule is of the type that has been passsed
function checkType(value, type){
	if(value.constructor.name  != type){
		throw new Error("The value: "+value+" is not of type "+type);
	}
}

class Advertise{
	static #key = Math.floor(Math.random()*Number.MAX_SAFE_INTEGER);
	static #title_max_length = 100;
	#serializer = {};
	
	#addProperty = (property, value)=>{
		this.#serializer[property] = value;
	}
	
	toJSON(){
		return JSON.stringify(this.#serializer);
	}
	
	contructor(key){
		if(key!=Advertise.#key)
			throw new Error("constructor is private");
	}
	
	//static inner class that contains an advertise,
	//validate and assigns properties and 
	//is the only class that can build it
	static Builder = class{
		#product =  new Advertise(Advertise.#key);
		#built = false;
				
		constructor(){
			this.areasList = [];
			this.imagesList = [];
			this.offersList = [];
		}
		//add the specified property to the product
		
		withId = (id) =>{
			checkType(id, "Number");
			this.#product.#addProperty("id", id);
		}
		
		withDescription = (description) =>{
			checkType(description, "String");
			this.#product.#addProperty("description", description);
		}
		
		withTitle = (title)=>{
			if(title.length > Advertise.#title_max_length)
				throw new Error("Il titolo può avere massimo" + Advertise.#title_max_length + " caratteri");
			checkType(title, "String");
			this.#product.#addProperty("title", title);
		}
		
		//use YYYY/MM//DD notation to check the date and then convert it to DD/MM/YYYY as the model requires
		withExpiryDate = (expiryDateString) =>{
			var regex = /^(\d{4})-(\d{2})-(\d{2})$/;
			var expiryDate = new Date(expiryDateString);
			//alert(expiryDate);
			if(regex.test(expiryDateString)){
				var dateSplit = expiryDateString.split("-");
				var expiryDateDDMMYYYY = dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[0];
				this.#product.#addProperty("expiryDate", expiryDateDDMMYYYY);
			}
			else{
				throw new Error("data non valida");	
			}		
		}
		
		withAccount(account){
			checktype(account, "Account");
			this.#product.#addProperty("account", account);
		}
		
		withArea(area){
			checkType(area, "Area");
			this.areasList.push(area);
		}
		removeArea(area){
			checkType(area, "Area");
			this.areasList = this.areasList.filter((e)=>{
				return e["id"] != area;
			});
		}
		
		withImage(image){
			checkType(image, "Image");
			this.imagesList.push(image);	
		}
		
		removeImage(image){
			checkType(image,  "Image");	
			this.imageList = this.imagesList.filter((e)=>{
				return e["id"] != image;
			});
		}
		
		withAcceptedOffer(offer){
			checkType(offer, "Offer");
			this.#product.#addProperty("acceptedOffer", offer);
		}
		
		withReview(review){
			checkType(review);
			this.#product.#addProperty("reviewReceived", review);
		}
		
		withProvince(province){
			checkType(province, "Province");
			this.#product.#addProperty(province);
		}
		
		withOffer(offer){
			checkType(offer, "Offer");
			this.offersList.push(offer);
			
		}
		removeOffer(offer){
			checkType(offer,  "Offer");	
			this.offersList = this.offersList.filter((e)=>{
				return e["id"] != offer;
			});
		}
		
	
		build = function(){
			if(this.#built) throw new Error("Builder had already been used");
			this.#built = true;
			this.#product.#addProperty("intrestedArea", this.areasList);
			this.#product.#addProperty("images", this.imagesList);
			this.#product.#addProperty("offers", this.offersList);
			return this.#product;			
		}	
	}
}