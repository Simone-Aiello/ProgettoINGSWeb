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
			let id = "#"+$(this).attr("id");
			//let allClasses = $(id+ " i").attr("class").split(/\s+/);
			//let areaName = allClasses[allClasses.length - 1];
			if (listOfAreas.has(id)) return;
			$(this).css("background-color", "#FFFFFF");
			$(id + " .icon").css("color", "#FF9400");
		});
		
		$(this).click(() => {
			//alert("CLICKED AREAS");
			let id = "#"+$(this).attr("id");
			//alert("clicked" + id);
			//let allClasses = $(id+ " i").attr("class").split(/\s+/);
			//let areaName = allClasses[allClasses.length - 1];
			//alert("clicked"+ id + " " + areaName);
			//selectedAreas[id] = !selectedAreas[id];
			if(!listOfAreas.has(id)){

				areaBuilder = new Area.Builder();
				let idArea= $(id+ " i").attr("id");
				areaBuilder.withId(parseInt(idArea, 10));
				listOfAreas.set(id, areaBuilder.build());
				//account_builder.withArea(areaBuilder.build());
				//addToAreaSummary(areaName);
			}
			else{
				$(this).css("background-color", "#FFFFFF");
				$(id + " .icon").css("color", "#FF9400");
				listOfAreas.delete(id);
				//account_builder.removeArea($(id+ " i").attr("id"));
				//removeFromAreaSummary(areaName);
			}
		});
	});

}



