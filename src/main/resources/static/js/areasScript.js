var clicked = false;
$(document).ready(() => {
$(".icon-div").mouseenter(() =>{
	$(".icon-div").css("background-color","#FF9400");
	$(".icon").css("color","#FFFFFF");
});
$(".icon-div").mouseleave(()=>{
	if(clicked) return;	
	$(".icon-div").css("background-color","#FFFFFF");
	$(".icon").css("color","#FF9400");
});
$(".icon-div").click((event)=>{
	clicked = !clicked;
});
});
