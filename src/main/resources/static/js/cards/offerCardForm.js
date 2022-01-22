


function createCardOfferForm(data){
	
	let offer_builder = new Offer.Builder();
    
   
    modal_bg = document.createElement("div");

        
    modal_bg.className = "modal-bg-offer-form";

    let form = document.createElement("div");
    form.className = "card shadow rounded card-offer-form" ;

    let inner_form = document.createElement("div");
    inner_form.className = "card-body" ;

    let first_row_form = createRow();
    first_row_form.classList.add("space-between");
    
    let form_title = document.createElement("h5");
    form_title.className = "col-10 card-title";
    form_title.innerHTML = "Compila proposta per: " + data.title ;
    form_title.style.padding = 0 ;    

    let exit_button_form = document.createElement("button");
    exit_button_form.className = "btn  far fa-times-circle close-button-offer-form" ;
    
    exit_button_form.onmouseover = () => {
        gsap.to(exit_button_form,{ scale: 1.1 ,ease : "elastic.out(1, 0.3)" , rotate : "-90deg"} );
    }

    exit_button_form.onmouseleave = () => {
        gsap.to(exit_button_form,{ scale: 1 , ease : "elastic.out(1, 0.3)" , rotate : "0deg"} );
    }

    first_row_form.appendChild(form_title);
    first_row_form.appendChild(exit_button_form);

    let row_information_user_advertise = document.createElement('div');
    row_information_user_advertise.className = "wrapper space-between";
	row_information_user_advertise.style.flexWrap = "wrap";

    let username_client_advertise = document.createElement("a");
    username_client_advertise.className = "card-subtitle text-muted small col-3 text-decoration-none" ;
    username_client_advertise.innerHTML = "@"+ data.account.username ;
    username_client_advertise.style.padding = 0 ;

    let row_province_client_advertise = createRow();
    
    let label_province_client_advertise = document.createElement("p");
    label_province_client_advertise.className = "card-subtitle text-muted small" ;
    label_province_client_advertise.innerHTML = "Provincia";

    let province_client_advertise = document.createElement("p");
    province_client_advertise.className = "card-text" ;
    province_client_advertise.innerHTML = data.province ;
    province_client_advertise.style.alignSelf = "center" ;

    row_province_client_advertise.appendChild(label_province_client_advertise);
    row_province_client_advertise.appendChild(province_client_advertise);

    let row_due_date_advertise = createRow();
    row_due_date_advertise.classList.add("col-5");

    let label_due_date_advertise = document.createElement("p");
    label_due_date_advertise.className = "card-subtitle text-muted small" ;
    label_due_date_advertise.innerHTML = "Data di scadenza";

    let due_date_advertise = document.createElement("p");
    due_date_advertise.className = "card-text" ;
    due_date_advertise.innerHTML = date_from_db_to_ISO(data.expiryDate)  ;

    row_due_date_advertise.appendChild(label_due_date_advertise);
    row_due_date_advertise.appendChild(due_date_advertise);

    row_information_user_advertise.appendChild(username_client_advertise);
    row_information_user_advertise.appendChild(row_province_client_advertise);
    row_information_user_advertise.appendChild(row_due_date_advertise);

    let row_availabilities = document.createElement("div") ;
	row_availabilities.className = "wrapper";
    row_availabilities.style.margin = "10px 0";
    row_availabilities.style.position = "relative";

    let container_dropdown_dates = document.createElement("div");
    container_dropdown_dates.className = "container-dropdown-availabilities";

    let label_no_dates_added = document.createElement("h1");
    label_no_dates_added.innerHTML = "Nessuna data inserita";
    label_no_dates_added.style.fontSize = "12px";
    label_no_dates_added.style.margin = 0 ;
    
    container_dropdown_dates.appendChild(label_no_dates_added);

    let wrapper_input_availabilities = document.createElement("div");
    wrapper_input_availabilities.className = "wrapper";
    wrapper_input_availabilities.style.marginLeft = "10px" ;
    wrapper_input_availabilities.style.position = "relative";
    let input_availabilities = document.createElement("input");
    input_availabilities.type = "date" ;
    input_availabilities.className = "date-offer-form";

    wrapper_input_availabilities.appendChild(input_availabilities);
    wrapper_input_availabilities.appendChild(container_dropdown_dates);

   
    let availabilities = [];
    let add_availabilities_button = createButtonWithIcon("far fa-calendar-plus");

    let message_add_availabilities_button = createMessage({
        element: add_availabilities_button,
        message: "Inserisci una data in cui sei disponibile per effetturare il lavoro",
        position : "left",
        type : "information",
    });

    add_availabilities_button.onmouseover = () => {
        message_add_availabilities_button.show();
    }

    add_availabilities_button.onmouseleave = () => {
        message_add_availabilities_button.close();
    }

    function createRowDropdownItem(date){

        let row_dropdown_item_date = document.createElement("div");
		row_dropdown_item_date.className = "wrapper";
        row_dropdown_item_date.style.width = "100%";
        row_dropdown_item_date.value = date ;
    
        let dropdown_item_date = document.createElement("p");
        dropdown_item_date.style.padding = 0 ;
        dropdown_item_date.style.margin = 0 ;
        dropdown_item_date.style.display = "flex";
        dropdown_item_date.style.justifyContent = "center";
		let groups = date.match(_regex_date);
        dropdown_item_date.innerHTML = groups[3]+"/"+groups[2]+"/"+groups[1];
        dropdown_item_date.className = "col-10";
    
        let dropdown_item_delete_date = createButtonWithIcon("far fa-calendar-minus");
        dropdown_item_delete_date.style.fontSize = "15px";
        dropdown_item_delete_date.style.width = "25px";
        dropdown_item_delete_date.style.height = "25px";

        dropdown_item_delete_date.onclick = () => {
            container_dropdown_dates.removeChild(row_dropdown_item_date);
            availabilities.splice(availabilities.indexOf(date),1);
			offer_builder.removeAvailability(date);
            if(availabilities.length == 0)
                container_dropdown_dates.appendChild(label_no_dates_added);
        }   


        row_dropdown_item_date.appendChild(dropdown_item_date);
        row_dropdown_item_date.appendChild(dropdown_item_delete_date);
    
        return row_dropdown_item_date ;
    }


    let show_dates = createButtonWithIcon("far fa-caret-square-down");

    let message_show_dates= createMessage({
        element: show_dates,
        message: "Mostra tutte le date inserite",
        position : "right",
        type : "information",
    });


    let show_date_boolean = true ;

	container_dropdown_dates.timeline = gsap.timeline({defaults:{duration:0.25,ease:"power1.out"}}) ;
	container_dropdown_dates.state_container_1 = {y : -10 , opacity : 0 , scale : 0.8};
	container_dropdown_dates.state_container_2 = {y: 0 , opacity : 1 , scale:1 , visibility : "visible"};
	
	container_dropdown_dates.show = () => {
			show_dates.classList.remove("fa-caret-square-down");
            show_dates.classList.add("fa-caret-square-up");
            container_dropdown_dates.timeline.fromTo(container_dropdown_dates,container_dropdown_dates.state_container_1,container_dropdown_dates.state_container_2);
            show_date_boolean = false ;
	}
	
	container_dropdown_dates.close = () => {
			show_dates.classList.add("fa-caret-square-down");
            show_dates.classList.remove("fa-caret-square-up");
            container_dropdown_dates.timeline.fromTo(container_dropdown_dates,container_dropdown_dates.state_container_2,container_dropdown_dates.state_container_1);
            container_dropdown_dates.timeline.to(container_dropdown_dates,{visibility : "hidden"});
            show_date_boolean = true ;
	}
	

    show_dates.onclick = () => {

        if(show_date_boolean){
            container_dropdown_dates.show();
        }else{
            container_dropdown_dates.close();
        }

    }

    let shown_date_message = false ;

    show_dates.onmouseover = () => {
        if(show_date_boolean)
        {
            message_show_dates.show();
            shown_date_message = true;
        }
    }

    show_dates.onmouseleave = () => {
        if(show_date_boolean || shown_date_message){
            message_show_dates.close();
            shown_date_message = false;
        }
    }

	add_availabilities_button.onclick = () => {
	
        date_added = input_availabilities.value ;
		try{
			offer_builder.withAvailability(date_added);
		}catch(e){
			createMessage({
				message : e.message ,
				element: wrapper_input_availabilities,
		        position : "top",
				auto_close : true,
				duration : 1.5 ,
		        type : "warning",
			}).show();
			return ;
		}
		
		if(availabilities.indexOf(date_added) >   -1)
		{
			createMessage({
				message : "La data è stata già inserita" ,
				element: wrapper_input_availabilities,
		        position : "top",
				auto_close : true,
				duration : 1.5 ,
		        type : "warning",
			}).show();
			return ;
		}

				
		
        if(container_dropdown_dates.contains(label_no_dates_added))
            container_dropdown_dates.removeChild(label_no_dates_added);
        let new_row_dropdown_date_item = createRowDropdownItem(date_added);
        container_dropdown_dates.appendChild(new_row_dropdown_date_item);

        availabilities.push(date_added);

		if(show_date_boolean){
			container_dropdown_dates.show();
			setTimeout(container_dropdown_dates.close,800);
		}

    }

    row_availabilities.appendChild(add_availabilities_button); 
    row_availabilities.appendChild(wrapper_input_availabilities); 
    row_availabilities.appendChild(show_dates); 

    let row_quote_duration_job = createRow();
    row_quote_duration_job.style.margin = "15px 0";
    row_quote_duration_job.style.marginLeft = "0" ;


    let input_quote_container = document.createElement("div");
    input_quote_container.className = "input-group mb-3 mt-2 shadow ";
    input_quote_container.classList.add("space-between");
    input_quote_container.style.padding = 0 ; 
    

    let input_quote = document.createElement("input");
    input_quote.className = "form-control"
    input_quote.type = "number" ;
    input_quote.placeholder = "Inserisci preventivo";


    let euro_label_container = document.createElement("div");
    euro_label_container.className = "input-group-append"

    let euro_label = document.createElement("span");
    euro_label.className = "input-group-text" ;
    euro_label.innerHTML = "€";

    euro_label_container.appendChild(euro_label);

    input_quote_container.appendChild(input_quote);
    input_quote_container.appendChild(euro_label_container);

    let job_duration_container = document.createElement("div");
    job_duration_container.className = "job-duration-container col";

    let inner_container_job_duration = document.createElement("div");
    inner_container_job_duration.className = "inner_container_job_duration shadow";
    
    let stepper = document.createElement("div");

    let button_decrement = createButtonWithIcon("far fa-minus-square");
    
    let input_job_duration = document.createElement("input");
    input_job_duration.className = "input_job_duration";
    input_job_duration.type = "number" ;
    input_job_duration.value = "1" ;
    

    let button_increment = createButtonWithIcon("far fa-plus-square");

    button_decrement.onclick = () => {
        if(Number(input_job_duration.value) > 1)
            input_job_duration.value = Number(input_job_duration.value) - 1 ; 
    }

    button_increment.onclick = () => {
        input_job_duration.value = Number(input_job_duration.value) + 1 ;
    }
  
    stepper.appendChild(button_decrement);
    stepper.appendChild(input_job_duration);
    stepper.appendChild(button_increment);

    let combobox_unit = document.createElement("select");
    combobox_unit.className = "combobox-unit" ;
    combobox_unit.name = "unit";

    let combobox_option_minutes = document.createElement("option"); 
    combobox_option_minutes.value = "minuti";
    combobox_option_minutes.innerHTML = combobox_option_minutes.value ;
    

    let combobox_option_hours = document.createElement("option"); 
    combobox_option_hours.value = "ore";
    combobox_option_hours.innerHTML = combobox_option_hours.value ;
    combobox_option_hours.selected = true;

    let combobox_option_days = document.createElement("option"); 
    combobox_option_days.value = "giorni";
    combobox_option_days.innerHTML = combobox_option_days.value ;

    let combobox_option_weeks = document.createElement("option"); 
    combobox_option_weeks.value = "settimane";
    combobox_option_weeks.innerHTML = combobox_option_weeks.value ;

    let combobox_option_months = document.createElement("option"); 
    combobox_option_months.value = "mesi";
    combobox_option_months.innerHTML = combobox_option_months.value ;

    combobox_unit.append(combobox_option_minutes);
    combobox_unit.append(combobox_option_hours);
    combobox_unit.append(combobox_option_days);
    combobox_unit.append(combobox_option_weeks);
    combobox_unit.append(combobox_option_months);


    let label_duration_job = document.createElement("p");
    label_duration_job.className = "card-subtitle text-muted small" ;
    label_duration_job.innerHTML = "Durata lavoro";

    inner_container_job_duration.appendChild(stepper);
    inner_container_job_duration.appendChild(combobox_unit);

    job_duration_container.appendChild(label_duration_job);
    job_duration_container.appendChild(inner_container_job_duration);

    row_quote_duration_job.appendChild(input_quote_container);
    row_quote_duration_job.appendChild(job_duration_container);

   
    let card_description = document.createElement("textarea"); 
    card_description.className = "form-control description-offer-form"  ;
    card_description.placeholder = "Inserisci una descrizione";
    card_description.style.position = "relative";

    let button_submit = document.createElement("button");
    button_submit.className = "btn  background-color-card-offer-form border-0 submit-offer-button" ;
    button_submit.innerHTML = "Invia proposta" ;
    button_submit.style.padding = "7px";
    button_submit.style.textAlign = "center";
	button_submit.style.color = "white";

	button_submit.onmouseover = () => {
		gsap.to(button_submit,{ scale: 1.1 ,ease : "elastic.out(1, 0.3)"  });
	}


	button_submit.onmouseleave = () => {
		gsap.to(button_submit,{ scale: 1 ,ease : "elastic.out(1, 0.3)"  });
	}

    let position_message_quote_error ;
    let position_message_duration_job_error ;
    let card_summary = null ;
	button_submit.onclick = () => {
	
		let flag_error = false ; 	
		try{
			let job_duration = input_job_duration.value ;
			offer_builder.withHoursOfWork(job_duration);
			let unit = combobox_unit.value ;
		
            var job_duration_string = job_duration + " " + unit ;
			if(unit == "minuti"){
				job_duration = job_duration / 60 ;
			}else if(unit == "giorni"){
				job_duration = job_duration * 24 ;
			}else if(unit == "settimane"){
				job_duration = job_duration * 24 * 7 ;
			}else if(unit == "mesi"){
				job_duration = job_duration * 24 * 30 ;
			}
			offer_builder.withHoursOfWork(job_duration);
		}catch(e){
			createMessage({
		        element: inner_container_job_duration,
		        message: e.message,
		        position : position_message_duration_job_error,
		        type : "error",
				auto_close : true ,
				duration : 2 
		    }).show();
			input_job_duration.value = 1 ;
			flag_error = true ;
		}
	
		
		try{
			var input_quote_value = input_quote.value ;
			if(input_quote_value == "" )
				input_quote_value = -1 ;
			
			offer_builder.withQuote(input_quote_value);
		}catch(e){
			createMessage({
		        element: input_quote_container,
		        message: e.message ,
		        position : position_message_quote_error,
		        type : "error",
				auto_close : true ,
				duration : 2 
		    }).show();
			flag_error = true ;
			input_quote.value = "";
		}
		
		if(availabilities.length == 0){
		
			createMessage({
		        element: wrapper_input_availabilities,
		        message: "Inserisci almeno una data dove sei disponibile" ,
		        position : "top",
		        type : "error",
				auto_close : true ,
				duration : 2 
		    }).show();
			
			flag_error = true ;	
		}
	
        let description = card_description.value ;
        if(!(description == null || description == ""))
            offer_builder.withDescription(description);
        		
        
		if(!flag_error)
		{
			let title = data.title + " <-> " + data.account.username ;
			offer_builder.withTitle(title);
			worker_builder = new Account.Builder();
			worker_builder.withUsername(data.username_worker);
			offer_builder.withWorker(worker_builder.build());
            data.availabilities = availabilities ;
            data.offer_builder = offer_builder ;
            data.description = description ;
            data.job_duration = job_duration_string ;
            data.quote = input_quote_value ;
            data.cardOfferForm = form ;
            data.modal_bg = modal_bg ;
            card_summary = createOfferCardSummary(data);
            card_summary.style.display = "none";
            modal_bg.appendChild(card_summary);
            let time_to_close = form.close();
            setTimeout(card_summary.show,time_to_close*1000);
			
		}
	}


    let row_submit = document.createElement("div");
    row_submit.className = "d-flex m-2";
    
    row_submit.appendChild(button_submit);
   
    
    inner_form.appendChild(first_row_form);
    inner_form.appendChild(row_information_user_advertise)
    inner_form.appendChild(row_availabilities);
    inner_form.appendChild(row_quote_duration_job);
    inner_form.appendChild(card_description);
    inner_form.appendChild(row_submit);

    form.appendChild(inner_form);
    
    
    modal_bg.appendChild(form);
    
    // CLOSE ALL
    form.exit = () => {

        const inner_item_timeline = gsap.timeline({defaults:{duration:0.25,ease:"power1.out"}});

        inner_item_timeline.to(form_title,{x : -10, opacity : 0});
        inner_item_timeline.to(exit_button_form,{y : -10, opacity : 0},'<');
        inner_item_timeline.to(row_quote_duration_job,{x : -20, opacity : 0 });
        inner_item_timeline.to(card_description,{x : 20, opacity : 0 }, '<');
        inner_item_timeline.to(button_submit,{y : -10, opacity : 0});


        const modal_timeline = gsap.timeline({defaults:{duration:0.65,ease : "elastic.out(1, 0.3)"}});
        
        modal_timeline.to(form,{ scale : 0.4 });  
        modal_timeline.to(form,{ scale : 0.8 });  
        modal_timeline.to(modal_bg,{ opacity :0 } ,'<');  
        modal_timeline.to(modal_bg,{ visibility : "hidden" , duration : 0 , display : "none"});  
        document.body.style.overflow = "auto" ;


        return modal_timeline.totalDuration() ;
    }

    // Just close the pop-up not all the modal
    form.close = () =>{

        const inner_item_timeline = gsap.timeline({defaults:{duration:0.25,ease:"power1.out"}});

        inner_item_timeline.to(form_title,{x : -10, opacity : 0});
        inner_item_timeline.to(exit_button_form,{y : -10, opacity : 0},'<');
        inner_item_timeline.to(row_quote_duration_job,{x : -20, opacity : 0 });
        inner_item_timeline.to(card_description,{x : 20, opacity : 0 }, '<');
        inner_item_timeline.to(button_submit,{y : -10, opacity : 0});


        const form_timeline = gsap.timeline({defaults:{duration:0.65,ease : "elastic.out(1, 0.3)"}});
        
        form_timeline.to(form,{ scale : 0.4 });  
        form_timeline.to(form,{ scale : 0.8 });  
        form_timeline.to(form,{ opacity :0 } ,'<'); 
        form_timeline.to(form,{ visibility : "hidden" , duration : 0  , display : "none"});   
        return form_timeline.totalDuration() ;
    }

    form.show  = () => {
        
        if(form.appended == null){
            form.appended = true ;
            document.body.appendChild(modal_bg);
        }else{
            gsap.to(modal_bg,{opacity : 1 , duration : 1 });  
        }

        modal_bg.style.visibility = "visible" ;
        modal_bg.style.display = "flex" ;
        modal_bg.style.opacity = '1' ;
        
        document.body.style.overflow = "hidden" ;

        const tl = gsap.timeline({defaults:{duration:0.25,ease:"power1.out"}});

        tl.fromTo(form_title,{x : -10, opacity : 0},{x : 0, opacity : 1});
        tl.fromTo(exit_button_form,{y : -10, opacity : 0},{y : 0, opacity : 1},'<');
        tl.fromTo(row_quote_duration_job,{x : -20, opacity : 0},{x : 0, opacity : 1 });
        tl.fromTo(card_description,{x : 20, opacity : 0},{x : 0, opacity : 1 }, '<');
        tl.fromTo(button_submit,{y : -10, opacity : 0},{y : 0, opacity : 1});

        gsap.fromTo(form,{scale: 0.4 , opacity : 0,  display : "none" , visibility : "hidden"} , {scale : 1 , opacity :1 , duration : 1 , ease : "elastic.out(1, 0.3)", display : "flex" , visibility : "visible"});     

        return tl.duration() ;
    }
    
    exit_button_form.onclick = form.exit ;


	let responsive = function(){
        
        if ($(window).width() <= 425) {  
            position_message_quote_error = "bottom" ;
            position_message_duration_job_error = "bottom" ;
            row_availabilities.classList.add("center");
            row_province_client_advertise.classList.add("col-7");
            row_province_client_advertise.classList.remove("col-4");
            row_due_date_advertise.classList.add("col-7");
            row_due_date_advertise.classList.remove("col-4");
            row_due_date_advertise.style.marginLeft = "42%";
            input_quote_container.classList.add("col-12");
            input_quote_container.classList.remove("col");
            row_submit.classList.add("center");
            row_submit.classList.remove("flex-row-reverse");
        }else{
            position_message_quote_error = "left" ;
            position_message_duration_job_error = "right" ;
            row_province_client_advertise.classList.add("col-4");
            row_province_client_advertise.classList.remove("col-7");
            row_due_date_advertise.classList.add("col-4");
            row_due_date_advertise.classList.remove("col-7");
            row_due_date_advertise.style.marginLeft = "0%";
            row_availabilities.classList.remove("center");
            input_quote_container.classList.add("col");
			input_quote_container.classList.remove("col-12");
            row_submit.classList.add("flex-row-reverse");
            row_submit.classList.remove("center");
        } 
    }

    responsive();
    $(window).resize(responsive);
    
   

    return form ;
}




