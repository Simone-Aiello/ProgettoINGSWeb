var advertiseBuilder = new Advertise.Builder();
var availabilityDates = [];
let accountLogged;

$(document).ready(() => {
		$.ajax({
			type: "GET",
			url: "/accountLoggedIn",
			success: function(resp){
				if(resp[0] == "t"){
					accountBuilder = new Account.Builder();
					accountBuilder.withUsername(resp[2]);
					accountBuilder.withAccountType(resp[1]);
					accountLogged = accountBuilder.build();
				}
			},
			error: function(){
				showSystemError("form");
			}			
		});
	
	addEvents();
});

//switch from section before to section after
function switchSection(before, after){
	$(before).hide();
	$(after).show();
};

function isBeforeToday(selectedDate){
	var today = new Date();
	if(selectedDate.getTime() < today.getTime() && (selectedDate.getDay() != today.getDay() ||
		selectedDate.getMonth() != today.getMonth() || selectedDate.getFullYear() != today.getFullYear())){
		return true;		
	}
	return false;
}

function isBeforeDate(date1, date2){
	if(date1.getTime() <= date2.getTime()){
		return true;		
	}
	return false;
}

function convertNotation(dateString, ymdFormat){
	if(ymdFormat){
		//convert to dmy
		dateString = dateString.split("-").reverse().join("/");
		//alert(dateString);
	}
	else{
		//convert to ymd
		dateString = dateString.split("/").reverse().join("-");
		//alert(dateString);
	}
	return dateString;
}

function addTitleListener(){
	$("#advertiseTitle").on("input", ()=>{
		let title = $("#advertiseTitle").val();
		try{			
			advertiseBuilder.withTitle(title);
			removeAlert("advertiseTitle");
		}
		catch(error){
			createAlertWithText(error.message, "advertiseTitle");
		}
	});
};
function addDescriptionListener(){
	$("#advertiseDescription").on("input", () => {
		let description = $("#advertiseDescription").val();
		advertiseBuilder.withDescription(description);
	});
}

function addProvinceListener(){
		$("#advertiseProvince").on("input", ()=>{
		let province = $("#advertiseProvince").val();
		try{			
			advertiseBuilder.withProvince(province);
			removeAlert("advertiseProvince");
		}
		catch(error){
			createAlertWithText(error.message, "advertiseProvince");
		}
	});
}

function removeInvalidAvailabiltyDates(){
	//alert("going to remove invalid dates");
	let expiryDateCurrent  = new Date($("#advertiseExpiryDate").val());
	let availabilityDatesAfter = [];
	for(let i = 0; i < availabilityDates.length; i++){
		//alert(availabilityDates[i]);
		let selectedDateYMD = convertNotation(availabilityDates[i], false);
		//alert(selectedDateYMD);
		if(!isBeforeDate(new Date (selectedDateYMD), expiryDateCurrent)){
			//alert("Removing " + availabilityDates[i]);
			$("#"+selectedDateYMD).parent().parent().remove();
		}
		else{
			availabilityDatesAfter.push(availabilityDates[i]);			
		}
	}
	availabilityDates = availabilityDatesAfter;
}

function addExpiryDateListener(){
	$("#advertiseExpiryDate").on("input", () =>{
		let selectedDate = new Date($("#advertiseExpiryDate").val());
		try{

			if(isBeforeToday(selectedDate)){
					createAlertWithText("La data selezionata è precedente a quella odierna", "advertiseExpiryDate");
			}
			else{
				advertiseBuilder.withExpiryDate($("#advertiseExpiryDate").val());
				$("#availabilityDateSelector").prop("disabled", false);
				removeInvalidAvailabiltyDates();
				removeAlert("advertiseExpiryDate");
				removeAlert("availabilityDateSection");
			}
		}
		catch(error){
			createAlertWithText(error.message, "advertiseExpiryDate")
		}
	});
}

function addAreaSelectorListener()
{
	$("#areaSelector").on("click", () =>{
		//alert("clicked"+ listOfAreas.size);
		if(listOfAreas.size != 0)
			removeAlert("areaSelector");
		else
			createAlertWithText("Selezionare almeno un ambito di riferimento", "areaSelector");
		
	});
}

