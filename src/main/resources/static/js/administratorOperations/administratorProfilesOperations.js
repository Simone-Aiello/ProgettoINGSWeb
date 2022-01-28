let username = "";
let numberOfSelectedAreas = 0;
let selectedAreasList = [];
let accountRetrived = [];

function addAreasListSelectorEvent(){
	$("#areaslistSelector").hide();

	$("#areaInputLabel").on("click", (event) => {
		event.stopPropagation();
		let areasSelector = $("#areaslistSelector");
		let  position = $("#areaInputLabel").offset();
		
		if(areasSelector.is(":visible")){
			areasSelector.hide();
	
		}
		else{
			areasSelector.show();
			let x = position.left;
			let y = position.top + $("#areaInputLabel").outerHeight();
			areasSelector.css({left: x, top: y});
		}
	});
	
	$(window).on("resize", () =>{
		let areasSelector = $("#areaslistSelector");
		if(areasSelector.is(":visible")){
			let  position = $("#areaInputLabel").offset();
			let x = position.left;
			let y = position.top + $("#areaInputLabel").outerHeight();
			//alert(x + " " + y);
			areasSelector.css({left: x, top: y});
		}
	});
}

function addAreaSelectionEvent(){
	 if(!$("#areaslistSelector").is(":hidden"))
		return;
		
	$(".areaInputDiv").on("click", function(event) {
		//alert("clicked div");
		let areaCheckbox = $(this).find("input");
		//alert(areaCheckbox.attr("id"));
		if(areaCheckbox.is(":checked")){
			//alert("checked");
			numberOfSelectedAreas--;
			areaCheckbox.prop("checked", false);
			areaCheckbox.parent().css({"background-color": "white"});
		}
		else{
			//alert("not checked");
			numberOfSelectedAreas++;
			areaCheckbox.prop("checked", true);
			areaCheckbox.parent().css({"background-color": "rgb(192, 192, 192)"});
		}
		if(numberOfSelectedAreas === 1)
			$("#areaInputLabel").html(numberOfSelectedAreas +" scelta");
		else	
			$("#areaInputLabel").html(numberOfSelectedAreas +" scelte");
		event.stopPropagation();
	});
}
//create profile card with the passed account.
//Create new line every 2 profiles
function createProfileCard(a){
	//alert("Creating profile card" + newLine);
	//To be used if a new line is needed
	let newLine = false;
	//check if the insertion the new card will cause the generation of
	//a new line or not
	let lastRow = $("#profileCards").children().last();
	//alert(lastRow.children().length);
	if(lastRow.children().length === 2 || $("#profileCards").children().length === 0)
		newLine = true;
	else
		newLine = false;
	
	//alert(newLine);

	let profileCard = "";
	let newRowBegin = `<div class ="row profileCardsRow">`;
	let newRowEnd = `</div>`;
	let defaultImage= "/usersImages/profilePictures/defaultIcon.png";
	
	let profileImage = defaultImage;
	if(a.profilePic != null)
		profileImage = a.profilePic.value;
		
	if(newLine == true){
		//alert("new line");
			profileCard += newRowBegin;
		}
	let profileCol = `<div id = "` + a.username + `ProfileCard" class ="col-lg-6 col-sm-12 col-xs-12">
						<div class="containerCard row mb-3 container-sm"> 
							<div id = "profileDiv-` + a.username + `" class="profileDiv col">
								<div class="imageDiv">
									<img class = "profilePic" src="`+ profileImage + `">
								</div>
								<div class="profileName"><p>` + a.username + `</p></div>	
								<div class="actions">
									<button id = "startChat-` + a.username + `" type = "button" class="profileButton btn" >Avvia chat</button>
									<button id = "viewProfile-`+ a.username + `" class="profileButton"><a href = "profilePage?username=` + a.username + `">Vedi profilo </a></button>
									<button id = "banAccount-`+ a.username + `" class="profileButton">Banna account</button>
								</div>
							</div>`;
								
							
				
	let firstStatName = "";
	let secondStatName = "";
	let thirdStatName = "";
	
	let firstStateContent = "";
	let secondStateContent = "";
	let thirdStateContent = "";

	let secondStatHTML = "";

	if(a.accountType === "w"){
		firstStatName = "Lavori";
		firstStateContent = a.acceptedOffers;
		thirdStatName = "Valutazioni";

		let averageReviews = a.averageReviews;
		
		for(i = 1; i <= 5; i++){
			if(i <= averageReviews ){
				thirdStateContent += `<i class="fas fa-star fullstar"></i>`;
			}
			else{
				thirdStateContent += `<i class="far fa-star emptystar"></i>`;
			}
		}
		thirdStateContent += "<span>(" + a.numberOfReviews + ")</span>";
	}			
	if(a.accountType === "u"){
		firstStatName = "Annunci";
		firstStateContent = a.publishedAdvertises;
		secondStatName = "Aree";
		secondStateContent = a.advertisesAreas;
		thirdStatName = "Annunci online";
		thirdStateContent = a.onlineAdvertises;
		
		secondStatHTML = `<div class="box">
								<span class="parameter">` + secondStatName + `</span>
								<span class="value">` + secondStateContent + `</span>
							</div>`;
		
	}
	
	let statsCol = 	`<div class="stats col">
						<div class ="boxes container-fluid">
							<div class="box">
								<span class="parameter">` + firstStatName + `</span>
								<span class="value">` + firstStateContent + `</span>
							</div>
							` + secondStatHTML + `
							<div class="box">
								<span class="parameter">` + thirdStatName + `</span>
								<span class="value">` + thirdStateContent + `</span>
							</div>
						</div>
					</div>
				</div>
			</div>`;
	
	profileCard += profileCol;
	profileCard += statsCol;
	
	if(newLine == true){
		profileCard += newRowEnd;
		$("#profileCards").append(profileCard);
	}
	else{
		$("#profileCards").children().last().append(profileCard);	
	}

	//accountBuilder = new Account.Builder();
	//accountBuilder.withUsername(a.username);
	//accountBuilder.withAccountType("w");
	
}

