
function createSpinner(){

    let spinner = document.createElement('div');
    spinner.className = "spinner-border text-warning";
    spinner.setAttribute('role','status');

    let span = document.createElement("span");
    span.className = "sr-only";
    span.innerHTML = "Loading...";
	
	return spinner ;
}

class ContainerAdvertises extends HTMLElement{

     init = (params) => {
        this.params = params ;
        this.className = "wrapper inner-container-advertises";
        this.view_advertises = [] ;
		this.index_view = 0 ;
		this.#show_view(this.index_view);
    }

	// ADD SPINNERS 
    #addSpinners = () => {
		this.#removeAllChildren();
        for(let i = 0 ; i < this.params.quantity ; i++){
            let spinner = createSpinner();
            this.appendChild(spinner);
        }    
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
		
		if(this.view_advertises[index_view] != null || index_view > this.max_index_view)
			return ;
			
        let data = JSON.parse(JSON.stringify(this.params)) ;
        data.offset = index_view * data.quantity 
        $.ajax({
            type: "POST",
            url: "/advertises",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: (advertises) => {
                console.log('{ RESPONSE FOR REQUEST WITH INDEX VIEW : '+index_view+' with '+advertises.length+' advertises }');
                if(advertises.length > 0){
					this.view_advertises[index_view] = [] ;
				}else{
					this.max_index_view = index_view - 1; 
					return ;
				}
				for(let advertise of advertises){
					// console.log(advertise);
                    let card_advertise = createCard(advertise);
                    this.view_advertises[index_view].push(card_advertise);
                }
                if(show){
                   this.#show_view(index_view);
                }
            },
            error: (xhr) => {
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