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
$(document).ready(() =>{
    addPasswordListeners();
});