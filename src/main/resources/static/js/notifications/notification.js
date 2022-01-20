function markAllAsRead() {
	let unreadNotifications = []
	$(".dropdown-notification").children(".notification").each(function() {
		if ($(this).find(".text div i").hasClass("unread-notification")) {
			let currentId = {
				id: $(this).attr("id").split("-")[1],
			}
			//Tolgo la spunta come non letta
			$(this).find(".text div i").remove();
			unreadNotifications.push(currentId);
		}
	});
	if (unreadNotifications.length != 0) {
		$.ajax({
			type: "POST",
			url: "/markAsRead",
			contentType: "application/json",
			data: JSON.stringify(unreadNotifications),
			success: function() {
				console.log("Ok");
			},
			error: function(xhr) {
				console.log(xhr);
			}
		});
	}
	$("#new-notification").css("display", "none");
}
function notificationClickListener() {
	var popup = $('.dropdown-notification'),
		arrowExceed = 30;
	$('#notification-bell').click(function() {
		if ($(".dropdown-notification").css("display") == "none") {
			$.ajax({
				type: "GET",
				url: "/getNotifications",
				contentType: "application/json",
				success: function(response) {
					for (n of response) {
						appendNotification(n);
					}
				},
				error: function(xhr) {
					console.log(xhr);
				}
			});
			var icon = $(this),
				iconPos = icon.position(),
				iconW = icon.width(),
				iconH = icon.height(),
				popupTop = iconPos.top + iconH + arrowExceed,
				popupLeft = iconPos.left + iconW;
			if ($(document).width() < 992) {
				popupLeft = 10;
			}
			popup.css({ left: popupLeft, top: popupTop });

		}
		else {
			//Se chiudo la sezione delle notifiche le segno tutte come lette
			markAllAsRead();
		}
		popup.toggle("fast");
	});
}
function closeNotificationOnResize() {
	$(window).resize(() => {
		$(".dropdown-notification").css("display", "none");
	});
}
function checkForNewNotifications() {
	$.ajax({
		type: "GET",
		url: "/unreadNotifications",
		contentType: "application/json",
		success: function(response) {
			if (response == true) {
				$("#new-notification").css("display", "initial");
			}
			else $("#new-notification").css("display", "none");
			setTimeout(checkForNewNotifications, 3000);
		},
		error: function(xhr) {
			$("#new-notification").css("display", "none");
		}
	});
}
function removeNotification(idNotification) {
	$.ajax({
		type: "POST",
		url: "/deleteNotification",
		contentType: "application/json",
		data: JSON.stringify({
			id : idNotification,
		}),
		success: function() {
			$(`#notify-${idNotification} i`).parent().toggle("fast", function() {
				$(`#notify-${idNotification} i`).remove();
				if (!$(".dropdown-notification").children().length) {
					$("#new-notification").css("display", "none");
				}
			});
			$(`#notify-${idNotification} i`).parent().next().remove();
		},
		error: function(xhr) {
			console.log(xhr);
		}
	});
}
function appendNotification(notification) {
	let id = "notify-" + notification["id"];
	//Se la notifica non c'è già viene aggiunta
	if (!$(`#${id}`).length) {
		let notificationDiv = `<div class="notification" id="${id}">
				<div class="image">
					<img class ="type-${notification["type"]}" src="">
				</div>
				<div class="text">
					<div>
						<span class="notification-title"></span>
						<p class="notification-description">${notification["text"]}</p>
					</div>
				</div>
				<i class="fas fa-times delete-notification"></i>
			</div>
			<hr>`;
		$(".dropdown-notification").append(notificationDiv);
		//Aggiungo l'evento sul click della X per chiudere ed elimninare la notifica
		$(`#${id} i`).click(function() {
			removeNotification($(this).parent().attr("id").split("-")[1]);

		});
		if (notification["createdBy"]["profilePic"] != null) {
			$(`#${id} div.image img`).attr("src", notification["createdBy"]["profilePic"]["value"]);
		}
		else {
			$(`#${id} div.image img`).attr("src", "/usersImages/profilePictures/defaultIcon.png");
		}
		let title = "";
		switch (notification["type"]) {
			case "a":
				title = "Nuovo annuncio pubblicato";
				break;
			case "r":
				title = "Nuova recensione ricevuta";
				break;
			case "o":
				title = "Una tua offerta è stata valutata";
				break;
			case "s":
				title = "Nuova notifica di sistema"
				break;
		}
		$(`#${id} div.text span.notification-title`).text(title);
		if (!notification["read"]) {
			$(`#${id} div.text span.notification-title`).after(`<i class="fas fa-circle fa-xs unread-notification"></i>`);
		}
		//Serve per centrare l'immagine rispetto alla dimensione della notifica
		let textHeight = $(`#${id} div.text`).height();
		let imgHeight = $(`#${id} div.image img`).height();
		$(`#${id} div.image img`).css({ top: textHeight / 2 - imgHeight / 2 });
	}
}
$(document).ready(() => {
	notificationClickListener();
	closeNotificationOnResize();
	checkForNewNotifications();
});