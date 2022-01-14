function createCard(data){

    // Cache for detail 
	let card_details = null ;
    

    // The whole card
    let card = document.createElement("div");
    card.className = "card shadow rounded card-advertise-preview";

    // The card body
    let card_body = document.createElement("div");
    card_body.className = "card-body p-1 space-between flex-column card-body-advertise-preview" ;
  
    // The card header
    let card_header = document.createElement("div");
    card_header.className = "wrapper space-between card-header-advertise-preview";

    // The card title
    let card_title = document.createElement("h5");
    card_title.className = "card-title card-title-advertise-preview";
    card_title.innerHTML = data.title ;

    // Button to see details
    let button_details = document.createElement("a");
    button_details.className = "col-2 btn button-details-advertise-preview" ;
   
    // Icon details
    let icon_details = document.createElement("i");
    icon_details.className = "fas fa-expand" ;

    button_details.appendChild(icon_details);

    card_header.appendChild(card_title);
    card_header.appendChild(button_details);

    // Username client
    let card_username_client = document.createElement("p");
    card_username_client.className = "card-subtitle text-muted small" ;
    card_username_client.innerHTML = "@"+data.account.username ;

    // Card image
    let card_img = document.createElement("img");
	let src_no_image_available =  "../../images/no_image_available.jpg" ;
    card_img.className = "card-img card-img-advertise-preview rounded";
    card_img.src =  data.images[0] !=  null ? data.images[0].value : src_no_image_available ;
    card_img.alt = "Immagine non trovata" ;


    // Container information : Province - Due date
    let card_information = document.createElement("div");
    card_information.className = "wrapper space-between mt-2 card-information-advertise-preview" ;

    // Label province
    let label_card_province = document.createElement("p");
    label_card_province.className = "card-subtitle text-muted small m-0 label-information" ;
    label_card_province.innerHTML = "Provincia";


    // Card province
    let card_province = document.createElement("p");
    card_province.className = "card-text m-0" ;
    card_province.innerHTML = data.province ;

	// Label due date
    let label_card_due_date = document.createElement("p");
    label_card_due_date.className = "card-subtitle text-muted small m-0 label-information due-date" ;
    label_card_due_date.innerHTML = "Scadenza";

    // Card due date
    let card_due_date = document.createElement("p");
    card_due_date.className = "card-text m-0 due-date" ;
    card_due_date.innerHTML = date_from_db_to_ISO(data.expiryDate);
     
    card_information.appendChild(label_card_province);
    card_information.appendChild(label_card_due_date);
    card_information.appendChild(card_province);
    card_information.appendChild(card_due_date);
    
    // Append each element
    card_body.appendChild(card_header);
    card_body.appendChild(card_username_client);
    card_body.appendChild(card_img);
    card_body.appendChild(card_information);
    card.appendChild(card_body);

    // Methods details button
    button_details.onclick = () => {
        
		data.id_advertise = data.id ;
        if(card_details == null && card_img.src != src_no_image_available){
			let res = requestImagesAdvertise(data.id_advertise) ;
	        res.then((images) => {
					data.images = images
				}).catch((e) => {
					console.log(e);
				});
			card_details = createAdvertiseCardDetails(data);
        }
        card_details.show() ;
    } 
    
    
    button_details.onmouseover = () => {
        gsap.to(button_details,{scale:1.1,duration : 0.01, backgroundColor : "white " , color:"#f4a261"});
    }
    
    button_details.onmouseleave = () => {
        gsap.to(button_details,{scale:1,duration : 0.1, backgroundColor : "#f4a261 " , color:"white"});
    }
    

    // Methods card
    card.addImage = (img) => { imgs.add(img); }
    card.addImages = (urls) => { 
        for(let url of urls){
            imgs.push(url);
        }
    }
    
    card.close = () => {

        const inner_item_timeline = gsap.timeline({defaults:{duration:0.25,ease:"power1.out"}});

        inner_item_timeline.to(card_title,{x : -10, opacity : 0});
        inner_item_timeline.to(button_details,{y : -10, opacity : 0},'<');
        inner_item_timeline.to(card_img,{x : -20, opacity : 0 });
        inner_item_timeline.to(row_card_province,{x : 20, opacity : 0 }, '<');


        const modal_timeline = gsap.timeline({defaults:{duration:0.65,ease : "elastic.out(1, 0.3)"}});
        
        modal_timeline.to(card,{ scale : 0.4 });  
        modal_timeline.to(card,{ scale : 0.8 });  
        modal_timeline.to(card,{ opacity :0 } ,'<');  
        modal_timeline.to(card,{ visibility : "hidden" , duration : 0 , display: "none"});  

        return modal_timeline.totalDuration() ;
    }

    card.show = () => {

        card.style.visibility = "visible" ;
        card.style.display = "flex" ;

        const tl = gsap.timeline({defaults:{duration:0.25,ease:"power1.out"}});

        tl.fromTo(card_title,{x : -10, opacity : 0},{x : 0, opacity : 1});
        tl.fromTo(button_details,{y : -10, opacity : 0},{y : 0, opacity : 1});
        tl.fromTo(card_img,{y : -10, opacity : 0},{y : 0, opacity : 1 });
    
    
        gsap.fromTo(card,{ scale: 0.5 , opacity : 0} , { scale : 1 , opacity :1 , duration : 1.1 , ease : "elastic.out(1, 0.3)"});
        
    }

    // Responsive card
    responsive = () => {

        // Breakpoints
        let boolean_width_screen_400 = $(window).width() < 400 ;
        let boolean_width_screen_600 = $(window).width() < 600 ;
        let boolean_width_screen_800 = $(window).width() < 800 ;

        card_img.classList.toggle('d-none',boolean_width_screen_800);        
    }
    
    responsive();

    $(window).resize(responsive)

    return card ;
}