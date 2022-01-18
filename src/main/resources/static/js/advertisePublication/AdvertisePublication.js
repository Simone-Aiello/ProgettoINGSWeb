var advertiseBuilder = new Advertise.Builder();
var availabilityDates = [];
$(document).ready(() => {
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
			selectedDatesContent.append("<tr> <td>" + selectedDate+ "</td> <td><button id = \"" + selectedDateYMD+"\" class = \"selectedAvailabilityDate\">" + "rimuovi" + "</button></td></tr>")
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
			
			switchSection("#form", "#preview");
		}
	});
}

function addSubmitListener(){
	$("#publishAdvertise").on("click", () =>{			
			$.ajax({
				type: "POST",
				url: "/saveAdvertise",
				contentType: "application/json",
				data: JSON.stringify(advertiseBuilder.build()),
				success: function(){
					console.log("SUCCESS");
					//redirect to home page
				},
				error: function(xhr){
					console.log(xhr);
				}
			});		
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
			showSystemError();
		}
	});
}
		
function addEvents(){
	var form = document.getElementById("advertisePublicationForm");
	//alert("WE");
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