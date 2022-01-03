var advertiseBuilder = new Advertise.Builder();

$(document).ready(() => {
	addEvents();
	
});

function addTitleListener(){
	$("#advertiseTitle").on("input", ()=>{
		let title = $("#advertiseTitle").val();
		try{
			advertiseBuilder.withTitle(title);
		}
		catch(error){
			removeAlert("advertiseTitle");
		}
	});
};
function addDescriptionListener(){
	$("#advertiseDescription").on("input", () => {
		let description = $("#advertiseDescription").val();
		advertiseBuilder.withDescription(description);
	});
}

function addExpiryDateListener(){
	$("#advertiseExpiryDate").on("input", () =>{
		let selectedDate = new Date($("#advertiseExpiryDate").val());
		try{

			var today = new Date();
			if(selectedDate.getTime() < today.getTime() && (selectedDate.getDay() != today.getDay() ||
			 selectedDate.getMonth() != today.getMonth() || selectedDate.getFullYear() != today.getFullYear())){
					createAlertWithText("La data selezionata è precedente a quella odierna", "advertiseExpiryDate");
			}
			else{
				advertiseBuilder.withExpiryDate($("#advertiseExpiryDate").val());
				removeAlert("advertiseExpiryDate");
			}
		}
		catch(error){
			createAlertWithText(error.message, "advertiseExpiryDate")
		}
	});
}

function addcheckRequiredInputs(){
	$("#advertisePublicationForm").on("submit", () => {
		var error = false;
		if($("#advertiseTitle").val() === ""){
				createAlertWithText("Inserire un titolo", "advertiseTitle")		
				error = true;
		}	
		if($("#advertiseExpiryDate").val() === "" ){
			createAlertWithText("Selezionare una data di scadenza", "advertiseExpiryDate");
			error = true;
		}
		if(error){
			
		}
		else{
			//submit
			//create advertise and send it to the server
			for(const [key, value] of listOfImages.entries()){
				console.log(key, value);
				advertiseBuilder.withImage(value);
			}
			//advertiseBuilder.withImage(listOfImages[0]);
			console.log(JSON.stringify(advertiseBuilder.build()));
			$("#advertiseTitle").text("");
			$("#advertiseDescription").text("");
			$("#advertiseExpiryDate").text("");
			//form.submit();s
		}
	});
}
		
		
function addEvents(){
	var form = document.getElementById("advertisePublicationForm");
	//alert("WE");
	addTitleListener();
	addDescriptionListener();
	addExpiryDateListener();
	addcheckRequiredInputs();
	
		
	form.onsubmit=function(event){
		event.preventDefault();
	};
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
	//alert("WE");
}