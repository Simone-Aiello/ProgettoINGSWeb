var advertiseBuilder = new Advertise.Builder();

$(document).ready(() => {
	addEvents();
	
});

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
				//TEST
				//advertiseBuilder.withExpiryDate($("#advertiseExpiryDate").val());
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
		if($("#advertiseProvince").val() === null){
			createAlertWithText("Selezionare una provincia", "advertiseProvince");
			error=true;
			
		}
		
		if(error){
			
		}
		else{
			//submit
			//create advertise and send it to the server
			for(const [key, value] of listOfImages.entries()){
				console.log(key, value);
				//advertiseBuilder.withImage(value);
			}
			for(const [key, value] of listOfAreas.entries()){
				//console.log(key, value);
				//advertiseBuilder.withArea(value);
				
			}
			//advertiseBuilder.withImage(listOfImages[0]);

			//THIS IS A TEST
			accountBuilder = new Account.Builder();
			accountBuilder.withUsername("aaaa");
			
			var account = accountBuilder.build();
			advertiseBuilder.withAccount(account);
			//
			
			let data = advertiseBuilder.build();
			console.log(JSON.stringify(data));
			
			$.ajax({
				type: "POST",
				url: "/saveAdvertise",
				contentType: "application/json",
				data: JSON.stringify(data),
				success: function(){
					console.log("SUCCESS");
				},
				error: function(xhr){
					console.log(xhr);
				}
			});
			
			
			$("#advertiseTitle").text("");
			$("#advertiseDescription").text("");
			$("#advertiseExpiryDate").text("");
			//form.submit();
		}
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
			showSystemError();
		}
	});
}
		
function addEvents(){
	var form = document.getElementById("advertisePublicationForm");
	//alert("WE");
	getProvince();
	addProvinceListener();
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