function addBanAccountEvent(username){
	$("#banAccount-" + username).on("click", function(){
		
		let modal=`<div class="modal fade" id="staticBackdrop-ban"
								data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
								aria-labelledby="staticBackdropLabel" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title" id="staticBackdropLabel">Richiesta conferma ban
												</h5>
											<button id = "closeModal" type="button" class="btn-close"
												data-bs-dismiss="modal" aria-label="Close"></button>
										</div>
										<div class="modal-body">
											<p id = "messageText" 
												style="width: 100%;">Sei sicuro di voler bannare l'utente: ` + username + `</p>
										</div>
										<div class="modal-footer">
											<button type="button" class="btn btn-secondary"
												data-bs-dismiss="modal">Annulla</button>
											<button id = "confirmBan" type="button" class="btn btn-primary">Conferma</button>
										</div>
									</div>
								</div>
							</div>`;
		//remove eventual modals that are closed but not removed from the html
		$(".modal").remove();				
		$("body").append(modal);
		$("#staticBackdrop-ban").modal("toggle");
		$("#confirmBan").on("click", ()=>{
			$("#staticBackdrop-ban").modal("toggle");
			$(".modal").remove();
			accountBuilder = new Account.Builder();
			accountBuilder.withUsername(username);
			$.ajax({
				type: "POST",
				url: "/banAccount",
				contentType: "application/json",
				data:  JSON.stringify(accountBuilder.build()),
				success: function(){
					let banSuccessModal=`<div class="modal fade" id="staticBackdrop-banConfirm"
								data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
								aria-labelledby="staticBackdropLabel" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title" id="staticBackdropLabel">Conferma ban
												</h5>
											<button id = "closeModal" type="button" class="btn-close"
												data-bs-dismiss="modal" aria-label="Close"></button>
										</div>
										<div class="modal-body">
											<p id = "messageText" 
												style="width: 100%;">Ban dell'utente: ` + username + ` avvenuto con successo</p>
										</div>
										<div class="modal-footer">
											<button id = "confirmBan" type="button" class="btn btn-primary" data-bs-dismiss="modal">Ok</button>
										</div>
									</div>
								</div>
							</div>`;
					//remove eventual modals that are closed but not removed from the html
					$(".modal").remove();				
					$("body").append(banSuccessModal);
					$("#staticBackdrop-banConfirm").modal("toggle");
					
					//remove the account card from the list
					//and replace it with the last profile card in the search results
					$("#"+ username + "ProfileCard").replaceWith($("#profileCards").children().last().children().last());
					//console.log(username + "banned");
					
				},
				error: function(){
					showSystemError("systemErrors");
				}
				
			});
		});
	});
}


function addChatWithProfileEvent(username){
	$("#startChat-" + username).on("click", function(){
		
		let modal=`<div class="modal fade" id="staticBackdrop-chat"
								data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
								aria-labelledby="staticBackdropLabel" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title" id="staticBackdropLabel">Messaggio
												</h5>
											<button id = "closeModal" type="button" class="btn-close"
												data-bs-dismiss="modal" aria-label="Close"></button>
										</div>
										<div class="modal-body">
											<textarea id = "messageText" placeholder="Scrivi qui il tuo messaggio..."
												style="width: 100%;"></textarea>
										</div>
										<div class="modal-footer">
											<button type="button" class="btn btn-secondary"
												data-bs-dismiss="modal">Annulla</button>
											<button id = "sendMessageButton" type="button" class="btn btn-primary">Invia
												messaggio</button>
										</div>
									</div>
								</div>
							</div>`;
		//remove eventual modals that are closed but not removed from the html
		$(".modal").remove();				
		$("body").append(modal);
		$("#staticBackdrop-chat").modal("toggle");
		$("#sendMessageButton").on("click", () => {
			let messageText = $("#messageText").val();
			$("#staticBackdrop-chat").modal("toggle");
			$(".modal").remove();
			
			let accountBuilder = new Account.Builder();
			accountBuilder.withUsername(username);
			let a = accountBuilder.build()
			let messageBuilder = new Message.Builder();
			messageBuilder.withText(messageText);
			messageBuilder.withSender(username);
			let messages = [];
			messages.push(messageBuilder.build());
	
			let chat = new Chat.Builder();
			chat.withA2(a);
			chat.withMessages(messages);
			$.ajax({
				type: "POST",
				url: "/startChat",
				contentType: "application/json",
				data: JSON.stringify(chat.build()),
				success: function(){
					console.log("started chat");
				},	
				error: function(){
					showSystemError("systemErrors")
				}	
			});
		});
	});
	
}

