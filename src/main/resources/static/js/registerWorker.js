var city = {};
var account_builder = new Account.Builder();
var user_builder = new User.Builder();
var address_builder = new Address.Builder();
function addPasswordListeners() {

	//Check password security standard
	$("#insert-password").on("input", () => {
		let insertPasswordField = $("#insert-password");
		let password = insertPasswordField.val();
		try {
			account_builder.withPassword(password);
			insertPasswordField.removeClass("is-invalid");
			insertPasswordField.addClass("is-valid");
			$("#insert-password-info").css("color", "");
		}
		catch (error) {
			$("#insert-password-info").css("color", "#dc3545");
			insertPasswordField.removeClass("is-valid");
			insertPasswordField.addClass("is-invalid");
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
			let passwordIcon = $("#confirm-password-icon");
			$("#match-password-error").remove();
			confirmPasswordField.removeClass("is-valid");
			confirmPasswordField.addClass("is-invalid");
			passwordIcon.after("<div id=\"match-password-error\" class=\"invalid-feedback\">Le password non combaciano</div>");
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
function addCityListeners() {
	$("#province").change((event) => {
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
			$.ajax({
				type: "GET",
				url: "https://comuni-ita.herokuapp.com/api/comuni/provincia/" + selectedProvince,
				contentType: "application/json",
				success: function(risposta) {
					let tmp = [];
					for (let c of risposta) {
						let tmpMap = {
							nome : c["nome"],
							cap : c["cap"]
						};
						tmp.push(tmpMap);
					}
					city[selectedProvince] = tmp;
					for (c of city[selectedProvince]) {
						currentCity.append("<option>" + c["nome"] + "</option>");
					}
					loadZipCode();
				},
				error: function(xhr) {
					console.log("Non sono riuscito a fare la call");
				}
			});
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
			for (let p of risposta) {
				let provinceName = capitalizeFirstLetter(p["nome"]);
				work.append("<option>" + provinceName + "</option>");
				province.append("<option>" + provinceName + "</option>");
			}
		},
		error: function(xhr) {
			console.log("Non sono riuscito a fare la call");
		}
	});
}
function usernameAndEmailUnique(username,email){
	let d = [username,email];
	return new Promise((resolve,reject) =>{
		$.ajax({
			type : "POST",
			url : "/usernameAndEmailUnique",
			contentType: "application/json",
			data : JSON.stringify(d),
			success : (response) =>{
				resolve(response);
			}, 
			error : (xhr) =>{
				reject(xhr);
			}		
		});
	});
}
//usernameAndEmailUnique("aaa","bbb").then((data) => console.log(data)).catch((xhr) => console.log(xhr));
function addUsernameListeners() {
	$("#username").on("input", () => {
		let usernameField = $("#username");
		let username = usernameField.val();
		try {
			account_builder.withUsername(username);
			usernameField.removeClass("is-invalid");
			usernameField.addClass("is-valid");
		}
		catch (error) {
			$("#username-error").remove();
			usernameField.removeClass("is-valid");
			usernameField.addClass("is-invalid");
			usernameField.after("<div id=\"username-error\" class=\"invalid-feedback\">" + error.message + "</div>");
		}
	});
}
function addEmailListeners() {
	$("#email").on("input", () => {
		let emailField = $("#email");
		let email = emailField.val();
		try {
			account_builder.withEmail(email);
			emailField.removeClass("is-invalid");
			emailField.addClass("is-valid");
		}
		catch (error) {
			$("#email-error").remove();
			emailField.removeClass("is-valid");
			emailField.addClass("is-invalid");
			emailField.after("<div id=\"email-error\" class=\"invalid-feedback\">" + error.message + "</div>");
		}
	});
}
function addNameListeners() {
	$("#name").on("input", () => {
		user_builder.withName($("#name").val());
	});
}
function addSurnameListeners() {
	$("#surname").on("input", () => {
		user_builder.withSurname($("#surname").val());
	});
}
function addTelephoneListeners() {
	$("#telephone").on("input", () => {
		let telephoneField = $("#telephone");
		let telephoneValue = telephoneField.val();
		try {
			account_builder.withNumber(telephoneValue);
			telephoneField.addClass("is-valid");
			telephoneField.removeClass("is-invalid");
		}
		catch (error) {
			$("#telephone-error").remove();
			telephoneField.addClass("is-invalid");
			telephoneField.removeClass("is-valid");
			telephoneField.after("<div id=\"telephone-error\" class=\"invalid-feedback\">" + error.message + "</div>");
		}
	})
}
function addDateOfBirthListeners() {
	$("#date-of-birth").on("input", () => {
		let dateField = $("#date-of-birth");
		let dateValue = dateField.val();
		try {
			let datePart = dateValue.split("-");
			let date = datePart[2]+"/"+datePart[1] +"/"+ datePart[0];
			user_builder.withDateOfBirth(date);
			dateField.addClass("is-valid");
			dateField.removeClass("is-invalid");
		}
		catch (error) {
			$("#date-error").remove();
			dateField.addClass("is-invalid");
			dateField.removeClass("is-valid");
			dateField.after("<div id=\"date-error\" class=\"invalid-feedback\">" + error.message + "</div>");
		}
	});
}
function loadZipCode(){
	let selectedProvince = $("#province").val().toLowerCase();
	let currentCity = $("#city").val();
	for(c of city[selectedProvince]){
		if(c["nome"] === currentCity){
			$("#zip-code").val(c["cap"]);
			address_builder.withZipCode(c["cap"]);
			return;
		}
	}
}
function addProvinceAndCityListeners() {
	$("#province-of-work").on("input",() =>{
		account_builder.withProvinceOfWork($("#province-of-work").val());
		$("#province-of-work").addClass("is-valid");
		$("#province-of-work").removeClass("is-invalid");
	});
	$("#city").on("input",() =>{
		let townVal = $("#city").val();
		address_builder.withTown(townVal);
		$("#city").addClass("is-valid");
		$("#city").removeClass("is-invalid");
		loadZipCode();
	});
	$("#province").on("input",() =>{
		address_builder.withProvince($("#province").val());
		$("#province").addClass("is-valid");
		$("#province").removeClass("is-invalid");
	});
}
function addAddressListeners(){
	$("#via").on("input",() => {
		let viaField = $("#via");
		let viaValue = viaField.val();	
		try{
			address_builder.withVia(viaValue);
			viaField.removeClass("is-invalid");
			viaField.addClass("is-valid");
		}
		catch(error){
			$("#via-error").remove();
			viaField.addClass("is-invalid");
			viaField.removeClass("is-valid");
			viaField.after("<div id=\"via-error\" class=\"invalid-feedback\">" + error.message + "</div>");
		}
	});
	$("#house-number").on("input", () =>{
		let houseNumberField = $("#house-number");
		try{
			address_builder.withHouseNumber($("#house-number").val());
			houseNumberField.addClass("is-valid");
			houseNumberField.removeClass("is-invalid");			
		}
		catch(error){
			$("#house-number-error").remove();
			houseNumberField.addClass("is-invalid");
			houseNumberField.removeClass("is-valid");
			houseNumberField.after("<div id=\"house-number-error\" class=\"invalid-feedback\">" + error.message + "</div>");
		}
	});
}
$(document).ready(() => {
	getProvince();
	addCityListeners();
	addPasswordListeners();
	addUsernameListeners();
	addEmailListeners();
	addNameListeners();
	addSurnameListeners();
	addTelephoneListeners();
	addDateOfBirthListeners();
	addProvinceAndCityListeners();
	addAddressListeners();
});