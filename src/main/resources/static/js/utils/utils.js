

function createRow(){
    let row = document.createElement("div");
    row.className = "row";
    row.style.margin = "5px 0";
    return row ;
}

function checkType(value,type){
	if(type == "Number")
		value = Number(value);
    else if(type == "Date")
        isDate(value);
	else if(value.constructor.name != type)
		throw new Error("The value: "+value+" is not a "+type);
}

function createButtonWithIcon(icon){
    let button = document.createElement("button");
    button.className = "shadow icon-button "+icon ;
    return button ;
}

var _regex_date = /^(\d{4})-(\d{2})-(\d{2}).*$/;

function isDate(date){
    console.log(date);
	if (!_regex_date.test(date))
		throw new Error("La data inserita non è valida");
}

var date_from_db_to_ISO = (value) =>{
	let regex = /^(\d{4})-(\d{2})-(\d{2}).*$/	
	let match = value.match(regex);
	return match[3]+"/"+match[2]+"/"+match[1];
}


function isBeforeNow(date) {

    isDate(date);

    var match = date.match(_regex_date);

    let day_user = parseInt(match[3]);
    let month_user = parseInt(match[2]);
    let year_user = parseInt(match[1]);

    let today = new Date();

    let today_day = today.getDate();
    let today_month = today.getMonth() + 1;
    let today_year = today.getFullYear();


    if(today_year != year_user){
        if(today_year > year_user)
            return true ;
        return false;
    }

    if(today_month != month_user){
        if(today_month > month_user)
            return true ;
        return false;
    }

    if(today_day != day_user){
        if(today_day > day_user)
            return true ;
        return false;
    }

    return false ;
}

function isToday(date){
    
    isDate(date);
    var match = date.match(_regex_date);

    let day_date = parseInt(match[3]);
    let month_date = parseInt(match[2]);
    let year_date = parseInt(match[1]);

    let today = new Date();

    let today_day = today.getDate();
    let today_month = today.getMonth() + 1;
    let today_year = today.getFullYear();

    return day_date == today_day && month_date == today_month && today_year == year_date ;
}

function isAfterNowOrToday(date) {
	return !isBeforeNow(date) ;
}


function isAfterNow(date){

    isDate(date);

    var match = date.match(_regex_date);

    let day_user = parseInt(match[3]);
    let month_user = parseInt(match[2]);
    let year_user = parseInt(match[1]);

    let today = new Date();

    let today_day = today.getDate();
    let today_month = today.getMonth() + 1;
    let today_year = today.getFullYear();

    if(today_year != day_user){
        if(today_year > day_user)
            return false ;
        return true;
    }

    if(today_month != month_user){
        if(today_month > month_user)
            return false ;
        return true;
    }

    if(today_day != day_user){
        if(today_day > day_user)
            return false ;
        return true;
    }

    return true ;
}


function addBorder(element){
    element.style.border = "1px solid black" ;
}

function removeBorder(element){
    element.style.border = "none" ;
}

function createMessage(data){

    data.element.style.position = "relative";

    let message_container = document.createElement("div");
    message_container.style.zIndex = "1";
    message_container.className = "alert-getjobs shadow"
    message_container.showing = false ;
    
    const timeline = gsap.timeline({defaults:{duration:0.25,ease:"power1.out"}});

    state_container_1 = {opacity : 0 };
    state_container_2 = {opacity : 1  , visibility : "visible"};

    if(data.position == "top"){
        state_container_1.y = +10 ;
        state_container_2.y = 0 ;
        message_container.classList.add("alert-top");
    }else if(data.position == "left"){
        state_container_1.x = +10 ;
        state_container_2.x = 0 ;
        message_container.classList.add("alert-left");
    }else if(data.position == "right"){
        state_container_1.x = -10 ;
        state_container_2.x = 0 ;
        message_container.classList.add("alert-right");
    }else if(data.position == "bottom"){
        state_container_1.y = -10 ;
        state_container_2.y = 0 ;
        message_container.classList.add("alert-bottom");
    }

    message_container.close = () => {
        timeline.fromTo(message_container,state_container_2,state_container_1);
        timeline.to(message_container,{visibility:"hidden" , showing : false});
    }

    message_container.show = () => {

        if(message_container.showing)
            return ;
        message_container.showing = true ;
        timeline.fromTo(message_container,state_container_1,state_container_2);
        
        if(data.auto_close){
            
            let duration = 2 ;
            if(data.pause)
                duration = data.pause ;
            timeline.to(message_container,{duration: duration})
            message_container.close();
        }
    }

    data.element.appendChild(message_container);

    let message = document.createElement("h1");
    message.style.className = "text-muted shadow";  
    message.style.margin = 0 ;
    message.style.padding = 0 ;
    message.innerHTML = data.message;
    message.style.fontSize = "12px";

    if(data.type == "error"){
        message_container.style.backgroundColor = "rgba(255, 166, 158, 0.8)" 
        message_container.style.color = "#f94144";
    }else if(data.type == "default"){
        message_container.style.backgroundColor = "rgba(0, 48, 73, 0.6)" ;
        message_container.style.color = "white";
    }else if(data.type == "warning"){
        message_container.style.backgroundColor = "rgba(247, 127, 0, 0.5)" ;
        message_container.style.color = "black";
    }else if(data.type == "information"){
        message_container.style.backgroundColor = "rgba(234, 226, 183, 0.6)" ;
        message_container.style.color = "black";
    }

    message_container.appendChild(message);

    return message_container ;
}


