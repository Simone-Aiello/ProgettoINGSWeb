var _regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var _regexPassword = /^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,16}$/;
var currentSection = 0;
var sections = ["insert-email","insert-code"];
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
}
function showErrorAlert(message) {
	$("#system-error").remove();
	$(".header").after(`<div id=\"system-error\" class=\"alert alert-danger\" role=\"alert\">${message}</div>`);
}
function sendVerifyCode(email){
	$.ajax({
		type: "POST",
		url: "/sendVerifyCode",
		contentType: "application/json",
		data: email,
		success: () => {
			$('#email').prop('readonly', true);
			appendCorrect("email");
			$("#send-code-button").text("Cambia password");
			$("#code-div").toggle("slow");
			currentSection++;
		},
		error: () => {
			showErrorAlert("C'è stato un problema interno, ci scusiamo per il disagio e la invitiamo a riprovare più tardi");
		}
	});
}
function resetCompleted(){
	$("#system-error").remove();
	let node = "<div class=\"alert alert-success\" id=\"reset-completed\"role=\"alert\">Password ripristinata con successo, verrai riportato alla schermata di login</div>";
	$(".header").after(node);
	setTimeout(function(){
		window.location.replace("/Login.html");
	}, 5000);
}
function changePassword(email,code,newPassword){
	let d = [code,email,newPassword];
		$.ajax({
		type: "POST",
		url: "/resetPassword",
		contentType: "application/json",
		data: JSON.stringify(d),
		success: (response) => {
			if(response === "ok"){
				$("input").each(function(){
					if($(this).attr("id") == "insert-password"){
						$("#insert-password-info").css("color", "#0f5132");
					}
					$(this).removeClass("is-invalid");
					$(this).addClass("is-valid");
				});
				resetCompleted();
				currentSection++;				
			}
			else{
				showErrorAlert("Codice inserito non valido, ricontrollare la propria mail");
					$("input").each(function(){
					if($(this).attr("id") =="insert-password"){
						$("#insert-password-info").css("color", "");
					}
					$(this).removeClass("is-invalid");
				});
			}
		},
		error: () => {
			showErrorAlert("C'è stato un problema interno, ci scusiamo per il disagio e la invitiamo a riprovare più tardi");
		}
	});
}
function addSendCodeButtonListener(){
	$("#send-code-button").click(() =>{
		switch(currentSection){
			case 0:
				if($("#email").val() === "" || !_regexEmail.test($("#email").val())){
					$("#emailHelp").remove();
					appendError("email","Email inserita non valida");
				}
				else{
					sendVerifyCode($("#email").val());
				}
				break;
			case 1:
				if($("#verify-code").val() == ""){
					appendError("verify-code","Il campo è obbligatorio");
				}
				else if($("#insert-password").val() == "" || !_regexPassword.test($("#insert-password").val())){
					appendError("insert-password","La password non rispetta i requisiti di sicurezza");
				}
				else if($("#confirm-password").val() != $("#insert-password").val()){
					appendError("confirm-password","Le password non sono uguali");
				}
				else{
					changePassword($("#email").val(),$("#verify-code").val(),$("#insert-password").val());			
				}
				break;
			default:
				break;
		}

	});
}
function addEyeIconListener(){
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
$(document).ready(() => {
	addSendCodeButtonListener();
	addEyeIconListener();
});