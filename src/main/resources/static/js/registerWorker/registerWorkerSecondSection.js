var fileReader = new FileReader();
var acceptedExtensions = ["image/png", "image/jpg", "image/jpeg"];
var selectedAreas = {};
var imageBuilder = new Image.Builder();
var areaBuilder = null;
function addToAreaSummary(areaName){
	$("#area-list").append("<li id ="+ areaName + ">"+ capitalizeFirstLetter(areaName) + "</li>");
}
function removeFromAreaSummary(areaName){
	console.log("tolgo");
	$("#" + areaName).remove();
}
function atLeastOneArea(){
	for(const [key,value] of Object.entries(selectedAreas)){
		if(value) return true;
	}
	return false;
}
function addFileReaderListener() {
	fileReader.onload = (e) => {
		$("#profile-pic").attr("src", e.target.result);
		imageBuilder.withValue(e.target.result);
		$("#file-input")[0].value = '';
	};
}
function addUploadAndDeleteListeners() {
	//Upload listeners
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

	//Remove listeners
	$("#remove-photo").hover((enter) => {
		$("#remove-photo").css("background-color", "#FF9400");
		$("#remove-photo").css("color", "#FFFFFF");
	}, (exit) => {
		$("#remove-photo").css("background-color", "#FFFFFF");
		$("#remove-photo").css("color", "#FF9400");
	});
	$("#remove-photo").click(() => {
		$("#profile-pic").attr("src", "/usersImages/profilePictures/defaultIcon.png");
		imageBuilder.withValue(null);
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
	$(".icon-figure").each(function (key,value){
		let id = "#area-" + (key + 1);
		selectedAreas[id] = false;
		$(this).mouseenter(() => {
			$(id).css("background-color", "#FF9400");
			$(id + " .icon").css("color", "#FFFFFF");
		});
		
		$(this).mouseleave(() => {
			if (selectedAreas["#"+$(this).attr("id")]) return;
			$(this).css("background-color", "#FFFFFF");
			$(id + " .icon").css("color", "#FF9400");
		});
		
		$(this).click(() => {
			let id = "#"+$(this).attr("id");
			let allClasses = $(id+ " i").attr("class").split(/\s+/);
			let areaName = allClasses[allClasses.length - 1];
			selectedAreas[id] = !selectedAreas[id];
			if(selectedAreas[id]){
				areaBuilder = new Area.Builder();
				areaBuilder.withId($(id+ " i").attr("id"));
				account_builder.withArea(areaBuilder.build());
				addToAreaSummary(areaName);
			}
			else{
				$(this).css("background-color", "#FFFFFF");
				$(id + " .icon").css("color", "#FF9400");
				account_builder.removeArea($(id+ " i").attr("id"));
				removeFromAreaSummary(areaName);
			}
		});
	});
}
function addNewAreaListener(){
	$("#flexCheckDefault").click(() =>{
		$("#missing-area").toggle("slow");
	});
}
$(document).ready(() => {
	addFileReaderListener();
	addUploadAndDeleteListeners();
	addInputListener();
	addAreasIconListener();
	addNewAreaListener();
});