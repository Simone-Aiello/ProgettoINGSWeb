var selectedAreas = {};
var areaBuilder = null;
$(document).ready(() => {
	addAreasIconListener();
});


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
			selectedAreas[id] = !selectedAreas[id];
			if(selectedAreas[id]){
				areaBuilder = new Area.Builder();
				areaBuilder.withId($(id+ " i").attr("id"));
				//account_builder.withArea(areaBuilder.build());
			}
			else{
				//account_builder.removeArea($(id+ " i").attr("id"));
			}
		});
	});
}