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

		}
		else{
			//alert("not checked");
			numberOfSelectedAreas++;
			areaCheckbox.prop("checked", true);	
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
	let newRowBegin = "<div class =\"row profileCardsRow\">";
	let newRowEnd = "</div>";
	let defaultImage= "/images/defaultProfilePic.png";
	
	let profileImage = defaultImage;
	if(a.profilePic != null)
		profileImage = a.profilePic.value;
		
	if(newLine == true){
		//alert("new line");
			profileCard += newRowBegin;
		}
	let profileCol = "<div class =\"col-lg-6 col-sm-12 col-xs-12\">" +
						"<div class=\"containerCard row mb-3 container-sm\">"+ 
							"<div id = \"profileDiv-"+ a.username +"\"class=\"profileDiv col\">"+
								"<div class=\"imageDiv\">"+
									"<img class = \"profilePic\" src=\""+ profileImage + "\">"+
								"</div>"+
								"<div class=\"profileName\"><p>" + a.username + "</p></div>"+	
								"<div class=\"actions\">"+
									"<button id = \"startChat-" + a.username + "\" class=\"profileButton\">Avvia chat</button>"+
									"<button id = \"viewProfile-"+ a.username + " class=\"profileButton\"><a href = \"profilePage?username=" + a.username + "\">Vedi profilo </a></button>"+
									"<button id = \"banAccount-"+a.username + "\" class=\"profileButton\">Banna account</button>"+
								"</div>"+
							"</div>";
								
							
				
	let firstStatName = "";
	let secondStatName = "";
	let thirdStatName = "";
	
	let firstStateContent = "";
	let secondStateContent = "";
	let thirdStateContent = "";

	if(a.accountType === "w"){
		//alert("Worker");
		firstStatName = "Lavori";
		firstStateContent = a.acceptedOffers;
		
		secondStatName = "Specialità";
		secondStateContent = "";
		
		thirdStatName = "Valutazioni";

		let averageReviews = a.averageReviews;
		
		//CHECK
		//alert(averageReviews);
		for(i = 1; i <= 5; i++){
			if(i <= averageReviews ){
				thirdStateContent += "<i class=\"fas fa-star fullstar\"></i>";
			}
			else{
				thirdStateContent += "<i class=\"far fa-star emptystar\"></i>";
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
	}
	let statsCol = 	"<div class=\"stats col\">"+
						"<div class =\"boxes container-fluid\">"+
							"<div class=\"box\">"+
								"<span class=\"parameter\">" + firstStatName + "</span>"+
								"<span class=\"value\">" + firstStateContent + "</span>"+
							"</div>"+
							"<div class=\"box\">"+
								"<span class=\"parameter\">" + secondStatName +"</span>"+
								"<span class=\"value\">" + secondStateContent + "</span>"+
							"</div>"+
							"<div class=\"box\">"+
								"<span class=\"parameter\">" + thirdStatName + "</span>"+
								"<span class=\"value\">" + thirdStateContent + "</span>"+
							"</div>";
						"</div>"+
					"</div>"+
				"</div>"+
			"</div>";
	
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
		accountBuilder = new Account.Builder();
		accountBuilder.withUsername(username);
		$.ajax({
			type: "POST",
			url: "/banAccount",
			contentType: "application/json",
			data:  JSON.stringify(accountBuilder.build()),
			success: function(){
				console.log(username + "banned");
			}
			
		});
	});
}


function addChatWithProfileEvent(username){
	$("#startChat-" + username).on("click", function(){
		alert(username);
		
		let accountBuilder1 = new Account.Builder();
		let accountBuilder2 = new Account.Builder();
		accountBuilder1.withUsername("aaaa");
		accountBuilder2.withUsername(username);
		let a1 = accountBuilder1.build();
		let a2 = accountBuilder2.build()
		let messageBuilder = new Message.Builder();
		messageBuilder.withText("messaggio di prova");
		messageBuilder.withSender(username);
		let messages = [];
		messages.push(messageBuilder.build());

		let chat = new Chat.Builder();
		chat.withA1(a1);
		chat.withA2(a2);
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
				//console.log(url);
				//alert(xhr.message);
			}
			
		});
		
	});
}

function addSearchButtonEvent(){
	$("#searchButton").on("click", ()=>{

		username = $("#usernameSelector").val().toLowerCase();
		$("#areaslistSelector").hide();
		$(".areaInput").each( function(){
			if($(this).is(":checked")){
				areaBuilder = new Area.Builder(); 
				areaBuilder.withId(parseInt($(this).attr("id").split("-")[0], 10));
				selectedAreasList.push(areaBuilder.build());
			}
		})
		
		if(username == "" && selectedAreasList.length == 0){
			let invalidDiv = "<div id = \"searchAlert\"class=\"alert alert-danger\" role=\"alert\">"+
							"Selezionare almeno un parametro di ricerca!" + "</div>"
			$("#searchBox").after(invalidDiv);
			
			//block search operation
			return;
		}
		else{
			$("#searchAlert").remove();
		}


	$("#searchButton").prop("disabled", true);
	$.ajax({
			type: "POST",
			url: "/findProfiles?username=" +username,
			contentType: "application/json",
			data:  JSON.stringify(selectedAreasList),
			success: function(profiles){
			//alert(JSON.stringify(profiles));
			console.log("SUCCESS");
				//reset search bar 
				numberOfSelectedAreas = 0;
				selectedAreasList = [];
				$("#areaInputLabel").html("0 scelte");
				$("#usernameSelector").val("");
				$("#profileCards").empty();
				let i = 0;
				for(let a of profiles){
					//alert(JSON.stringify(a));
					if(a.accountType === "w"){
						//ajax call for worker stats 
						//REMEMBER TO ADD MAIN AREA AS SOON AS IT IS READY
						$.ajax({
							type: "POST",
							url: "/reviewsAverageAndOffers?username=" +a.username,
							success: function(results){
								console.log("SUCCESS");
								//alert("WEEEE" + JSON.stringify(results));
								a.averageReviews = results[0];
								a.numberOfReviews = results[1];
								a.acceptedOffers = results[2];
								createProfileCard(a);
								//associate listener to the ban button present in each profile card
								addBanAccountEvent(a.username);
								addChatWithProfileEvent(a.username);
							},
							error: function(){
								
							}
							
						});
						//alert(JSON.stringify(a.averageReviews));
					}
					else if(a.accountType === "u"){
						//ajax call for user stats
						$.ajax({
							type: "POST",
							url: "/advertisesAndAreas?username=" +a.username,
							success: function(results){
								console.log("SUCCESS");
								//alert("WEEEE" + JSON.stringify(results));
								a.publishedAdvertises = results[0];
								a.advertisesAreas = results[1];
								a.onlineAdvertises = results[2];
								createProfileCard(a);
								//associate listener to the ban button present in each profile card
								addBanAccountEvent(a.username);
							},
							error: function(){
								
							}
							
						});
					}
					
					i++;
					//alert(a.profilePic);
					//alert(a.accountType);
				}
				if(i == 0){
					$("#profileCards").append("<h1>La ricerca non ha prodotto risultati...</h1>")
				}


			},
			error: function(xhr){
				console.log("ERROR");
				alert(xhr.message);
			}
		});
		$("#searchButton").prop("disabled", false);
		$(".areaInput").prop("checked", false);
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