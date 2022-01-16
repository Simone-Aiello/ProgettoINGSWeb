
let quantity_advertises = 8 ;

function createSpinner(){

    let spinner = document.createElement('div');
    spinner.className = "spinner-border text-warning";
    spinner.setAttribute('role','status');

    let span = document.createElement("span");
    span.className = "sr-only";
    span.innerHTML = "Loading...";
	
	return spinner ;
}


// Sticky behavior
$(window).scroll(() =>{
    let boolean_scroll = window.scrollY > 0 
    $("header").toggleClass( "sticky",boolean_scroll); 
    $(".search-bar").toggleClass( "search-bar-sticky",boolean_scroll);
    $(".button-choose-area").toggleClass( "button-choose-area-sticky",boolean_scroll);
    $(".wrapper-search-bar-items .wrapper input").toggleClass( "search-bar-input-sticky",boolean_scroll);
    $(".button-search-advertise i").toggleClass("button-search-advertise-sticky",boolean_scroll); 
});


// Container advertise
customElements.define('container-advertise', ContainerAdvertises);
let inner_container_advertise = document.createElement('container-advertise');
inner_container_advertise.init({
		quantity : 8 ,
	});
let outer_container_advertise = document.querySelector('.outer-container-advertises');
outer_container_advertise.insertBefore(inner_container_advertise, outer_container_advertise.children[1]);


// CONNECTING BUTTONS PREV NEXT
let button_prev_advertises = document.getElementById('prev-button');
let button_next_advertises = document.getElementById('next-button');

button_prev_advertises.onclick = inner_container_advertise.show_prev_view ;
button_next_advertises.onclick = inner_container_advertise.show_next_view ;