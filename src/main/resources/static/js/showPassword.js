function addPasswordListeners(){
    $('.insert').click(() =>{
        $("#passwordField").attr('type',(index,currentValue)=>{
            return currentValue === 'password' ? 'text' : 'password';
        });
        if($("#passwordField").attr('type') === 'password'){
            $('.insert').attr('class','far fa-eye-slash insert');
        }
        else{
            $('.insert').attr('class','far fa-eye insert');
        }
    });
}
$(document).ready(() =>{
    addPasswordListeners();
});