var emailRegex = /\w+@\w+\.\w+/;
var city = {};
function addPasswordListeners(){
    $('.insert').click(() =>{
        $("#insert-password").attr('type',(index,currentValue)=>{
            return currentValue === 'password' ? 'text' : 'password';
        });
        if($("#insert-password").attr('type') === 'password'){
            $('.insert').attr('class','far fa-eye-slash insert');
        }
        else{
            $('.insert').attr('class','far fa-eye insert');
        }
    });
    $('.confirm').click(() =>{
        $("#confirm-password").attr('type',(index,currentValue)=>{
            return currentValue === 'password' ? 'text' : 'password';
        });
        if($("#confirm-password").attr('type') === 'password'){
            $('.confirm').attr('class','far fa-eye-slash confirm');
        }
        else{
            $('.confirm').attr('class','far fa-eye confirm');
        }
    });
}
function upadateCity(city){

}
function addCityListeners(){
    $("#provincia-residenza").change((event)=>{
        let selectedProvince = (event.target.value).toLowerCase();
        if(city.hasOwnProperty(selectedProvince)){
            //Imposta qua
        }
        else{
            $.ajax({
                type : "GET",
                url : "https://comuni-ita.herokuapp.com/api/comuni/provincia/" + selectedProvince,
                contentType: "application/json",
                success : function(risposta){
                    //console.log(risposta);
                    //Imposto qua
                    let tmp = [];
                    for(let c of risposta){
                        tmp.push(c["nome"]);
                    }
                    city[selectedProvince] = tmp;
                    console.log(city);
                },
                error : function(xhr){
                    console.log("Non sono riuscito a fare la call");
                }
            });
        }
    });
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
$(document).ready(() =>{
    $.ajax({
        type : "GET",
        url : "https://comuni-ita.herokuapp.com/api/province",
        contentType: "application/json",
        success : function(risposta){
            let work = $("#sede-lavoro");
            let province = $("#provincia-residenza");     
            for(let p of risposta){
                let provinceName = capitalizeFirstLetter(p["nome"]);
                work.append("<option>" + provinceName + "</option>");
                province.append("<option>" + provinceName + "</option>");
            }
        },
        error : function(xhr){
            console.log("Non sono riuscito a fare la call");
        }
    });
    addPasswordListeners();
    addCityListeners();
});