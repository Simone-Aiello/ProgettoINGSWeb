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
				work.append("<option>" + provinceName + "</option>");
				province.append("<option>" + provinceName + "</option>");
			}
		},
		error: function(xhr) {
			showSystemError();
		}
	});
}