function addavailabilityDateSelectorListener(){
	$("#availabilityDateSelector").parent().on("click", () => {
		if($("#availabilityDateSelector").prop("disabled")){
			createAlertWithText("É necessario selezionare una data di scadenza", "availabilityDateSection");
			}
		});
}

function addAvailabilityDateListener(){
	$("#addAvailabilityDate").on("click", ()=>{
		let selectedDate = $("#availabilityDateSelector").val();
		
		if(!isBeforeDate(new  Date(selectedDate), new Date($("#advertiseExpiryDate").val()))){
			createAlertWithText("La disponibilità specifiata è successiva alla data di scadenza dell'annuncio'", "availabilityDateSection");
			return;
		}
		
		if(selectedDate === "")
			return;
		let selectedDateYMD = selectedDate;
		//alert(selectedDate);
		let selectedDatesContent = $("#selectedDatesContent");
		selectedDate = convertNotation(selectedDate, true)

		
		if(availabilityDates.includes(selectedDate)){
			createAlertWithText("La data è gia stata selezionata", "availabilityDateSection");
			return;
		}
		
		if(isBeforeToday(new Date($("#availabilityDateSelector").val()))){
			createAlertWithText("La data selezionata è precedente a quella odierna", "availabilityDateSection");
			return;
		}
		
		removeAlert("availabilityDateSection");
		
		if(!availabilityDates.includes(selectedDate) && !isBeforeToday(new Date($("#availabilityDateSelector").val()))){
			selectedDatesContent.append("<tr> <td>" + selectedDate+ "</td> <td><button id = \"" + selectedDateYMD+"\" class = \"selectedAvailabilityDate btn\">" + "rimuovi" + "</button></td></tr>")
			availabilityDates.push(selectedDate);
			
			$("#" + selectedDateYMD).on("click", () =>{
				let availabilityDatesAfter = [];
				for(let i=0; i < availabilityDates.length; i++){
					if(availabilityDates[i] != selectedDate){
						availabilityDatesAfter.push(availabilityDates[i]);
					}
					else{
						$("#"+selectedDateYMD).parent().parent().remove();
					}
				}
				availabilityDates = availabilityDatesAfter;
			});

		}
	})
}

function addcheckRequiredInputs(){
	$("#confirmData").on("click", () => {
		var error = false;
		if($("#advertiseTitle").val() === ""){
				createAlertWithText("Inserire un titolo", "advertiseTitle")		
				error = true;
		}	
		if($("#advertiseExpiryDate").val() === "" ){
			createAlertWithText("Selezionare una data di scadenza", "advertiseExpiryDate");
			error = true;
		}
		else if(isBeforeToday(new Date($("#advertiseExpiryDate").val()))){
			error = true;
		}
		if($("#advertiseProvince").val() === null){
			createAlertWithText("Selezionare una provincia", "advertiseProvince");
			error=true;
			
		}
		if(listOfAreas.size == 0){
			error=true;
			createAlertWithText("Selezionare almeno un ambito di riferimento", "areaSelector");
		}
		
		if(!error){
			//fill the builder with current data and generate preview page
			advertiseImages = [];
			advertiseBuilder.removeImages();
			advertiseBuilder.removeAreas();
			$("#previewImages").empty();
			$("#previewAreas").empty();
			$("#previewAvailabilityDates").empty();
			for(const [key, value] of listOfImages.entries()){
				advertiseBuilder.withImages(value);
				let imageDiv = $("#" + key);
				let image = imageDiv.children("img").clone(false);
				image.attr("id", "");
				image.attr("class",  "imgPreview img-fluid");
				$("#previewImages").append(image);
			}
			for(const [key, value] of listOfAreas.entries()){
				advertiseBuilder.withArea(value);
				let areaPreview = $(key).parent().clone(false);
				areaPreview.children(":first").attr("id", "");
				areaPreview.children(":first").children(":first").attr("id", "");
				
				$("#previewAreas").append(areaPreview);
			}
			
			let allDates = [];
			for(let i = 0; i < availabilityDates.length; i++){
				let date = "<tr><td>" + availabilityDates[i] + "</td></tr>";
				$("#previewAvailabilityDates").append(date);
				allDates.push( convertNotation(availabilityDates[i], false));
			}
			advertiseBuilder.withDates(JSON.stringify(allDates));
			
			$("#previewTitle").text(($("#advertiseTitle")).val());
			$("#previewDescription").text(($("#advertiseDescription")).val());
			$("#previewExpiryDate").text(($("#advertiseExpiryDate")).val());
			$("#previewProvince").text(($("#advertiseProvince")).val());
			
			if(accountLogged ==null){
				createLoginModal();
			}
			else if(accountLogged.accountType() == "u"){
				switchSection("#form", "#preview");
			}
			else /*(accountLogged.accountType() == "w" || accountLogged.accountType() == "a")*/{
				alert("Sei collegato con un account che non è un utente. Verrai reindirizzato alla Home");
				window.location.href = "/";
			}
			
			/*$.ajax({
				type: "GET",
				url: "/accountLoggedIn",
				success: function(resp){
					//alert(resp[0] + " " + resp[1]);
					if(resp[0] == "t"){
						if(resp[1] == "u"){
							switchSection("#form", "#preview");
						}
						else{
							alert("Sei collegato con un account che non è un utente. Verrai reindirizzato alla Home");
							window.location.href = "/";
						}
					}
					else{
						createLoginModal();
					}
				},
				error: function(){
					showSystemError("form");
				}
				
			});
			*/
		}
	});
}

