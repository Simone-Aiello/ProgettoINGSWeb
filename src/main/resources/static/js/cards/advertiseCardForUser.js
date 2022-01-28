function createOfferDetailCard(data){
	//card
	let card = document.createElement('div');
	card.className = 'card shadow rounded mt-4';
	card.style = 'width : 22rem; margin-left : 20px; margin-right : 20px';
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
	date.innerHTML = date_from_db_to_ISO(data.dueDate);
	
	dueDateCol.appendChild(dueDateLabel);
	dueDateCol.appendChild(date);
	infoRow.appendChild(dueDateCol);
	
	

	
	
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
	buttonDiv.className = 'row d-flex flex-row-reverse mt-3';
	let button = document.createElement('a');
	button.className = 'col btn';
	button.id = data.index;
	button.style = 'background-color:#f4a261; color : #fff;';
	button.innerHTML = 'Mostra offerte ricevute';
	buttonDiv.appendChild(button);
	
	/*if(!data.hasOffers){
		let refuseButton = document.createElement('a');
		refuseButton.className = "col-5 btn btn-danger";
		refuseButton.innerHTML = 'Elimina annuncio';
		refuseButton.id = 'del-'+data.index;
		refuseButton.style = 'margin-right : 50px;'
		refuseButton.setAttribute('data-toggle','modal');
		refuseButton.setAttribute('data-target','#reviewModal');
		buttonDiv.appendChild(refuseButton);
	}*/
	
	
	
	

	//build the card
	card_body.appendChild(titleRow);
	card_body.appendChild(infoRow);
	//card_body.appendChild(dateTimeInfoRow);
	//card_body.appendChild(priceRow);
	//card_body.appendChild(gallery);
	card_body.appendChild(textAreaRow);
	card_body.appendChild(buttonDiv);
	card.appendChild(card_body)
	return card;
	
}

function setShowOffersActionListener(target){
	button = document.getElementById(target);
	button.addEventListener('click', function() {
		console.log("Show Offers " + target);
		let advertiseId = target;
		let adsId = document.getElementById('label-'+target).innerText;
			adsId = adsId.split('#')[1];
		$.ajax({
		type : "GET",
		url : '/showOffers?AdvertiseID='+adsId,
		contentType: "application/json",
		data : JSON.stringify(advertiseId),
		success : (response) =>{
			console.log(response);
			window.location = '/showOffers?AdvertiseID='+adsId;
		}, 
		error : (xhr) =>{
			alert(xhr);
		},		
		});

	});	
}

function setDeleteAdvertiseActionListener(target){
	let button = document.getElementById("del-"+target);
	button.addEventListener('click', function(){
		let adsID = document.getElementById('label-'+target).innerHTML;
			adsID = adsID.split('#')[1];
			console.log('deleted '+ adsID);
			$.ajax({
			type : "POST",
			url : '/deleteAdvertiseForClient',
			contentType: "application/json",
			data : JSON.stringify(adsID),
				success : (response) =>{
					console.log(response);
					window.location.reload();
				}, 
				error : (xhr) =>{
					alert(xhr);
				},		
			});
	});
}


