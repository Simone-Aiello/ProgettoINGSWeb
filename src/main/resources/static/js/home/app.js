// GETTING WRAPPER SEARCH BAR , SEARCH BAR SMARTPHONE ITEMS , MODAL SEARCH BAR SMARTPHONE
let search_bar_smartphone = document.getElementsByClassName('search-bar-smartphone')[0];
let search_bar = document.getElementsByClassName('search-bar')[0] ;
let modal_search_bar_smartphone = document.getElementsByClassName('modal-search-bar-smartphone')[0];
close_modal_search_bar_smartphone = () => {
    modal_search_bar_smartphone.style.setProperty('display', 'none', 'important');
    document.body.style.overflowY = "auto"; 
}

// DEFINING CLOSE BUTTON 
let close_button = document.createElement("button");
close_button.className = "btn far fa-times-circle close-button-search-bar-smartphone" ;

close_button.onmouseover = () => {
    gsap.to(close_button,{ scale: 1.1 ,ease : "elastic.out(1, 0.3)" , rotate : "-90deg"} );
}

close_button.onmouseleave = () => {
    gsap.to(close_button,{ scale: 1 , ease : "elastic.out(1, 0.3)" , rotate : "0deg"} );
}


close_button.onclick = close_modal_search_bar_smartphone ;

search_bar_smartphone.appendChild(close_button);

// CLONING SEARCH BAR ITEMS
for(let i = 0 ; i < search_bar.children.length - 1 ; ++i){
    search_bar_smartphone.appendChild(search_bar.children[i].cloneNode(true));
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

$(window).resize(() => {
    bool_size_le_800 = $(window).width() <= 800 ;
    if(!bool_size_le_800){
           close_modal_search_bar_smartphone();
    }
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


// CONNECTING BUTTON SEARCH BAR SMARTPHONE
let button_search_bar_smartphone = document.getElementsByClassName('button-search-bar-smartphone')[0];
button_search_bar_smartphone.onclick = () => {
    modal_search_bar_smartphone.style.setProperty('display', 'flex', 'important');
    document.body.style.overflowY = "hidden"; 
}