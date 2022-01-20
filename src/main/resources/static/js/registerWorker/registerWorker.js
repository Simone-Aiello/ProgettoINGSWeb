var city = {};
var account_builder = new Account.Builder();
var user_builder = new User.Builder();
var address_builder = new Address.Builder();
var currentSection = 0;
var steps = ["personal-information", "picture-and-areas", "summary"];
function sendAccount() {
	user_builder.withAddress(address_builder.build());
	account_builder.withUser(user_builder.build());
	account_builder.withProfilePic(imageBuilder.build());
	account_builder.withAccountType(accountType);
	var account = account_builder.build();
	console.log(JSON.stringify(account));
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url: "/register",
			contentType: "application/json",
			data: JSON.stringify(account),
			success: (response) => {
				resolve(response);
			},
			error: () => {
				reject();
			}
		});
	});
}
function updateSummary(idElement, currentText) {
	let idSummary = "#summary-" + idElement;
	$(idSummary).text(currentText);
}
/*function removePreviousError(idElement) {
	let errorId = "#" + idElement + "-error";
	$(errorId).remove();
}
function appendError(idElement, message) {
	removePreviousError(idElement);
	let field = $("#" + idElement);
	field.addClass("is-invalid");
	field.removeClass("is-valid");
	if (idElement === "confirm-password") {
		let passwordIcon = $("#confirm-password-icon");
		passwordIcon.after("<div id=" + idElement + "-error" + " class=\"invalid-feedback\">" + message + "</div>");
	}
	else if (idElement === "insert-password") {
		$("#insert-password-info").css("color", "#dc3545");
	}
	else {
		field.after("<div id=" + idElement + "-error" + " class=\"invalid-feedback\">" + message + "</div>");
	}
}
function appendCorrect(idElement) {
	removePreviousError(idElement);
	let field = $("#" + idElement);
	field.removeClass("is-invalid");
	field.addClass("is-valid");
	if (idElement === "insert-password") {
		$("#insert-password-info").css("color", "");
	}
}*/
function checkFormError(sectionId) {
	let ok = true;
	$("#" + sectionId).find('input').each(function() {
		if (($(this).prop('required') && $(this).val() === "")) {
			ok = false;
			appendError($(this).attr("id"), "Il campo è obbligatorio");
		}
		else if ($(this).hasClass("is-invalid")) {
			ok = false;
		}
	});
	$("#" + sectionId).find('select').each(function() {
		if (($(this).prop('required') && $(this).val() === null)) {
			ok = false;
			appendError($(this).attr("id"), "Il campo è obbligatorio");
		}
		else if ($(this).hasClass("is-invalid")) {
			ok = false;
		}
	});
	return ok;
}
function animateFormTransition(sectionToHide, sectionToShow) {
	let idHide = "#" + sectionToHide;
	let idShow = "#" + sectionToShow;
	$(idHide).hide("slow");
	$(idShow).show("slow");
}
function checkUsernameUnique(username) {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url: "/usernameUnique",
			contentType: "application/json",
			data: username,
			success: (response) => {
				resolve(response);
			},
			error: () => {
				reject(null);
			}
		});
	});
}
function checkEmailUnique(email) {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url: "/emailUnique",
			contentType: "application/json",
			data: email,
			success: (response) => {
				resolve(response);
			},
			error: () => {
				reject(null);
			}
		});
	});
}
function switchToNextSection() {
	switch (currentSection) {
		case 0:
			if (checkFormError("personal-information")) {
				let username = $("#username").val();
				let email = $("#email").val();
				Promise.all([checkUsernameUnique(username), checkEmailUnique(email)]).then((data) => {
					if (!data[0]) {
						appendError("username", "Username già in uso sul sito");
					}
					else if (!data[1]) {
						appendError("email", "Email già in uso sul sito. <a href=" + "/passwordRecovery.html class=\"link-primary\">Recupera password</a>");
					}
					else {
						animateFormTransition(steps[currentSection], steps[currentSection + 1]);
						currentSection++;
					}
				}).catch(() => {
					showSystemError("header");
				});
			}
			break;
		case 1:
			if (!atLeastOneArea() && accountType == "w") {
				appendError("area-div", "Selezionare almeno un ambito");
			}
			else if (!newAreaFormValid() && accountType == "w") {
				appendError("missing-area", "Campi obbligatori");
			}
			else {
				animateFormTransition(steps[currentSection], steps[currentSection + 1]);
				currentSection++;
			}
			break;
		case 2:
			Promise.all([sendAccount(), sendNewArea()]).then((data) => {
				window.location.replace(data[0]);
			}).catch(() => {
				showSystemError("header-summary");
			});
			break;
	}
}
function showSystemError(locationClass) {
	$(`#system-error-${locationClass}`).remove();
	$(`.${locationClass}`).after(`<div id="system-error-${locationClass}" class="alert alert-danger" role="alert">C'è stato un problema interno, ci scusiamo per il disagio e la invitiamo a riprovare più tardi</div>`);
	//$(`.${locationClass}`).after("<div id=\"system-error\" class=\"alert alert-danger\" role=\"alert\">C'è stato un problema interno, ci scusiamo per il disagio e la invitiamo a riprovare più tardi</div>");
}
function addPasswordListeners() {
	//Check password security standard
	$("#insert-password").on("input", () => {
		let insertPasswordField = $("#insert-password");
		let password = insertPasswordField.val();
		try {
			account_builder.withPassword(password);
			appendCorrect("insert-password");
		}
		catch (error) {
			appendError("insert-password", "");
			//If insert password is not valid also confirm password is always invalid
			$("#confirm-password").removeClass("is-valid");
		}
	});
	//Check if passwords matches
	$("#confirm-password").on("input", () => {
		let confirmPasswordField = $("#confirm-password");
		let password = confirmPasswordField.val();
		if ($("#insert-password").val() === password) {
			confirmPasswordField.removeClass("is-invalid");
			confirmPasswordField.removeClass("is-valid");
			if ($("#insert-password").hasClass("is-valid")) {
				confirmPasswordField.addClass("is-valid");
			}
		}
		else {
			appendError("confirm-password", "Le password non combaciano");
		}
	});
	//Hiding/visualizzing eye icon
	$('.insert').click(() => {
		$("#insert-password").attr('type', (index, currentValue) => {
			return currentValue === 'password' ? 'text' : 'password';
		});
		if ($("#insert-password").attr('type') === 'password') {
			$('.insert').attr('class', 'far fa-eye-slash insert');
		}
		else {
			$('.insert').attr('class', 'far fa-eye insert');
		}
	});
	$('.confirm').click(() => {
		$("#confirm-password").attr('type', (index, currentValue) => {
			return currentValue === 'password' ? 'text' : 'password';
		});
		if ($("#confirm-password").attr('type') === 'password') {
			$('.confirm').attr('class', 'far fa-eye-slash confirm');
		}
		else {
			$('.confirm').attr('class', 'far fa-eye confirm');
		}
	});
}
/*function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
function getProvince() {
	$.ajax({
		type: "GET",
		url: "https://comuni-ita.herokuapp.com/api/province",
		contentType: "application/json",
		success: function(risposta) {
			let work = $("#province-of-work");
			let province = $("#province");
			let arrayProvince = [];
			for (let p of risposta) {
				arrayProvince.push(capitalizeFirstLetter(p["nome"]));
			}
			arrayProvince.sort();
			for (let provinceName of arrayProvince) {
				work.append("<option>" + provinceName + "</option>");
				province.append("<option>" + provinceName + "</option>");
			}
		},
		error: function(xhr) {
			showSystemError("header");
		}
	});
}*/
function handleUsernameInput() {
	let usernameField = $("#username");
	let username = usernameField.val();
	try {
		account_builder.withUsername(username);
		appendCorrect("username");
	}
	catch (error) {
		appendError("username", error.message);
	}
}
function addUsernameListeners() {
	$("#username").on("input", () => {
		handleUsernameInput();
		updateSummary("username", $("#username").val());
	});
}
function handleEmailInput() {
	let emailField = $("#email");
	let email = emailField.val();
	try {
		account_builder.withEmail(email);
		appendCorrect("email");
	}
	catch (error) {
		appendError("email", error.message);
	}
}
function addEmailListeners() {
	$("#email").on("input", () => {
		handleEmailInput();
		updateSummary("email", $("#email").val());
	});
}
/*function handleNameInput() {
	try {
		user_builder.withName($("#name").val());
		appendCorrect("name");
	}
	catch (error) {
		appendError("name", error.message);
	}
}*/
function addNameListeners() {
	$("#name").on("input", () => {
		handleNameInput();
		updateSummary("name", $("#name").val());
	});
}
/*function handleSurnameInput() {
	try {
		user_builder.withSurname($("#surname").val());
		appendCorrect("surname");
	}
	catch (error) {
		appendError("surname", error.message);
	}
}*/
function addSurnameListeners() {
	$("#surname").on("input", () => {
		handleSurnameInput();
		updateSummary("surname", $("#surname").val());
	});
}
/*function handleTelephoneInput() {
	let telephoneField = $("#telephone");
	let telephoneValue = telephoneField.val();
	try {
		account_builder.withNumber(telephoneValue);
		appendCorrect("telephone");
	}
	catch (error) {
		appendError("telephone", error.message);
	}
}*/
function addTelephoneListeners() {
	$("#telephone").on("input", () => {
		handleTelephoneInput();
		updateSummary("telephone", $("#telephone").val());
	})
}
/*function handleDateOfBirthListeners() {
	let dateField = $("#date-of-birth");
	let dateValue = dateField.val();
	try {
		user_builder.withDateOfBirth(dateValue);
		appendCorrect("date-of-birth");
	}
	catch (error) {
		appendError("date-of-birth", error.message);
	}
}*/
function addDateOfBirthListeners() {
	$("#date-of-birth").on("input", () => {
		handleDateOfBirthListeners();
		updateSummary("date-of-birth", $("#date-of-birth").val());
	});
}
/*function loadZipCode(withSummary) {
	let selectedProvince = $("#province").val().toLowerCase();
	let currentCity = $("#city").val();
	for (c of city[selectedProvince]) {
		if (c["nome"] === currentCity) {
			$("#zip-code").val(c["cap"]);
			address_builder.withZipCode(c["cap"]);
			if (withSummary) updateSummary("zip-code", $("#zip-code").val());
			return;
		}
	}
}*/
/*function loadCity(selectedProvince, withSummary) {
	let currentCity = $("#city");
	$.ajax({
		type: "GET",
		url: "https://comuni-ita.herokuapp.com/api/comuni/provincia/" + selectedProvince,
		contentType: "application/json",
		success: function(risposta) {
			let tmp = [];
			for (let c of risposta) {
				let tmpMap = {
					nome: c["nome"],
					cap: c["cap"]
				};
				tmp.push(tmpMap);
			}
			city[selectedProvince] = tmp;
			for (c of city[selectedProvince]) {
				currentCity.append("<option>" + c["nome"] + "</option>");
			}
			address_builder.withTown($("#city").val());
			appendCorrect("city");
			loadZipCode(withSummary);
			if (withSummary) updateSummary("city", $("#city").val());
		},
		error: function() {
			showSystemError("header");
		}
	});
}*/
function handleProvinceOfWorkInput() {
	try {
		account_builder.withProvinceOfWork($("#province-of-work").val());
		appendCorrect("province-of-work");
	}
	catch (error) {
		appendError("province-of-work", error.message);
	}
}
/*function handleCityInput() {
	let townVal = $("#city").val();
	try {
		address_builder.withTown(townVal);
		appendCorrect("city");
	}
	catch (error) {
		appendError("city", error.message);
		return false;
	}
	return true;
}*/
function addProvinceAndCityListeners() {
	$("#province-of-work").on("input", () => {
		if (accountType == "w") {
			handleProvinceOfWorkInput();
		}
	});
	$("#city").on("input", () => {
		if (handleCityInput()) {
			loadZipCode(true);
			updateSummary("city", $("#city").val());
		}
	});
	$("#province").change((event) => {
		var selectedProvince = (event.target.value);
		try {
			address_builder.withProvince(selectedProvince);
			let lowerCaseSelected = selectedProvince.toLowerCase();
			let currentCity = $("#city");
			currentCity.html("");
			if (city.hasOwnProperty(lowerCaseSelected)) {
				for (c of city[lowerCaseSelected]) {
					currentCity.append(`<option id="${c["nome"]}"> ${c["nome"]} </option>`);
				}
				address_builder.withTown(currentCity.val());
				loadZipCode(true);
			}
			else {
				loadCity(lowerCaseSelected, true);
			}
			appendCorrect("province");
			if (accountType == "w") {
				account_builder.withProvinceOfWork(selectedProvince);
				$("#province-of-work").val(selectedProvince);
				appendCorrect("province-of-work");
			}
		}
		catch (error) {
			appendError("province");
		}
		updateSummary("province", selectedProvince);
		if ($("#province-of-work").length) {
			updateSummary("province-of-work", selectedProvince);
		}
	});
}
/*function handleViaInput() {
	let viaField = $("#via");
	let viaValue = viaField.val();
	try {
		address_builder.withVia(viaValue);
		appendCorrect("via");
	}
	catch (error) {
		appendError("via", error.message);
	}
}
function handleHouseNumberInput() {
	try {
		address_builder.withHouseNumber($("#house-number").val());
		appendCorrect("house-number");
	}
	catch (error) {
		appendError("house-number-error", error.message);
	}
}*/
function addAddressListeners() {
	$("#via").on("input", () => {
		handleViaInput();
		updateSummary("via", $("#via").val());
	});
	$("#house-number").on("input", () => {
		handleHouseNumberInput();
		updateSummary("house-number", $("#house-number").val());
	});
}
function addNextListeners() {
	$("#next").click(() => {
		switchToNextSection();
	});
}
function addPreviousListeners() {
	$("#previous").click(() => {
		if (currentSection != 0) {
			animateFormTransition(steps[currentSection], steps[currentSection - 1]);
			currentSection--;
		}
	});
}
function clearAll() {
	$("input").each(function() {
		$(this).val(null);
	});
	$("select").each(function() {
		$(this).val(null);
	});
}
$(document).ready(() => {
	clearAll();
	getProvince();
	addPasswordListeners();
	addUsernameListeners();
	addEmailListeners();
	addNameListeners();
	addSurnameListeners();
	addTelephoneListeners();
	addDateOfBirthListeners();
	addProvinceAndCityListeners();
	addAddressListeners();
	addNextListeners();
	addPreviousListeners();
});