function createPreviewCard(data){

    let card = document.createElement("div");
    card.className = "card shadow rounded";
    card.style = "width: 18rem;";
    
    let card_body = document.createElement("div");
    card_body.className = "card-body" ;

    let card_header = document.createElement("div");
    card_header.className = "row";

    let card_title = document.createElement("h5");
    card_title.className = "col-6 card-title";
    card_title.style = "width: 70%;";
    card_title.innerHTML = data.title ;

    let card_button = document.createElement("a");
    card_button.className = "col-2 btn" ;
    card_button.style = "margin-left: 10%; background-color: #f4a261; height: 50%;";
    card_button.href = "#" ;

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
    card_description.style = "height : 150px; overflow-y: scroll;";
    card_description.innerHTML = data.description ;

    let card_information = document.createElement("div");
    card_information.className = "row" ;

    let card_province = document.createElement("p");
    card_province.className = "col-6 card-text" ;
    card_province.innerHTML = data.province ;

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


    return card ;

}


body = document.body ;

card = createPreviewCard({
                    title : "cerco un reale con esperienza",
                    description : "ciao questa è una descrizione di prova!!!",
                    username_client : "instafiore",
                    province : "Montepaone",
                    date : "29/12/2021",
                    url_img : "images/testImage.png"
                    }) ;

body.appendChild(card);
