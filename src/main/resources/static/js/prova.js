function ajaxTest(){
	var username = "Giovanni_";
	var password = "giovanni123!";
	var login = {username : username, password : password};
	//console.log(login);
	$.ajax({
		type : "POST",
		url : "/prova",
		contentType: "application/json",
		data : JSON.stringify(login),
		success : (response) =>{
			alert(JSON.stringify(response));
		}, 
		error : (xhr) =>{
			alert(xhr)
		}		
	});
	console.log("done");
}


