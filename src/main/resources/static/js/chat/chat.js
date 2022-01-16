var currentLoggedUser = null;
var currentChatId = null;
function addSmallDevicesContactListListeners() {
	$("#contact-list-toggle").click(() => {
		if ($("#people-list").css("display") === "none") {
			$("#people-list").css("display", "initial");
			$("#people-list").attr("class", "col-12");
			$("#current-chat").css("display", "none");
		}
		else {
			$("#people-list").css("display", "none");
			$("#current-chat").css("display", "initial");
		}
	});
}
function parseTime(date) {
	let realMonth = date.getMonth() + 1;
	if (realMonth < 10) {
		realMonth = "0" + realMonth;
	}
	let realDay = date.getDate();
	if (realDay < 10) {
		realDay = "0" + realDay;
	}
	return `${date.getHours()}:${date.getMinutes()} ${realDay}/${realMonth}/${date.getFullYear()}`;
}
function offsetTimeZone(date) {
	let offset = -(new Date().getTimezoneOffset() / 60);
	let dateParts = date.split("T");
	let fullDate = dateParts[0].split("-");
	let realHour = parseInt(dateParts[1].split(":")[0]) + offset;
	if (realHour < 10) realHour = "0" + realHour;
	let minutes = String(dateParts[1].split(":")[1]);
	return `${realHour}:${minutes} ${fullDate[2]}/${fullDate[1]}/${fullDate[0]}`;
}
function appendMessages(messages) {
	let guest = $("#personal-info span").text();
	$("#messages-list").html("");
	for (message of messages) {
		message["messageTime"] = offsetTimeZone(message["messageTime"]);
		console.log(message["messageTime"]);
		if (message["sender"] == guest) {
			messageli = `<li class="other-message-li">
			  <div class="other-message">
					<p class="message-content">${message["text"]}</p>
					<small class="message-timestamp"> ${message["messageTime"]} </small>
			  </div>
		  </li>`;
		}
		else {
			messageli = `<li class="my-message-li">
			  <div class="my-message">
					<p class="message-content">${message["text"]}</p>
					<small class="message-timestamp"> ${message["messageTime"]} </small>
			  </div>
		  </li>`;
		}
		$("#messages-list").append(messageli);
	}
}
function getMessages(idChat) {
	$.ajax({
		type: "GET",
		url: "/getMessages",
		contentType: "application/json",
		data: {
			id : idChat,
			username : currentLoggedUser, 
		},
		success: (response) => {
			console.log(response);
			appendMessages(response);
			scrollDown();
		},
		error: (xhr) => {
			console.log(xhr);
		}
	});
}
function addOnPeopleClickListeners() {
	$("#people-list ul li").each(function() {
		$(this).click(() => {
			//Servono a rendere il sito responsive nel caso in cui lo schermo viene allargato dopo aver cliccato sulla lista dei contatti
			if ($("#current-chat").css("display") === "none") {
				$("#current-chat").css("display", "initial");
				if ($(document).width() <= 995) {
					$("#people-list").css("display", "none");
				}
			}
			//Mostro i messaggi
			let imgSrc = ($(this).children("img")).attr("src");
			let name = ($(this).children("span")).text();

			if ($(this).attr("id") != currentChatId) {
				getMessages($(this).attr("id"));
				$("#personal-info img").attr("src", imgSrc);
				$("#personal-info span").text(name);
				$("#personal-info").css("display", "initial");
				$("#new-message-div").css("display", "flex");
				$("#new-message-div").css("flex-direction", "row");
				currentChatId = $(this).attr("id");
			}
			//Tolgo l'icona della notifica se presente
			($(this).children("span")).children("i").css("display", "none");
		});
	});
}
function makeUIResponsive() {
	if ($(document).width() <= 995) {
		if ($("#people-list").attr("class") !== "col-12") {
			$("#people-list").css("display", "none");
			$("#current-chat").css("display", "initial");
		}
		$("#current-chat").css("width", "100%");
		$(".other-message").css("max-width", "300px");
		$(".my-message").css("max-width", "300px");
		$("#new-message-text").css("width", "95%");
		$("#recent-chats-div").css("display", "initial");
	}
	else {
		$("#people-list").attr("class", "col-3");
		$("#people-list").css("display", "initial");
		$("#current-chat").css("width", "");
		$("#current-chat").css("display", "initial");
		$("#recent-chats-div").css("display", "none");
		$(".other-message").css("max-width", "");
		$(".my-message").css("max-width", "");
	}
}
function addResizeListeners() {
	$(window).resize(function() {
		makeUIResponsive();
	});
}
function scrollDown() {
	$('#current-messages').scrollTop($('#current-messages')[0].scrollHeight);
}
function appendMessageToCurrentChat(message) {
	message["messageTime"] = parseTime(message["messageTime"]);
	let messageli = `<li class="my-message-li">
			  <div class="my-message">
					<p class="message-content">${message["text"]}</p>
					<small class="message-timestamp"> ${message["messageTime"]} </small>
			  </div>
		  </li>`;
	$("#messages-list").append(messageli);
}
function sendMessage(text) {
	let messageBuilder = new Message.Builder();
	messageBuilder.withText(text);
	messageBuilder.withSender(currentLoggedUser);
	messageBuilder.withIdChat(currentChatId);

	$.ajax({
		type: "POST",
		url: "/sendMessage",
		contentType: "application/json",
		data: JSON.stringify(messageBuilder.build()),
		success: (response) => {
			if (response != null) {
				response["messageTime"] = new Date();
				console.log(response);
				appendMessageToCurrentChat(response);
				scrollDown();
			}
		},
		error: (xhr) => {
			console.log(xhr);
		}
	});
}
function addSendButtonListener() {
	$("#send-message").click(() => {
		let text = $("#new-message-text").val();
		if (text != "") {
			$("#new-message-text").val("");
			sendMessage(text);
		}
	});
}
function appendNewChat(){
	
}
function handleNewMessages(data) {
	for (d of data) {
		let username = d["a1"]["username"];
		if (username === $("#personal-info span").text()) {
			getMessages(d["id"]);
		}
		else if($(`#${username} i`).length){
			$(`#${username} i`).css("display", "initial");			
		}
		else {
			appendNewChat();
		}
	}
}
function checkForNewMessages() {
	$.ajax({
		type: "GET",
		url: "/checkForNewMessages",
		contentType: "application/json",
		data: {
			username: currentLoggedUser,
		},
		success: (response) => {
			handleNewMessages(response);
			setTimeout(checkForNewMessages, 10000);
		},
		error: (xhr) => {
			console.log(xhr);
		}
	});
}
$(document).ready(() => {
	let urlObject = new URL(window.location.href);
	currentLoggedUser = urlObject.searchParams.get("username");
	makeUIResponsive();
	addSmallDevicesContactListListeners();
	addOnPeopleClickListeners();
	addResizeListeners();
	addSendButtonListener();
	checkForNewMessages();
});