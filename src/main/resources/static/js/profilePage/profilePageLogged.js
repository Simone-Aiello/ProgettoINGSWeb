var oldImageInformation = null;
var oldAddressInformation = null;
var oldUserInformation = null;
var oldAccountInformation = null;
var selectedAreas = {};
var areaAlreadyLoaded = false;
var fileReader = new FileReader();
var defaultPhoto = "/usersImages/profilePictures/defaultIcon.png";
var acceptedExtensions = ["image/png", "image/jpg", "image/jpeg"];
var reviewIndex = 5;
var reviewStep = 5;
function showSuccessAlert(message) {
	let successDiv = `<div class="alert alert-success alert-dismissible fade show" role="alert">${message}<button id="success-alert-button" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" style ="display:none;"></button></div>`;
	$("#initial-info").append(successDiv);
	setTimeout(function() {
		$("#success-alert-button").click();
	}, 3000);
}
function showSystemError() {
	let errorDiv = `<div id ="system-error" class="alert alert-danger fade show" role="alert">C'è stato un problema interno, ci scusiamo per il disagio e la invitiamo a riprovare più tardi</div>`;
	$("#system-error").remove();
	$("#initial-info").append(errorDiv);
}
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
	if ($("#telephone").val() != "") oldAccountInformation.withNumber($("#telephone").val());
	oldAccountInformation.withUser(oldUserInformation.build());
	oldAccountInformation.withProfilePic(oldImageInformation.build());
	if(accountType == "w"){
		oldAccountInformation.withProvinceOfWork($("#province-of-work").val());
		$("i.area").each(function() {
			let areaBuilder = new Area.Builder();
			areaBuilder.withId($(this).attr("id"));
			areaBuilder.withIcon($(this).attr("class").split(/\s+/)[2]);
			oldAccountInformation.withArea(areaBuilder.build());
		});		
	}
}
function buildNewAccount() {
	user_builder.withAddress(address_builder.build());
	account_builder.withProfilePic(image_builder.build());
	account_builder.withUser(user_builder.build());
	account_builder.withUsername($("#username").text());
	if(accountType == "w"){
		for (area in selectedAreas) {
			if (selectedAreas[area]) {
				let area_builder = new Area.Builder();
				area_builder.withId($(area + " i").attr("id"));
				area_builder.withIcon($(area + " i").attr("class").split(/\s+/)[1]);
				account_builder.withArea(area_builder.build());
			}
		}		
	}
	return account_builder.build();
}
function displayAccount(account) {
	if (account.personalInfo().name != undefined) $("#name").val(account.personalInfo().name);
	if (account.personalInfo().surname != undefined) $("#surname").val(account.personalInfo().surname);
	if (account.personalInfo().dateOfBirth != undefined) $("#date-of-birth").val(account.personalInfo().dateOfBirth);
	if (account.number() != undefined) $("#telephone").val(account.number());
	if (account.personalInfo().address.zipCode != undefined) $("#zip-code").val(account.personalInfo().address.zipCode);
	if (account.personalInfo().address.province != undefined) $("#province").html(`<option selected>${account.personalInfo().address.province}<option>`);
	if (account.personalInfo().address.town != undefined) $("#city").html(`<option selected>${account.personalInfo().address.town}<option>`);
	if (account.profilePic().value != undefined) $("#profile-pic").attr("src", account.profilePic().value == "default" ? defaultPhoto : account.profilePic().value);
	if(accountType == "w"){
		if (account.provinceOfWork() != undefined) $("#province-of-work").html(`<option selected>${account.provinceOfWork()}<option>`);
		$(".areas").html("");
		for (area of account.areasOfWork()) {
			$(".areas").append(`<i class="area fas ${area.icon} fa-2x icon mb-3 p-2" id="${area.id}"></i>`);
		}		
	}
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
	$("#zip-code").val("");
	if(accountType == "w"){
		$("#province-of-work").html(option);		
	}
}
function hideViaAndHouseNumberField() {
	$("#via-div").css("display", "none");
	$("#house-number-div").css("display", "none");
}
function showViaAndHouseNumberField() {
	$("#via-div").css("display", "initial");
	$("#house-number-div").css("display", "initial");
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
function changeToViewMode() {
	makeFormUneditable();
	hideViaAndHouseNumberField();
	hideAreasDiv();
	showModifyButton();
	hideUploadDeleteImage();
}
function formValid() {
	let ok = true;
	$("input").each(function() {
		if (!($(this).hasClass("is-valid")) && $(this).attr("id") !== "zip-code" && $(this).attr("id") !== "telephone") {
			ok = false;
		}
	});
	$("select").each(function() {
		if (!$(this).hasClass("is-valid")) ok = false;;
	});
	return ok;
}
function atLeastOneArea() {
	for (area in selectedAreas) {
		if (selectedAreas[area]) {
			return true;
		}
	}
	return false;
}
function sendAccount(account) {
	$.ajax({
		type: "POST",
		url: "/updateWorker",
		contentType: "application/json",
		data: JSON.stringify(account),
		success: (response) => {
			console.log(response);
			displayAccount(account);
		},
		error: () => {
			showSystemError();
		}
	});
}
function addSaveButtonListeners() {
	$("#save-button").click(() => {
		if (formValid()) {
			if(accountType !== "w"){
				changeToViewMode();
				let acc = buildNewAccount();
				sendAccount(acc);
			}
			else if (atLeastOneArea()) {
				$("#area-div").removeClass("is-invalid");
				changeToViewMode();
				let acc = buildNewAccount();
				sendAccount(acc);
				showAreas();
			}
			else {
				appendError("area-div", "Selezionare almeno un ambito");
			}
		}
		else {
			$("input").each(function() {
				if (!$(this).hasClass("is-valid") && $(this).val() == "" && $(this).attr("id") != "zip-code") {
					appendError($(this).attr("id"), "Campo obbligatorio");
				}
			});
			$("select").each(function() {
				if (!$(this).hasClass("is-valid") && $(this).val() == null) {
					appendError($(this).attr("id"), "Campo obbligatorio");
				}
			});
		}
	});
}
function showAreasDiv() {
	$("#area-div-outer").css("display", "initial");
}
function hideAreasDiv() {
	$("#area-div-outer").css("display", "none");
}
function addDiscardChangesButtonListeners() {
	$("#delete-button").click(() => {
		displayAccount(oldAccountInformation.build());
		changeToViewMode();
		if(accountType == "w"){
			showAreas();			
		}
	});
}
function addAreasListeners() {
	$(".icon-figure").each(function(key, value) {
		let id = "#area-" + (key + 1);
		selectedAreas[id] = false;
		$(this).mouseenter(() => {
			$(id).css("background-color", "#FF9400");
			$(id + " .icon").css("color", "#FFFFFF");
		});
		$(this).mouseleave(() => {
			if (selectedAreas["#" + $(this).attr("id")]) return;
			$(this).css("background-color", "#FFFFFF");
			$(id + " .icon").css("color", "#FF9400");
		});
		$(this).click(() => {
			let id = "#" + $(this).attr("id");
			selectedAreas[id] = !selectedAreas[id];
			if (!selectedAreas[id]) {
				$(this).css("background-color", "#FFFFFF");
				$(id + " .icon").css("color", "#FF9400");
				account_builder.removeArea($(id + " i").attr("id"));
			}
		});
	});
}
function loadAreas() {
	$.ajax({
		type: "GET",
		url: "/getAreas",
		contentType: "application/json",
		success: function(risposta) {
			for (let i = 0; i < risposta.length; i++) {
				$("#area-row").append(`<div class="col icon-div"><figure class="icon-figure" id="area-${i + 1}"><i class="${risposta[i]["icon"]} fa-3x icon"id="${risposta[i]["id"]}"></i></figure></div>`);
			}
			showAreasDiv();
			addAreasListeners();
		},
		error: function() {
			showSystemError();
		}
	});
}
function hideAreas() {
	$(".areas").css("display", "none");
}
function showAreas() {
	$(".areas").css("display", "initial");
}
function showUploadDeleteImage() {
	$("#photo-button-div").css("display", "initial");
}
function hideUploadDeleteImage() {
	$("#photo-button-div").css("display", "none");
}
function addModifyButtonListener() {
	$("#modify-button").click(() => {
		account_builder = new Account.Builder();
		user_builder = new User.Builder();
		address_builder = new Address.Builder();
		image_builder = new Image.Builder();
		user_builder.withName($("#name").val());
		user_builder.withSurname($("#surname").val());
		user_builder.withDateOfBirth($("#date-of-birth").val());
		account_builder.withNumber($("#telephone").val());
		if (!areaAlreadyLoaded && accountType === "w") {
			loadAreas();
			areaAlreadyLoaded = true;
		}
		else if(accountType == "w") showAreasDiv();
		//Rende il form modificabile
		$("input").each(function() {
			if ($(this).attr("id") !== "zip-code") {
				$(this).prop("readonly", false);
				if ($(this).attr("id") !== "via" && $(this).attr("id") !== "house-number") appendCorrect($(this).attr("id"));
			}
		});
		$("select").each(function() {
			$(this).prop("disabled", false);
		});
		$("#via").val(null);
		$("#house-number").val(null);
		getProvince();
		loadOldInfo();
		clearSelectField();
		showViaAndHouseNumberField();
		showSaveAndDeleteButtons();
		showUploadDeleteImage();
		if(accountType == "w"){
			hideAreas();			
		}
	});
}
function addProvinceListeners() {
	$("#province").change((event) => {
		var selectedProvince = (event.target.value);
		try {
			address_builder.withProvince(selectedProvince);
			if(accountType == "w"){
				account_builder.withProvinceOfWork(selectedProvince);				
			}
			let lowerCaseSelected = selectedProvince.toLowerCase();
			let currentCity = $("#city");
			currentCity.html("");
			if (city.hasOwnProperty(lowerCaseSelected)) {
				for (c of city[lowerCaseSelected]) {
					currentCity.append("<option>" + c["nome"] + "</option>");
				}
				address_builder.withTown(currentCity.val());
				loadZipCode(false);
			}
			else {
				loadCity(lowerCaseSelected, false);
			}
			appendCorrect("province");
			if(accountType == "w"){
				$("#province-of-work").val(selectedProvince);
				appendCorrect("province-of-work");				
			}
		}
		catch (error) {
			appendError("province");
		}
	});
	$("#province-of-work").change((event) => {
		var selectedProvince = (event.target.value);
		try {
			account_builder.withProvinceOfWork(selectedProvince);
			appendCorrect("province-of-work");
		}
		catch (error) {
			appendError("province-of-work");
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
//Evento chiamato al completo caricamento di una foto
function addFileReaderListener() {
	fileReader.onload = (e) => {
		$("#profile-pic").attr("src", e.target.result);
		$("#file-input")[0].value = '';
		image_builder.withValue(e.target.result);
	};
}
//Quando carico una foto l'evento change viene chiamato
function addInputListener() {
	$("#file-input").change((e) => {
		if (e.target.files[0] && acceptedExtensions.includes(e.target.files[0].type)) {
			let file = e.target.files[0];
			fileReader.readAsDataURL(file);
		}
	});
}
function addUploadAndDeleteListeners() {
	//Upload button listeners
	$("#upload-photo").hover((enter) => {
		$("#upload-photo").css("background-color", "#FF9400");
		$("#upload-photo").css("color", "#FFFFFF");
		$("#upload-icon").css("color", "#FFFFFF");
	}, (exit) => {
		$("#upload-photo").css("background-color", "#FFFFFF");
		$("#upload-photo").css("color", "#FF9400");
		$("#upload-icon").css("color", "#FF9400");
	});
	$("#upload-photo").click(() => {
		$("#file-input").click();
	});

	//Remove button listeners
	$("#remove-photo").hover((enter) => {
		$("#remove-photo").css("background-color", "#FF9400");
		$("#remove-photo").css("color", "#FFFFFF");
		$("#delete-icon").css("color", "#FFFFFF");
	}, (exit) => {
		$("#remove-photo").css("background-color", "#FFFFFF");
		$("#remove-photo").css("color", "#FF9400");
		$("#delete-icon").css("color", "#FF9400");
	});
	$("#remove-photo").click(() => {
		$("#profile-pic").attr("src", defaultPhoto);
		image_builder.withValue("default");
	});
}
function addSendEmailListeners() {
	$("#send-email").click(() => {
		$.ajax({
			type: "POST",
			url: "/sendVerificationMail",
			contentType: "application/json",
			data: $("#username").text(),
			success: function() {
				showSuccessAlert("Email di verifica inviata correttamente");
			},
			error: function() {
				showSystemError();
			}
		});
		$("#dismiss-alert").click();
	});
}
function appendReview(review) {
	let newReviewTemplate = $(`
	<div class="card mb-2">
		<div>
			<div>
				<div class="card-body">
					<h5 class="card-title">${review["title"]}</h5>
					<div id ="review-stars"> </div>
					<p class="card-text review-description mb-1">${review["description"]}</p>
					<p class="card-text">
						<small class="text-muted review-client"><a href="profilePage?username=${review["client"]["username"]}">${review["client"]["username"]}</a></small>
					</p>
				</div>
			</div>
		</div>
	</div>`);
	for (let i = 0; i < 5; i++) {
		if (i < review["rating"]) {
			newReviewTemplate.find("#review-stars").append(`<i class="fas fa-star" aria-hidden="true"></i>`);
		}
		else {
			newReviewTemplate.find("#review-stars").append(`<i class="far fa-star" aria-hidden="true"></i>`);
		}
	}
	$("#reviews-list").append(newReviewTemplate);
}
function clearReviews() {
	$("#reviews-list").html("");
}
function addNextReviewsButtonListeners() {
	//d[username,limit,offset]
	$("#next-reviews").click(() => {
		let d = {
			username: $("#username").text(),
			limit: reviewStep,
			offset: reviewIndex
		}
		$.ajax({
			type: "GET",
			url: "/getReviews",
			contentType: "application/json",
			data: d,
			success: function(response) {
				if (response.length > 0) {
					reviewIndex += reviewStep;
					clearReviews();
					for (review of response) {
						appendReview(review);
					}
				}
			},
			error: function() {
				showSystemError();
			}
		});
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
	addDiscardChangesButtonListeners();
	addUploadAndDeleteListeners();
	addFileReaderListener();
	addInputListener();
	addSendEmailListeners();
	if(accountType == "w"){
		addNextReviewsButtonListeners();		
	}
});