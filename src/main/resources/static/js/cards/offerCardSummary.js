
var card_summary = null ;

function sendOffer(offer, card){
	card_summary = card ;
	checkType(offer,"Offer");
	let data = JSON.stringify(offer) ;
	console.log(data);
	$.ajax({
		type: "POST",
		url: "/registerOffer",
		contentType: "application/json",
		data: data,
		success: (response) => {
			let dialog = createDialog({
				message : 'La tua proposta è stata presa in carico',
			});
			dialog.show();
		},
		error: (xhr) => {
			response = JSON.parse(xhr.responseText) ;
			if(response.status == 401){
				let dialog = createDialog({
					message : JSON.parse(xhr.responseText).message,
					message_ok_button : 'Login',
					message_cancel_button : 'Chiudi',
					cancel : () =>{},
					ok : createLoginModal,
				});
				dialog.show();
			}
			else if(response.status == 405){
				let dialog = createDialog({
					message : JSON.parse(xhr.responseText).message,
					message_ok_button : 'Re-invia email',
					message_cancel_button : 'Indietro',
					cancel : card.show,
					ok : ()=> {	
						$.ajax({
							type : 'POST',
							url: "/sendVerificationMail",
							contentType : 'application/json' ,
							data : ' ' ,
							success : (response) =>{
								let dialog = createDialog({
									message : 'Email inviata ',
									ok : card.show,
								});
								dialog.show();
							},
							error : (xhr) => {
								let dialog = createDialog({
									message : 'Errore nel sistema, riprovare in un secondo momento',
								});
								dialog.show();
							}
						});
					 },
					color_ok : 'btn-light',
					color_cancel : 'btn-light',
				});
				dialog.show();
			}
			else if(response.status == 406){
				let dialog = createDialog({
					message : JSON.parse(xhr.responseText).message,
					ok : () => {
						document.getElementById('container-advertises').refresh();
					}
				});
				dialog.show();
			}
			else if(response.status == 500){
				let dialog = createDialog({
					message : 'Errore nel sistema, riprovare in un secondo momento',
				});
				dialog.show();
			}else{
				let dialog = createDialog({
					message : 'Errore anomalo nel sistema, riprovare in un secondo momento',
				});
				dialog.show();
			}
		}
	});
}