function addSearchButtonEvent(){
	$("#searchButton").on("click", ()=>{

		username = $("#usernameSelector").val();
		$("#areaslistSelector").hide();
		$(".areaInput").each( function(){
			if($(this).is(":checked")){
				areaBuilder = new Area.Builder(); 
				areaBuilder.withId(parseInt($(this).attr("id").split("-")[0], 10));
				selectedAreasList.push(areaBuilder.build());
			}
		})
		
		if(username == "" && selectedAreasList.length == 0){
			if($("#searchAlert").length == 0){
				let invalidDiv = `<div id = "searchAlert" class="alert alert-danger" role="alert">
							Selezionare almeno un parametro di ricerca!</div>`;
				$("#searchBox").after(invalidDiv);
			}
			//block search operation
			return;
		}
		else{
			$("#searchAlert").remove();
		}


	$("#searchButton").prop("disabled", true);
	$.ajax({
			type: "POST",
			url: "/findProfiles",
			headers: {
				'username' : username,		
			},
			contentType: "application/json",
			data:  JSON.stringify(selectedAreasList),
			success: function(profiles){
			//console.log("SUCCESS");
				//reset search bar 
				numberOfSelectedAreas = 0;
				selectedAreasList = [];
				$("#areaInputLabel").html("0 scelte");
				$("#usernameSelector").val("");
				$("#profileCards").empty();
				let i = 0;
				for(let a of profiles){
					if(a.accountType === "w"){
						//ajax call for worker stats 
						//REMEMBER TO ADD MAIN AREA AS SOON AS IT IS READY
						$.ajax({
							type: "GET",
							url: "/reviewsAverageAndOffers",
							headers: {
								'username' : a.username,		
							},
							success: function(results){
								//console.log("SUCCESS");
								a.averageReviews = results[0];
								a.numberOfReviews = results[1];
								a.acceptedOffers = results[2];
								createProfileCard(a);
								//associate listener to the ban button present in each profile card
								addBanAccountEvent(a.username);
								addChatWithProfileEvent(a.username);
							},
							error: function(){
								showSystemError("systemErrors");
							}
							
						});
						//alert(JSON.stringify(a.averageReviews));
					}
					else if(a.accountType === "u"){
						//ajax call for user stats
						$.ajax({
							type: "GET",
							url: "/advertisesAndAreas",
							headers: {
								'username' : a.username,		
							},
							success: function(results){
								//console.log("SUCCESS");
								//alert("WEEEE" + JSON.stringify(results));
								a.publishedAdvertises = results[0];
								a.advertisesAreas = results[1];
								a.onlineAdvertises = results[2];
								createProfileCard(a);
								//associate listener to the ban button present in each profile card
								addBanAccountEvent(a.username);
								addChatWithProfileEvent(a.username);
							},
							error: function(){
								showSystemError("systemErrors");
							}
							
						});
					}
					/*
					else if(a.accountType == "a"){
						createProfileCard(a);
						addChatWithProfileEvent(a.username);
					}
					*/
					i++;
					//alert(a.profilePic);
					//alert(a.accountType);
				}
				if(i == 0){
					$("#profileCards").append("<h2>La ricerca non ha prodotto risultati...</h2>")
				}


			},
			error: function(){
				showSystemError("systemErrors");
			}

		});
		$("#searchButton").prop("disabled", false);
		$(".areaInput").prop("checked", false);
		$(".areaInput").parent().css({"background-color": "white"});
	});
}

$(document).ready(() =>{
	
	addAreasListSelectorEvent();
	addAreaSelectionEvent();
	addSearchButtonEvent();
	//questa è una pezza
	$(".areaInput").on("click", function(){
		if($(this).prop("checked") == true)
			$(this).prop("checked", false);
		else
			$(this).prop("checked", true);
	});

	
})

function showSystemError(section){
	if($("#systemAlert").length != 0)
		return;
	
	let systemError = 	`<div id = "systemAlert" class="alert alert-danger" role="alert">
 					 		C'è stato un problema interno, ci scusiamo per il disagio e la invitiamo a riprovare più tardi
						</div>`;
	$("#" + section).prepend(systemError);
}