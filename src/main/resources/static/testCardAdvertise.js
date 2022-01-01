
// ------------------------------------------------------------------------------------------------------
// ESEMPIO UTILIZZO CARD_PREVIEW e CARD_DETAILS
var body = document.body ;

var card_preview1 = createCard({
    id_advertise : 132132 , 
    title : "ma dai è reale",
    description : "ciao questa dnlsnfjd è una descrizione di prova!!!ciao questa è una descrizione di prova!!!ciao questa è una descrizione di prova!!!ciao questa è una descrizione di prova!!!ciao questa è una descrizione di prova!!!ciao questa è una descrizione di prova!!!ciao questa è una descrizione di prova!!!ciao questa è una descrizione di prova!!!ciao questa è una descrizione di prova!!!",
    username_client : "instafiore",
    province : "Montepaone",
    date : "29/12/2021",
    url_img : "images/testImage.png" ,
    }) ; 

body.appendChild(card_preview1);

var card_preview2 = createCard({
    id_advertise : 132132 , 
    title : "speriamo di prendere 30 testo lungo per vedere come si comporta",
    description : "ciao questa è una descrizione di prova!!!ciao questa è una descrizione di prova!!!ciao questa è una descrizione di prova!!!",
    username_client : "giomarasco",
    province : "Montepaone",
    date : "29/12/2021",
    url_img : "images/testImage.png" ,
    }) ; 

    
body.appendChild(card_preview2);

var card_preview3 = createCard({
    id_advertise : 132132 , 
    title : "ma ricca? testo meno lungo ",
	description : "Una descrizione corta di prova    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere atque repudiandae ea magnam. Esse, vel perferendis! Et doloremque dignissimos magnam quam vitae dolor! Ducimus, magnam nisi natus cumque sint voluptates?Una descrizione corta di prova    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere atque repudiandae ea magnam. Esse, vel perferendis! Et doloremque dignissimos magnam quam vitae dolor! Ducimus, magnam nisi natus cumque sint voluptates?Una descrizione corta di prova    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere atque repudiandae ea magnam. Esse, vel perferendis! Et doloremque dignissimos magnam quam vitae dolor! Ducimus, magnam nisi natus cumque sint voluptates?Una descrizione corta di prova    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere atque repudiandae ea magnam. Esse, vel perferendis! Et doloremque dignissimos magnam quam vitae dolor! Ducimus, magnam nisi natus cumque sint voluptates?Una descrizione corta di prova    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere atque repudiandae ea magnam. Esse, vel perferendis! Et doloremque dignissimos magnam quam vitae dolor! Ducimus, magnam nisi natus cumque sint voluptates?Una descrizione corta di prova    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere atque repudiandae ea magnam. Esse, vel perferendis! Et doloremque dignissimos magnam quam vitae dolor! Ducimus, magnam nisi natus cumque sint voluptates?Una descrizione corta di prova    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere atque repudiandae ea magnam. Esse, vel perferendis! Et doloremque dignissimos magnam quam vitae dolor! Ducimus, magnam nisi natus cumque sint voluptates?Una descrizione corta di prova    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere atque repudiandae ea magnam. Esse, vel perferendis! Et doloremque dignissimos magnam quam vitae dolor! Ducimus, magnam nisi natus cumque sint voluptates?Una descrizione corta di prova    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere atque repudiandae ea magnam. Esse, vel perferendis! Et doloremque dignissimos magnam quam vitae dolor! Ducimus, magnam nisi natus cumque sint voluptates?Una descrizione corta di prova    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere atque repudiandae ea magnam. Esse, vel perferendis! Et doloremque dignissimos magnam quam vitae dolor! Ducimus, magnam nisi natus cumque sint voluptates?",
    username_client : "simoneLello",
    province : "Montepaone Lido",
    date : "29/12/2021",
    url_img : "images/testImage.png" ,
    }) ; 

body.appendChild(card_preview3);

var card_preview4 = createCard({
    id_advertise : 132132 , 
    title : "mannaia!",
    description : "Una descrizione corta di prova",
    username_client : "ndria",
    province : "Montepaone Lido San Gianni",
    date : "29/12/2021",
    url_img : "images/testImage.png" ,
    }) ; 

body.appendChild(card_preview4);

card_preview1.show();
card_preview2.show();
card_preview3.show();
card_preview4.show();
// ------------------------------------------------------------------------------------------------------

