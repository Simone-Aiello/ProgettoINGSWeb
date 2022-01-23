// GETTING WRAPPER SEARCH BAR , SEARCH BAR SMARTPHONE ITEMS , MODAL SEARCH BAR SMARTPHONE
let search_bar_smartphone = document.getElementsByClassName('search-bar-smartphone')[0];
let search_bar = document.getElementsByClassName('search-bar')[0] ;
let modal_search_bar_smartphone = document.getElementById('modal-search-bar-smartphone');


// DEFINING CLOSE BUTTON 
let close_button_modal_search_bar_smartphone = document.createElement("button");
close_button_modal_search_bar_smartphone.className = "btn far fa-times-circle close-button-container-columns" ;

close_button_modal_search_bar_smartphone.onmouseover = () => {
    gsap.to(close_button_modal_search_bar_smartphone,{ scale: 1.1 ,ease : "elastic.out(1, 0.3)" , rotate : "-90deg"} );
}

close_button_modal_search_bar_smartphone.onmouseleave = () => {
    gsap.to(close_button_modal_search_bar_smartphone,{ scale: 1 , ease : "elastic.out(1, 0.3)" , rotate : "0deg"} );
}


close_button_modal_search_bar_smartphone.onclick = () => { closeModal(modal_search_bar_smartphone)} ;

search_bar_smartphone.appendChild(close_button_modal_search_bar_smartphone);

// CLONING SEARCH BAR ITEMS
let item_search_bar ;
for(let i = 0 ; i < search_bar.children.length  ; ++i){
    let search_bar_smartphone_item = search_bar.children[i].cloneNode(true) ;
    // If it is the areas button
    if(i == search_bar.children.length - 2){
        search_bar_smartphone_item.setAttribute('id','button-areas-search-bar-smartphone');
    }
    if(i == search_bar.children.length - 1){
        item_search_bar = search_bar_smartphone_item ;
        search_bar_smartphone_item.setAttribute('id','button-search-avertise-smartphone');
        search_bar_smartphone_item.classList.add('button-search-avertise-smartphone');
    }    
    search_bar_smartphone.appendChild(search_bar_smartphone_item);
}


// Container areas smartphone
let container_areas_smartphone = document.createElement('div');
container_areas_smartphone.className = "container_areas_smartphone";
search_bar_smartphone.insertBefore(container_areas_smartphone,item_search_bar);


// Connecting button areas smartphone
let button_areas_smartphone = document.getElementById('button-areas-search-bar-smartphone');
let bool_areas_smartphone = true ;
button_areas_smartphone.onclick = () => {
    if(bool_areas_smartphone){
        bool_areas_smartphone = false;
        container_areas_smartphone.style.maxHeight = "100px";
        container_areas_smartphone.style.overflowY = "auto";
    }else{
        bool_areas_smartphone = true;
        container_areas_smartphone.style.maxHeight = "0";
        container_areas_smartphone.style.overflow = "clip";
    }
}


// Sticky behavior
$(window).scroll(() =>{
    let boolean_scroll = window.scrollY > 0 
    $("header").toggleClass( "sticky",boolean_scroll); 
    // $(".search-bar").toggleClass( "search-bar-sticky",boolean_scroll);
    // $(".button-choose-area").toggleClass( "button-choose-area-sticky",boolean_scroll);
    // $(".wrapper-search-bar-items .wrapper input").toggleClass( "search-bar-input-sticky",boolean_scroll);
    // $(".button-search-advertise i").toggleClass("button-search-advertise-sticky",boolean_scroll); 
});

$(window).resize(() => {
    bool_size_le_800 = $(window).width() <= 800 ;
    if(!bool_size_le_800){
           closeModal(modal_search_bar_smartphone);
    }
});

// Container advertise
customElements.define('container-advertise', ContainerAdvertises);
let inner_container_advertise = document.createElement('container-advertise');
let params = { 
    quantity : 6
}
try{
    if(provinceOfWork){
        params.province = provinceOfWork ;
    }
}catch(e){
    var provinceOfWork = null ;
}

