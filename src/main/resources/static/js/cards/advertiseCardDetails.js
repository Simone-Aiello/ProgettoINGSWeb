



function createAdvertiseCardDetails(data){

	

    // Modal bg
    let modal_bg = document.createElement("div");
    modal_bg.className = "modal-bg-advertise-details";
	    
    // Card
    let card = document.createElement("div");
    card.className = "card shadow rounded card-avertise-details";
    
    // Card body
	let card_body = document.createElement("div");
    card_body.className = "card-body" ;

    // Card header
    let card_header = document.createElement("div");
    card_header.className = "card-header-advertise-details";

    // Card title
    let card_title = document.createElement("h5");
    card_title.className = "card-title card_title-advertise-details";
    card_title.innerHTML = data.title ;

    // Exit button
    let exit_button = document.createElement("button");
    exit_button.className = "btn far fa-times-circle exit-button-advertise-details" ;
    
    card_header.appendChild(card_title);
    card_header.appendChild(exit_button);

	exit_button.onmouseover = () => {
        gsap.to(exit_button,{ scale: 1.1 ,ease : "elastic.out(1, 0.3)" , rotate : "-90deg"} );
    }

    exit_button.onmouseleave = () => {
        gsap.to(exit_button,{ scale: 1 , ease : "elastic.out(1, 0.3)" , rotate : "0deg"} );
    }


    // Card information
    let card_information = document.createElement("div");
    card_information.className = "card-header-advertise-details";

    // Username client advertise
    let card_username_client = document.createElement("a");
    card_username_client.className = "col-3 text-muted text-decoration-none card-username" ;
    card_username_client.innerHTML = "@"+data.account.username ;
    card_username_client.href = "/profilePage?username="+data.account.username ;


	// Row availabilites
    let row_card_availabilites = createRow();
    
    // Label availabilities
    let label_card_availabilites = document.createElement("p");
    label_card_availabilites.className = "card-subtitle text-muted small p-0" ;
    label_card_availabilites.innerHTML = "Disponbilità";


	let dropdown_availabilities = document.createElement('div');
	dropdown_availabilities.className = 'dropdown p-0';

	let button_dropodown_availabilities = document.createElement('button');
	button_dropodown_availabilities.type = 'button';
	button_dropodown_availabilities.className = 'btn btn-primary dropdown-toggle';
	button_dropodown_availabilities.setAttribute('data-bs-toggle','dropdown');
	button_dropodown_availabilities.setAttribute('data-toggle','dropdown');
	button_dropodown_availabilities.innerHTML = 'Vedi';
	button_dropodown_availabilities.style = 'background-color : #f4a261; border:none ; ';
	

	let icon = document.createElement('span');
	icon.className = 'caret';
	
	let dropdown_menu = document.createElement('ul');
	dropdown_menu.className = 'dropdown-menu';
	dropdown_menu.style.backgroundColor = "#f4a261" ;
	dropdown_menu.style.borderRadius = "10px";
    dropdown_menu.style.transform = "transform: translate3d(0, 38px, 0px)"
    
    data.availabilities = JSON.parse(data.availability);
    console.log(data.availabilities+" MANNAIA");
	if(data.availabilities != null && data.availabilities != undefined && data.availabilities != ''){		
	    for(let availability of data.availabilities){
	        let li = document.createElement('li');
            li.style = "margin-left : 10px"
            li.innerHTML = date_from_db_to_ISO(availability);
            dropdown_menu.appendChild(li);
	    }
	}else{
        let li = document.createElement('li');
            li.style = "margin-left : 10px"
            li.innerHTML = "Nessuna data";
            dropdown_menu.appendChild(li);
    }

    button_dropodown_availabilities.appendChild(icon);
	
	dropdown_availabilities.appendChild(button_dropodown_availabilities);
	dropdown_availabilities.appendChild(dropdown_menu);

    row_card_availabilites.appendChild(label_card_availabilites);
    row_card_availabilites.appendChild(dropdown_availabilities);

    // Row province
    let row_card_province = createRow();
    row_card_province.style.margin = "0";
    
    // Label province
    let label_card_province = document.createElement("p");
    label_card_province.className = "card-subtitle text-muted small p-0" ;
    label_card_province.innerHTML = "Provincia";

    // Province
    let card_province = document.createElement("p");
    card_province.className = "card-text m-0-p-0" ;
    card_province.innerHTML = data.province ;

    row_card_province.appendChild(label_card_province);
    row_card_province.appendChild(card_province);

    // Row due date
    let row_card_due_date = createRow();
    
    // Label due date
    let label_card_due_date = document.createElement("p");
    label_card_due_date.className = "card-subtitle text-muted small p-0" ;
    label_card_due_date.innerHTML = "Data di scadenza";

    // Date
    let card_date = document.createElement("p");
    card_date.className = "card-text p-0" ;
    card_date.innerHTML = date_from_db_to_ISO(data.expiryDate) ;

    if(isToday(data.expiryDate)){
        let expiring = document.createElement('p');
        expiring.className = "expiring-advertise-p";
        expiring.innerHTML = "In scadenza!";
        card.appendChild(expiring);
    }

    row_card_due_date.appendChild(label_card_due_date);
    row_card_due_date.appendChild(card_date);

    card_information.appendChild(card_username_client);
	card_information.appendChild(row_card_availabilites);
    card_information.appendChild(row_card_province);
    card_information.appendChild(row_card_due_date);

    // Card center
    let card_center = document.createElement("div");
    card_center.className = "card-center card-center-carousel" ;

    // Container label_images_outer_carousel
    let container_label_images_outer_carousel = document.createElement("div");
    container_label_images_outer_carousel.className = "container-label-images-outer-carousel"

	// Label images
    let label_images = document.createElement("p");
    label_images.className = "card-text m-0-p-0 text-muted" ;
    label_images.innerHTML = "Immagini" ;

    // outer carousel
    let outer_carousel = document.createElement("div");
    outer_carousel.id = "carouselExampleControls" ;
    outer_carousel.className = "carousel outer-carousel slide shadow" ;
    outer_carousel.setAttribute("data-bs-ride","carousel");

    container_label_images_outer_carousel.appendChild(label_images);
    container_label_images_outer_carousel.appendChild(outer_carousel);

    // Inner carousel
    let inner_carousel = document.createElement("div");
    inner_carousel.className = "carousel-inner" ;
    

    let first = true ;

	// If no images load default image
	if(data.images == [] || data.images == null){
		console.log('entered')
		let container_img = document.createElement("div");
        container_img.className = "carousel-item" ;

        let img_carousel = document.createElement("img");

        img_carousel.src = "../../images/no_image_available.jpg";
        img_carousel.className = "d-block w-100 img-carousel" ;
        img_carousel.alt = "Immagine non trovata" ;
        
       	container_img.classList.add("active");

        container_img.appendChild(img_carousel);
        inner_carousel.appendChild(container_img);
	}	
	else{		
	    // Else filling with images
	    for(let image of data.images){
	
	        let container_img = document.createElement("div");
	        container_img.className = "carousel-item" ;
	
	        let img_carousel = document.createElement("img");
	
	        img_carousel.src = image.value;
	        img_carousel.className = "d-block w-100 img-carousel" ;
	        img_carousel.alt = "Immagine non trovata" ;
	        
	        if(first){
	            container_img.classList.add("active");
	            first = false ;
	        }
	
	        container_img.appendChild(img_carousel);
	        inner_carousel.appendChild(container_img);
	    }
	}

    // Button prev
    let button_prev = document.createElement("button");
    button_prev.className = "carousel-control-prev p-2" ;
    button_prev.type = "button";
    button_prev.setAttribute("data-bs-target","#carouselExampleControls");
    button_prev.setAttribute("data-bs-slide","prev");

    let span_button1 = document.createElement("span");
    span_button1.className = "carousel-control-prev-icon" ;
    span_button1.setAttribute("aria-hidden","true");

    button_prev.appendChild(span_button1);

    // Button next
    let button_next = document.createElement("button");
    button_next.className = "carousel-control-next p-2" ;
    button_next.type = "button";
    button_next.setAttribute("data-bs-target","#carouselExampleControls");
    button_next.setAttribute("data-bs-slide","next");

    let span_button2 = document.createElement("span");
    span_button2.className = "carousel-control-next-icon" ;
    span_button2.setAttribute("aria-hidden","true");

    button_next.appendChild(span_button2);

    outer_carousel.appendChild(inner_carousel);
    outer_carousel.appendChild(button_prev);
    outer_carousel.appendChild(button_next);

    // Container label description and description
    let container_label_description_description = document.createElement("div");
    container_label_description_description.className = "container-label-description-description"

	// Label description
    let label_description = document.createElement("p");
    label_description.className = "card-text m-0-p-0 text-muted" ;
    label_description.innerHTML = "Descrizione" ;

    // Card description
    let card_description = document.createElement("p");
    card_description.className = "card-text card-description shadow" ;
    card_description.innerHTML = data.description ;

    container_label_description_description.appendChild(label_description);
    container_label_description_description.appendChild(card_description);

	card_center.appendChild(container_label_images_outer_carousel);
    card_center.appendChild(container_label_description_description);

    // Row offer button
    let row_areas_offer_button = document.createElement("div");
    row_areas_offer_button.className = "row-areas-offer-button mt-4";

    // Offer button
    let offer_button = document.createElement("button");
    offer_button.className = "btn p-2" ;
    offer_button.style = "background-color: #f4a261; color: white;";
    offer_button.innerHTML= "Proponiti" ;

    // Deletebutton
    let delete_advertise_button = document.createElement("button");
    delete_advertise_button.className = "btn p-2 btn-danger" ;
    delete_advertise_button.style = "color: white;";
    delete_advertise_button.innerHTML= "Elimina" ;

    
    delete_advertise = (id) => {

        advertise_builder = new Advertise.Builder();
        advertise_builder.withId(id);
        $.ajax({
            type : 'POST',
            url: "/deleteAdvertise",
            contentType : 'application/json' ,
            data : JSON.stringify(advertise_builder.build()) ,
            success : (response) =>{
                let dialog = createDialog({
                    message : 'Annuncio eliminato con successo',
                });
                document.getElementById('container-advertises').refresh();
                dialog.show();
            },
            error : (xhr) => {
                let dialog = createDialog({
                    message : 'Errore nel sistema, riprovare in un secondo momento',
                });
                dialog.show();
            }
        });
    }

    delete_advertise_button.onclick = () => {
        let dialog = createDialog({
            message: "Sei sicuro di voler eliminare questo annuncio?",
            ok : () => { delete_advertise(data.id) },
            cancel : card.show,
        })
        dialog.show();
        card.close();
    }

    // Container areas
    let container_areas = document.createElement('div');
    container_areas.className = "container-areas shadow";

    for(let area of data.interestedAreas){
        let card_icon = document.createElement('icon');
	    card_icon.className = "icon-card-advertise-details shadow "+area.icon;
        container_areas.appendChild(card_icon);
    }

    row_areas_offer_button.appendChild(container_areas);
    
    let typeAccount = null ;

    $.ajax({
		type: "GET",
		url: "/typeOfAccount",
		success: (response) => {
				console.log(response);
                typeAccount = response ;
                if(typeAccount == 'w' || typeAccount == 'none')
                    row_areas_offer_button.appendChild(offer_button);
                else if(typeAccount == 'a'){
                    row_areas_offer_button.appendChild(delete_advertise_button);
                }
			},
		error: (xhr) => {
				console.log(xhr)
			}
		});
    
    

    card_body.appendChild(card_header);
    card_body.appendChild(card_information);
    card_body.appendChild(card_center);
    card_body.appendChild(row_areas_offer_button);
    card.appendChild(card_body);

    modal_bg.appendChild(card);
    
	offer_button.onmouseover = () => {
		gsap.to(offer_button,{ scale: 1.1 ,ease : "elastic.out(1, 0.3)"  });
	}


	offer_button.onmouseleave = () => {
		gsap.to(offer_button,{ scale: 1 ,ease : "elastic.out(1, 0.3)"  });
	}

    card.close = () => {

        const inner_item_timeline = gsap.timeline({defaults:{duration:0.25,ease:"power1.out"}});

        inner_item_timeline.to(card_title,{x : -10, opacity : 0});
        inner_item_timeline.to(exit_button,{y : -10, opacity : 0},'<');
        inner_item_timeline.to(inner_carousel,{x : -20, opacity : 0 });
        inner_item_timeline.to(card_description,{x : 20, opacity : 0 }, '<');
        inner_item_timeline.to(offer_button,{y : -10, opacity : 0});


        const modal_timeline = gsap.timeline({defaults:{duration:0.65,ease : "elastic.out(1, 0.3)"}});
        
        modal_timeline.to(card,{ scale : 0.4 });  
        modal_timeline.to(card,{ scale : 0.8 });  
        modal_timeline.to(modal_bg,{ opacity :0 } ,'<');  
        modal_timeline.to(modal_bg,{ visibility : "hidden" , duration : 0 , display: "none"});  
        document.body.style.overflow = "auto" ;

        return modal_timeline.totalDuration() ;
    }

    card.show  = () => {

        document.body.appendChild(modal_bg);
        gsap.to(modal_bg,{opacity : 1 , duration : 1 });  
        
        modal_bg.style.visibility = "visible" ;
        modal_bg.style.display = "flex" ;
            
        document.body.style.overflow = "hidden" ;
        const tl = gsap.timeline({defaults:{duration:0.25,ease:"power1.out"}});

        tl.fromTo(card_title,{x : -10, opacity : 0},{x : 0, opacity : 1});
        tl.fromTo(exit_button,{y : -10, opacity : 0},{y : 0, opacity : 1},'<');
        tl.fromTo(inner_carousel,{x : -20, opacity : 0},{x : 0, opacity : 1 });
        tl.fromTo(card_description,{x : 20, opacity : 0},{x : 0, opacity : 1 }, '<');
        tl.fromTo(offer_button,{y : -10, opacity : 0},{y : 0, opacity : 1});

        gsap.fromTo(card,{scale: 0.4 , opacity : 0} , {scale : 1 , opacity :1 , duration : 1 , ease : "elastic.out(1, 0.3)"});     
    }

    exit_button.onmouseover = () => {
        gsap.to(exit_button,{ scale: 1.1 ,ease : "elastic.out(1, 0.3)" , rotate : "-90deg"} );
    }

    exit_button.onmouseleave = () => {
        gsap.to(exit_button,{ scale: 1 , ease : "elastic.out(1, 0.3)" , rotate : "0deg"} );
    }

    exit_button.onclick = card.close ;

    let card_offer = null ;
    offer_button.onclick = () => {

        data.modal_bg = modal_bg ;

        if(card_offer == null ) card_offer = createCardOfferForm(data);
        
        let duration = card.close() ;
        setTimeout(card_offer.show,duration * 1000);

    }
    
    return card ;
}

