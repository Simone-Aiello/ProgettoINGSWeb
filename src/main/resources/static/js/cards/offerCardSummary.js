
function sendOffer(offer){
	
	checkType(offer,"Offer");
	
	let data = JSON.stringify(offer);
	
	$.ajax({
		type: "POST",
		url: "/registerOffer",
		contentType: "application/json",
		data: data,
		success: (response) => {
			console.log(response);
		},
		error: (xhr) => {
			console.log(xhr.message);
		}
	});
}


function createOfferCardSummary(data){
	//card
	let card = document.createElement('div');
	card.className = 'card shadow rounded';
	card.style.margin = 'margin: 5px'; 
	card.style.maxWidth = "400px";
	
	//card body
	let card_body = document.createElement('div');
	card_body.className = 'card-body';
	
	
	//first row : title + close button
	let titleRow = document.createElement('div');
	titleRow.className = 'row';
	let title = document.createElement('h5');
	title.innerHTML = 'Proposta compilata per : ' + data.title;
	title.className = 'col-10 card-title';
	
	let closeButton = document.createElement('button');
	closeButton.className = 'col-2 btn';
	closeButton.style = "display: flex; justify-content: center;align-items: center;"
	let closeIcon = document.createElement('i');
	closeIcon.className = 'far fa-times-circle';
	closeIcon.style = 'font-size : 24px; color : #f4a261 ;';
	closeButton.appendChild(closeIcon);

	
	closeButton.onmouseover = () => {
        gsap.to(closeButton,{ scale: 1.1 ,ease : "elastic.out(1, 0.3)" , rotate : "-90deg"} );
    }

    closeButton.onmouseleave = () => {
        gsap.to(closeButton,{ scale: 1 , ease : "elastic.out(1, 0.3)" , rotate : "0deg"} );
    }
	
	titleRow.appendChild(title);
	titleRow.appendChild(closeButton);

	
	//second row : username_client + province + due-date
	let infoRow = document.createElement('div');
	infoRow.className = 'row mt-2';
	
	//username_client
	let username_clientCol = document.createElement('div');
	username_clientCol.className = 'col';
	let username_client = document.createElement('p');
	username_client.className = 'card-subtitle text-muted small';
	username_client.id = 'username_client';
	username_client.innerHTML = '@' + data.account.username;
	username_clientCol.appendChild(username_client);
	infoRow.appendChild(username_clientCol);
	
	//province
	let provinceCol = document.createElement('div');
	provinceCol.className = 'col';
	let provinceLabel = document.createElement('p');
	provinceLabel.className = 'card-subtitle text-muted small';
	provinceLabel.innerHTML = 'Provincia';
	
	let province = document.createElement('p');
	province.className = 'small';
	province.innerHTML = data.province;
	
	provinceCol.appendChild(provinceLabel);
	provinceCol.appendChild(province);
	infoRow.appendChild(provinceCol);
	
	//due-date
	let dueDateCol = document.createElement('div');
	dueDateCol.className = 'col';
	let dueDateLabel = document.createElement('p');
	dueDateLabel.className = 'card-subtitle text-muted small';
	dueDateLabel.innerHTML = 'Data di scadenza';
	
	let date = document.createElement('p');
	date.className = 'small';
	date.innerHTML = date_from_db_to_ISO(data.expiryDate) ;
	
	dueDateCol.appendChild(dueDateLabel);
	dueDateCol.appendChild(date);
	infoRow.appendChild(dueDateCol);
	
	
	//third row : job's dates + job's execution time
	let dateTimeInfoRow = document.createElement('div');
	dateTimeInfoRow.className = 'row';
	
	//date drop-down
	let datesDropDown = document.createElement('div');
	datesDropDown.className = 'col dropdown';
	//button
	let datesButton = document.createElement('button');
	datesButton.type = 'button';
	datesButton.className = 'btn btn-primary dropdown-toggle';
	datesButton.setAttribute('data-bs-toggle','dropdown');
	datesButton.setAttribute('data-toggle','dropdown');
	datesButton.innerHTML = 'Vedi date disponibili';
	datesButton.style = 'background-color : #f4a261; border:none';
	
	//button icon
	let icon = document.createElement('span');
	icon.className = 'caret';
	
	let droppedMenu = document.createElement('ul');
	droppedMenu.className = 'dropdown-menu';
	droppedMenu.style.backgroundColor = "#f4a261" ;
	droppedMenu.style.borderRadius = "10px";

	//for each data add it to dropdown menu
	data.availabilities.forEach((item) =>{
		let li = document.createElement('li');
		li.style = "margin-left : 10px"
		li.innerHTML = item;
		droppedMenu.appendChild(li);
	});
	datesButton.appendChild(icon);
	
	datesDropDown.appendChild(datesButton);
	datesDropDown.appendChild(droppedMenu);
	
	
	//job execution time
	let jobTimeInfo = document.createElement('div');
	jobTimeInfo.className = 'col mt-2';
	let jobTimeLabel = document.createElement('label');
	jobTimeLabel.className = 'card-subtitle text-muted small';
	jobTimeLabel.innerHTML = 'Durata lavoro : ' + data.job_duration;
	jobTimeInfo.appendChild(jobTimeLabel);
		
	dateTimeInfoRow.appendChild(datesDropDown);
	dateTimeInfoRow.appendChild(jobTimeInfo);
	
	//fourth row : price 
	let priceRow = document.createElement('div');
	priceRow.className = 'row mt-3';
	//container
	let priceContainer = document.createElement('div');
	priceContainer.className = 'col-12 input-group';
	priceContainer.style.display = "flex";
	priceContainer.style.justifyContent = "start";
	priceContainer.style.AlingItems = "center";
	//price
	let price = document.createElement('input');
	price.className = 'card-control';
	price.type = "text";
	price.readOnly = "readonly";
	price.id = "amount";
	price.value = data.quote;
	price.style.width = "100px";
	let sideInfo = document.createElement('div');
	sideInfo.className = 'input-group-append';
	let sideInfoSpan = document.createElement('span');
	sideInfoSpan.className = 'input-group-text';
	sideInfoSpan.innerHTML = '&#128;';
	sideInfoSpan.style = "width: 20px;height: 100%;padding: 2px;display: flex;justify-content: center; align-items: center; margin: 0; padding: 0;" ;
	sideInfo.appendChild(sideInfoSpan);
	priceContainer.appendChild(price);
	priceContainer.appendChild(sideInfo);

	//filling div
	let fillingDiv = document.createElement('div');
	fillingDiv.className = 'col';
	
	priceRow.appendChild(priceContainer);
	priceRow.appendChild(fillingDiv);
	
	
	//fiveth row : description text area 
	let textAreaRow = document.createElement('div');
	textAreaRow.className = 'row mt-2 shadown';
	textAreaRow.style.padding = "15px";
	
	let textArea = document.createElement('textarea');
	textArea.className = 'col input-group rounded';
	textArea.rows = '5';
	textArea.style = 'border-color : #e3e3e3';
	textArea.readOnly = 'readonly';
	textArea.value = data.description;
	textAreaRow.appendChild(textArea);
	
	
	//accept button
	let buttonDiv = document.createElement('div');
	buttonDiv.className = 'd-flex flex-row-reverse mt-3';
	let button = document.createElement('button');
	button.className = 'btn btn-primary';
	button.id = 'accept-button';
	button.innerHTML = 'Conferma';
	button.style = 'background-color : #f4a261; border:none';

	button.onmouseover = () => {
		gsap.to(button,{ scale: 1.1 ,ease : "elastic.out(1, 0.3)"  });
	}


	button.onmouseleave = () => {
		gsap.to(button,{ scale: 1 ,ease : "elastic.out(1, 0.3)"  });
	}


	button.onclick = () => {
		let offer = data.offer_builder.build();
		sendOffer(offer);
	}

	let button_back = document.createElement('button');
	button_back.className = 'btn btn-primary';
	button_back.id = 'exit-button';
	button_back.style = 'background-color : red ; border:none ; margin-right : 20px ; padding: 0 10px; ';
	
	let icon_button_back = document.createElement('icon');
	icon_button_back.className = "fa fa-angle-double-left";
	
	button_back.appendChild(icon_button_back);
	
	button_back.onmouseover = () => {
		gsap.to(button_back,{ scale: 1.1 ,ease : "elastic.out(1, 0.3)"  });
	}


	button_back.onmouseleave = () => {
		gsap.to(button_back,{ scale: 1 ,ease : "elastic.out(1, 0.3)"  });
	}


	buttonDiv.appendChild(button);
	buttonDiv.appendChild(button_back);

	// CLOSE CARD
	card.close  = () => {
        
    	const card_timeline = gsap.timeline({defaults:{duration:0.65,ease : "elastic.out(1, 0.3)"}});
        
        card_timeline.to(card,{ scale : 0.4 });  
        card_timeline.to(card,{ scale : 0.8 });  
        card_timeline.to(card,{ opacity :0 } ,'<');  
        card_timeline.to(card,{ visibility : "hidden" , duration : 0 , display : "none"});  
    
		let totalTime = card_timeline.totalDuration() ;

		setTimeout(data.cardOfferForm.show,totalTime*1000)
        return  totalTime ;
    }
	
	// CLOSE ALL
    card.exit = () => {


        const modal_timeline = gsap.timeline({defaults:{duration:0.65,ease : "elastic.out(1, 0.3)"}});
        
        modal_timeline.to(card,{ scale : 0.4 });  
        modal_timeline.to(card,{ scale : 0.8 });  
        modal_timeline.to(data.modal_bg,{ opacity :0 } ,'<');  
        modal_timeline.to(data.modal_bg,{ visibility : "hidden" , duration : 0 , display : "none"});  
        document.body.style.overflow = "auto" ;


        return modal_timeline.totalDuration() ;
    }

	closeButton.onclick = card.exit ;



	card.close  = () => {
        
    	const card_timeline = gsap.timeline({defaults:{duration:0.65,ease : "elastic.out(1, 0.3)"}});
        
        card_timeline.to(card,{ scale : 0.4 });  
        card_timeline.to(card,{ scale : 0.8 });  
        card_timeline.to(card,{ opacity :0 } ,'<');  
        card_timeline.to(card,{ visibility : "hidden" , duration : 0 , display : "none"});  
    
		let totalTime = card_timeline.totalDuration() ;

		setTimeout(data.cardOfferForm.show,totalTime*1000)
        return  totalTime ;
    }

	button_back.onclick = () => {

		let time = card.close();
		setTimeout(data.cardOfferForm.show,time*1000);
	}

	card.show  = () => {
        
    	gsap.fromTo(card,{scale: 0.4 , opacity : 0 , visibility : "hidden" , display: "none"} , {scale : 1 , opacity :1 , duration : 1 , ease : "elastic.out(1, 0.3)", display: "flex" , visibility: "visible"});     

        return 1 ;
    }

	//build the card
	card_body.appendChild(titleRow);
	card_body.appendChild(infoRow);
	card_body.appendChild(dateTimeInfoRow);
	card_body.appendChild(priceRow);
	card_body.appendChild(textAreaRow);
	card_body.appendChild(buttonDiv);
	card.appendChild(card_body);
	return card;
	
}