//Call this function once the user has logged in
function accountLoggedIn(){
	//alert(accountType + " In advP");
	if(!checkAccountType(accountType, "u")){
		alert("Hai effettuato l\'accesso con un account che non è un utente. Verrai reindirizzato alla Home");
		window.location.href = "/";
	}
	else{
		$("#staticBackdropLogin").modal("toggle");
		$("#staticBackdropLogin").remove();
		switchSection("#form", "#preview");
		
		//CHANGE NAVBAR TO LOGGED NAVBAR
		$(".navbar").remove();
		$("dropdown-notification").remove();
		
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
											href="/showMyAdvertises">I tuoi annunci</a></li>
										<li class="nav-item"><a class="nav-link active"
											href="/AdvertisePublication">Inserisci annuncio</a></li>
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
		
		$("body").prepend(navbarLogged);
	}
}

function addSubmitListener(){
	$("#publishAdvertise").on("click", () =>{
		$.ajax({
			type: "GET",
			url: "/accountValid",
			contentType: "application/json",
			data: accountLogged,
			success: function(isValid){
				if(isValid){
					//Te account is valid... Publish the advertise
					publishAdvertise();
				}
				else{
					//The account is not valid. Require validation
					let validationModal = `<div class="modal fade" id="accountValidationModal"
						data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
						aria-labelledby="accountValidationLabel" aria-hidden="true">
						<div class="modal-dialog ">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title" id="accountValidationLabel">Account non validato
										</h5>
									<button type="button" class="btn-close"
										data-bs-dismiss="modal" aria-label="Close"></button>
								</div>
								<div class="modal-body">
									<p>Per completare la pubblicazione è necessario che l\'account sia validato.
									Puoi validare il tuo account con il codice che ti è stato inviato sulla mail indicata al momento della registrazione oppure richiedere il reinvio del codice</p>
								</div>
								<div class="modal-footer">
									<button id = "accountValidationRequestMail" type="button" class="btn btn-primary closeModal"
										data-bs-dismiss="modal">Invia codice</button>
								</div>
							</div>
						</div>
					</div>`;
				
					$("body").append(validationModal);
					$("#accountValidationModal").modal("toggle");
					$("#accountValidationRequestMail").on("click", () => {
						$("#accountValidationModal").remove();
						//alert(accountLogged.username());
						$.ajax({
							type: "POST",
							url: "/sendVerificationMail",
							contentType: "application/json",
							data: accountLogged.username(),
							success: () => {
								let confirmEmailModal = `<div id = "confirmEmailModal" data-bs-backdrop="static" data-bs-keyboard="false" class="modal fade" tabindex="-1" role="dialog">
								  <div class="modal-dialog" role="document">
								    <div class="modal-content">
								      <div class="modal-header">
								        <h5 class="modal-title">Conferma invio email</h5>
								        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
								          <span aria-hidden="true">&times;</span>
								        </button>
								      </div>
								      <div class="modal-body">
								        <p>Controlla la tua email per trovare il link di validazione dell\'account</p>
								      </div>
								      <div class="modal-footer">
								        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Ok</button>
								      </div>
								    </div>
								  </div>
								</div>`;
								$(".modal").remove();
								$("body").append(confirmEmailModal);
								$("#confirmEmailModal").modal("toggle");
								
							},
							error: () => {
								showSystemError("preview");
							}
						});
					})
				}
			},
			error: function(){
				showSystemError("preview");
			}
		});
			
	});
	
}

