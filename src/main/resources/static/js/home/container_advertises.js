
function createSpinner(){

    let wrapper_spinner = document.createElement('div');
    wrapper_spinner.className = "wrapper wrapper-spinner";

    let spinner = document.createElement('div');
    spinner.className = "spinner-border text-warning";
    spinner.setAttribute('role','status');

    let span = document.createElement("span");
    span.className = "sr-only";
    span.innerHTML = "Loading...";
	
    wrapper_spinner.appendChild(spinner);

	return wrapper_spinner ;
}

class ContainerAdvertises extends HTMLElement{

    State = class{
        view = false ;
        pending = false ;
    }

    #messageCenterAbsolute = () => {
        let message = document.createElement('h2');
        message.className = "message-center-container-advertises rounded shadow" ;
        return message ;
    }

    #busy = false ;

     init = (params) => {
        if(!this.#busy)
            this.#busy = true;
        else
            return ;
        this.params = params ;
        this.className = "wrapper inner-container-advertises";
        this.view_advertises = [] ;
        this.states = [] ;
		this.index_view = 0 ;
        this.max_index_view = null ;
		this.#show_view(this.index_view);
        this.message_center = this.#messageCenterAbsolute() ;
    }

	// ADD SPINNERS 
    #addSpinners = () => {
		this.#removeAllChildren();
        for(let i = 0 ; i < this.params.quantity ; i++){
            let spinner = createSpinner();
            this.appendChild(spinner);
        }    
    }

    #show_message_center = (message) => {
        this.message_center.innerHTML = message;
        this.appendChild(this.message_center);
    }

	// REMOVES ALL CHILDREN
    #removeAllChildren = () => {
        var child = this.lastElementChild; 
        while (child) {
            this.removeChild(child);
            child = this.lastElementChild;
        }
    }

	// SHOW VIEW
    #show_view = (index_view) => {
		if(index_view < 0)
			return ;
		if(this.view_advertises[index_view] == null){
			this.#fill_view(index_view)
			return ;
		}
        let cards_advertise = this.view_advertises[index_view];
		this.#removeAllChildren();
        for(let card_advertise of cards_advertise){
            this.appendChild(card_advertise);
            card_advertise.show();
        }
		this.index_view = index_view;
		this.#requestAdvertises(index_view + 1);
    }

	// PERFORM A REQUEST TO GET ADVERTISES
    #requestAdvertises = (index_view,show = false) =>{
		

		if((this.view_advertises[index_view] != null || index_view > this.max_index_view ) && this.max_index_view != null )
			return ;

        if(this.states[index_view] == null || this.states[index_view] == undefined )
            this.states[index_view] = new this.State(); 

        

        if(show){
            this.states[index_view].show = true ;
            for(let i = 0 ; i <  this.states.length ; ++i)
                if(i != index_view)
                this.states[i].show = false ;
        }

        if(this.states[index_view].pending){
            return ;
        }


        this.states[index_view].show = show ;
        this.states[index_view].pending = true ;
	
        let data = JSON.parse(JSON.stringify(this.params)) ;
        data.offset = index_view * data.quantity 
        $.ajax({
            type: "POST",
            url: "/advertises",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: (advertises) => {
                if(this.#busy)
                    this.#busy = false;
                this.states[index_view].pending = false ;
                if(advertises.length > 0){
					this.view_advertises[index_view] = [] ;
				}else if(show || index_view == 0){
                    this.#removeAllChildren();
                    if(index_view > 0){
                        this.#show_view(index_view - 1);
                        return ;
                    }
                    if(this.params.province){
                        this.#show_message_center('Non ci sono annunci relativi alla provincia '+this.params.province+", riprovare con una provincia differente");
                    }else if(this.params.keyword){
                        this.#show_message_center('Non ci sono annunci relativi a:  '+this.params.keyword);
                    }else{
                        this.#show_message_center('Non ci sono annunci :(');
                    }
					this.max_index_view = index_view - 1; 
                    return ;
                }else{
					this.max_index_view = index_view - 1; 
					return ;
				}
				for(let advertise of advertises){
					console.log(advertise);
                    let card_advertise = createCard(advertise);
                    this.view_advertises[index_view].push(card_advertise);
                }
                if(this.states[index_view].show){
                    
                   this.#show_view(index_view);
                }
            },
            error: (xhr) => {
                this.states[index_view].pending = false ;
                console.log(xhr.message);
            }
        });
    }

	// CALL REQUEST ADVERTISES FOR A SPECIFIC INDEX AND NEXT INDEX
    #fill_view = (index_view) =>{
        this.#addSpinners() ;
        this.#requestAdvertises(index_view, true);
    }

	// SHOW THE NEXT VIEW IF EXIST
	show_next_view = () =>{
		if (this.max_index_view != null && this.index_view + 1 > this.max_index_view)
			return ;
		this.#show_view(this.index_view + 1);
	}
	
	// SHOW THE PREV VIEW IF EXIST
	show_prev_view = () =>{
		if (this.index_view - 1 < 0)
			return ;
		this.#show_view(this.index_view - 1);
	}

  
}