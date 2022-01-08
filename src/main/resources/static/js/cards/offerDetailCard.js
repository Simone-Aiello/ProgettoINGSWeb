function createOfferDetailCard(data){
	//card
	let card = document.createElement('div');
	card.className = 'card shadow rounded mt-4';
	card.style = 'width : 32rem; margin-left : 20px; margin-right : 20px';
	card.id = 'c-'+data.index;
	
	//card body
	let card_body = document.createElement('div');
	card_body.className = 'card-body';
	
	
	//first row : title + offer id
	let titleRow = document.createElement('div');
	titleRow.className = 'row';
	let title = document.createElement('h5');
	title.id = 'title-' + data.index;
	title.innerHTML = data.title;
	title.className = 'col-10 card-title';
	
	let offerId = document.createElement('label');
	offerId.className = 'col-2 muted';
	offerId.innerHTML = '#'+data.offer_id;
	offerId.id = 'label-'+data.index;
	
	titleRow.appendChild(title);
	titleRow.appendChild(offerId);

	
	
	
	//second row : username + province + due-date
	let infoRow = document.createElement('div');
	infoRow.className = 'row mt-2';
	
	//username
	let usernameCol = document.createElement('div');
	usernameCol.className = 'col';
	let username = document.createElement('p');
	username.className = 'card-subtitle text-muted small';
	username.id = 'username-'+data.index;
	username.innerHTML = '@' + data.username;
	usernameCol.appendChild(username);
	infoRow.appendChild(usernameCol);
	
	//province
	let provinceCol = document.createElement('div');
	provinceCol.className = 'col';
	let provinceLabel = document.createElement('p');
	provinceLabel.className = 'card-subtitle text-muted small';
	provinceLabel.innerHTML = 'Provincia';
	
	let province = document.createElement('p');
	province.className = 'small';
	province.id = 'province-'+data.index;
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
	date.id = 'due-date-'+data.index;
	date.innerHTML = data.dueDate;
	
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
	//for each data add it to dropdown menu
	data.dates.forEach((item) =>{
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
	jobTimeLabel.innerHTML = 'Durata lavoro : ' + data.jobExecutionTime + ' ' + data.jobExecutionTimeUnit;
	jobTimeLabel.id = 'job-time-'+data.index;
	jobTimeInfo.appendChild(jobTimeLabel);
		
	dateTimeInfoRow.appendChild(datesDropDown);
	dateTimeInfoRow.appendChild(jobTimeInfo);
	
	//fourth row : price 
	let priceRow = document.createElement('div');
	priceRow.className = 'row mt-3';
	//container
	let priceContainer = document.createElement('div');
	priceContainer.className = 'col input-group';
	//price
	let price = document.createElement('input');
	price.className = 'form-control';
	price.type = "text";
	price.readOnly = "readonly";
	price.id = "amount-"+data.index;
	price.value = data.amount;
	let sideInfo = document.createElement('div');
	sideInfo.className = 'input-group-append';
	let sideInfoSpan = document.createElement('span');
	sideInfoSpan.className = 'input-group-text';
	sideInfoSpan.innerHTML = '&#128;';
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
	textAreaRow.className = 'row mt-2';
	
	let textArea = document.createElement('textarea');
	textArea.className = 'col input-group rounded';
	textArea.rows = '5';
	textArea.style = 'border-color : #e3e3e3';
	textArea.readOnly = 'readonly';
	textArea.value = data.description;
	textArea.id = 'description-'+data.index;
	textAreaRow.appendChild(textArea);
	
	
	//accept button
	let buttonDiv = document.createElement('div');
	buttonDiv.className = 'd-flex flex-row-reverse mt-3';
	let button = document.createElement('a');
	button.className = 'btn btn-success';
	button.id = data.index;
	button.innerHTML = 'Accetta';
	
	
	let refuseButton = document.createElement('a');
	refuseButton.className = "btn btn-danger";
	refuseButton.innerHTML = 'Rifiuta';
	refuseButton.id = 'r-'+data.index;
	refuseButton.style = 'margin-right: 20px;'
	refuseButton.setAttribute('data-toggle','modal');
	refuseButton.setAttribute('data-target','#modal');
	
	
	
	buttonDiv.appendChild(button);
	buttonDiv.appendChild(refuseButton);

	//build the card
	card_body.appendChild(titleRow);
	card_body.appendChild(infoRow);
	card_body.appendChild(dateTimeInfoRow);
	card_body.appendChild(priceRow);
	card_body.appendChild(textAreaRow);
	card_body.appendChild(buttonDiv);
	card.appendChild(card_body)
	return card;
	
}

function setAcceptButtonListener(target){
	button = document.getElementById(target);
	button.addEventListener('click', function() {
		let title = document.getElementById('title-'+target).innerText;
		let worker_username = document.getElementById('username-'+target).innerText;
		worker_username = worker_username.split('@')[1];
		let province = document.getElementById('province-'+target).innerText;
		let dueDate = document.getElementById('due-date-'+target).innerText;
		let offerId = document.getElementById('label-'+target).innerText;
		offerId = offerId.split('#')[1];
		console.log(title + ' ' + worker_username + ' ' + province + ' ' + dueDate);
		
		//TEST
		let advertiseId = 1;
		//ENDTEST
		
		let message = [title, worker_username, offerId, advertiseId];
		
		$.ajax({
		    type : 'POST',
		    contentType: "application/json",
		    url : '/acceptOffer',
		    data:JSON.stringify(message),
		    success:function() {
		        console.log('updated successfully');
				//rifiutare tutte le proposte che non sono state accettate
				let cards = document.getElementsByClassName('card');
				let eliminatedCards = [];
				for(let i = 0; i < cards.length; ++i){
					console.log(cards[i].id + " " + 'c-'+target)
					if(cards[i].id != 'c-'+target){
						eliminatedCards.push(i);
					}
				}
				console.log(eliminatedCards);
				for(let i = eliminatedCards.length-1; i >= 0; --i){
					let worker_username = document.getElementById('username-'+i).innerHTML;
					worker_username = worker_username.split('@')[1];
					let message = [worker_username,'il cliente ha scelto un\'altra offerta'];
					console.log(message);
					//chiamata ajax per notificare il lavoratore che non è stato scelto
					$.ajax({
						type : "POST",
						url : "/refuseOffer",
						contentType: "application/json",
						data : JSON.stringify(message),
						success : (response) =>{
							console.log(response);
						}, 
						error : (xhr) =>{
							console.log(xhr);
						}		
					});
					removeCard(eliminatedCards[i]);
				}
		    },
		    error:function() {
		        console.log('error occured');
		    }
		});
		
	});
	
		
}

function setRefuseButtonListener(target){
	button = document.getElementById('r-'+target);
	button.addEventListener('click', function(){
		if(document.getElementById('modal') === null){
			modal = createModal(target);
			$('#body').append(modal);
		}
		modal = document.getElementById('modal');
		modal.setAttribute('cardid',target);
		$('#modal').modal("show");
	});
}




function createModal(id){
	let modal = document.createElement('div');
	modal.className = 'modal fade';
	modal.id = 'modal';
	modal.setAttribute('tabindex','-1');
	modal.setAttribute('role','dialog');
	modal.setAttribute('cardid',id);
	
	let modal_dialog = document.createElement('div');
	modal_dialog.className = 'modal-dialog modal-dialog-centered';
	modal_dialog.setAttribute('role','document');
	
	let modal_content = document.createElement('div');
	modal_content.className = 'modal-content';
	
	let modal_header = document.createElement('div');
	modal_header.className = 'modal-header';
	
	let modal_title = document.createElement('h5');
	modal_title.className = 'modal-title';
	modal_title.innerHTML = 'Dicci perché hai rifiutato questa offerta';
	
	let modal_close_button = document.createElement('button');
	modal_close_button.className = 'btn close';
	modal_close_button.type = 'button';
	modal_close_button.setAttribute('data-dismiss','modal');
	modal_close_button.setAttribute('aria-label','Close');
	modal_close_button.addEventListener('click', function(){
		$('#modal').modal("hide");
	});
	
	let span = document.createElement('span');
	span.setAttribute('aria-hidden','true');
	span.innerHTML = '&times;';
	
	modal_close_button.appendChild(span);
	
	modal_header.appendChild(modal_title);
	modal_header.appendChild(modal_close_button);
	
	let modal_body = document.createElement('div');
	modal_body.className = 'modal-body';
	let text_area = document.createElement('textarea');
	text_area.id = 'textArea';
	text_area.className = 'form-control';
	text_area.placeholder = 'es. Il preventivo era troppo costoso ...'
	text_area.rows = '4';
	
	let modal_footer = document.createElement('div');
	modal_footer.className = 'modal-footer';
	
	let modal_button = document.createElement('button');
	modal_button.className = 'btn btn-success';
	modal_button.type = 'button';
	modal_button.innerHTML = 'Invia';
	modal_button.addEventListener('click',function(){
		
		let workerUsername = document.getElementById('username-'+modal.getAttribute('cardid')).innerText;
		workerUsername = workerUsername.split('@')[1];
		let motivation = document.getElementById('textArea').value;
		let message = [workerUsername,motivation];
		console.log(message);
		//chiamata ajax per notificare il lavoratore che non è stato scelto
		$.ajax({
		type : "POST",
		url : "/refuseOffer",
		contentType: "application/json",
		data : JSON.stringify(message),
		success : (response) =>{
			console.log(response);
		}, 
		error : (xhr) =>{
			console.log(xhr);
		}		
	});
		
		
		removeCard(modal.getAttribute('cardid'));
		$('#modal').modal("hide");
	});
	
	
	modal_footer.appendChild(modal_button);
	
	modal_body.appendChild(text_area);
	
	modal_content.appendChild(modal_header);
	modal_content.appendChild(modal_body);
	modal_content.appendChild(modal_footer);
	modal_dialog.appendChild(modal_content);
	modal.appendChild(modal_dialog);

	return modal;
		
}

function removeCard(target){
	card = document.getElementById('c-'+target);
	card.parentNode.removeChild(card);
}


/*$(document).ready(() => {
	console.log("ciao");
	body = document.getElementById('body') ;

	card = createOfferDetailCard({
                    title : "titolo",
                    username : "GiovanniMarasco",
					province : "Catanzaro",
					dueDate : "04/10/2022",
					dates : ['03/01/2022', '04/01/2022', '06/04/2022'],
					jobExecutionTime : 12,
					jobExecutionTimeUnit : 'h',
					amount : 1200,
					description : "Lorem ipsum dolor sit amet. Sit esse maxime id tempora repellendus non odit velit. Id architecto iure aut consequatur totam sed aperiam mollitia ut minus possimus. Nam laudantium perferendis sit velit maiores aut odio laudantium. Qui officia illo qui eveniet officiis et tempora internos 33 tenetur modi quo porro doloribus qui iure odio."
                    }) ;
	body.append(card);
});*/
