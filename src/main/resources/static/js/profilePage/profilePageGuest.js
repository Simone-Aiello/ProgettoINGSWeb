var reviewIndex = 5;
var reviewStep = 5;
function appendReview(review) {
	let newReviewTemplate = $(`
	<div class="card mb-2">
		<div>
			<div>
				<div class="card-body">
					<h5 class="card-title">${review["title"]}</h5>
					<div id ="review-stars"> </div>
					<p class="card-text review-description mb-1">${review["description"]}</p>
					<p class="card-text">
						<small class="text-muted">Username cliente e data?</small>
					</p>
				</div>
			</div>
		</div>
	</div>`);
	for (let i = 0; i < 5; i++) {
		if (i < review["rating"]) {
			newReviewTemplate.find("#review-stars").append(`<i class="fas fa-star" aria-hidden="true"></i>`);
		}
		else {
			newReviewTemplate.find("#review-stars").append(`<i class="far fa-star" aria-hidden="true"></i>`);
		}
	}
	$("#reviews-list").append(newReviewTemplate);
}
function clearReviews() {
	$("#reviews-list").html("");
}
function showSystemError() {
	let errorDiv = `<div id ="system-error" class="alert alert-danger fade show" role="alert">C'è stato un problema interno, ci scusiamo per il disagio e la invitiamo a riprovare più tardi</div>`;
	$("#system-error").remove();
	$("#initial-info").append(errorDiv);
}
function addNextReviewsButtonListeners() {
	$("#next-reviews").click(() => {
		let d = {
			username: $("#username").text(),
			limit: reviewStep,
			offset: reviewIndex
		}
		$.ajax({
			type: "GET",
			url: "/getReviews",
			contentType: "application/json",
			data: d,
			success: function(response) {
				if (response.length > 0) {
					reviewIndex += reviewStep;
					clearReviews();
					for (review of response) {
						appendReview(review);
					}
				}
			},
			error: function() {
				showSystemError();
			}
		});
	});
}
function addSendMessageListener(){
	$("#start-chat").click(() =>{
		let messageValue = $("#message-area").val();
		if(messageValue != ""){
			let initialMessage = new Message.Builder();
			intialMessage.withText(messageValue);
			let chat = new Chat.Builder();
			chat.withA2($("#username").text());
			chat.withMessages(intialMessage.build());
			$.ajax({
			type: "POST",
			url: "/startChat",
			contentType: "application/json",
			data: JSON.stringify(chat.build()),
			success: function(response) {
				console.log(response);
			},
			error: function(xhr) {
				console.log(xhr);
				showSystemError();
			}
		});
		}
	});
}
$(document).ready(() => {
	addSendMessageListener();
	if(accountType == "w"){
		addNextReviewsButtonListeners();		
	}
});