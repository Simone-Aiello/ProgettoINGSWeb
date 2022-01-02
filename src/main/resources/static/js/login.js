import { Account } from "./model/account.js";

var loginCredentials = new Account.Builder();
var account;

function createAlert(message){
	var div = document.createElement('div');
	div.className = "alert alert-danger";
	div.role = "alert";
	var innerp = document.createElement('p');
	innerp.innerHTML = message;
	div.appendChild(innerp);
	return div
}

function pageListener(){
	$( window ).load(function() {
 		var path = window.location.href;
		var splitted = path.split("?error=");
		if(splitted[1] === "invalid_password_or_username"){
			var div = createAlert('Invalid password or username');
			document.getElementById('alert').appendChild(div);
		}
	});
}

function doLogin(){
	//comprendere se la build è avvenuta con successo
	loginCredentials = loginCredentials.build();
	console.log(loginCredentials);
	$.ajax({
		type : "POST",
		url : "/login",
		contentType: "application/json",
		data : JSON.stringify(loginCredentials),
		success : (response) =>{
			account = response;
			if(account == null)
				window.location.replace("Login.html?error=invalid_password_or_username");
			else
				window.location.replace("Dashboard.html");
		}, 
		error : (xhr) =>{
			console.log("error sending json");
			//alert(xhr)
		}		
	});
}


function setLoginListener(){
	$("#accessButton").on("click" , doLogin );
}


function setUsernameListener(){
	let accessButton = document.getElementById('accessButton');
	$("#emailField").on("input", () => {
		let usernameField = $("#emailField");
		let username = usernameField.val();
		try {
			loginCredentials.withUsername(username);
			accessButton.classList.remove("disabled");
			usernameField.removeClass("is-invalid");
			usernameField.addClass("is-valid");
		}
		catch (error) {
			try{
				loginCredentials.withEmail(username);
				accessButton.classList.remove("disabled");
				usernameField.removeClass("is-invalid");
				usernameField.addClass("is-valid");
			}catch(error){
				accessButton.classList.add("disabled");
				usernameField.removeClass("is-valid");
				usernameField.addClass("is-invalid");
			}
		}
	});
	
}

function setPasswordLister(){
	let accessButton = document.getElementById('accessButton');
	$("#passwordField").on("input", () => {
		let passwordField = $("#passwordField");
		let password = passwordField.val();
		try {
			loginCredentials.withPassword(password);
			accessButton.classList.remove("disabled");
			passwordField.removeClass("is-invalid");
			passwordField.addClass("is-valid");
		}
		catch (error) {
			accessButton.classList.add("disabled");
			passwordField.removeClass("is-valid");
			passwordField.addClass("is-invalid");
		}
	});
}

$(document).ready(() => {
	setLoginListener();
	setUsernameListener();
	setPasswordLister();
	pageListener();
});