function publishAdvertise(){
	$.ajax({
		type: "POST",
		url: "/saveAdvertise",
		contentType: "application/json",
		data: JSON.stringify(advertiseBuilder.build()),
		success: function(){
			let modal = `<div class="modal fade" id="publicationModal"
						data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
						aria-labelledby="staticBackdropLabel" aria-hidden="true">
						<div class="modal-dialog ">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title" id="staticBackdropLabel">Conferma pubblicazione
										</h5>
									<button type="button" class="btn-close"
										data-bs-dismiss="modal" aria-label="Close"></button>
								</div>
								<div class="modal-body">
									<p>Annuncio pubblicato con successo</p>
								</div>
								<div class="modal-footer">
									<button type="button" class="btn btn-primary closeModal"
										data-bs-dismiss="modal">Ok</button>
								</div>
							</div>
						</div>
					</div>`;
			$("body").append(modal);
			$("#publicationModal").modal("toggle");
			$(".closeModal").on("click", () => {
				$("#publicationModal").modal("toggle");
				window.location.href = "/";
			});

			//$("#confirmPublicationModal").remove();
			//redirect to home page
		},
		error: function(xhr){
			//alert("I am in error");
			//window.location.href = "/genericInfoPage";
			//if(xhr.message == "Utente non autorizzato")
			//alert("Non autorizzato");
			showSystemError("preview");
		}
	});		
}

function addModifyDataListener(){
	$("#modifyData").on("click", () => {
		switchSection("#preview", "#form");
	});
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function getProvince() {
	$.ajax({
		type: "GET",
		url: "https://comuni-ita.herokuapp.com/api/province",
		contentType: "application/json",
		success: function(risposta) {
			let province = $("#advertiseProvince");
			let arrayProvince = [];
			for(let p of risposta){
				arrayProvince.push(capitalizeFirstLetter(p["nome"]));
			}
			arrayProvince.sort();
			for(let provinceName of arrayProvince){
				province.append("<option>" + provinceName + "</option>");
			}
		},
		error: function(xhr) {
			showSystemError("form");
		}
	});
}
		
function addEvents(){
	var form = document.getElementById("advertisePublicationForm");
	switchSection("#preview","#form");
	getProvince();
	addProvinceListener();
	addTitleListener();
	addDescriptionListener();
	addExpiryDateListener();
	addAreaSelectorListener();
	addAvailabilityDateListener();
	addcheckRequiredInputs();
	addModifyDataListener();
	addavailabilityDateSelectorListener();
	addSubmitListener();
		
	form.onsubmit=function(event){
		event.preventDefault();
	};
}

function showSystemError(section){
	if($("#systemAlert").length != 0)
		return;
	
	let systemError = 	`<div id = "systemAlert" class="alert alert-danger" role="alert">
 					 		C'è stato un problema interno, ci scusiamo per il disagio e la invitiamo a riprovare più tardi
						</div>`;
	$("#" + section).prepend(systemError);
}

var createAlertWithText = function(text, idInput){
	removeAlert(idInput);
	document.getElementById(idInput).classList.add("is-invalid");
	var feedback = "<div  id = \"" + idInput + "feedback\" class = \"invalid-feedback\">" +  text + "</div>"
	$("#" + idInput).after(feedback);
}

var removeAlert = function(id){
	$("#" + id + "feedback").remove();
	document.getElementById(id).classList.remove("is-invalid");
}