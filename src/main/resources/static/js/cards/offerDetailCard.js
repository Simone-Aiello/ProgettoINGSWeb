function createOfferDetailCard(data){
	//card
	let card = document.createElement('div');
	card.className = 'card shadow rounded mt-4';
	card.style = 'width : 32rem; margin-left : 20px; margin-right : 20px';
	
	//card body
	let card_body = document.createElement('div');
	card_body.className = 'card-body';
	
	
	//first row : title + close button
	let titleRow = document.createElement('div');
	titleRow.className = 'row';
	let title = document.createElement('h5');
	title.innerHTML = 'Proposta compilata per : ' + data.title;
	title.className = 'col-10 card-title';
	
	let closeButton = document.createElement('a');
	closeButton.className = 'col-2 btn';
	let closeIcon = document.createElement('i');
	closeIcon.className = 'far fa-times-circle';
	closeIcon.style = 'font-size : 24px; color : #f4a261';
	closeButton.appendChild(closeIcon);
	titleRow.appendChild(title);
	titleRow.appendChild(closeButton);

	
	
	
	//second row : username + province + due-date
	let infoRow = document.createElement('div');
	infoRow.className = 'row mt-2';
	
	//username
	let usernameCol = document.createElement('div');
	usernameCol.className = 'col';
	let username = document.createElement('p');
	username.className = 'card-subtitle text-muted small';
	username.id = 'username';
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
	province.id = 'province';
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
	date.id = 'province';
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
	price.id = "amount";
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
	textAreaRow.appendChild(textArea);
	
	
	//accept button
	let buttonDiv = document.createElement('div');
	buttonDiv.className = 'd-flex flex-row-reverse mt-3';
	let button = document.createElement('a');
	button.className = 'btn btn-primary';
	button.id = 'accept-button';
	button.innerHTML = 'Conferma';
	button.style = 'background-color : #f4a261; border:none';
	
	buttonDiv.appendChild(button);


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

/*$(document).ready(() => {
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
