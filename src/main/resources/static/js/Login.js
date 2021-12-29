import { Account } from "./model/account.js";


var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

function doLogin(){
	let usernameOrEmail = document.getElementById('emailField').value;
	let password = document.getElementById('passwordField').value;
	let loginCredentials = new Account.Builder();
	if(regex.test(usernameOrEmail))	
		loginCredentials.withEmail(usernameOrEmail);
	else 
		loginCredentials.withUsername(usernameOrEmail);
	loginCredentials.withPassword(password);
	loginCredentials = loginCredentials.build();
	//console.log(loginCredentials);
}