function getAllAreas(containers){
    $.ajax({
        type: "GET",
        url: "/areas",
        contentType: "application/json",
        success: (areas) => {
          
            for(container of containers){
                for(let area of areas){
                    let button_icon = document.createElement('button')
                    button_icon.className = "icon-button-areas shadow button-areas-home "+area.icon;
                    let bool_area = true ;
                    button_icon.setAttribute('name', area.name);
                    button_icon.onclick = () => {
                        button_icon.setAttribute('selected',bool_area);
                        if(bool_area){

                            button_icon.style.color = "#95CD41" ;
                            bool_area = false;
                        }else{
                            button_icon.style.color = "white" ;
                            bool_area = true;
        
                        }
                    }
                    
                        container.appendChild(button_icon);
                }
            }
        },
        error: (xhr) => {
            console.log(xhr.message);
        }
    });
}

showModal = (modal) => {
    modal.style.setProperty('display', 'flex', 'important');
    document.body.style.overflowY = "hidden"; 
}
closeModal = (modal) => {
    modal.style.setProperty('display', 'none', 'important');
    document.body.style.overflowY = "auto"; 
}


function createDialog(params){

    // Modal bg
    let modal_bg = document.createElement("div");
    modal_bg.className = "modal-getjobs";
	    
    // Dialog
    let dialog = document.createElement("div");
    dialog.className = "dialog shadow rounded container-columns dialog-getjobs";
    dialog.id = "dialog-getjobs" ;
    
    // DEFINING CLOSE BUTTON 
    let close_button_dialog = document.createElement("button");
    close_button_dialog.className = "btn far fa-times-circle close-button-container-columns" ;

    close_button_dialog.onmouseover = () => {
        gsap.to(close_button_dialog,{ scale: 1.1 ,ease : "elastic.out(1, 0.3)" , rotate : "-90deg"} );
    }

    close_button_dialog.onmouseleave = () => {
        gsap.to(close_button_dialog,{ scale: 1 , ease : "elastic.out(1, 0.3)" , rotate : "0deg"} );
    }

    // Message
    let message_dialog = document.createElement('h1');
    message_dialog.className = "message-dialog rounded shadow";
    message_dialog.innerHTML = params.message ;

    // Container buttons
    let container_buttons_dialog = document.createElement('div');
    container_buttons_dialog.className = "container-buttons-dialog";
    
    // Button ok
    let ok_button = document.createElement('button');
    ok_button.className =  params.color_ok ? 'btn rounded '+ params.color_ok : 'btn btn-success',
    ok_button.innerHTML = params.message_ok_button ? params.message_ok_button : 'Ok'  ;

    // Button cancel
    let cancel_button = document.createElement('button');
    cancel_button.className = params.color_cancel ? 'btn rounded '+ params.color_cancel : 'btn btn-danger',
    cancel_button.innerHTML = params.message_cancel_button ? params.message_cancel_button : 'Annulla' ;

    if(params.cancel){
        container_buttons_dialog.appendChild(cancel_button);
    }
    container_buttons_dialog.appendChild(ok_button);

    dialog.appendChild(close_button_dialog);
    dialog.appendChild(message_dialog);
    dialog.appendChild(container_buttons_dialog);

    modal_bg.appendChild(dialog);


    dialog.close = () => {

        const inner_item_timeline = gsap.timeline({defaults:{duration:0.25,ease:"power1.out"}});

        inner_item_timeline.to(close_button_dialog,{y : -10, opacity : 0},'<');
        inner_item_timeline.to(message_dialog,{x : -20, opacity : 0 });
        inner_item_timeline.to(cancel_button,{x : 20, opacity : 0 }, '<');
        inner_item_timeline.to(ok_button,{y : -10, opacity : 0});


        const modal_timeline = gsap.timeline({defaults:{duration:0.7,ease : "elastic.out(1, 0.3)"}});
        
        modal_timeline.to(dialog,{ scale : 0.4 });  
        modal_timeline.to(dialog,{ scale : 0.8 });  
        modal_timeline.to(modal_bg,{ opacity :0 } ,'<');  
        modal_timeline.to(modal_bg,{ visibility : "hidden" , duration : 0 , display: "none"});  
        document.body.style.overflow = "auto" ;
        
        setTimeout(()=> {document.body.removeChild(modal_bg)}, modal_timeline.totalDuration() * 2000);

        return modal_timeline.totalDuration() ;
    }

    dialog.show  = () => {

        document.body.appendChild(modal_bg);
        gsap.to(modal_bg,{opacity : 1 , duration : 1 });  
        
        modal_bg.style.visibility = "visible" ;
        modal_bg.style.display = "flex" ;
            
        document.body.style.overflow = "hidden" ;
        const tl = gsap.timeline({defaults:{duration:0.25,ease:"power1.out"}});

        tl.fromTo(message_dialog,{x : -10, opacity : 0},{x : 0, opacity : 1});
        tl.fromTo(close_button_dialog,{y : -10, opacity : 0},{y : 0, opacity : 1},'<');
        tl.fromTo(ok_button,{x : -20, opacity : 0},{x : 0, opacity : 1 });
        tl.fromTo(cancel_button,{x : 20, opacity : 0},{x : 0, opacity : 1 }, '<');

        gsap.fromTo(dialog,{scale: 0.4 , opacity : 0} , {scale : 1 , opacity :1 , duration : 1 , ease : "elastic.out(1, 0.3)"});     
    }

    close_button_dialog.onclick = dialog.close ;

    ok_button.onclick = () => {
        let totalTime = dialog.close();
        if(params.ok){
            setTimeout(params.ok,totalTime*1000);
        }
    }

    cancel_button.onclick = () => {
        let totalTime = dialog.close();
        if(params.cancel){
            setTimeout(params.cancel,totalTime*1000);
        }
    }

    return dialog ;
}





