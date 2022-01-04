


function createCardOfferForm(data,card_advertise){

    let modal_bg = document.createElement("div");
    modal_bg.className = "modal-bg-offer-form";

    let card = document.createElement("div");
    card.className = "card shadow rounded card-offer-form" ;

    let card_body = document.createElement("div");
    card_body.className = "card-body" ;

    let card_header = createRow();
    card_header.classList.add("space-between");
    
    let card_title = document.createElement("h5");
    card_title.className = "col-10 card-title";
    card_title.innerHTML = "Compila proposta per: " + data.title ;
    card_title.style.padding = 0 ;    

    let exit_button = document.createElement("button");
    exit_button.className = "btn  far fa-times-circle close-button-offer-form" ;
    
    exit_button.onmouseover = () => {
        gsap.to(exit_button,{ scale: 1.1 ,ease : "elastic.out(1, 0.3)" , rotate : "-90deg"} );
    }

    exit_button.onmouseleave = () => {
        gsap.to(exit_button,{ scale: 1 , ease : "elastic.out(1, 0.3)" , rotate : "0deg"} );
    }

    card_header.appendChild(card_title);
    card_header.appendChild(exit_button);

    let row_information_user_advertise = createRow();
    row_information_user_advertise.classList.add("space-between");

    let card_username_client = document.createElement("a");
    card_username_client.className = "card-subtitle text-muted small col-3 text-decoration-none" ;
    card_username_client.innerHTML = "@"+ data.username_client ;
    card_username_client.style.padding = 0 ;

    let row_province = createRow();
    row_province.classList.add("col-4");

    let label_province = document.createElement("p");
    label_province.className = "card-subtitle text-muted small" ;
    label_province.innerHTML = "Provincia";


    let card_province = document.createElement("p");
    card_province.className = "card-text" ;
    card_province.innerHTML = data.province ;
    card_province.style.alignSelf = "center" ;

    row_province.appendChild(label_province);
    row_province.appendChild(card_province);

    let row_due_date = createRow();
    row_due_date.classList.add("col-5");

    let label_due_date = document.createElement("p");
    label_due_date.className = "card-subtitle text-muted small" ;
    label_due_date.innerHTML = "Data di scadenza";

    let card_due_date = document.createElement("p");
    card_due_date.className = "card-text" ;
    card_due_date.innerHTML = data.date ;

    row_due_date.appendChild(label_due_date);
    row_due_date.appendChild(card_due_date);

    row_information_user_advertise.appendChild(card_username_client);
    row_information_user_advertise.appendChild(row_province);
    row_information_user_advertise.appendChild(row_due_date);

    let row_date = createRow() ;
    row_date.style.margin = "10px 0";
    row_date.style.position = "relative";

    let container_dropdown_dates = document.createElement("div");
    container_dropdown_dates.className = "container-dropdown-dates";

    let label_no_dates_added = document.createElement("h1");
    label_no_dates_added.innerHTML = "Nessuna data inserita";
    label_no_dates_added.style.fontSize = "12px";
    label_no_dates_added.style.margin = 0 ;
    
    container_dropdown_dates.appendChild(label_no_dates_added);

    let input_date = document.createElement("input");
    input_date.type = "date" ;
    input_date.className = "date-offer-form";

   
    let dates = [];
    let add_date_button = createButtonWithIcon("far fa-calendar-plus");

    let message_add_date = createMessage({
        element: add_date_button,
        message: "Inserisci una data in cui sei disponibile per effetturare il lavore",
        position : "left",
        type : "information",
    });

    add_date_button.onmouseover = () => {
        message_add_date.show();
    }

    add_date_button.onmouseleave = () => {
        message_add_date.close();
    }
   
    function createRowDropdownItem(date){

        let row_dropdown_item_date = createRow();
        row_dropdown_item_date.style.width = "100%";
        row_dropdown_item_date.value = date ;
    
        let dropdown_item_date = document.createElement("p");
        dropdown_item_date.style.padding = 0 ;
        dropdown_item_date.style.margin = 0 ;
        dropdown_item_date.style.display = "flex";
        dropdown_item_date.style.justifyContent = "center";
        dropdown_item_date.innerHTML = date;
        dropdown_item_date.className = "col-10";
    
        let dropdown_item_delete_date = createButtonWithIcon("far fa-calendar-minus");
        dropdown_item_delete_date.style.fontSize = "15px";
        dropdown_item_delete_date.style.width = "25px";
        dropdown_item_delete_date.style.height = "25px";

        dropdown_item_delete_date.onclick = () => {
            container_dropdown_dates.removeChild(row_dropdown_item_date);
            dates.splice(dates.indexOf(date),1);
            if(dates.length == 0)
                container_dropdown_dates.appendChild(label_no_dates_added);

        }   


        row_dropdown_item_date.appendChild(dropdown_item_date);
        row_dropdown_item_date.appendChild(dropdown_item_delete_date);
    
        return row_dropdown_item_date ;
    }

    add_date_button.onclick = () => {
        date_added = input_date.value ;

        if(date_added == "" || dates.indexOf(date_added) >   -1)
            return ;

        if(container_dropdown_dates.contains(label_no_dates_added))
            container_dropdown_dates.removeChild(label_no_dates_added);
        let new_row_dropdown_date_item = createRowDropdownItem(date_added);
        container_dropdown_dates.appendChild(new_row_dropdown_date_item);

        dates.push(date_added);

    }


    let show_dates = createButtonWithIcon("far fa-caret-square-down");

    let message_show_dates= createMessage({
        element: show_dates,
        message: "Mostra tutte le date inserite",
        position : "right",
        type : "information",
    });


    let show_date_boolean = true ;

    show_dates.onclick = () => {

        const timeline = gsap.timeline({defaults:{duration:0.25,ease:"power1.out"}});

        state_container_1 = {y : -10 , opacity : 0 , scale : 0.8};
        state_container_2 = {y: 0 , opacity : 1 , scale:1 , visibility : "visible"};
        if(show_date_boolean){
            show_dates.classList.remove("fa-caret-square-down");
            show_dates.classList.add("fa-caret-square-up");
            timeline.fromTo(container_dropdown_dates,state_container_1,state_container_2);
            show_date_boolean = false ;
        }else{
            show_dates.classList.add("fa-caret-square-down");
            show_dates.classList.remove("fa-caret-square-up");
            timeline.fromTo(container_dropdown_dates,state_container_2,state_container_1);
            timeline.to(container_dropdown_dates,{visibility : "hidden"});
            show_date_boolean = true ;
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

    row_date.appendChild(add_date_button); 
    row_date.appendChild(input_date); 
    row_date.appendChild(show_dates); 
    row_date.appendChild(container_dropdown_dates);

    let row_quote_duration_job = createRow();
    row_quote_duration_job.style.margin = "15px 0";
    row_quote_duration_job.style.marginLeft = "0" ;


    let input_quote_container = document.createElement("div");
    input_quote_container.className = "input-group  col mb-3 mt-2 shadow ";
    input_quote_container.classList.add("space-between");
    input_quote_container.style.padding = 0 ; 
    

    let input_quote = document.createElement("input");
    input_quote.className = "form-control"
    input_quote.type = "text" ;
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

    let button_submit = document.createElement("button");
    button_submit.className = "btn  background-color-card-offer-form border-0 submit-offer-button" ;
    button_submit.innerHTML = "Invia proposta" ;
    button_submit.style.padding = "7px";
    button_submit.style.textAlign = "center";


    let row_submit = document.createElement("div");
    row_submit.className = "d-flex flex-row-reverse m-2";
    
    row_submit.appendChild(button_submit);
   
    
    card_body.appendChild(card_header);
    card_body.appendChild(row_information_user_advertise)
    card_body.appendChild(row_date);
    card_body.appendChild(row_quote_duration_job);
    card_body.appendChild(card_description);
    card_body.appendChild(row_submit);

    card.appendChild(card_body);
    
    
    modal_bg.appendChild(card);
    
    card.close = () => {

        const inner_item_timeline = gsap.timeline({defaults:{duration:0.25,ease:"power1.out"}});

        inner_item_timeline.to(card_title,{x : -10, opacity : 0});
        inner_item_timeline.to(exit_button,{y : -10, opacity : 0},'<');
        inner_item_timeline.to(row_quote_duration_job,{x : -20, opacity : 0 });
        inner_item_timeline.to(card_description,{x : 20, opacity : 0 }, '<');
        inner_item_timeline.to(button_submit,{y : -10, opacity : 0});


        const modal_timeline = gsap.timeline({defaults:{duration:0.65,ease : "elastic.out(1, 0.3)"}});
        
        modal_timeline.to(card,{ scale : 0.4 });  
        modal_timeline.to(card,{ scale : 0.8 });  
        modal_timeline.to(modal_bg,{ opacity :0 } ,'<');  
        modal_timeline.to(modal_bg,{ visibility : "hidden" , duration : 0 });  
        document.body.style.overflow = "auto" ;

        return modal_timeline.totalDuration() ;
    }

    card.show  = () => {
        
        if(card.appended == null){
            card.appended = true ;
            document.body.appendChild(modal_bg);
        }else{
            gsap.to(modal_bg,{opacity : 1 , duration : 1 });  
            modal_bg.style.visibility = "visible" ;
        }
        
        document.body.style.overflow = "hidden" ;

        const tl = gsap.timeline({defaults:{duration:0.25,ease:"power1.out"}});

        tl.fromTo(card_title,{x : -10, opacity : 0},{x : 0, opacity : 1});
        tl.fromTo(exit_button,{y : -10, opacity : 0},{y : 0, opacity : 1},'<');
        tl.fromTo(row_quote_duration_job,{x : -20, opacity : 0},{x : 0, opacity : 1 });
        tl.fromTo(card_description,{x : 20, opacity : 0},{x : 0, opacity : 1 }, '<');
        tl.fromTo(button_submit,{y : -10, opacity : 0},{y : 0, opacity : 1});

        gsap.fromTo(card,{scale: 0.4 , opacity : 0} , {scale : 1 , opacity :1 , duration : 1 , ease : "elastic.out(1, 0.3)"});     


        return tl.duration() ;
    }
    
    exit_button.onclick = card.close ;

    return card ;
}