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
	date.innerHTML = data.dueDate;
	
	dueDateCol.appendChild(dueDateLabel);
	dueDateCol.appendChild(date);
	infoRow.appendChild(dueDateCol);
	
	
	//GALLERIA
	/*
	let gallery = document.createElement('div');
	gallery.id = 'carouselExampleIndicators';
	gallery.className = 'carousel slide';
	gallery.setAttribute('data-ride','carousel');
	
	let imagesContainer = document.createElement('div');
	imagesContainer.className = 'carousel-inner';
	
	let firstImage = document.createElement('div');
	firstImage.className = 'carousel-item active';
	
	let image1 = document.createElement('img');
	image1.className = 'd-block w-100';
	image1.alt = 'First slide';
	image1.src = '../../images/immagine1.jpg';
	firstImage.appendChild(image1);
	
	let image = document.createElement('div');
	image.className = 'carousel-item ';
	
	let image2 = document.createElement('img');
	image1.className = 'd-block w-100';
	image1.alt = 'First slide';
	image1.src = '../../images/immagine2.jpg';
	image.appendChild(image2);
	
	imagesContainer.appendChild(firstImage);
	imagesContainer.appendChild(image);
	
	let backButton = document.createElement('a');
	backButton.className = 'carousel-control-prev';
	backButton.href = '#carouselExampleIndicators';
	backButton.setAttribute('role','button');
	backButton.setAttribute('data-slide','prev');
	let backIcon = document.createElement('span')
	backIcon.className = 'carousel-control-prev-icon';
	backIcon.setAttribute('ria-hidden','true');
	backButton.appendChild(backIcon);
	
	gallery.appendChild(imagesContainer);
	gallery.appendChild(backButton);
	
	

	/*
	
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a>
	 */

	
	
	
	

	
	
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
	button.className = 'col-5 btn';
	button.id = data.index;
	button.style = 'background-color:#f4a261;';
	button.innerHTML = 'Mostra offerte ricevute';
	
	
	let refuseButton = document.createElement('a');
	refuseButton.className = "col-5 btn";
	refuseButton.innerHTML = 'Recensisci';
	refuseButton.id = 'r-'+data.index;
	refuseButton.style = 'background-color:#f4a261;margin-right : 50px;'
	refuseButton.setAttribute('data-toggle','modal');
	refuseButton.setAttribute('data-target','#modal');
	
	
	
	buttonDiv.appendChild(button);
	buttonDiv.appendChild(refuseButton);

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
		/*let title = document.getElementById('title-'+target).innerText;
		let worker_username = document.getElementById('username-'+target).innerText;
		worker_username = worker_username.split('@')[1];
		let province = document.getElementById('province-'+target).innerText;
		let dueDate = document.getElementById('due-date-'+target).innerText;
		let offerId = document.getElementById('label-'+target).innerText;
		offerId = offerId.split('#')[1];
		console.log(title + ' ' + worker_username + ' ' + province + ' ' + dueDate);
		
		//TEST
		let advertiseId = 4;
		//ENDTEST
		
		let message = [title, worker_username, offerId, advertiseId];*/
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
			//alert(xhr);
			}		
		});

	});
	
		
}

function setReviewActionListener(target){
	button = document.getElementById('r-'+target);
	button.addEventListener('click', function(){
		console.log("Review " +  target);
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
	body = document.getElementById('advertises') ;
	card = createOfferDetailCard({
			        title : "titolo",
			        username :"GiovanniMarasco",
					province : "Catanzaro",
					dueDate : "04/10/2022",
					dates : ['03/01/2022', '04/01/2022', '06/04/2022'],
					jobExecutionTime : 12,
					jobExecutionTimeUnit : 'h',
					amount : 1200,
					description : "Lorem ipsum dolor sit amet. Sit esse maxime id tempora repellendus non odit velit. Id architecto iure aut consequatur totam sed aperiam mollitia ut minus possimus. Nam laudantium perferendis sit velit maiores aut odio laudantium. Qui officia illo qui eveniet officiis et tempora internos 33 tenetur modi quo porro doloribus qui iure odio.",
			        offer_id : 0,
					index : 0
					}) ;
	body.append(card);
	setReviewActionListener(0);
	setShowOffersActionListener(0);
});*/
