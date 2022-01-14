



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


    // Card information
    let card_information = document.createElement("div");
    card_information.className = "card-header-advertise-details";

    // Username client advertise
    let card_username_client = document.createElement("a");
    card_username_client.className = "col-3 text-muted text-decoration-none" ;
    card_username_client.innerHTML = "@"+data.account.username ;
    card_username_client.href = "#";

    // Row province
    let row_card_province = createRow();
    row_card_province.style.marginLeft = "10px";
    
    // Label province
    let label_card_province = document.createElement("p");
    label_card_province.className = "card-subtitle text-muted small" ;
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
    label_card_due_date.className = "card-subtitle text-muted small" ;
    label_card_due_date.innerHTML = "Data di scadenza";

    // Date
    let card_date = document.createElement("p");
    card_date.className = "card-text" ;
    card_date.innerHTML = date_from_db_to_ISO(data.expiryDate) ;

    row_card_due_date.appendChild(label_card_due_date);
    row_card_due_date.appendChild(card_date);

    card_information.appendChild(card_username_client);
    card_information.appendChild(row_card_province);
    card_information.appendChild(row_card_due_date);

    // Card center
    let card_center = document.createElement("div");
    card_center.className = "row" ;

    // outer carousel
    let outer_carousel = document.createElement("div");
    outer_carousel.id = "carouselExampleControls" ;
    outer_carousel.className = "carousel slide col-lg-6 col-md-6 col-xs-12" ;
    outer_carousel.setAttribute("data-bs-ride","carousel");

    // Inner carousel
    let inner_carousel = document.createElement("div");
    inner_carousel.className = "carousel-inner" ;
    inner_carousel.style = "width:100% ;  height:250px !important; max-height: 250px !important;" ; 
    

    let first = true ;

    // Filling with images
    for(let image of data.images){

        let container_img = document.createElement("div");
        container_img.className = "carousel-item" ;

        let img_carousel = document.createElement("img");

        img_carousel.src = image.value;
        img_carousel.className = "d-block w-100" ;
        img_carousel.alt = "Immagine non trovata" ;
        img_carousel.style ="object-fit: cover; object-position: center;";
        
        if(first){
            container_img.classList.add("active");
            first = false ;
        }

        container_img.appendChild(img_carousel);
        inner_carousel.appendChild(container_img);
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

    // Card description
    let card_description = document.createElement("p");
    card_description.className = "card-text col-lg-6 col-md-6 col-xs-12" ;
	card_description.style.maxHeight = "250px"
	card_description.style.overflowY = "auto" ;
    card_description.innerHTML = data.description ;

    card_center.appendChild(outer_carousel);
    card_center.appendChild(card_description);


    // Row offer button
    let row_offer_button = document.createElement("div");
    row_offer_button.className = "d-flex flex-row-reverse mt-4";

    let offer_button = document.createElement("button");
    offer_button.className = "btn p-2" ;
    offer_button.style = "background-color: #f4a261; color: white;";
    offer_button.innerHTML= "Proponiti" ;


    row_offer_button.appendChild(offer_button);

    card_body.appendChild(card_header);
    card_body.appendChild(card_information);
    card_body.appendChild(card_center);
    card_body.appendChild(row_offer_button);
    card.appendChild(card_body);

    modal_bg.appendChild(card);
    
    let responsive = function(){
        
        if ($(window).width() <= 425) {  
            card_description.classList.add("mt-3");
            card_province.style = "margin-left: 0;" ;
			if(data.title.length > 15 )
			    card_title.style.fontSize = "18px" ;
			if(data.title.length > 25 )
			    card_title.style.fontSize = "16px" ;
            card_information.style.fontSize = "12px";
            if(data.province.length > 15 )
                card_province.style.fontSize = "10px" ;
            if(data.province.length > 25 )
                card_province.style.fontSize = "9px" ;
            if(data.province.length > 35 )
                card_province.style.fontSize = "8px" ;	
        }else{
			
            card_title.style.fontSize = "22px" ;
            card_information.style.fontSize = "20";
            card_description.classList.remove("mt-3");
            card_province.style.marginRight = "5px";
        	
        } 
    }

    responsive();
    $(window).resize(responsive);
    
    offer_button.onmouseover = () => {
        gsap.to(offer_button,{scale:1.1,duration : 0.3 });
    }

    offer_button.onmouseleave = () => {
        gsap.to(offer_button,{scale:1,duration : 0.3 });
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

        if(card.shown_details == null){
            card.shown_details = true ;
            document.body.appendChild(modal_bg);
        }else{
            gsap.to(modal_bg,{opacity : 1 , duration : 1 });  
        }
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

        // Take id worker
        username_worker = "adasdas",
        data.username_worker= username_worker;
        

        data.modal_bg = modal_bg ;

        if(card_offer == null ) card_offer = createCardOfferForm(data);
        
        let duration = card.close() ;
        setTimeout(card_offer.show,duration * 1000);

    }
    
    return card ;
}

