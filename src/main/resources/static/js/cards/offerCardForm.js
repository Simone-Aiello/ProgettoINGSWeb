


function createCardOfferForm(data){

    let card = document.createElement("div");
    card.className = "card shadow rounded card-offer-form" ;

    let card_body = document.createElement("div");
    card_body.className = "card-body" ;

    let card_header = createRow();
    card_header.classList.add("space-between");
    
    let card_title = document.createElement("h5");
    card_title.className = "col-10 card-title";
    card_title.innerHTML = "Compila proposta per: " + data.advertise_title ;
    card_title.style.padding = 0 ;    

    let exit_button = createButtonWithIcon("far fa-times-circle");
    exit_button.classList.add("close-button-offer-form");
    exit_button.classList.add("color-card-offer-form");

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
    card_province.innerHTML = data.province_client_advertise ;
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
    card_due_date.innerHTML = data.due_date_client_advertise ;

    row_due_date.appendChild(label_due_date);
    row_due_date.appendChild(card_due_date);

    row_information_user_advertise.appendChild(card_username_client);
    row_information_user_advertise.appendChild(row_province);
    row_information_user_advertise.appendChild(row_due_date);

    let row_date = createRow() ;
    row_date.style.margin = "10px 0";

    let input_date = document.createElement("input");
    input_date.type = "date" ;
    input_date.className = "date-offer-form";

    let add_date_button = createButtonWithIcon("far fa-calendar-plus");
    let show_dates = createButtonWithIcon("far fa-caret-square-down");

    let row_quote_hours = createRow();
    row_quote_hours.style.margin = "5px 0";
    row_quote_hours.style.marginLeft = "0" ;


    let input_quote_container = document.createElement("div");
    input_quote_container.className = "input-group col mb-3 mt-2 ";
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

    let prova = document.createElement("input");
    prova.className = "col-6";

    input_quote_container.appendChild(input_quote);
    input_quote_container.appendChild(euro_label_container);

    row_quote_hours.appendChild(input_quote_container);
    row_quote_hours.appendChild(prova);

    let job_duration_container = createRow();
    
    // let stepper = document.createElement("div");
    // stepper.className = "input"

    let card_description = document.createElement("textarea"); 
    card_description.className = "form-control description-offer-form"  ;
    card_description.placeholder = "Inserisci una descrizione";

    let button_submit = document.createElement("button");
    button_submit.className = "btn btn-primary background-color-card-offer-form border-0" ;
    button_submit.innerHTML = "Invia proposta" ;

    let row_submit = document.createElement("div");
    row_submit.className = "d-flex flex-row-reverse m-2";
    
    row_submit.appendChild(button_submit);
    

    row_date.appendChild(add_date_button); 
    row_date.appendChild(input_date); 
    row_date.appendChild(show_dates); 
    
    card_body.appendChild(card_header);
    card_body.appendChild(row_information_user_advertise)
    card_body.appendChild(row_date);
    card_body.appendChild(row_quote_hours);
    card_body.appendChild(card_description);
    card_body.appendChild(row_submit);

    card.appendChild(card_body);

    return card ;
}