inner_container_advertise.init(params);
let outer_container_advertise = document.querySelector('.outer-container-advertises');
outer_container_advertise.insertBefore(inner_container_advertise, outer_container_advertise.children[1]);


// CONNECTING BUTTONS PREV NEXT
let button_prev_advertises = document.getElementById('prev-button');
let button_next_advertises = document.getElementById('next-button');

button_prev_advertises.onclick = inner_container_advertise.show_prev_view ;
button_next_advertises.onclick = inner_container_advertise.show_next_view ;


// CONNECTING BUTTON SEARCH BAR SMARTPHONE
let button_search_bar_smartphone = document.getElementsByClassName('button-search-bar-smartphone')[0];
button_search_bar_smartphone.onclick = () => { showModal(modal_search_bar_smartphone); }

// MODAL AREAS
let modal_areas = document.getElementById('modal-areas');

// CONNECTING BUTTON-AREAS-SEARCH-BAR 
let button_areas_search_bar = document.getElementById('button-areas-search-bar');
button_areas_search_bar.onclick = () => { showModal(modal_areas); }


// ADDING AREAS TO CONTAINER OF THE MODAL AREAS AND SMARTPHONE
let container_of_modal_areas = document.getElementById('container-of-modal-areas');
let container_areas  = document.getElementById('container-areas');
// IN utils.js
getAllAreas([container_areas, container_areas_smartphone]);

// ADDING CLOSE BUTTON TO MODAL AREAS
let close_button_modal_areas  = close_button_modal_search_bar_smartphone.cloneNode(true);
close_button_modal_areas.onmouseover = () => {
    gsap.to(close_button_modal_areas,{ scale: 1.1 ,ease : "elastic.out(1, 0.3)" , rotate : "-90deg"} );
}

close_button_modal_areas.onmouseleave = () => {
    gsap.to(close_button_modal_areas,{ scale: 1 , ease : "elastic.out(1, 0.3)" , rotate : "0deg"} );
}


close_button_modal_areas.onclick = () => { closeModal(modal_areas)} ;
container_of_modal_areas.insertBefore(close_button_modal_areas,container_areas);


// CONNECTING BUTTONS SEARCH BAR
let button_search_advertise = document.getElementById('button-search-advertise');
button_search_advertise.onclick = () => {
    let input = document.querySelectorAll('.search-bar input'); 

    let keyword = input[0].value;
    let province = input[1].value;

    input[0].value = '' ;
    input[1].value = '' ;


   let areas = Array.from(document.querySelectorAll('#container-areas button')).filter((area) =>{ return area.getAttribute('selected') == 'true' }).map((area => { return area.name}));

    console.log(areas);

    inner_container_advertise.init({
		quantity : 6 ,
        areas : areas.length > 0 ? areas : null ,
        keyword : keyword != '' && keyword != null ? keyword : null ,
        province : province != '' && province != null ? province : provinceOfWork ,
	});
}


// CONNECTING BUTTONS SEARCH BAR SMARTPHONE
let button_search_advertise_smartphone = document.getElementById('button-search-avertise-smartphone');
button_search_advertise_smartphone.onclick = () => {
    let input = document.querySelectorAll('.search-bar-smartphone input'); 

    let keyword = input[0].value;
    let province = input[1].value;

    input[0].value = '' ;
    input[1].value = '' ;

    console.log('keyword: '+keyword+" province: "+province);

    let areas = Array.from(document.querySelectorAll('.container_areas_smartphone button')).filter((area) =>{ return area.getAttribute('selected')}).map((area => { return area.name}));

    console.log(areas);

    inner_container_advertise.init({
		quantity : 6 ,
        areas : areas.length > 0 ? areas : null ,
        keyword : keyword != '' && keyword != null ? keyword : null ,
        province : province != '' && province != null ? province : null ,
	});

    closeModal(modal_search_bar_smartphone);
}






