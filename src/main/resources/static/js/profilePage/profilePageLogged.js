var oldImageInformation = null;
var oldAddressInformation = null;
var oldUserInformation = null;
var oldAccountInformation = null;
function loadOldInfo() {
	oldImageInformation = new Image.Builder();
	oldAddressInformation = new Address.Builder();
	oldUserInformation = new User.Builder();
	oldAccountInformation = new Account.Builder();
	oldImageInformation.withValue($("#profile-pic").attr("src"));
	oldAddressInformation.withProvince($("#province").val());
	oldAddressInformation.withTown($("#city").val());
	oldAddressInformation.withZipCode($("#zip-code").val());
	oldUserInformation.withAddress(oldAddressInformation.build());
	oldUserInformation.withName($("#name").val());
	oldUserInformation.withSurname($("#surname").val());
	oldUserInformation.withDateOfBirth($("#date-of-birth").val());
	oldAccountInformation.withNumber($("#telephone").val());
	oldAccountInformation.withProvinceOfWork($("#province-of-work").val());
	oldAccountInformation.withUser(oldUserInformation.build());
	oldAccountInformation.withProfilePic(oldImageInformation.build());
	$("i.area").each(function() {
		let areaBuilder = new Area.Builder();
		areaBuilder.withId($(this).attr("id"));
		oldAccountInformation.withArea(areaBuilder.build());
	});
}
function displayAccount(account) {
	$("#name").val(account.personalInfo.name);
	$("#surname").val(account.personalInfo.surname);
	$("#date-of-birth").val(account.personalInfo.dateOfBirth);
	$("#telephone").val(account.number);
	$("#zip-code").val(account.personalInfo.address.zipCode);
	$("#province").html(`<option selected>${account.personalInfo.address.province}<option>`);
	$("#city").html(`<option selected>${account.personalInfo.address.town}<option>`);
	$("#province-of-work").html(`<option selected>${account.provinceOfWork}<option>`);
}
function makeFormUneditable() {
	$("input").each(function() {
		if ($(this).attr("id") !== "zip-code") {
			$(this).prop("readonly", true);
			$(this).removeClass("is-valid");
			$(this).removeClass("is-invalid");
		}
	});
	$("select").each(function() {
		$(this).prop("disabled", true);
		$(this).removeClass("is-valid");
		$(this).removeClass("is-invalid");
	});
}
function clearSelectField() {
	let option = "<option selected disabled value=\"\">Scegli...</option>";
	$("#province").html(option);
	$("#city").html(option);
	$("#province-of-work").html(option);
	$("#zip-code").val("");
}
function hideViaAndHouseNumberField(){
	$("#via-div").css("display","none");
	$("#house-number-div").css("display","none");
}
function showViaAndHouseNumberField() {
	$("#via-div").css("display","initial");
	$("#house-number-div").css("display","initial");
}
function showModifyButton() {
	$("#modify-button").css("display", "initial");
	$("#delete-button").css("display", "none");
	$("#save-button").css("display", "none");
}
function showSaveAndDeleteButtons() {
	$("#modify-button").css("display", "none");
	$("#delete-button").css("display", "initial");
	$("#save-button").css("display", "initial");

}
function addSaveButtonListeners() {
	$("#save-button").click(() => {
		showModifyButton();
	});
}
function addDeleteButtonListeners() {
	$("#delete-button").click(() => {
		displayAccount(oldAccountInformation.build());
		makeFormUneditable();
		hideViaAndHouseNumberField();
		showModifyButton();
	});
}
function loadAreas(){
	$.ajax({
		type: "GET",
		url : "/getAreas",
		contentType: "application/json",
		success: function(risposta){
			for(let i = 0; i < risposta.length;i++){
				$("#select-area-div").append(`<div class="icon-div"><figure class="icon-figure" id="area-${i+1}"><i class="${risposta[i]["icon"]} fa-3x icon"id="${risposta[i]["id"]}"></i></figure></div>`);
				$("#select-area-div-outer").css("display","initial");
			}
		},
		error: function(){
			console.log("SHOW SYSTEM ERROR");
		}
	});
}
function addModifyButtonListener() {
	$("#modify-button").click(() => {
		loadAreas();
		//Rende il form modificabile
		$("input").each(function() {
			if ($(this).attr("id") !== "zip-code") {
				$(this).prop("readonly", false);
				if($(this).attr("id") !== "via" && $(this).attr("id") !== "house-number") appendCorrect($(this).attr("id"));
			}
		});
		$("select").each(function() {
			$(this).prop("disabled", false);

		});
		getProvince();
		loadOldInfo();
		clearSelectField();
		showViaAndHouseNumberField();
		showSaveAndDeleteButtons();
	});
}
function addProvinceListeners() {
	$("#province").change((event) => {
		var selectedProvince = (event.target.value);
		try {
			address_builder.withProvince(selectedProvince);
			account_builder.withProvinceOfWork(selectedProvince);
			let lowerCaseSelected = selectedProvince.toLowerCase();
			let currentCity = $("#city");
			currentCity.html("");
			if (city.hasOwnProperty(lowerCaseSelected)) {
				for (c of city[lowerCaseSelected]) {
					currentCity.append("<option>" + c + "</option>");
				}
				address_builder.withTown(currentCity.val());
				loadZipCode(false);
			}
			else {
				loadCity(lowerCaseSelected, false);
			}
			appendCorrect("province");
			$("#province-of-work").val(selectedProvince);
			appendCorrect("province-of-work");
		}
		catch (error) {
			console.log(error);
			appendError("province");
		}
	});
}
function addNameListener() {
	$("#name").on("input", () => {
		handleNameInput();
	});
}
function addSurnameListener() {
	$("#surname").on("input", () => {
		handleSurnameInput();
	});
}
function addTelephoneListener() {
	$("#telephone").on("input", () => {
		handleTelephoneInput();
	});
}
function addDateOfBirthListener() {
	$("#date-of-birth").on("input", () => {
		handleDateOfBirthListeners();
	});
}
function addViaListeners() {
	$("#via").on("input", () => {
		handleViaInput();
	});
}
function addHouseNumberListener() {
	$("#house-number").on("input", () => {
		handleHouseNumberInput();
	});
}
function addCityListeners() {
	$("#city").on("input", () => {
		if (handleCityInput()) {
			loadZipCode(false);
		}
	});
}
$(document).ready(() => {
	addModifyButtonListener();
	addProvinceListeners();
	addNameListener();
	addSurnameListener();
	addTelephoneListener();
	addDateOfBirthListener();
	addCityListeners();
	addSaveButtonListeners();
	addViaListeners();
	addHouseNumberListener();
	addDeleteButtonListeners();
});