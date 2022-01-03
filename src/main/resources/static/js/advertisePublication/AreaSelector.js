var listOfAreas = new Map();
var areaBuilder = null;
$(document).ready(() => {
	addAreasIconListener();
});


function addAreasIconListener() {
	$(".icon-figure").each(function (key,value){
		let id = "#area-" + (key + 1);
		//selectedAreas[id] = false;
		$(this).mouseenter(() => {
			$(id).css("background-color", "#FF9400");
			$(id + " .icon").css("color", "#FFFFFF");
		});
		
		$(this).mouseleave(() => {
			if (listOfAreas.has(id)) return;
			$(this).css("background-color", "#FFFFFF");
			$(id + " .icon").css("color", "#FF9400");
		});
		
		$(this).click(() => {
			let id = "#"+$(this).attr("id");
			//alert(id);
			if(!listOfAreas.has(id)){
				areaBuilder = new Area.Builder();
				areaBuilder.withId($(id));
				var area = areaBuilder.build();
				listOfAreas.set(id, area);
			}
			else{
				listOfAreas.delete(id);
			}
		});
	});
}