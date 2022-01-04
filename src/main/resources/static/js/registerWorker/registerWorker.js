var city = {};
var account_builder = new Account.Builder();
var user_builder = new User.Builder();
var address_builder = new Address.Builder();
var currentSection = 0;
var steps = ["personal-information", "picture-and-areas","summary"];
function sendAccount() {
	user_builder.withAddress(address_builder.build());
	account_builder.withUser(user_builder.build());
	account_builder.withProfilePic(imageBuilder.build());
	var account = account_builder.build();
	console.log(account);
	$.ajax({
		type: "POST",
		url: "/registerWorker",
		contentType: "application/json",
		data: JSON.stringify(account),
		success: (response) => {
			console.log(response);
			window.location.replace(response);
		},
		error: (xhr) => {
			console.log(xhr);
		}
	});
}
function updateSummary(idElement,currentText){
	let idSummary = "#summary-" + idElement;
	$(idSummary).text(currentText);
}
function removePreviousError(idElement) {
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
}
function checkFormError(sectionId) {
	let ok = true;
	$("#" + sectionId).find('input').each(function() {
		if ($(this).prop('required') && $(this).val() === "") {
			ok = false;
			appendError($(this).attr("id"), "Il campo è obbligatorio");
		}
		/*else if ($(this).hasClass("is-invalid")) {
			ok = false;
		}*/
	});
	$("#" + sectionId).find('select').each(function() {
		if ($(this).prop('required') && $(this).val() === null) {
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
			error: (xhr) => {
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
			error: (xhr) => {
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
						appendError("email", "Email già in uso sul sito");
					}
					else {
						animateFormTransition(steps[currentSection], steps[currentSection + 1]);
						currentSection++;
					}
				}).catch((error) => {
					showSystemError();
				});
			}
			break;
		case 1:
			if (atLeastOneArea()) {
				animateFormTransition(steps[currentSection], steps[currentSection + 1]);
				currentSection++;
			}
			else {
				appendError("area-div", "Selezionare almeno un ambito");
			}
			break;
		case 2:
				sendAccount();
			break;
	}
}
function showSystemError() {
	$("#system-error").remove();
	$(".header").after("<div id=\"system-error\" class=\"alert alert-danger\" role=\"alert\">C'è stato un problema interno, ci scusiamo per il disagio e la invitiamo a riprovare più tardi</div>");
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
function capitalizeFirstLetter(string) {
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
			for(let p of risposta){
				arrayProvince.push(capitalizeFirstLetter(p["nome"]));
			}
			arrayProvince.sort();
			for(let provinceName of arrayProvince){
				work.append("<option>" + provinceName + "</option>");
				province.append("<option>" + provinceName + "</option>");
			}
			/*for (let p of risposta) {
				let provinceName = capitalizeFirstLetter(p["nome"]);
				work.append("<option>" + provinceName + "</option>");
				province.append("<option>" + provinceName + "</option>");
			}*/
		},
		error: function(xhr) {
			showSystemError();
		}
	});
}
function addUsernameListeners() {
	$("#username").on("input", () => {
		let usernameField = $("#username");
		let username = usernameField.val();
		try {
			account_builder.withUsername(username);
			appendCorrect("username");
		}
		catch (error) {
			appendError("username", error.message);
		}
		updateSummary("username",usernameField.val());
	});
}
function addEmailListeners() {
	$("#email").on("input", () => {
		let emailField = $("#email");
		let email = emailField.val();
		try {
			account_builder.withEmail(email);
			appendCorrect("email");
		}
		catch (error) {
			appendError("email", error.message);
		}
		updateSummary("email",email);
	});
}
function addNameListeners() {
	$("#name").on("input", () => {
		try {
			user_builder.withName($("#name").val());
			appendCorrect("name");
		}
		catch (error) {
			appendError("name", error.message);
		}
		updateSummary("name",$("#name").val());
	});
}
function addSurnameListeners() {
	$("#surname").on("input", () => {
		try {
			user_builder.withSurname($("#surname").val());
			appendCorrect("surname");
		}
		catch (error) {
			appendError("surname", error.message);
		}
		updateSummary("surname",$("#surname").val());
	});
}
function addTelephoneListeners() {
	$("#telephone").on("input", () => {
		let telephoneField = $("#telephone");
		let telephoneValue = telephoneField.val();
		try {
			account_builder.withNumber(telephoneValue);
			appendCorrect("telephone");
		}
		catch (error) {
			appendError("telephone", error.message);
		}
		updateSummary("telephone",telephoneValue);
	})
}
function addDateOfBirthListeners() {
	$("#date-of-birth").on("input", () => {
		let dateField = $("#date-of-birth");
		let dateValue = dateField.val();
		try {
			let datePart = dateValue.split("-");
			let date = datePart[2] + "/" + datePart[1] + "/" + datePart[0];
			user_builder.withDateOfBirth(dateValue);
			appendCorrect("date-of-birth");
		}
		catch (error) {
			appendError("date-of-birth", error.message);
		}
		updateSummary("date-of-birth",dateValue);
	});
}
function loadZipCode() {
	let selectedProvince = $("#province").val().toLowerCase();
	let currentCity = $("#city").val();
	for (c of city[selectedProvince]) {
		if (c["nome"] === currentCity) {
			$("#zip-code").val(c["cap"]);
			address_builder.withZipCode(c["cap"]);
			updateSummary("zip-code",$("#zip-code").val());
			return;
		}
	}
}
function loadCity(selectedProvince) {
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
			loadZipCode();
			updateSummary("city",$("#city").val());
		},
		error: function(xhr) {
			showSystemError();
		}
	});
}
function addProvinceAndCityListeners() {
	$("#province-of-work").on("input", () => {
		try {
			account_builder.withProvinceOfWork($("#province-of-work").val());
			appendCorrect("province-of-work");
		}
		catch (error) {
			appendError("province-of-work", error.message);
		}
	});
	$("#city").on("input", () => {
		let townVal = $("#city").val();
		try {
			address_builder.withTown(townVal);
			appendCorrect("city");
			loadZipCode();
		}
		catch (error) {
			appendError("city", error.message);
		}
		updateSummary("city",townVal);
	});
	$("#province").change((event) => {
			var selectedProvince = (event.target.value);
		try{
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
				loadZipCode();
			}
			else {
				loadCity(lowerCaseSelected);
			}
			appendCorrect("province");
			$("#province-of-work").val(selectedProvince);
			appendCorrect("province-of-work");
		}
		catch(error){
			appendError("province");
		}
		updateSummary("province",selectedProvince);
		updateSummary("province-of-work",selectedProvince);
	});
	/*$("#province").on("input", () => {
		console.log("input");
		try {
			let selected = $("#province").val();
			
			appendCorrect("city");
			
		}
		catch (error) {
			appendError("province");
		}
	});
	$("#province").change((event) => {
		console.log("change");
		let selectedProvince = (event.target.value).toLowerCase();
		let currentCity = $("#city");
		currentCity.html("");
		if (city.hasOwnProperty(selectedProvince)) {
			for (c of city[selectedProvince]) {
				currentCity.append("<option>" + c + "</option>");
			}
			loadZipCode();
		}
		else {
			loadCity(selectedProvince);
		}
		console.log($("#city").val());
		address_builder.withTown($("#city").val());
	});*/
}
function addAddressListeners() {
	$("#via").on("input", () => {
		let viaField = $("#via");
		let viaValue = viaField.val();
		try {
			address_builder.withVia(viaValue);
			appendCorrect("via");
		}
		catch (error) {
			appendError("via", error.message);
		}
		updateSummary("via",viaField.val());
	});
	$("#house-number").on("input", () => {
		let houseNumberField = $("#house-number");
		try {
			address_builder.withHouseNumber($("#house-number").val());
			appendCorrect("house-number");
		}
		catch (error) {
			appendError("house-number-error", error.message);
		}
		updateSummary("house-number",$("#house-number").val());
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
$(document).ready(() => {
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