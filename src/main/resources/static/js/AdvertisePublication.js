window.addEventListener("load", function(){
	addEvents();

});
function addEvents(){
	var form = document.getElementById("advertisePublicationForm");
	form.onsubmit=function(event){

		var titolo = document.getElementById("advertiseTitle");
		var descrizione = document.getElementById("advertiseDescription");
		var expiryDate = document.getElementById("advertiseExpiryDate");
		
		var error = false;
		var today = new Date();
		var expiryDateSelected = new Date(expiryDate.valueAsDate);
		
		if(titolo.value == ""){
			error = true;
			createAlertWithText("Inserire un titolo", "advertiseTitle")			
		}
		else
		{
			removeAlert("advertiseTitle");
		}

		if(expiryDate.value == ""){
			error = true;
			createAlertWithText("Selezionare una data di scadenza", "advertiseExpiryDate");
				
		}
		else if(expiryDate.value != "" && expiryDateSelected.getTime() < today.getTime()){
			error = true;
			createAlertWithText("La data selezionata è precedente a quella odierna", "advertiseExpiryDate");
		}
		else
		{
			removeAlert("advertiseExpiryDate");
		}
		
		if(error){
			event.preventDefault();
		}
		else{
			//submit
			//create advertise and send it to the server
			titolo.value = "";
			descrizione.value = "";
			expiryDate.value = "";
			//form.submit();
		}
		event.preventDefault();
	};
}


var createAlertWithText = function(text, idInput){
	document.getElementById(idInput).classList.add("is-invalid");
	var feedbackDiv = document.getElementById(idInput + "Feedback");
	feedbackDiv.classList.add("invalid-feedback");
	feedbackDiv.innerHTML = text;
}
var removeAlert = function(id){
	document.getElementById(id).classList.remove("is-invalid");
}
	


