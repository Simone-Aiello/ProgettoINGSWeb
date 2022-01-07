var city = {};
var account_builder = new Account.Builder();
var user_builder = new User.Builder();
var address_builder = new Address.Builder();
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
				let tmp = `<option id = "${provinceName}">${provinceName}</option> `
				//work.append("<option>" + provinceName + "</option>");
				//province.append("<option>" + provinceName + "</option>");
				work.append(tmp);
				province.append(tmp);
			}
		},
		error: function(xhr) {
			showSystemError();
		}
	});
}
function handleNameInput() {
	try {
		user_builder.withName($("#name").val());
		appendCorrect("name");
	}
	catch (error) {
		appendError("name", error.message);
	}
}
function handleSurnameInput() {
	try {
		user_builder.withSurname($("#surname").val());
		appendCorrect("surname");
	}
	catch (error) {
		appendError("surname", error.message);
	}
}
function handleTelephoneInput(){
	let telephoneField = $("#telephone");
		let telephoneValue = telephoneField.val();
		try {
			account_builder.withNumber(telephoneValue);
			appendCorrect("telephone");
		}
		catch (error) {
			appendError("telephone", error.message);
		}
}
function handleDateOfBirthListeners(){
	let dateField = $("#date-of-birth");
		let dateValue = dateField.val();
		try {
			user_builder.withDateOfBirth(dateValue);
			appendCorrect("date-of-birth");
		}
		catch (error) {
			appendError("date-of-birth", error.message);
		}
}
function loadZipCode(withSummary) {
	let selectedProvince = $("#province").val().toLowerCase();
	let currentCity = $("#city").val();
	for (c of city[selectedProvince]) {
		if (c["nome"] === currentCity) {
			$("#zip-code").val(c["cap"]);
			address_builder.withZipCode(c["cap"]);
			if(withSummary) updateSummary("zip-code", $("#zip-code").val());
			return;
		}
	}
}
function handleViaInput(){
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
}
function loadCity(selectedProvince,withSummary) {
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
				currentCity.append(`<option id="${c["nome"]}"> ${c["nome"]} </option>`);
			}
			address_builder.withTown($("#city").val());
			appendCorrect("city");
			loadZipCode(withSummary);
			if(withSummary) updateSummary("city", $("#city").val());
		},
		error: function() {
			showSystemError();
		}
	});
}
function handleCityInput() {
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
}