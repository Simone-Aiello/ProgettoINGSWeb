function addDeleteButtonListener() {
	$(".delete-button").each(function() {
		$(this).click(function() {
			let fullId = $(this).parent().parent().attr("id");
			let id_offer = fullId.split("-")[1];
			$.ajax({
				type: "POST",
				url: "/deleteMyOffer",
				contentType: "application/json",
				data: JSON.stringify({
					id: id_offer,
				}),
				success: function() {
					$(this).toggle("fast", function() {
						$(`#${fullId}`).remove();
					});
				},
				error: function(xhr) {
					console.log(xhr);
				}
			});
		});
	});
}
function addEndWorkButtonListener(){
		$(".end-work-button").each(function() {
		$(this).click(function() {
			let fullId = $(this).parent().parent().attr("id");
			let id_offer = fullId.split("-")[1];
			$.ajax({
				type: "POST",
				url: "/markAsDone",
				contentType: "application/json",
				data: JSON.stringify({
					id: id_offer,
				}),
				success: function() {
					$(`#${fullId} button.end-work-button`).parent().attr("class","job-done");
					$(`#${fullId} button.end-work-button`).parent().html(`<span>Lavoro completato!</span>`);
					$(`#${fullId} button.end-work-button`).remove();
				},
				error: function(xhr) {
					console.log(xhr);
				}
			});
		});
	});
}
$(document).ready(() => {
	addDeleteButtonListener();
	addEndWorkButtonListener();
});