//Call this function once the user has logged in
function accountLoggedIn(){
	$(".navbar").remove();
	$("dropdown-notification").remove();
	$("#staticBackdropLogin").modal("toggle");
	$("#staticBackdropLogin").remove();
	document.getElementById('container-advertises').refresh();
	if(!checkAccountType(accountType, "w")){

        let dialog = createDialog({
            message : "Hai effettuato l\'accesso con un account che non è un lavoratore. Solo i lavoratori possono proporsi per un annuncio." ,
        });
        dialog.show();

		let navUser = `<li class="nav-item"><a class="nav-link active"
							href="/showMyAdvertises">I tuoi annunci</a></li>
						<li class="nav-item"><a class="nav-link active"
							href="/AdvertisePublication">Inserisci annuncio</a></li>` ;
		
		let navAdmin = `<li class="nav-item"><a class="nav-link active"
							href="/administratorProfilesManager">Gestisci account</a></li>
						<li class="nav-item"><a class="nav-link active"
							href="/administratorAreasManager">Gestisci ambiti di lavoro</a></li>` ;	
							
		let navBarFinal = checkAccountType(accountType, "u") ? navUser : navAdmin ; 

		console.log(navBarFinal);
		

		let navbarLogged = `<div class="dropdown-notification shadow-lg p-3 mb-5 bg-light rounded">
							</div>
							<nav class="navbar navbar-expand-lg navbar-light bg-light rounded">
								<div class="container-fluid">
									<a class="navbar-brand" href="/">Get Jobs</a>
									<button class="navbar-toggler" type="button"
										data-bs-toggle="collapse" data-bs-target="#navbarNav"
										aria-controls="navbarNav" aria-expanded="false"
										aria-label="Toggle navigation">
										<span class="navbar-toggler-icon"></span>
									</button>
									<div class="collapse navbar-collapse" id="navbarNav">
										<ul class="navbar-nav me-auto mb-2 mb-lg-0">
										<li class="nav-item"><a class="nav-link active" href="/">Home</a></li>
										<li class="nav-item"><a class="nav-link active"
											href="/profilePage?username=` + accountLogged.username() + `">Profilo</a></li>
										`
										 + navBarFinal + 
										`
										<li class="nav-item"><a class="nav-link active"
											href="/getChats">Messaggi</a></li>
										<li class="nav-item" id="notification-item"><a
											class="nav-link active" id="notification-bell">Notifiche <i
												class="fas fa-circle fa-xs" id="new-notification"></i></a></li>
										</ul>
										<ul class="navbar-nav mb-2 mb-lg-0">
											<li class="nav-item"><a class="nav-link active"
												href="/logout">Logout</a></li>
										</ul>
									</div>
								</div>
							</nav>`;
		
		console.log(navbarLogged);
		$("header").append(navbarLogged);
	}
	else{
	
        card_summary.show();

		//CHANGE NAVBAR TO LOGGED NAVBAR
		let navbarLogged = `<div class="dropdown-notification shadow-lg p-3 mb-5 bg-light rounded">
							</div>
							<nav class="navbar navbar-expand-lg navbar-light bg-light rounded">
								<div class="container-fluid">
									<a class="navbar-brand" href="/">Get Jobs</a>
									<button class="navbar-toggler" type="button"
										data-bs-toggle="collapse" data-bs-target="#navbarNav"
										aria-controls="navbarNav" aria-expanded="false"
										aria-label="Toggle navigation">
										<span class="navbar-toggler-icon"></span>
									</button>
									<div class="collapse navbar-collapse" id="navbarNav">
										<ul class="navbar-nav me-auto mb-2 mb-lg-0">
										<li class="nav-item"><a class="nav-link active" href="/">Home</a></li>
										<li class="nav-item"><a class="nav-link active"
											href="/profilePage?username=` + accountLogged.username() + `">Profilo</a></li>
										<li class="nav-item"><a class="nav-link active"
											href="/showMyOffers">Le tue offerte</a></li>
										<li class="nav-item"><a class="nav-link active"
											href="/getChats">Messaggi</a></li>
										<li class="nav-item" id="notification-item"><a
											class="nav-link active" id="notification-bell">Notifiche <i
												class="fas fa-circle fa-xs" id="new-notification"></i></a></li>
										</ul>
										<ul class="navbar-nav mb-2 mb-lg-0">
											<li class="nav-item"><a class="nav-link active"
												href="/logout">Logout</a></li>
										</ul>
									</div>
								</div>
							</nav>`;
		
		$("header").append(navbarLogged);
	}
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
	let username_client = document.createElement('a');
	username_client.className = 'card-subtitle text-muted small';
	username_client.id = 'username_client';
	username_client.innerHTML = '@' + data.account.username;
	username_client.href = "/profilePage?username="+data.account.username ;
	username_client.style = "text-decoration: none; cursor: pointer; ";
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
		li.innerHTML = date_from_db_to_ISO(item);
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
		modal_timeline.to(card,{ visibility : "hidden" , duration : 0 , display : "none"});  
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
		modal_bg.style.visibility = "visible" ;
        modal_bg.style.display = "flex" ;
        modal_bg.style.opacity = '1' ;
        document.body.style.overflow = "hidden" ;
		gsap.fromTo(card,{scale: 0.4 , opacity : 0 , visibility : "hidden" , display: "none"} , {scale : 1 , opacity :1 , duration : 1 , ease : "elastic.out(1, 0.3)", display: "flex" , visibility: "visible"});     
		
        return 1 ;
    }
	
	
	button.onmouseover = () => {
		gsap.to(button,{ scale: 1.1 ,ease : "elastic.out(1, 0.3)"  });
	}


	button.onmouseleave = () => {
		gsap.to(button,{ scale: 1 ,ease : "elastic.out(1, 0.3)"  });
	}


	button.onclick = () => {
		card.exit();
		let offer = data.offer_builder.build();
		sendOffer(offer,card);
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
