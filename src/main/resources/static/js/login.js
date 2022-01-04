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
	let passwordField = $("#passwordField");
	let password = passwordField.val();
	let usernameField = $("#emailField");
	let username = usernameField.val();
	
	
	try{
		loginCredentials.withUsername(username);
	}catch(e){
		try{
			loginCredentials.withEmail(username);
		}catch(e1){
			var div = createAlert('Invalid username or email');
			document.getElementById('alert').appendChild(div);
			return;
		}
	}
	try{
		loginCredentials.withPassword(password);
	}catch(e){
		var div = createAlert('Invalid password');
		document.getElementById('alert').appendChild(div);
		return;
	}
	
	
	loginCredentials = loginCredentials.build();
	console.log(loginCredentials);
	$.ajax({
		type : "POST",
		url : "/login",
		contentType: "application/json",
		data : JSON.stringify(loginCredentials),
		success : (response) =>{
			account = response;
			if(account == null){
				window.location.replace("Login.html?error=invalid_password_or_username");
				//alert(account);
				}
			else
				window.location.replace("Dashboard.html");
		}, 
		error : (xhr) =>{
			alert(xhr)
		}		
	});
}


function setLoginListener(){
	$("#accessButton").on("click" , doLogin );
}




$(document).ready(() => {
	setLoginListener();
	pageListener();
});