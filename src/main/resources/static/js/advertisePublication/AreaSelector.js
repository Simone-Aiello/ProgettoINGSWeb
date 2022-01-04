var listOfAreas = new Map();
var areaBuilder = null;
$(document).ready(() => {
	addAreasIconListener();
});


function addAreasIconListener() {
	$(".icon-figure").each(function (key,value){
		let idFigure = "#area-" + (key + 1);
		//selectedAreas[id] = false;
		$(this).mouseenter(() => {
			$(idFigure).css("background-color", "#FF9400");
			$(idFigure + " .icon").css("color", "#FFFFFF");
		});
		
		$(this).mouseleave(() => {
			if (listOfAreas.has(idFigure)) return;
			$(this).css("background-color", "#FFFFFF");
			$(idFigure + " .icon").css("color", "#FF9400");
		});
		
		$(this).click(() => {
			let idFigure = "#"+$(this).attr("id");
			let idArea = $(idFigure).find("i").attr("id");
			//alert(idArea);
			if(!listOfAreas.has(idFigure)){
				areaBuilder = new Area.Builder();
				let classList = $("#" + idArea).attr("class");
				let classArr = classList.split(/\s+/);
				//APPEND FAS BEFORE IMAGE IN HTML
				//areaBuilder.withIcon(classArr[0] + classArr[1]);
				areaBuilder.withName(classArr[classArr.length -1]);
				areaBuilder.withId(idArea);
				//alert($(this).attr("id"));
				var area = areaBuilder.build();
				listOfAreas.set(idFigure, area);
				//alert(listOfAreas.has()):;
			}
			else{
				listOfAreas.delete(idFigure);
			}
		});
	});
}