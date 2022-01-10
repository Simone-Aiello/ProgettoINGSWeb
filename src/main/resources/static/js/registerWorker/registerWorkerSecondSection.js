var fileReader = new FileReader();
var acceptedExtensions = ["image/png", "image/jpg", "image/jpeg"];
var selectedAreas = {};
var imageBuilder = new Image.Builder();
var areaBuilder = null;
var defaultPhoto = "/usersImages/profilePictures/defaultIcon.png";
var newArea = {}
let regexForNewAreas = /^[a-zA-Z'-\s]*$/;
function addToAreaSummary(areaName) {
	$("#summary-areas").append(`<i id ="${areaName}" class="fas ${areaName} fa-2x icon"></i>`);
}
function removeFromAreaSummary(areaName) {
	$("#" + areaName).remove();
}
function addImageToSummary(value) {
	$("#summary-profile-pic").attr("src", value);
}
function removeImmageFromSummary() {
	$("#summary-profile-pic").attr("src", defaultPhoto);
}
function atLeastOneArea() {
	for (const [key, value] of Object.entries(selectedAreas)){  
		if (value) return true;
	}
	return false;
}
function addFileReaderListener() {
	fileReader.onload = (e) => {
		$("#profile-pic").attr("src", e.target.result);
		imageBuilder.withValue(e.target.result);
		$("#file-input")[0].value = '';
		addImageToSummary(e.target.result);
	};
}
function addUploadAndDeleteListeners() {
	//Upload button listeners
	$("#upload-photo").hover((enter) => {
		$("#upload-photo").css("background-color", "#FF9400");
		$("#upload-photo").css("color", "#FFFFFF");
	}, (exit) => {
		$("#upload-photo").css("background-color", "#FFFFFF");
		$("#upload-photo").css("color", "#FF9400");
	});
	$("#upload-photo").click(() => {
		$("#file-input").click();
	});

	//Remove button listeners
	$("#remove-photo").hover((enter) => {
		$("#remove-photo").css("background-color", "#FF9400");
		$("#remove-photo").css("color", "#FFFFFF");
	}, (exit) => {
		$("#remove-photo").css("background-color", "#FFFFFF");
		$("#remove-photo").css("color", "#FF9400");
	});
	$("#remove-photo").click(() => {
		$("#profile-pic").attr("src", defaultPhoto);
		imageBuilder.withValue(null);
		removeImmageFromSummary();
	});
}
function addInputListener() {
	$("#file-input").change((e) => {
		if (e.target.files[0] && acceptedExtensions.includes(e.target.files[0].type)) {
			let file = e.target.files[0];
			fileReader.readAsDataURL(file);
		}
	});
}
function addAreasIconListener() {
	$(".icon-figure").each(function(key, value) {
		let id = "#area-" + (key + 1);
		selectedAreas[id] = false;
		$(this).mouseenter(() => {
			$(id).css("background-color", "#FF9400");
			$(id + " .icon").css("color", "#FFFFFF");
		});

		$(this).mouseleave(() => {
			if (selectedAreas["#" + $(this).attr("id")]) return;
			$(this).css("background-color", "#FFFFFF");
			$(id + " .icon").css("color", "#FF9400");
		});

		$(this).click(() => {
			let id = "#" + $(this).attr("id");
			selectedAreas[id] = !selectedAreas[id];
			let areaName = $(id + " i").attr("class").split(/\s+/)[1];
			if (selectedAreas[id] ){ 
				areaBuilder = new Area.Builder();
				areaBuilder.withId($(id + " i").attr("id"));
				account_builder.withArea(areaBuilder.build());
				addToAreaSummary(areaName);
			}
			else {
				$(this).css("background-color", "#FFFFFF");
				$(id + " .icon").css("color", "#FF9400");
				account_builder.removeArea($(id + " i").attr("id"));
				removeFromAreaSummary(areaName);
			}
		});
	});
}
function newAreaFormValid() {
	if ($("#new-area-checkbox").is(":checked")) {
		if ($("#name-new-area").hasClass("is-invalid") || $("#name-new-area").val() == "" || $("#description-new-area").val() == "") return false;
		return true;
	}
	return true;
}
function sendNewArea() {
	//Se la checkbox non è spuntata o si sta registrando un utente questa promise non la creo
	if(!$("#new-area-checkbox").is(":checked") || $("#area-div").length <= 0) return null;
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url: "/newAreaRequest",
			contentType: "application/json",
			data: JSON.stringify(newArea),
			success: () => {
				resolve();
			},
			error: () => {
				reject();
			}
		});
	});
}
function addNewAreaListener() {
	$("#new-area-checkbox").click(() => {
		$("#missing-area").toggle("slow");
	});
	$("#name-new-area").on("input", function() {
		if (regexForNewAreas.test($(this).val())) {
			newArea["name"] = $(this).val();
			appendCorrect("name-new-area");
		}
		else {
			newArea["name"] = "";
			appendError("name-new-area", "Alcuni caratteri inseriti non sono validi");
		}
	});
	$("#description-new-area").on("input", function() {
		newArea["description"] = $(this).val();
		appendCorrect("description-new-area");
	});
}
$(document).ready(() => {
	addFileReaderListener();
	addUploadAndDeleteListeners();
	addInputListener();
	if($("#area-div").length){		
		addAreasIconListener();
		addNewAreaListener();
	}
});