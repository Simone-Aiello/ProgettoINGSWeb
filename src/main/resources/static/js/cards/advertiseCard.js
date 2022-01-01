function createAdvertiseCardDetail(data){

    let body = document.body;

    let modal_bg = document.createElement("div");
    modal_bg.style.position = "fixed" ;
    modal_bg.style.display = "flex" ;
    modal_bg.style.justifyContent = "center" ;
    modal_bg.style.alignItems = "center" ;
    modal_bg.style.width = "100%";
    modal_bg.style.height = "100vh";
    modal_bg.style.backgroundColor = "rgba(43, 45, 66,0.4)";
    modal_bg.style.top = "0" ;
    modal_bg.style.left = "0" ;
	
    
    let card = document.createElement("div");
    card.className = "card shadow rounded ";
   	card.style.maxHeight = "100vh";
    
	let card_body = document.createElement("div");
    card_body.className = "card-body" ;

    let card_header = document.createElement("div");
    card_header.className = "row";

    let card_title = document.createElement("h5");
    card_title.className = "col-6 card-title";
    card_title.innerHTML = data.title ;

    let exit_button = document.createElement("button");
    exit_button.className = "btn col-2 far fa-times-circle" ;
    exit_button.style = "font-size : 32px;margin-left: 33%; color: #f4a261; text-decoration: none";

    card_header.appendChild(card_title);
    card_header.appendChild(exit_button);

    let card_information = document.createElement("div");
    card_information.style = " display: flex; justify-content: space-between; width: 100%;" ;

    let card_username_client = document.createElement("p");
    card_username_client.className = "col-3 text-muted" ;
    card_username_client.innerHTML = data.username_client ;


    let card_province = document.createElement("p");
    card_province.className = "col-3 card-text" ;
    card_province.innerHTML = data.province ;
    card_province.style.alignSelf = "center" ;


    let card_date = document.createElement("p");
    card_date.className = "col-3 card-text" ;
    card_date.innerHTML = data.date ;

    card_information.appendChild(card_username_client);
    card_information.appendChild(card_province);
    card_information.appendChild(card_date);

    let card_center = document.createElement("div");
    card_center.className = "row" ;

    let outer_carousel = document.createElement("div");
    outer_carousel.id = "carouselExampleControls" ;
    outer_carousel.className = "carousel slide col-lg-6 col-md-6 col-xs-12" ;
    outer_carousel.setAttribute("data-bs-ride","carousel");

    let inner_carousel = document.createElement("div");
    inner_carousel.className = "carousel-inner" ;
    inner_carousel.style = "width:100% ;  height:250px !important; max-height: 250px !important;" ; 
    

    let first = true ;

    for(let url_img of data.imgs_url){

        let container_img = document.createElement("div");
        container_img.className = "carousel-item" ;

        let img_carousel = document.createElement("img");

        img_carousel.src = url_img;
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

    let button_prev = document.createElement("button");
    button_prev.className = "carousel-control-prev p-2" ;
    button_prev.type = "button";
    button_prev.setAttribute("data-bs-target","#carouselExampleControls");
    button_prev.setAttribute("data-bs-slide","prev");

    let span_button1 = document.createElement("span");
    span_button1.className = "carousel-control-prev-icon" ;
    span_button1.setAttribute("aria-hidden","true");

    button_prev.appendChild(span_button1);

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

    let card_description = document.createElement("p");
    card_description.className = "card-text col-lg-6 col-md-6 col-xs-12" ;
	card_description.style.maxHeight = "250px"
	card_description.style.overflowY = "auto" ;
    card_description.innerHTML = data.description ;

    card_center.appendChild(outer_carousel);
    card_center.appendChild(card_description);


    let container_offer_button = document.createElement("div");
    container_offer_button.className = "d-flex flex-row-reverse mt-4";

    let card_offer_button = document.createElement("a");
    card_offer_button.href = data.location_offer ;
    card_offer_button.className = "btn p-2" ;
    card_offer_button.style = "background-color: #f4a261; color: white;";
    card_offer_button.innerHTML= "Proponiti" ;

    container_offer_button.appendChild(card_offer_button);

    card_body.appendChild(card_header);
    card_body.appendChild(card_information);
    card_body.appendChild(card_center);
    card_body.appendChild(container_offer_button);
    card.appendChild(card_body);

    modal_bg.appendChild(card);
    
    let responsive = function(){
        
        if ($(window).width() <= 425) {  
            card_description.classList.add("mt-3");
            card_province.style = "margin-left: 0;" ;
            card_information.style.fontSize = "13px";
            if(data.province.length > 15 )
                card_province.style.fontSize = "10px" ;
            if(data.province.length > 25 )
                card_province.style.fontSize = "8px" ;
            if(data.province.length > 35 )
                card_province.style.fontSize = "6px" ;
            card.classList.add("col-12");
            card.classList.remove("col-6");
            modal_bg.style.padding = "0 10px";
			
        }else{
            card_description.classList.remove("mt-3");
            card_province.style.marginLeft = "28%";
            card_province.style.marginRight = "5px";
            card_information.style.fontSize = "20px";
            if(data.province.length > 15 )
                card_province.style.fontSize = "14px" ;
            if(data.province.length > 25 )
                card_province.style.fontSize = "12px" ;
            if(data.province.length > 35 )
                card_province.style.fontSize = "10px" ;
            card.classList.add("col-6");
            card.classList.remove("col-12");
			modal_bg.style.padding = "0";
        } 
    }

    responsive();
    $(window).resize(responsive);
    
    card_offer_button.onmouseover = () => {
        gsap.to(card_offer_button,{scale:1.1,duration : 0.3 });
    }

    card_offer_button.onmouseleave = () => {
        gsap.to(card_offer_button,{scale:1,duration : 0.3 });
    }

    card.close = () => {

        const inner_item_timeline = gsap.timeline({defaults:{duration:0.25,ease:"power1.out"}});

        inner_item_timeline.to(card_title,{x : -10, opacity : 0});
        inner_item_timeline.to(exit_button,{y : -10, opacity : 0},'<');
        inner_item_timeline.to(inner_carousel,{x : -20, opacity : 0 });
        inner_item_timeline.to(card_description,{x : 20, opacity : 0 }, '<');
        inner_item_timeline.to(card_offer_button,{y : -10, opacity : 0});


        const modal_timeline = gsap.timeline({defaults:{duration:0.65,ease : "elastic.out(1, 0.3)"}});
        
        modal_timeline.to(card,{ scale : 0.4 });  
        modal_timeline.to(card,{ scale : 0.8 });  
        modal_timeline.to(modal_bg,{ opacity :0 } ,'<');  
        modal_timeline.to(modal_bg,{ visibility : "hidden" , duration : 0 });  
        body.style.overflow = "auto" ;
    }

    card.show  = () => {

        if(card.shown_details == null){
            card.shown_details = true ;
            body.appendChild(modal_bg);
        }else{
            gsap.to(modal_bg,{opacity : 1 , duration : 1 });  
            modal_bg.style.visibility = "visible" ;
        }
        body.style.overflow = "hidden" ;
        const tl = gsap.timeline({defaults:{duration:0.25,ease:"power1.out"}});

        tl.fromTo(card_title,{x : -10, opacity : 0},{x : 0, opacity : 1});
        tl.fromTo(exit_button,{y : -10, opacity : 0},{y : 0, opacity : 1},'<');
        tl.fromTo(inner_carousel,{x : -20, opacity : 0},{x : 0, opacity : 1 });
        tl.fromTo(card_description,{x : 20, opacity : 0},{x : 0, opacity : 1 }, '<');
        tl.fromTo(card_offer_button,{y : -10, opacity : 0},{y : 0, opacity : 1});

        gsap.fromTo(card,{scale: 0.4 , opacity : 0} , {scale : 1 , opacity :1 , duration : 1 , ease : "elastic.out(1, 0.3)"});     
    }

    exit_button.onmouseover = () => {
        gsap.to(exit_button,{ scale: 1.1 ,ease : "elastic.out(1, 0.3)" , rotate : "-90deg"} );
    }

    exit_button.onmouseleave = () => {
        gsap.to(exit_button,{ scale: 1 , ease : "elastic.out(1, 0.3)" , rotate : "0deg"} );
    }

    exit_button.onclick = card.close ;
    
    return card ;
}

function createCard(data){

	let card_details = null ;
    
	let imgs_url = [data.url_img] ;

    let card = document.createElement("div");
    card.className = "card shadow rounded";
    card.style = "width: 18rem;";
    card.style.visibility = "hidden" ;
    
    let card_body = document.createElement("div");
    card_body.className = "card-body" ;

    let card_header = document.createElement("div");
    card_header.className = "row";

    let card_title = document.createElement("h5");
    card_title.className = "col-6 card-title";
    card_title.style = "width: 70%;";
    if(data.title.length > 15 )
        card_title.style.fontSize = "14px" ;
    if(data.title.length > 25 )
        card_title.style.fontSize = "12px" ;
        if(data.title.length > 35 )
        card_title.style.fontSize = "10px" ;
    card_title.innerHTML = data.title ;

    let card_button = document.createElement("a");
    card_button.className = "col-2 btn" ;
    card_button.style = "margin-left: 10%; background-color: #f4a261; height: 50%; color:white";

    let card_button_icon = document.createElement("i");
    card_button_icon.className = "fas fa-expand" ;

    card_button.appendChild(card_button_icon);

    card_header.appendChild(card_title);
    card_header.appendChild(card_button);

    let card_username_client = document.createElement("p");
    card_username_client.className = "card-subtitle text-muted small" ;
    card_username_client.innerHTML = data.username_client ;

    let card_img = document.createElement("img");
    card_img.className = "card-img-top p-4";
    card_img.src = data.url_img ;
    card_img.alt = "Immagine non trovata" ;

    let card_description = document.createElement("p"); 
    card_description.className = "card-text" ; 
	card_description.style.height = "150px" ;
	card_description.style.overflowY = "auto";
    card_description.innerHTML = data.description ;

    let card_information = document.createElement("div");
    card_information.className = "row" ;

    let card_province = document.createElement("p");
    card_province.className = "col-6 card-text" ;
    card_province.innerHTML = data.province ;
    if(data.province.length > 10 )
        card_province.style.fontSize = "13px" ;
    if(data.province.length > 15 )
        card_province.style.fontSize = "11px" ;
    if(data.province.length > 25 )
        card_province.style.fontSize = "9px" ;
    if(data.province.length > 35 )
        card_province.style.fontSize = "7px" ;

    let card_date = document.createElement("p");
    card_date.className = "col-6 card-text" ;
    card_date.innerHTML = data.date ;

    card_information.appendChild(card_province);
    card_information.appendChild(card_date);

    card_body.appendChild(card_header);
    card_body.appendChild(card_username_client);
    card_body.appendChild(card_img);
    card_body.appendChild(card_description);
    card_body.appendChild(card_information);

    card.appendChild(card_body);

    card.addImage = (img_url) => { imgs_url.add(img_url); }
    card.addImages = (urls) => { 
        for(let url of urls){
            imgs_url.push(url);
        }
    }

    card_button.onclick = () => {

        // Fare richiesta ajax
        let id_advertise = data.id_advertise ;
       
        if(card_details == null ){
            console.log(data.title);
            card.addImages([ "./images/immagine2.jpg", "./images/immagine2.jpg", "./images/immagine3.jpeg"]);
    	    data.imgs_url = imgs_url ;    
            console.log(data.imgs_url);
			card_details = createAdvertiseCardDetail(data);
        }
        card_details.show() ;
    } 


    card_button.onmouseover = () => {
        gsap.to(card_button,{scale:1.1,duration : 0.01, backgroundColor : "white " , color:"#f4a261"});
    }

    card_button.onmouseleave = () => {
        gsap.to(card_button,{scale:1,duration : 0.1, backgroundColor : "#f4a261 " , color:"white"});
    }

    card.show = () => {

        card.style.visibility = "visible" ;

        const tl = gsap.timeline({defaults:{duration:0.25,ease:"power1.out"}});

        tl.fromTo(card_title,{x : -10, opacity : 0},{x : 0, opacity : 1});
        tl.fromTo(card_button,{y : -10, opacity : 0},{y : 0, opacity : 1});
        tl.fromTo(card_img,{y : -10, opacity : 0},{y : 0, opacity : 1 });
    
    
        gsap.fromTo(card,{scale: 0.5 , opacity : 0} , {scale : 1 , opacity :1 , duration : 1.1 , ease : "elastic.out(1, 0.3)"});
        
    }



    return card ;
}