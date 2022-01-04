var _regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
	field.after("<div id=" + idElement + "-error" + " class=\"invalid-feedback\">" + message + "</div>");
}
function sendVerifyCode(email){
	$.ajax({
		type: "POST",
		url: "/sendVerifyCode",
		contentType: "application/json",
		data: email,
		success: (response) => {
			console.log(response);
		},
		error: (xhr) => {
			console.log(xhr);
		}
	});
}
function changePassword(){
		$.ajax({
		type: "POST",
		url: "/resetPassword",
		contentType: "application/json",
		data: email,
		success: (response) => {
			console.log(response);
		},
		error: (xhr) => {
			console.log(xhr);
		}
	});
}
function addSendCodeButtonListener(){
	$("#send-code-button").click(() =>{
		switch(currentSection){
			case 0:
				if($("#email").val() === "" || !_regex.test($("#email").val())){
					appendError("email","Email inserita non valida");
				}
				else{
					$('#email').prop('readonly', true);
					$("#email").removeClass("is-invalid");
					$("#email").addClass("is-valid");
					$("#send-code-button").text("Verifica codice");
					$("#code-div").toggle("slow");
					sendVerifyCode($("#email").val());
					currentSection++;
				}
				break;
			case 1:
				changePassword();
				break;
		}

	});
}
$(document).ready(() => {
	addSendCodeButtonListener();
});